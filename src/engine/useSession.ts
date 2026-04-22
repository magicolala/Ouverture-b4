import { useCallback, useEffect, useMemo, useReducer, useRef } from "react";
import { Chess } from "chess.js";
import { progressStore } from "./progressStore";
import {
  emptyStats,
  isWhiteMoveIndex,
  MAX_ATTEMPTS,
  normalizeSan,
} from "./types";
import type {
  MoveAnnotation,
  RepertoireLine,
  SessionMode,
  SessionPhase,
  SessionState,
} from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// Reducer : machine à états pure. Aucune logique de Chess.js ici —
// la position de l'échiquier est dérivée (useMemo plus bas) depuis
// (queue[currentLineIndex], currentMoveIndex).
// ─────────────────────────────────────────────────────────────────────────────

type Action =
  | { type: "START"; queue: RepertoireLine[]; mode: SessionMode }
  | { type: "ADVANCE_LEARN" } // LEARN : "coup suivant" (ou coup joué correctement)
  | { type: "USER_PLAYED_CORRECT" } // PRACTICE : bon coup joué
  | { type: "USER_PLAYED_WRONG"; san: string } // PRACTICE : mauvais coup (ou illégal refusé → ailleurs)
  | { type: "CONTINUE_AFTER_SOLUTION" } // PRACTICE : on avance après avoir vu la solution
  | { type: "OPPONENT_MOVE_PLAYED" } // PRACTICE : coup adverse auto-joué
  | { type: "SCHEDULE_OPPONENT" } // Déclenche la phase waiting-opponent
  | { type: "FINISH_LEARN_LINE" } // LEARN → PRACTICE sur la même ligne
  | { type: "NEXT_LINE" } // Passer à la ligne suivante dans la queue
  | { type: "RESTART_LINE" } // Recommencer la ligne en cours
  | { type: "EXIT" };

function initialState(): SessionState {
  return {
    mode: "learn",
    phase: "session-complete",
    queue: [],
    currentLineIndex: 0,
    currentMoveIndex: 0,
    attemptsOnCurrentMove: 0,
    showSolution: false,
    stats: emptyStats(),
    lastError: null,
  };
}

function phaseAfterAdvance(
  line: RepertoireLine,
  nextMoveIndex: number,
  mode: SessionMode,
): SessionPhase {
  if (nextMoveIndex >= line.moves.length) return "line-complete";
  if (mode === "practice" && !isWhiteMoveIndex(nextMoveIndex)) {
    // Prochain coup = noir → il faut laisser un effet jouer le coup adverse
    return "waiting-opponent";
  }
  return "playing";
}

function reducer(state: SessionState, action: Action): SessionState {
  switch (action.type) {
    case "START": {
      if (action.queue.length === 0) return state;
      const line = action.queue[0];
      // En PRACTICE, si (hypothétiquement) le 1er coup était noir, on attendrait
      // l'adversaire. Dans notre répertoire il est toujours blanc, mais on reste générique.
      const phase: SessionPhase =
        action.mode === "practice" && !isWhiteMoveIndex(0)
          ? "waiting-opponent"
          : "playing";
      return {
        mode: action.mode,
        phase,
        queue: action.queue,
        currentLineIndex: 0,
        currentMoveIndex: 0,
        attemptsOnCurrentMove: 0,
        showSolution: false,
        stats: { ...emptyStats(), totalUserMoves: countWhiteMoves(line) },
        lastError: null,
      };
    }

    case "ADVANCE_LEARN": {
      const line = state.queue[state.currentLineIndex];
      if (!line) return state;
      const next = state.currentMoveIndex + 1;
      return {
        ...state,
        currentMoveIndex: next,
        attemptsOnCurrentMove: 0,
        showSolution: false,
        lastError: null,
        phase: phaseAfterAdvance(line, next, "learn"),
      };
    }

    case "USER_PLAYED_CORRECT": {
      const line = state.queue[state.currentLineIndex];
      if (!line) return state;
      const next = state.currentMoveIndex + 1;
      // En PRACTICE : si la solution avait été révélée, on compte en "hinted", sinon "perfect".
      const wasHinted = state.showSolution;
      return {
        ...state,
        currentMoveIndex: next,
        attemptsOnCurrentMove: 0,
        showSolution: false,
        lastError: null,
        stats: {
          ...state.stats,
          perfectMoves:
            state.stats.perfectMoves + (wasHinted ? 0 : 1),
          hintedMoves: state.stats.hintedMoves + (wasHinted ? 1 : 0),
        },
        phase: phaseAfterAdvance(line, next, state.mode),
      };
    }

    case "USER_PLAYED_WRONG": {
      const newAttempts = state.attemptsOnCurrentMove + 1;
      const reveal = newAttempts >= MAX_ATTEMPTS;
      return {
        ...state,
        attemptsOnCurrentMove: newAttempts,
        showSolution: reveal,
        lastError: action.san,
      };
    }

    case "CONTINUE_AFTER_SOLUTION": {
      // On considère ce coup comme "avec aide" et on avance.
      const line = state.queue[state.currentLineIndex];
      if (!line) return state;
      const next = state.currentMoveIndex + 1;
      return {
        ...state,
        currentMoveIndex: next,
        attemptsOnCurrentMove: 0,
        showSolution: false,
        lastError: null,
        stats: {
          ...state.stats,
          hintedMoves: state.stats.hintedMoves + 1,
        },
        phase: phaseAfterAdvance(line, next, state.mode),
      };
    }

    case "SCHEDULE_OPPONENT":
      return { ...state, phase: "waiting-opponent" };

    case "OPPONENT_MOVE_PLAYED": {
      const line = state.queue[state.currentLineIndex];
      if (!line) return state;
      const next = state.currentMoveIndex + 1;
      return {
        ...state,
        currentMoveIndex: next,
        attemptsOnCurrentMove: 0,
        lastError: null,
        phase: phaseAfterAdvance(line, next, state.mode),
      };
    }

    case "FINISH_LEARN_LINE": {
      // Bascule LEARN → PRACTICE sur la MÊME ligne, plateau remis à l'état initial.
      const line = state.queue[state.currentLineIndex];
      if (!line) return state;
      const phase: SessionPhase =
        !isWhiteMoveIndex(0) ? "waiting-opponent" : "playing";
      return {
        ...state,
        mode: "practice",
        phase,
        currentMoveIndex: 0,
        attemptsOnCurrentMove: 0,
        showSolution: false,
        lastError: null,
        stats: { ...emptyStats(), totalUserMoves: countWhiteMoves(line) },
      };
    }

    case "NEXT_LINE": {
      const nextIndex = state.currentLineIndex + 1;
      if (nextIndex >= state.queue.length) {
        return { ...state, phase: "session-complete" };
      }
      const line = state.queue[nextIndex];
      const phase: SessionPhase =
        state.mode === "practice" && !isWhiteMoveIndex(0)
          ? "waiting-opponent"
          : "playing";
      return {
        ...state,
        currentLineIndex: nextIndex,
        currentMoveIndex: 0,
        attemptsOnCurrentMove: 0,
        showSolution: false,
        lastError: null,
        stats: { ...emptyStats(), totalUserMoves: countWhiteMoves(line) },
        phase,
      };
    }

    case "RESTART_LINE": {
      const line = state.queue[state.currentLineIndex];
      if (!line) return state;
      const phase: SessionPhase =
        state.mode === "practice" && !isWhiteMoveIndex(0)
          ? "waiting-opponent"
          : "playing";
      return {
        ...state,
        phase,
        currentMoveIndex: 0,
        attemptsOnCurrentMove: 0,
        showSolution: false,
        lastError: null,
        stats: { ...emptyStats(), totalUserMoves: countWhiteMoves(line) },
      };
    }

    case "EXIT":
      return initialState();

    default:
      return state;
  }
}

function countWhiteMoves(line: RepertoireLine): number {
  // Moves blancs = indices pairs dans line.moves.
  let n = 0;
  for (let i = 0; i < line.moves.length; i++) {
    if (isWhiteMoveIndex(i)) n++;
  }
  return n;
}

// ─────────────────────────────────────────────────────────────────────────────
// Hook principal
// ─────────────────────────────────────────────────────────────────────────────

export interface UseSessionOptions {
  /** Délai d'animation avant le coup adverse (ms). */
  opponentMoveDelayMs?: number;
}

export interface UseSessionResult {
  state: SessionState;
  currentLine: RepertoireLine | null;
  /** FEN de la position COURANTE (avant le coup d'index currentMoveIndex). */
  fen: string;
  /** Le coup attendu à jouer ensuite (null si ligne terminée). */
  expectedMove: MoveAnnotation | null;
  /** {from, to} du dernier coup joué (pour surlignage). */
  lastMove: { from: string; to: string } | null;
  /** En PRACTICE, true si c'est au joueur blanc de jouer. */
  isUserTurn: boolean;

  start(queue: RepertoireLine[], mode: SessionMode): void;
  /** Tente de jouer un coup (from/to/promotion). Retourne "ok", "wrong" ou "illegal". */
  tryUserMove(
    from: string,
    to: string,
    promotion?: string,
  ): "ok" | "wrong" | "illegal";
  advanceLearn(): void;
  finishLearnLine(): void;
  continueAfterSolution(): void;
  nextLine(): void;
  restartLine(): void;
  exit(): void;
}

export function useSession(
  options: UseSessionOptions = {},
): UseSessionResult {
  const opponentDelay = options.opponentMoveDelayMs ?? 500;
  const [state, dispatch] = useReducer(reducer, undefined, initialState);

  const currentLine =
    state.queue[state.currentLineIndex] ?? null;

  // ── Dérivation de la position à partir de (currentLine, currentMoveIndex) ──
  // On rejoue les coups [0 .. currentMoveIndex-1] pour obtenir le FEN courant.
  // `lastMove` est le coup le plus récemment joué (pour surligner from/to).
  const { fen, lastMove } = useMemo(() => {
    const chess = new Chess();
    let last: { from: string; to: string } | null = null;
    if (currentLine) {
      for (let i = 0; i < state.currentMoveIndex; i++) {
        const move = chess.move(currentLine.moves[i].san);
        if (move) last = { from: move.from, to: move.to };
      }
    }
    return { fen: chess.fen(), lastMove: last };
  }, [currentLine, state.currentMoveIndex]);

  const expectedMove: MoveAnnotation | null =
    currentLine && state.currentMoveIndex < currentLine.moves.length
      ? currentLine.moves[state.currentMoveIndex]
      : null;

  const isUserTurn =
    state.mode === "practice" &&
    state.phase === "playing" &&
    expectedMove != null &&
    isWhiteMoveIndex(state.currentMoveIndex);

  // ── Effet : jouer automatiquement un coup adverse en PRACTICE ──
  // Guard par un ref pour éviter tout double-fire (StrictMode en dev).
  const opponentTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (state.phase !== "waiting-opponent") return;
    if (opponentTimerRef.current) {
      clearTimeout(opponentTimerRef.current);
    }
    opponentTimerRef.current = setTimeout(() => {
      dispatch({ type: "OPPONENT_MOVE_PLAYED" });
      opponentTimerRef.current = null;
    }, opponentDelay);
    return () => {
      if (opponentTimerRef.current) {
        clearTimeout(opponentTimerRef.current);
        opponentTimerRef.current = null;
      }
    };
  }, [state.phase, state.currentLineIndex, state.currentMoveIndex, opponentDelay]);

  // ── Effet : fin de ligne en PRACTICE → persister la tentative ──
  // On ne persiste qu'une fois par ligne (guard par une clé).
  const persistedKeyRef = useRef<string | null>(null);
  useEffect(() => {
    if (
      state.phase === "line-complete" &&
      state.mode === "practice" &&
      currentLine
    ) {
      const key = `${currentLine.name}@${state.currentLineIndex}`;
      if (persistedKeyRef.current !== key) {
        progressStore.recordPractice(currentLine.name, state.stats);
        persistedKeyRef.current = key;
      }
    } else if (state.phase === "playing") {
      // Reset de la clé pour autoriser la prochaine persistance.
      persistedKeyRef.current = null;
    }
  }, [state.phase, state.mode, currentLine, state.currentLineIndex, state.stats]);

  // ── Actions exposées ──

  const start = useCallback(
    (queue: RepertoireLine[], mode: SessionMode) => {
      dispatch({ type: "START", queue, mode });
    },
    [],
  );

  const tryUserMove = useCallback(
    (from: string, to: string, promotion?: string): "ok" | "wrong" | "illegal" => {
      if (!currentLine) return "illegal";
      if (state.phase !== "playing") return "illegal";
      if (!expectedMove) return "illegal";

      // En LEARN, seul le coup attendu est accepté (pour avancer).
      // En PRACTICE, il faut que ce soit le tour du joueur blanc.
      if (state.mode === "practice" && !isWhiteMoveIndex(state.currentMoveIndex)) {
        return "illegal";
      }

      // Valider la légalité via chess.js sur la position courante.
      const chess = new Chess();
      for (let i = 0; i < state.currentMoveIndex; i++) {
        chess.move(currentLine.moves[i].san);
      }
      const move = chess.move({ from, to, promotion });
      if (!move) {
        // Coup illégal : on ne le compte pas comme erreur en PRACTICE,
        // c'est juste un glissé invalide. En LEARN, idem : on refuse.
        return "illegal";
      }

      const playedSan = normalizeSan(move.san);
      const expectedSan = normalizeSan(expectedMove.san);

      if (playedSan === expectedSan) {
        if (state.mode === "learn") {
          dispatch({ type: "ADVANCE_LEARN" });
        } else {
          dispatch({ type: "USER_PLAYED_CORRECT" });
        }
        return "ok";
      }

      // Coup légal mais pas le bon : en LEARN on ignore (refus), en PRACTICE on compte une erreur.
      if (state.mode === "practice") {
        dispatch({ type: "USER_PLAYED_WRONG", san: move.san });
        return "wrong";
      }
      return "illegal";
    },
    [currentLine, expectedMove, state.phase, state.mode, state.currentMoveIndex],
  );

  const advanceLearn = useCallback(() => {
    dispatch({ type: "ADVANCE_LEARN" });
  }, []);

  const finishLearnLine = useCallback(() => {
    if (currentLine) {
      progressStore.markLearned(currentLine.name);
    }
    dispatch({ type: "FINISH_LEARN_LINE" });
  }, [currentLine]);

  const continueAfterSolution = useCallback(() => {
    dispatch({ type: "CONTINUE_AFTER_SOLUTION" });
  }, []);

  const nextLine = useCallback(() => {
    dispatch({ type: "NEXT_LINE" });
  }, []);

  const restartLine = useCallback(() => {
    dispatch({ type: "RESTART_LINE" });
  }, []);

  const exit = useCallback(() => {
    dispatch({ type: "EXIT" });
  }, []);

  return {
    state,
    currentLine,
    fen,
    lastMove,
    expectedMove,
    isUserTurn,
    start,
    tryUserMove,
    advanceLearn,
    finishLearnLine,
    continueAfterSolution,
    nextLine,
    restartLine,
    exit,
  };
}
