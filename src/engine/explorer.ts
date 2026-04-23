import { Chess } from "chess.js";
import type { RepertoireLine } from "../data/repertoire";
import { CHAPTERS } from "../data/repertoire";

// Normalizes FEN to compare positions without move numbers or half-move clocks.
// Format: pieces active_color castling en_passant
export function normalizeFen(fen: string): string {
  return fen.split(" ").slice(0, 4).join(" ");
}

export interface ExplorerOccurrence {
  chapterId: string;
  subchapterId: string;
  lineName: string;
  comment?: string;
  moveSan?: string; // The move that led to this position
  circles?: any[];
  arrows?: any[];
}

export interface ExplorerNode {
  fen: string; // normalized fen
  occurrences: ExplorerOccurrence[];
  nextMoves: Record<string, { san: string; toFen: string }>;
}

export function buildExplorerTree(
  repertoire: RepertoireLine[]
): Map<string, ExplorerNode> {
  const tree = new Map<string, ExplorerNode>();

  const getOrCreateNode = (fen: string) => {
    let node = tree.get(fen);
    if (!node) {
      node = { fen, occurrences: [], nextMoves: {} };
      tree.set(fen, node);
    }
    return node;
  };

  const rootFen = normalizeFen(new Chess().fen());
  getOrCreateNode(rootFen);

  for (const line of repertoire) {
    const chess = new Chess();

    for (const move of line.moves) {
      const fromFen = normalizeFen(chess.fen());

      let played: any = null;
      try {
        // @ts-ignore
        played = chess.move(move.san, { sloppy: true });
      } catch (e) {
        played = null;
      }
      if (!played) {
        try {
          played = chess.move(move.san);
        } catch (e) {
          played = null;
        }
      }

      if (!played) break; // illegal move in repertoire, skip the rest

      const toFen = normalizeFen(chess.fen());

      // Update fromNode nextMoves
      const fromNode = getOrCreateNode(fromFen);
      if (!fromNode.nextMoves[played.san]) {
        fromNode.nextMoves[played.san] = { san: played.san, toFen };
      }

      // Update toNode occurrences
      const toNode = getOrCreateNode(toFen);
      const existingOcc = toNode.occurrences.find(
        (o) => o.lineName === line.name
      );
      if (!existingOcc) {
        toNode.occurrences.push({
          chapterId: line.chapter,
          subchapterId: line.subchapter,
          lineName: line.name,
          comment: move.comment,
          moveSan: played.san,
          circles: move.circles,
          arrows: move.arrows,
        });
      }
    }
  }

  return tree;
}

export function getChapterTitle(chapterId: string): string {
  return CHAPTERS.find((c) => c.id === chapterId)?.title || chapterId;
}

export function getSubchapterTitle(
  chapterId: string,
  subchapterId: string
): string {
  const chapter = CHAPTERS.find((c) => c.id === chapterId);
  if (!chapter) return subchapterId;
  return (
    chapter.subchapters.find((s) => s.id === subchapterId)?.title ||
    subchapterId
  );
}
