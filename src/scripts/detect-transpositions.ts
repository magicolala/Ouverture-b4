/**
 * Script to detect transpositions across all repertoire lines.
 * Run with: npx tsx src/scripts/detect-transpositions.ts
 */
import { Chess } from "chess.js";
import { REPERTOIRE } from "../data/repertoire";

interface PositionInfo {
  lineName: string;
  lineChapter: string;
  lineSubchapter: string;
  moveIndex: number; // 0-based: position AFTER playing move at this index
  moveSan: string;
}

// Build a map: FEN (without move counters) → list of lines reaching that position
const fenMap = new Map<string, PositionInfo[]>();

for (const line of REPERTOIRE) {
  const chess = new Chess();
  for (let i = 0; i < line.moves.length; i++) {
    try {
      chess.move(line.moves[i].san);
    } catch {
      console.warn(`Illegal move in "${line.name}" at index ${i}: ${line.moves[i].san}`);
      break;
    }
    // Normalize FEN: strip halfmove clock and fullmove number for comparison
    const fen = chess.fen().split(" ").slice(0, 4).join(" ");
    
    if (!fenMap.has(fen)) fenMap.set(fen, []);
    fenMap.get(fen)!.push({
      lineName: line.name,
      lineChapter: line.chapter,
      lineSubchapter: line.subchapter,
      moveIndex: i,
      moveSan: line.moves[i].san,
    });
  }
}

// Find positions shared across DIFFERENT chapters (true transpositions)
console.log("=".repeat(80));
console.log("TRANSPOSITIONS INTER-CHAPITRES");
console.log("Positions atteintes par des lignes de chapitres différents");
console.log("=".repeat(80));

const crossChapterFens: [string, PositionInfo[]][] = [];

for (const [fen, infos] of fenMap) {
  const chapters = new Set(infos.map((i) => i.lineChapter));
  if (chapters.size >= 2) {
    crossChapterFens.push([fen, infos]);
  }
}

// Deduplicate: only show the LAST shared position (deepest transposition)
// Group by pair of chapters
const chapterPairs = new Map<string, { fen: string; infos: PositionInfo[]; depth: number }>();

for (const [fen, infos] of crossChapterFens) {
  const chapters = [...new Set(infos.map((i) => i.lineChapter))].sort();
  for (let a = 0; a < chapters.length; a++) {
    for (let b = a + 1; b < chapters.length; b++) {
      const key = `${chapters[a]}↔${chapters[b]}`;
      const relevant = infos.filter(
        (i) => i.lineChapter === chapters[a] || i.lineChapter === chapters[b]
      );
      const maxDepth = Math.max(...relevant.map((i) => i.moveIndex));
      const existing = chapterPairs.get(key);
      if (!existing || maxDepth > existing.depth) {
        chapterPairs.set(key, { fen, infos: relevant, depth: maxDepth });
      }
    }
  }
}

// Now also find all individual transposition points
console.log("\n");
for (const [fen, infos] of crossChapterFens) {
  const chapters = [...new Set(infos.map((i) => i.lineChapter))];
  if (chapters.length < 2) continue;
  
  // Only show if this is a "leaf" position (no deeper shared position in the same set of lines)
  const lineNames = new Set(infos.map((i) => i.lineName));
  const hasDeeper = [...fenMap.entries()].some(([otherFen, otherInfos]) => {
    if (otherFen === fen) return false;
    const otherNames = new Set(otherInfos.map((i) => i.lineName));
    // Check if same lines share a deeper position
    const overlap = [...lineNames].filter((n) => otherNames.has(n));
    if (overlap.length < 2) return false;
    const otherChapters = new Set(
      otherInfos.filter((i) => lineNames.has(i.lineName)).map((i) => i.lineChapter)
    );
    return otherChapters.size >= 2 && Math.min(...otherInfos.map((i) => i.moveIndex)) > Math.min(...infos.map((i) => i.moveIndex));
  });
  
  if (hasDeeper) continue;

  console.log(`\n📍 Position après: ${infos[0].moveSan} (FEN: ${fen})`);
  for (const info of infos) {
    const moveNum = Math.floor(info.moveIndex / 2) + 1;
    const side = info.moveIndex % 2 === 0 ? "." : "...";
    console.log(
      `   [${info.lineChapter}/${info.lineSubchapter}] "${info.lineName}" — coup ${moveNum}${side}${info.moveSan} (idx ${info.moveIndex})`
    );
  }
}

// Also detect EXACT same final position across lines in the SAME chapter
console.log("\n\n");
console.log("=".repeat(80));
console.log("TRANSPOSITIONS INTRA-CHAPITRE");
console.log("Lignes du même chapitre atteignant la même position finale");
console.log("=".repeat(80));

// Group by line's final FEN
const finalFens = new Map<string, { lineName: string; chapter: string; subchapter: string; moveCount: number }[]>();

for (const line of REPERTOIRE) {
  const chess = new Chess();
  let valid = true;
  for (const move of line.moves) {
    try { chess.move(move.san); } catch { valid = false; break; }
  }
  if (!valid) continue;
  const fen = chess.fen().split(" ").slice(0, 4).join(" ");
  if (!finalFens.has(fen)) finalFens.set(fen, []);
  finalFens.get(fen)!.push({
    lineName: line.name,
    chapter: line.chapter,
    subchapter: line.subchapter,
    moveCount: line.moves.length,
  });
}

for (const [fen, lines] of finalFens) {
  if (lines.length < 2) continue;
  console.log(`\n📍 Position finale partagée:`);
  for (const l of lines) {
    console.log(`   [${l.chapter}/${l.subchapter}] "${l.lineName}" (${l.moveCount} coups)`);
  }
}

console.log("\n\nDone.");
