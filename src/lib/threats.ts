import { Chess } from "chess.js";
import type { Color, PieceSymbol, Square } from "chess.js";

/**
 * Détection statique de pièces insuffisamment protégées — inspirée de
 * la fonctionnalité « Show threat » de lichess.
 *
 * Pour chaque pièce du camp au trait, on vérifie si l'adversaire peut la
 * capturer en gagnant du matériel (Static Exchange Evaluation — SEE).
 * Si oui, on renvoie une flèche de l'attaquant le moins cher vers la victime.
 *
 * Limites connues (acceptables pour un outil d'entraînement) :
 * - pas de prise en compte des clouages / attaques à rayons X ;
 * - le roi est traité comme une pièce de valeur 1000, l'algorithme SEE
 *   peut donc autoriser une capture illégale par le roi en toute fin de
 *   séquence, mais cela n'affecte pas le résultat (le gain final reste ≤ 0
 *   pour le camp qui sacrifie son roi).
 */

const PIECE_VALUE: Record<PieceSymbol, number> = {
  p: 1,
  n: 3,
  b: 3,
  r: 5,
  q: 9,
  k: 1000,
};

export interface Threat {
  /** Case de la pièce adverse qui menace. */
  from: Square;
  /** Case de notre pièce insuffisamment protégée. */
  to: Square;
  /** Gain matériel estimé pour l'adversaire (en points de pion). */
  gain: number;
}

/**
 * Renvoie la liste des menaces pesant sur les pièces du camp au trait.
 * Une menace = l'adversaire peut capturer en gagnant du matériel via SEE.
 */
export function computeThreats(fen: string): Threat[] {
  let chess: Chess;
  try {
    chess = new Chess(fen);
  } catch {
    return [];
  }

  const us: Color = chess.turn();
  const them: Color = us === "w" ? "b" : "w";
  const threats: Threat[] = [];

  for (const row of chess.board()) {
    for (const cell of row) {
      if (!cell || cell.color !== us) continue;
      // Une menace sur le roi n'est pas une menace matérielle (c'est un échec).
      if (cell.type === "k") continue;
      const victimSq = cell.square;

      const attackers = chess.attackers(victimSq, them);
      if (attackers.length === 0) continue;

      const defenders = chess.attackers(victimSq, us);
      const gain = staticExchange(chess, victimSq, attackers, defenders);
      if (gain <= 0) continue;

      const cheapestAttacker = pickCheapestAttacker(chess, attackers);
      threats.push({ from: cheapestAttacker, to: victimSq, gain });
    }
  }
  return threats;
}

function pieceValueAt(chess: Chess, square: Square): number {
  const piece = chess.get(square);
  return piece ? PIECE_VALUE[piece.type] : 0;
}

function pickCheapestAttacker(chess: Chess, attackers: Square[]): Square {
  let best = attackers[0];
  let bestValue = pieceValueAt(chess, best);
  for (let i = 1; i < attackers.length; i++) {
    const v = pieceValueAt(chess, attackers[i]);
    if (v < bestValue) {
      bestValue = v;
      best = attackers[i];
    }
  }
  return best;
}

/**
 * Static Exchange Evaluation (gain pour l'adversaire) sur la case `target`.
 * Les listes d'attaquants/défenseurs sont prises telles quelles (sans
 * mise à jour « x-ray »).
 */
function staticExchange(
  chess: Chess,
  target: Square,
  attackers: Square[],
  defenders: Square[]
): number {
  const targetValue = pieceValueAt(chess, target);
  if (targetValue === 0) return 0;

  const atk = attackers
    .map((sq) => pieceValueAt(chess, sq))
    .sort((a, b) => a - b);
  const def = defenders
    .map((sq) => pieceValueAt(chess, sq))
    .sort((a, b) => a - b);
  if (atk.length === 0) return 0;

  // Attaquant joue la première capture ; la pièce qui se trouve alors sur
  // la case est l'attaquant le moins cher.
  const gains: number[] = [targetValue];
  let pieceOnSquareValue = atk[0];
  let ai = 1;
  let di = 0;
  let defenderMoves = true;

  while (true) {
    const hasNext = defenderMoves ? di < def.length : ai < atk.length;
    if (!hasNext) break;
    const d = gains.length;
    gains.push(pieceOnSquareValue - gains[d - 1]);
    pieceOnSquareValue = defenderMoves ? def[di++] : atk[ai++];
    defenderMoves = !defenderMoves;
  }

  for (let d = gains.length - 1; d > 0; d--) {
    gains[d - 1] = -Math.max(-gains[d - 1], gains[d]);
  }
  return gains[0];
}
