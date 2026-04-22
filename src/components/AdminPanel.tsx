import { useState, useMemo, useCallback } from "react";
import { Chess } from "chess.js";
import { REPERTOIRE, CHAPTERS, getLinesBySubchapter } from "../data/repertoire";
import type { MoveAnnotation, RepertoireLine, ChapterId } from "../data/repertoire";
import { Board } from "./Board";

// ── Types ───────────────────────────────────────────────────────────────────

interface EditableLine extends RepertoireLine {
  _dirty?: boolean;
}

const DRAW_COLORS = ["green", "red", "yellow", "blue"] as const;
type DrawColor = (typeof DRAW_COLORS)[number];

const COLOR_CSS: Record<string, string> = {
  green: "#15803d", red: "#dc2626", yellow: "#eab308", blue: "#2563eb",
};

function deepCloneLines(lines: RepertoireLine[]): EditableLine[] {
  return JSON.parse(JSON.stringify(lines));
}

function movesToCode(moves: MoveAnnotation[]): string {
  return moves
    .map((m) => {
      const parts: string[] = [`san: "${m.san}"`];
      if (m.comment) parts.push(`comment: ${JSON.stringify(m.comment)}`);
      if (m.arrows && m.arrows.length > 0) parts.push(`arrows: ${JSON.stringify(m.arrows)}`);
      if (m.circles && m.circles.length > 0) parts.push(`circles: ${JSON.stringify(m.circles)}`);
      return `      { ${parts.join(", ")} }`;
    })
    .join(",\n");
}

// ── Component ───────────────────────────────────────────────────────────────

interface AdminPanelProps { onExit: () => void; }

export function AdminPanel({ onExit }: AdminPanelProps) {
  const [lines, setLines] = useState<EditableLine[]>(() => deepCloneLines(REPERTOIRE));
  const [selectedLineIdx, setSelectedLineIdx] = useState<number | null>(null);
  const [moveIdx, setMoveIdx] = useState(0);
  const [openChapter, setOpenChapter] = useState<ChapterId | null>("e5");
  const [exportText, setExportText] = useState<string | null>(null);
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [drawColor, setDrawColor] = useState<DrawColor>("green");
  const [drawMode, setDrawMode] = useState<"arrow" | "circle">("arrow");

  const selectedLine = selectedLineIdx !== null ? lines[selectedLineIdx] : null;
  const currentMove = selectedLine && moveIdx < selectedLine.moves.length
    ? selectedLine.moves[moveIdx] : null;

  const getLineIndex = useCallback(
    (line: RepertoireLine) => lines.findIndex((l) => l.name === line.name && l.chapter === line.chapter),
    [lines],
  );

  // Build a Chess instance replaying moves up to moveIdx
  const game = useMemo(() => {
    const chess = new Chess();
    if (selectedLine) {
      for (let i = 0; i < moveIdx; i++) {
        try { chess.move(selectedLine.moves[i].san); } catch { break; }
      }
    }
    return chess;
  }, [selectedLine, moveIdx]);

  const lastPlayedMove = useMemo(() => {
    if (!selectedLine || moveIdx === 0) return null;
    const chess = new Chess();
    let last: { from: string; to: string } | null = null;
    for (let i = 0; i < moveIdx; i++) {
      try {
        const m = chess.move(selectedLine.moves[i].san);
        if (m) last = { from: m.from, to: m.to };
      } catch { break; }
    }
    return last;
  }, [selectedLine, moveIdx]);

  // ── Mutation helpers ──

  const updateCurrentMove = useCallback(
    (updater: (m: MoveAnnotation) => MoveAnnotation) => {
      if (selectedLineIdx === null) return;
      setLines((prev) => {
        const next = [...prev];
        const line = { ...next[selectedLineIdx] };
        const moves = [...line.moves];
        moves[moveIdx] = updater({ ...moves[moveIdx] });
        line.moves = moves;
        line._dirty = true;
        next[selectedLineIdx] = line;
        return next;
      });
    },
    [selectedLineIdx, moveIdx],
  );

  // Called by Board's right-click: if from !== to → arrow, if from === to → circle
  const handleRightClickShape = useCallback(
    (from: string, to: string) => {
      if (from === to) {
        // Toggle circle on this square
        updateCurrentMove((m) => {
          const circles = [...(m.circles || [])];
          const existIdx = circles.findIndex((c) => c.square === from);
          if (existIdx >= 0) {
            circles.splice(existIdx, 1);
          } else {
            circles.push({ square: from, color: drawColor });
          }
          return { ...m, circles };
        });
      } else {
        // Toggle arrow
        updateCurrentMove((m) => {
          const arrows = [...(m.arrows || [])];
          const existIdx = arrows.findIndex((a) => a.from === from && a.to === to);
          if (existIdx >= 0) {
            arrows.splice(existIdx, 1);
          } else {
            arrows.push({ from, to, color: drawColor });
          }
          return { ...m, arrows };
        });
      }
    },
    [drawColor, updateCurrentMove],
  );

  const clearShapes = () => {
    updateCurrentMove((m) => ({ ...m, arrows: [], circles: [] }));
  };

  // ── Navigation ──

  const goTo = (idx: number) => {
    if (!selectedLine) return;
    setMoveIdx(Math.max(0, Math.min(idx, selectedLine.moves.length)));
  };

  // ── Export ──

  const handleExport = () => {
    const dirtyLines = lines.filter((l) => l._dirty);
    if (dirtyLines.length === 0) { setExportText("// Aucune modification."); return; }
    const output = dirtyLines
      .map((line) =>
        [
          `  {`,
          `    name: ${JSON.stringify(line.name)},`,
          `    category: ${JSON.stringify(line.category)},`,
          `    chapter: ${JSON.stringify(line.chapter)},`,
          `    subchapter: ${JSON.stringify(line.subchapter)},`,
          `    priority: ${JSON.stringify(line.priority)},`,
          line.description ? `    description: ${JSON.stringify(line.description)},` : null,
          `    moves: [\n${movesToCode(line.moves)}\n    ]`,
          `  },`,
        ].filter(Boolean).join("\n"),
      )
      .join("\n\n");
    setExportText(output);
  };

  const handleCopy = async () => {
    if (!exportText) return;
    try { await navigator.clipboard.writeText(exportText); } catch {
      const ta = document.createElement("textarea");
      ta.value = exportText; document.body.appendChild(ta); ta.select();
      document.execCommand("copy"); document.body.removeChild(ta);
    }
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  // ── Move label ──
  const moveLabel = (idx: number, san: string) => {
    const n = Math.floor(idx / 2) + 1;
    return idx % 2 === 0 ? `${n}. ${san}` : `${n}… ${san}`;
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#1a1a2e] text-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-[#16213e] border-b border-gray-700 px-4 py-3 flex items-center justify-between shadow-lg flex-shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-xl">⚙️</span>
          <h1 className="text-lg font-bold">Admin — Éditeur de répertoire</h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleExport} className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 transition">
            📦 Exporter
          </button>
          <button onClick={onExit} className="px-4 py-2 rounded-lg bg-gray-700 text-gray-200 text-sm hover:bg-gray-600 transition">
            ← Retour
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-[280px] border-r border-gray-700 overflow-y-auto bg-[#16213e] flex-shrink-0">
          {CHAPTERS.map((ch) => {
            const isOpen = openChapter === ch.id;
            return (
              <div key={ch.id}>
                <button onClick={() => setOpenChapter(isOpen ? null : ch.id)}
                  className="w-full text-left px-3 py-2 font-bold text-xs bg-[#0f3460] hover:bg-[#1a4a80] border-b border-gray-700 flex justify-between">
                  <span>{ch.title}</span><span>{isOpen ? "▾" : "▸"}</span>
                </button>
                {isOpen && ch.subchapters.map((sub) => {
                  const subLines = getLinesBySubchapter(ch.id, sub.id);
                  if (subLines.length === 0) return null;
                  return (
                    <div key={sub.id}>
                      <div className="px-3 py-1 text-[10px] text-gray-500 uppercase tracking-wider bg-[#1a1a2e]">{sub.title}</div>
                      {subLines.map((orig) => {
                        const idx = getLineIndex(orig);
                        const line = lines[idx];
                        if (!line) return null;
                        return (
                          <button key={line.name}
                            onClick={() => { setSelectedLineIdx(idx); setMoveIdx(0); setExportText(null); }}
                            className={`w-full text-left px-3 py-1.5 text-xs border-b border-gray-800 transition truncate ${selectedLineIdx === idx ? "bg-[#e94560] text-white" : "hover:bg-[#222244] text-gray-300"}`}>
                            {line._dirty && <span className="text-yellow-400 mr-1">●</span>}
                            {line.name}
                          </button>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </aside>

        {/* Main */}
        <main className="flex-1 overflow-y-auto p-4">
          {/* Export view */}
          {exportText && (
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-emerald-400">📦 Export</h2>
                <div className="flex gap-2">
                  <button onClick={handleCopy} className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700">
                    {copyFeedback ? "✓ Copié !" : "📋 Copier"}
                  </button>
                  <button onClick={() => setExportText(null)} className="px-3 py-2 rounded-lg bg-gray-700 text-sm hover:bg-gray-600">✕</button>
                </div>
              </div>
              <pre className="bg-[#0d1117] border border-gray-700 rounded-xl p-4 text-xs font-mono text-green-300 overflow-auto max-h-[70vh] whitespace-pre-wrap">{exportText}</pre>
              <p className="text-xs text-gray-500 mt-2">Copie ce code dans <code className="text-gray-400">src/data/repertoire.ts</code>.</p>
            </div>
          )}

          {/* No selection */}
          {!selectedLine && !exportText && (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <div className="text-5xl mb-4">♟️</div>
                <p>Sélectionne une ligne à gauche pour l'éditer.</p>
              </div>
            </div>
          )}

          {/* Editor */}
          {selectedLine && !exportText && (
            <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-6">
              {/* Left: Board + controls */}
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-bold mb-1">{selectedLine.name}</h2>
                <p className="text-xs text-gray-500 mb-3">{selectedLine.description || ""}</p>

                {/* Board */}
                <div className="max-w-[480px]">
                  <AdminBoard
                    game={game}
                    lastMove={lastPlayedMove}
                    arrows={currentMove?.arrows}
                    circles={currentMove?.circles}
                    onShape={handleRightClickShape}
                  />
                </div>

                {/* Navigation */}
                <div className="flex items-center gap-2 mt-3 max-w-[480px]">
                  <button onClick={() => goTo(0)} className="px-3 py-1.5 rounded bg-gray-700 text-sm hover:bg-gray-600" title="Début">⏮</button>
                  <button onClick={() => goTo(moveIdx - 1)} className="px-3 py-1.5 rounded bg-gray-700 text-sm hover:bg-gray-600">◀</button>
                  <div className="flex-1 text-center text-sm text-gray-400">
                    {moveIdx === 0 ? "Position initiale" : moveLabel(moveIdx - 1, selectedLine.moves[moveIdx - 1]?.san || "")}
                    <span className="text-gray-600 mx-1">·</span>
                    coup {moveIdx}/{selectedLine.moves.length}
                  </div>
                  <button onClick={() => goTo(moveIdx + 1)} className="px-3 py-1.5 rounded bg-gray-700 text-sm hover:bg-gray-600">▶</button>
                  <button onClick={() => goTo(selectedLine.moves.length)} className="px-3 py-1.5 rounded bg-gray-700 text-sm hover:bg-gray-600" title="Fin">⏭</button>
                </div>

                {/* Move list */}
                <div className="flex flex-wrap gap-1 mt-3 max-w-[480px]">
                  {selectedLine.moves.map((m, i) => (
                    <button key={i} onClick={() => goTo(i)}
                      className={`px-2 py-0.5 rounded text-xs font-mono transition ${i === moveIdx ? "bg-[#e94560] text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"}`}>
                      {moveLabel(i, m.san)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right: editing panel */}
              <div className="w-full lg:w-[340px] flex-shrink-0 flex flex-col gap-4">
                {moveIdx < selectedLine.moves.length && currentMove ? (
                  <>
                    {/* Current move */}
                    <div className="bg-[#16213e] rounded-xl border border-gray-700 p-4">
                      <div className="text-lg font-bold font-mono mb-2">
                        {moveLabel(moveIdx, currentMove.san)}
                      </div>

                      {/* Draw color selector */}
                      <div className="mb-3">
                        <label className="text-xs font-semibold text-gray-400 block mb-1">🎨 Couleur de dessin (clic droit)</label>
                        <div className="flex gap-2">
                          {DRAW_COLORS.map((c) => (
                            <button key={c} onClick={() => setDrawColor(c)}
                              className={`w-8 h-8 rounded-full border-3 transition ${drawColor === c ? "border-white scale-110 shadow-lg" : "border-gray-600 opacity-50 hover:opacity-80"}`}
                              style={{ backgroundColor: COLOR_CSS[c] }} title={c} />
                          ))}
                        </div>
                        <p className="text-[10px] text-gray-500 mt-1">
                          Clic droit + glisser = flèche · Clic droit seul = cercle
                        </p>
                      </div>

                      {/* Shapes summary */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-gray-400">
                            🏹 {(currentMove.arrows || []).length} flèche(s) · ⭕ {(currentMove.circles || []).length} cercle(s)
                          </span>
                          <button onClick={clearShapes} className="text-[10px] px-2 py-0.5 rounded bg-red-900 text-red-300 hover:bg-red-800">
                            Tout effacer
                          </button>
                        </div>
                        {/* List arrows */}
                        {(currentMove.arrows || []).map((a, i) => (
                          <div key={`a${i}`} className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                            <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: COLOR_CSS[a.color || "green"] }} />
                            <span className="font-mono">{a.from}→{a.to}</span>
                            <button onClick={() => updateCurrentMove((m) => ({ ...m, arrows: (m.arrows || []).filter((_, j) => j !== i) }))}
                              className="text-red-500 hover:text-red-400 ml-1">✕</button>
                          </div>
                        ))}
                        {/* List circles */}
                        {(currentMove.circles || []).map((c, i) => (
                          <div key={`c${i}`} className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                            <span className="w-3 h-3 rounded-full border-2 inline-block" style={{ borderColor: COLOR_CSS[c.color || "green"] }} />
                            <span className="font-mono">{c.square}</span>
                            <button onClick={() => updateCurrentMove((m) => ({ ...m, circles: (m.circles || []).filter((_, j) => j !== i) }))}
                              className="text-red-500 hover:text-red-400 ml-1">✕</button>
                          </div>
                        ))}
                      </div>

                      {/* Comment */}
                      <div>
                        <label className="text-xs font-semibold text-gray-400 block mb-1">💬 Commentaire</label>
                        <textarea
                          value={currentMove.comment || ""}
                          onChange={(e) => updateCurrentMove((m) => ({ ...m, comment: e.target.value || undefined }))}
                          rows={4}
                          className="w-full bg-[#0d1117] border border-gray-600 rounded-lg p-2 text-sm text-gray-200 focus:border-blue-500 focus:outline-none resize-y"
                          placeholder="Pas de commentaire" />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="bg-[#16213e] rounded-xl border border-gray-700 p-4 text-center text-gray-500">
                    {moveIdx >= (selectedLine?.moves.length || 0)
                      ? "Fin de la variante. Reviens en arrière pour éditer."
                      : "Sélectionne un coup."}
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// ── Admin Board wrapper ─────────────────────────────────────────────────────
// Wraps the existing Board component but intercepts right-click to save shapes.

interface AdminBoardProps {
  game: Chess;
  lastMove: { from: string; to: string } | null;
  arrows?: MoveAnnotation["arrows"];
  circles?: MoveAnnotation["circles"];
  onShape: (from: string, to: string) => void;
}

function AdminBoard({ game, lastMove, arrows, circles, onShape }: AdminBoardProps) {
  const [dragStart, setDragStart] = useState<string | null>(null);

  const handleSquareClick = () => {
    // Left click: nothing special in admin
  };

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      onPointerDown={(e) => {
        if (e.button !== 2) return;
        // Find which square was clicked
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const sq = coordsToSquare(x, y, rect.width, rect.height);
        if (sq) setDragStart(sq);
      }}
      onPointerUp={(e) => {
        if (dragStart === null) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const sq = coordsToSquare(x, y, rect.width, rect.height);
        if (sq) onShape(dragStart, sq);
        setDragStart(null);
      }}
    >
      <Board
        game={game}
        orientation="white"
        lastMove={lastMove}
        annotations={{ arrows, circles }}
        onSquareClick={handleSquareClick}
      />
    </div>
  );
}

function coordsToSquare(x: number, y: number, w: number, h: number): string | null {
  const files = "abcdefgh";
  const ranks = "87654321";
  const f = Math.floor((x / w) * 8);
  const r = Math.floor((y / h) * 8);
  if (f < 0 || f > 7 || r < 0 || r > 7) return null;
  return files[f] + ranks[r];
}
