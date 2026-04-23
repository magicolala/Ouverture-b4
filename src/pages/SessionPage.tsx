import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Chess } from "chess.js";
import { computeThreats } from "../lib/threats";
import { ChessboardPanel } from "../components/ChessboardPanel";
import { LearnPanel } from "../components/LearnPanel";
import { PracticePanel } from "../components/PracticePanel";
import { SessionComplete } from "../components/SessionComplete";
import { playMoveSound, playErrorSound, playSuccessSound } from "../lib/sounds";

// We need to type the session prop. We can use the return type of useSession.
// Since it's a custom hook, we can extract its return type or just use `any` for simplicity if types aren't exported.
// Let's assume `ReturnType<typeof useSession>` is available if we import `useSession`, but we can also just use `any` or generic.
import { useSession } from "../engine/useSession";
import { REPERTOIRE } from "../data/repertoire";

interface SessionPageProps {
  session: ReturnType<typeof useSession>;
  onExit: () => void;
}

export function SessionPage({ session, onExit }: SessionPageProps) {
  const { state, currentLine, fen, lastMove, expectedMove } = session;
  const [showThreats, setShowThreats] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  // Load from URL on mount
  useEffect(() => {
    if (state.queue.length === 0) {
      const chapterId = searchParams.get("chapterId");
      const lineName = searchParams.get("lineName");
      const mode = (searchParams.get("mode") as any) || "learn";
      const moveIndexStr = searchParams.get("move");
      const moveIndex = moveIndexStr ? parseInt(moveIndexStr, 10) : 0;
      
      if (lineName) {
        const line = REPERTOIRE.find((l) => l.name === lineName);
        if (line) {
          session.start([line], mode, moveIndex);
        }
      } else if (chapterId) {
        const lines = REPERTOIRE.filter((l) => l.chapter === chapterId);
        if (lines.length > 0) {
          session.start(lines, mode);
        }
      }
    }
  }, [searchParams, state.queue.length, session]);

  // Sync state to URL
  useEffect(() => {
    if (state.queue.length > 0 && currentLine) {
      const params: any = { 
        lineName: currentLine.name,
        mode: state.mode 
      };
      if (state.currentMoveIndex > 0) {
        params.move = state.currentMoveIndex.toString();
      }
      
      // Only update if different
      const currentLineInUrl = searchParams.get("lineName");
      const currentMoveInUrl = searchParams.get("move") || "0";
      const currentModeInUrl = searchParams.get("mode");
      
      if (
        currentLineInUrl !== params.lineName || 
        currentMoveInUrl !== (params.move || "0") ||
        currentModeInUrl !== params.mode
      ) {
        setSearchParams(params, { replace: true });
      }
    }
  }, [currentLine, state.mode, state.currentMoveIndex, state.queue.length, setSearchParams, searchParams]);

  // Sons sur changements d'état.
  useEffect(() => {
    if (state.phase === "line-complete" && state.mode === "practice") {
      playSuccessSound();
    }
  }, [state.phase, state.mode]);

  // Raccourci clavier « X » pour basculer l'affichage des menaces.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "x" && e.key !== "X") return;
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      setShowThreats((v) => !v);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const showCompleteScreen =
    state.phase === "line-complete" && state.mode === "practice";
  const showSessionCompleteScreen =
    state.phase === "session-complete" && state.queue.length > 0;
  const hasNextLineInQueue = state.currentLineIndex + 1 < state.queue.length;

  // En PRACTICE, annotations masquées tant que l'utilisateur cherche.
  const showAnnotations = state.mode === "learn" || state.showSolution;

  // Flèches rouges pour les pièces insuffisamment protégées (« show threat »).
  const threatArrows = useMemo(() => {
    if (!showThreats) return [];
    return computeThreats(fen).map((t) => ({
      from: t.from,
      to: t.to,
      color: "red" as const,
    }));
  }, [showThreats, fen]);

  // Flèche jaune auto-générée pour le coup à jouer (from→to) + flèches de menace.
  const arrowsToShow = useMemo(() => {
    const arrows: { from: string; to: string; color?: string }[] = [];
    if (showAnnotations && expectedMove) {
      try {
        const chess = new Chess(fen);
        const move = chess.move(expectedMove.san);
        if (move) {
          arrows.push({ from: move.from, to: move.to, color: "yellow" });
        }
      } catch {
        // FEN invalide ou coup illégal : on ne montre pas de flèche.
      }
    }
    arrows.push(...threatArrows);
    return arrows.length > 0 ? arrows : undefined;
  }, [showAnnotations, expectedMove, fen, threatArrows]);
  const circlesToShow = showAnnotations ? expectedMove?.circles : undefined;

  const handleMove = ({
    from,
    to,
    promotion,
  }: {
    from: string;
    to: string;
    promotion?: string;
  }): boolean => {
    const result = session.tryUserMove(from, to, promotion);
    if (result === "ok") {
      playMoveSound();
      return true;
    }
    if (result === "wrong") {
      playErrorSound();
      return false;
    }
    return false;
  };

  if (!currentLine || state.queue.length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-4 flex justify-center items-center h-screen">
        <p>Aucune session en cours.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 sm:gap-8 items-center lg:items-start">
        {/* Board Column */}
        <div className="flex-1 flex flex-col items-center">
          <div className="wero-card p-2 sm:p-4 bg-white border-[3px] sm:border-[4px] w-full max-w-[500px] lg:max-w-none">
            <ChessboardPanel
              fen={fen}
              arrows={arrowsToShow}
              circles={circlesToShow}
              lastMove={lastMove}
              orientation="white"
              disabled={
                state.phase === "waiting-opponent" ||
                state.phase === "line-complete" ||
                state.phase === "session-complete" ||
                state.showSolution
              }
              onMove={handleMove}
            />
          </div>
          
          <div className="mt-6 sm:mt-8 flex flex-row sm:flex-col items-center gap-3 sm:gap-4 w-full justify-center">
            <div className="flex items-center gap-3 bg-black text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border-[2px] sm:border-[3px] border-black shadow-[3px_3px_0_0_#ccc] sm:shadow-[4px_4px_0_0_#ccc]">
              <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest opacity-60">Ligne</span>
              <span className="text-xs sm:text-sm font-black italic">{state.currentLineIndex + 1} / {state.queue.length}</span>
            </div>
            
            <button
              type="button"
              onClick={() => setShowThreats((v) => !v)}
              className={`wero-button !py-1.5 sm:!py-3 !text-[10px] sm:!text-xs ${showThreats ? 'bg-wero-salmon text-white' : 'bg-white'}`}
            >
              {showThreats ? "⚠ Threats ON" : "⚠ Show Threats"}
            </button>
          </div>
        </div>

        {/* Action Sidebar */}
        <aside className="w-full lg:w-[460px] flex flex-col gap-6">
          {showSessionCompleteScreen && (
            <SessionComplete
              mode={state.mode}
              line={currentLine}
              stats={state.stats}
              hasNextLine={false}
              onNextLine={() => {}}
              onRestart={session.restartLine}
              onExit={onExit}
            />
          )}

          {!showSessionCompleteScreen && showCompleteScreen && (
            <SessionComplete
              mode={state.mode}
              line={currentLine}
              stats={state.stats}
              hasNextLine={hasNextLineInQueue}
              onNextLine={session.nextLine}
              onRestart={session.restartLine}
              onExit={onExit}
            />
          )}

          {!showCompleteScreen && !showSessionCompleteScreen && state.mode === "learn" && (
            <LearnPanel
              line={currentLine}
              currentMoveIndex={state.currentMoveIndex}
              fen={fen}
              expectedMove={expectedMove}
              isLineComplete={state.phase === "line-complete"}
              onAdvance={session.advanceLearn}
              onFinishLine={session.finishLearnLine}
              onExit={onExit}
            />
          )}

          {!showCompleteScreen && !showSessionCompleteScreen && state.mode === "practice" && (
            <PracticePanel
              line={currentLine}
              currentMoveIndex={state.currentMoveIndex}
              expectedMove={expectedMove}
              attemptsOnCurrentMove={state.attemptsOnCurrentMove}
              showSolution={state.showSolution}
              lastError={state.lastError}
              isUserTurn={session.isUserTurn}
              isWaitingOpponent={state.phase === "waiting-opponent"}
              onContinueAfterSolution={session.continueAfterSolution}
              onRestart={session.restartLine}
              onExit={onExit}
            />
          )}
        </aside>
      </div>
    </div>
  );
}

