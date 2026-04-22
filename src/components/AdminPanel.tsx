import { useState, useMemo, useCallback } from "react";
import { Chess } from "chess.js";
import {
  REPERTOIRE,
  CHAPTERS,
  getLinesBySubchapter,
} from "../data/repertoire";
import type {
  MoveAnnotation,
  RepertoireLine,
  ChapterId,
} from "../data/repertoire";

// ── Types internes ──────────────────────────────────────────────────────────

interface EditableLine extends RepertoireLine {
  _dirty?: boolean;
}

const ARROW_COLORS = ["green", "red", "yellow", "blue"] as const;
const CIRCLE_COLORS = ["green", "red", "yellow", "blue"] as const;

const COLOR_CSS: Record<string, string> = {
  green: "#15803d",
  red: "#dc2626",
  yellow: "#eab308",
  blue: "#2563eb",
};

const SQUARES = (() => {
  const files = "abcdefgh";
  const ranks = "12345678";
  const sq: string[] = [];
  for (const f of files) for (const r of ranks) sq.push(f + r);
  return sq;
})();

// ── Helpers ─────────────────────────────────────────────────────────────────

function deepCloneLines(lines: RepertoireLine[]): EditableLine[] {
  return JSON.parse(JSON.stringify(lines));
}

/** Generate the export string for a single line's moves array. */
function movesToCode(moves: MoveAnnotation[]): string {
  return moves
    .map((m) => {
      const parts: string[] = [`san: "${m.san}"`];
      if (m.comment) parts.push(`comment: ${JSON.stringify(m.comment)}`);
      if (m.arrows && m.arrows.length > 0)
        parts.push(`arrows: ${JSON.stringify(m.arrows)}`);
      if (m.circles && m.circles.length > 0)
        parts.push(`circles: ${JSON.stringify(m.circles)}`);
      return `      { ${parts.join(", ")} }`;
    })
    .join(",\n");
}

// ── Component ───────────────────────────────────────────────────────────────

interface AdminPanelProps {
  onExit: () => void;
}

export function AdminPanel({ onExit }: AdminPanelProps) {
  const [lines, setLines] = useState<EditableLine[]>(() =>
    deepCloneLines(REPERTOIRE),
  );
  const [selectedLineIdx, setSelectedLineIdx] = useState<number | null>(null);
  const [openChapter, setOpenChapter] = useState<ChapterId | null>("e5");
  const [exportText, setExportText] = useState<string | null>(null);
  const [copyFeedback, setCopyFeedback] = useState(false);

  // ── Line selection ──

  const selectedLine = selectedLineIdx !== null ? lines[selectedLineIdx] : null;

  const getLineIndex = useCallback(
    (line: RepertoireLine) => {
      return lines.findIndex(
        (l) => l.name === line.name && l.chapter === line.chapter,
      );
    },
    [lines],
  );

  // ── Compute FEN for each move index in the selected line ──

  const fens = useMemo(() => {
    if (!selectedLine) return [];
    const chess = new Chess();
    const result: string[] = [chess.fen()];
    for (const move of selectedLine.moves) {
      try {
        chess.move(move.san);
        result.push(chess.fen());
      } catch {
        result.push(chess.fen());
      }
    }
    return result;
  }, [selectedLine]);

  // ── Mutation helpers ──

  const updateMove = useCallback(
    (moveIdx: number, updater: (m: MoveAnnotation) => MoveAnnotation) => {
      setLines((prev) => {
        if (selectedLineIdx === null) return prev;
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
    [selectedLineIdx],
  );

  // ── Arrow mutations ──

  const addArrow = (moveIdx: number) => {
    updateMove(moveIdx, (m) => ({
      ...m,
      arrows: [...(m.arrows || []), { from: "e2", to: "e4", color: "green" }],
    }));
  };

  const removeArrow = (moveIdx: number, arrowIdx: number) => {
    updateMove(moveIdx, (m) => ({
      ...m,
      arrows: (m.arrows || []).filter((_, i) => i !== arrowIdx),
    }));
  };

  const updateArrow = (
    moveIdx: number,
    arrowIdx: number,
    field: "from" | "to" | "color",
    value: string,
  ) => {
    updateMove(moveIdx, (m) => {
      const arrows = [...(m.arrows || [])];
      arrows[arrowIdx] = { ...arrows[arrowIdx], [field]: value };
      return { ...m, arrows };
    });
  };

  // ── Circle mutations ──

  const addCircle = (moveIdx: number) => {
    updateMove(moveIdx, (m) => ({
      ...m,
      circles: [...(m.circles || []), { square: "e4", color: "green" }],
    }));
  };

  const removeCircle = (moveIdx: number, circleIdx: number) => {
    updateMove(moveIdx, (m) => ({
      ...m,
      circles: (m.circles || []).filter((_, i) => i !== circleIdx),
    }));
  };

  const updateCircle = (
    moveIdx: number,
    circleIdx: number,
    field: "square" | "color",
    value: string,
  ) => {
    updateMove(moveIdx, (m) => {
      const circles = [...(m.circles || [])];
      circles[circleIdx] = { ...circles[circleIdx], [field]: value };
      return { ...m, circles };
    });
  };

  // ── Comment mutation ──

  const updateComment = (moveIdx: number, comment: string) => {
    updateMove(moveIdx, (m) => ({
      ...m,
      comment: comment || undefined,
    }));
  };

  // ── Export ──

  const handleExport = () => {
    const dirtyLines = lines.filter((l) => l._dirty);
    if (dirtyLines.length === 0) {
      setExportText("// Aucune modification détectée.");
      return;
    }
    const output = dirtyLines
      .map((line) => {
        return [
          `  // ${line.name}`,
          `  {`,
          `    name: ${JSON.stringify(line.name)},`,
          `    category: ${JSON.stringify(line.category)},`,
          `    chapter: ${JSON.stringify(line.chapter)},`,
          `    subchapter: ${JSON.stringify(line.subchapter)},`,
          `    priority: ${JSON.stringify(line.priority)},`,
          line.description
            ? `    description: ${JSON.stringify(line.description)},`
            : null,
          `    moves: [`,
          movesToCode(line.moves),
          `    ]`,
          `  },`,
        ]
          .filter(Boolean)
          .join("\n");
      })
      .join("\n\n");
    setExportText(output);
  };

  const handleCopy = async () => {
    if (!exportText) return;
    try {
      await navigator.clipboard.writeText(exportText);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = exportText;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#1a1a2e] text-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#16213e] border-b border-gray-700 px-4 py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <span className="text-xl">⚙️</span>
          <h1 className="text-lg font-bold tracking-wide">
            Admin — Éditeur de répertoire
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExport}
            className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 transition shadow"
          >
            📦 Exporter les modifications
          </button>
          <button
            onClick={onExit}
            className="px-4 py-2 rounded-lg bg-gray-700 text-gray-200 font-semibold text-sm hover:bg-gray-600 transition shadow"
          >
            ← Retour
          </button>
        </div>
      </header>

      <div className="flex h-[calc(100vh-56px)]">
        {/* Sidebar: line list */}
        <aside className="w-[320px] border-r border-gray-700 overflow-y-auto bg-[#16213e] flex-shrink-0">
          {CHAPTERS.map((chapter) => {
            const isOpen = openChapter === chapter.id;
            return (
              <div key={chapter.id}>
                <button
                  onClick={() =>
                    setOpenChapter(isOpen ? null : chapter.id)
                  }
                  className="w-full text-left px-4 py-3 font-bold text-sm bg-[#0f3460] hover:bg-[#1a4a80] transition border-b border-gray-700 flex justify-between items-center"
                >
                  <span>{chapter.title}</span>
                  <span className="text-xs">{isOpen ? "▾" : "▸"}</span>
                </button>
                {isOpen &&
                  chapter.subchapters.map((sub) => {
                    const subLines = getLinesBySubchapter(chapter.id, sub.id);
                    if (subLines.length === 0) return null;
                    return (
                      <div key={sub.id}>
                        <div className="px-4 py-1.5 text-xs text-gray-400 font-semibold uppercase tracking-wider bg-[#1a1a2e]">
                          {sub.title}
                        </div>
                        {subLines.map((origLine) => {
                          const idx = getLineIndex(origLine);
                          const line = lines[idx];
                          if (!line) return null;
                          const isSelected = selectedLineIdx === idx;
                          return (
                            <button
                              key={line.name}
                              onClick={() => {
                                setSelectedLineIdx(idx);
                                setExportText(null);
                              }}
                              className={`w-full text-left px-4 py-2 text-sm border-b border-gray-800 transition ${
                                isSelected
                                  ? "bg-[#e94560] text-white"
                                  : "hover:bg-[#222244] text-gray-300"
                              }`}
                            >
                              <span className="block truncate">
                                {line._dirty && (
                                  <span className="text-yellow-400 mr-1">●</span>
                                )}
                                {line.name}
                              </span>
                              <span className="text-[10px] text-gray-400">
                                {line.moves.length} coups
                              </span>
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

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6">
          {!selectedLine && !exportText && (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <div className="text-5xl mb-4">♟️</div>
                <p className="text-lg">
                  Sélectionne une ligne dans le panneau de gauche pour l'éditer.
                </p>
              </div>
            </div>
          )}

          {/* Export view */}
          {exportText && (
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-emerald-400">
                  📦 Export — Lignes modifiées
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition"
                  >
                    {copyFeedback ? "✓ Copié !" : "📋 Copier"}
                  </button>
                  <button
                    onClick={() => setExportText(null)}
                    className="px-3 py-2 rounded-lg bg-gray-700 text-gray-300 text-sm hover:bg-gray-600 transition"
                  >
                    ✕ Fermer
                  </button>
                </div>
              </div>
              <pre className="bg-[#0d1117] border border-gray-700 rounded-xl p-4 text-xs font-mono text-green-300 overflow-auto max-h-[70vh] whitespace-pre-wrap">
                {exportText}
              </pre>
              <p className="text-xs text-gray-500 mt-2">
                Copie ce code et remplace les lignes correspondantes dans{" "}
                <code className="text-gray-400">src/data/repertoire.ts</code>.
              </p>
            </div>
          )}

          {/* Move editor */}
          {selectedLine && !exportText && (
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white">
                  {selectedLine.name}
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  {selectedLine.description || "Pas de description."}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs px-2 py-0.5 rounded bg-[#0f3460] text-gray-300">
                    {selectedLine.chapter} / {selectedLine.subchapter}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-[#0f3460] text-gray-300">
                    {selectedLine.priority}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {selectedLine.moves.map((move, moveIdx) => {
                  const moveNum = Math.floor(moveIdx / 2) + 1;
                  const isWhite = moveIdx % 2 === 0;
                  const moveLabel = isWhite
                    ? `${moveNum}. ${move.san}`
                    : `${moveNum}… ${move.san}`;

                  return (
                    <div
                      key={moveIdx}
                      className="bg-[#16213e] rounded-xl border border-gray-700 p-4 shadow"
                    >
                      {/* Move header */}
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className={`font-mono text-lg font-bold ${
                            isWhite ? "text-white" : "text-gray-400"
                          }`}
                        >
                          {moveLabel}
                        </span>
                        <span className="text-xs text-gray-500">
                          (index {moveIdx})
                        </span>
                      </div>

                      {/* Comment */}
                      <div className="mb-3">
                        <label className="block text-xs font-semibold text-gray-400 mb-1">
                          💬 Commentaire (HTML autorisé)
                        </label>
                        <textarea
                          value={move.comment || ""}
                          onChange={(e) =>
                            updateComment(moveIdx, e.target.value)
                          }
                          rows={2}
                          className="w-full bg-[#0d1117] border border-gray-600 rounded-lg p-2 text-sm text-gray-200 focus:border-blue-500 focus:outline-none resize-y"
                          placeholder="Pas de commentaire"
                        />
                      </div>

                      {/* Arrows */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-xs font-semibold text-gray-400">
                            🏹 Flèches
                          </label>
                          <button
                            onClick={() => addArrow(moveIdx)}
                            className="text-xs px-2 py-0.5 rounded bg-emerald-700 text-white hover:bg-emerald-600 transition"
                          >
                            + Ajouter
                          </button>
                        </div>
                        {(move.arrows || []).length === 0 && (
                          <p className="text-xs text-gray-600 italic">
                            Aucune flèche
                          </p>
                        )}
                        {(move.arrows || []).map((arrow, aIdx) => (
                          <div
                            key={aIdx}
                            className="flex items-center gap-2 mb-1.5 bg-[#0d1117] rounded-lg p-2 border border-gray-700"
                          >
                            <select
                              value={arrow.from}
                              onChange={(e) =>
                                updateArrow(moveIdx, aIdx, "from", e.target.value)
                              }
                              className="bg-[#1a1a2e] border border-gray-600 rounded px-2 py-1 text-xs text-gray-200"
                            >
                              {SQUARES.map((sq) => (
                                <option key={sq} value={sq}>
                                  {sq}
                                </option>
                              ))}
                            </select>
                            <span className="text-gray-500 text-xs">→</span>
                            <select
                              value={arrow.to}
                              onChange={(e) =>
                                updateArrow(moveIdx, aIdx, "to", e.target.value)
                              }
                              className="bg-[#1a1a2e] border border-gray-600 rounded px-2 py-1 text-xs text-gray-200"
                            >
                              {SQUARES.map((sq) => (
                                <option key={sq} value={sq}>
                                  {sq}
                                </option>
                              ))}
                            </select>
                            <div className="flex items-center gap-1">
                              {ARROW_COLORS.map((c) => (
                                <button
                                  key={c}
                                  onClick={() =>
                                    updateArrow(moveIdx, aIdx, "color", c)
                                  }
                                  className={`w-5 h-5 rounded-full border-2 transition ${
                                    arrow.color === c
                                      ? "border-white scale-110"
                                      : "border-transparent opacity-60 hover:opacity-100"
                                  }`}
                                  style={{ backgroundColor: COLOR_CSS[c] }}
                                  title={c}
                                />
                              ))}
                            </div>
                            <button
                              onClick={() => removeArrow(moveIdx, aIdx)}
                              className="ml-auto text-red-400 hover:text-red-300 text-xs"
                              title="Supprimer"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Circles */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-xs font-semibold text-gray-400">
                            ⭕ Cercles
                          </label>
                          <button
                            onClick={() => addCircle(moveIdx)}
                            className="text-xs px-2 py-0.5 rounded bg-emerald-700 text-white hover:bg-emerald-600 transition"
                          >
                            + Ajouter
                          </button>
                        </div>
                        {(move.circles || []).length === 0 && (
                          <p className="text-xs text-gray-600 italic">
                            Aucun cercle
                          </p>
                        )}
                        {(move.circles || []).map((circle, cIdx) => (
                          <div
                            key={cIdx}
                            className="flex items-center gap-2 mb-1.5 bg-[#0d1117] rounded-lg p-2 border border-gray-700"
                          >
                            <select
                              value={circle.square}
                              onChange={(e) =>
                                updateCircle(moveIdx, cIdx, "square", e.target.value)
                              }
                              className="bg-[#1a1a2e] border border-gray-600 rounded px-2 py-1 text-xs text-gray-200"
                            >
                              {SQUARES.map((sq) => (
                                <option key={sq} value={sq}>
                                  {sq}
                                </option>
                              ))}
                            </select>
                            <div className="flex items-center gap-1">
                              {CIRCLE_COLORS.map((c) => (
                                <button
                                  key={c}
                                  onClick={() =>
                                    updateCircle(moveIdx, cIdx, "color", c)
                                  }
                                  className={`w-5 h-5 rounded-full border-2 transition ${
                                    circle.color === c
                                      ? "border-white scale-110"
                                      : "border-transparent opacity-60 hover:opacity-100"
                                  }`}
                                  style={{ backgroundColor: COLOR_CSS[c] }}
                                  title={c}
                                />
                              ))}
                            </div>
                            <button
                              onClick={() => removeCircle(moveIdx, cIdx)}
                              className="ml-auto text-red-400 hover:text-red-300 text-xs"
                              title="Supprimer"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
