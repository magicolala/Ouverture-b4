import type { RepertoireLine, MoveAnnotation } from "../data/repertoire";

export type SessionMode = "learn" | "practice";

/**
 * Les phases du cycle de vie d'une session d'entraînement.
 * - "playing"           : l'utilisateur est actif (LEARN : clic "suivant" / PRACTICE : doit jouer)
 * - "waiting-opponent"  : animation du coup adverse en cours, on bloque les interactions
 * - "line-complete"     : variante finie, attente d'une action utilisateur (suivant / retour)
 * - "session-complete"  : toutes les variantes de la queue sont terminées
 */
export type SessionPhase =
  | "playing"
  | "waiting-opponent"
  | "line-complete"
  | "session-complete";

export const MAX_ATTEMPTS = 3;

export interface LineStats {
  /** Coups joués correctement du premier coup, sans aide. */
  perfectMoves: number;
  /** Coups où la solution a dû être révélée (3 erreurs atteintes). */
  hintedMoves: number;
  /** Total des coups utilisateur pour la ligne (= nb de coups blancs attendus). */
  totalUserMoves: number;
}

export function emptyStats(): LineStats {
  return { perfectMoves: 0, hintedMoves: 0, totalUserMoves: 0 };
}

export interface SessionState {
  mode: SessionMode;
  phase: SessionPhase;
  /** File des lignes à parcourir dans l'ordre. */
  queue: RepertoireLine[];
  currentLineIndex: number;
  /** Index dans `line.moves` du PROCHAIN coup à afficher/jouer. */
  currentMoveIndex: number;
  /** 0 à 2. Au 3e essai raté, showSolution passe à true. */
  attemptsOnCurrentMove: number;
  showSolution: boolean;
  stats: LineStats;
  /** Dernier coup utilisateur invalide (pour feedback UI en PRACTICE). */
  lastError: string | null;
}

/** Source d'une session PRACTICE-ONLY depuis le menu. */
export type PracticeScope =
  | { kind: "line"; line: RepertoireLine }
  | { kind: "subchapter"; chapter: string; subchapter: string }
  | { kind: "chapter"; chapter: string }
  | { kind: "must-know" };

/** Progression persistée par variante. */
export interface LineProgress {
  lineName: string;
  learned: boolean;
  practiceAttempts: number;
  lastPracticeDate: string | null;
  bestScore: number;
}

/** Entrée d'une tentative PRACTICE pour mise à jour de la progression. */
export interface PracticeResult {
  perfectMoves: number;
  hintedMoves: number;
  totalUserMoves: number;
}

/** Coup "normalisé" (SAN sans annotations) pour comparaison. */
export function normalizeSan(san: string): string {
  return san.replace(/[+#!?]/g, "");
}

/** True si le coup d'index donné dans une ligne est un coup Blancs (joueur). */
export function isWhiteMoveIndex(moveIndex: number): boolean {
  return moveIndex % 2 === 0;
}

export type { RepertoireLine, MoveAnnotation };
