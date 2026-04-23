import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Chess, Move } from "chess.js";
import { ChessboardPanel } from "../components/ChessboardPanel";
import { LichessStats } from "../components/LichessStats";
import { computeThreats } from "../lib/threats";
import { REPERTOIRE } from "../data/repertoire";
import {
  buildExplorerTree,
  normalizeFen,
  getChapterTitle,
  getSubchapterTitle,
} from "../engine/explorer";

interface ExplorerPageProps {
  onExit: () => void;
}

export function ExplorerPage({ onExit }: ExplorerPageProps) {
  const tree = useMemo(() => buildExplorerTree(REPERTOIRE), []);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialFen = searchParams.get("fen") || "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
  
  const [chess] = useState(() => new Chess(initialFen));
  const [fen, setFen] = useState(chess.fen());
  const [lastMove, setLastMove] = useState<any>();
  const [showThreats, setShowThreats] = useState(true);

  // Sync FEN to URL
  useEffect(() => {
    const currentFenInUrl = searchParams.get("fen");
    if (currentFenInUrl !== fen) {
      setSearchParams({ fen }, { replace: true });
    }
  }, [fen, setSearchParams, searchParams]);

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

  const currentNormFen = normalizeFen(fen);
  const currentNode = tree.get(currentNormFen);

  const mainOccurrence = currentNode?.occurrences.find((o) => o.comment);
  const chapterName = mainOccurrence
    ? getChapterTitle(mainOccurrence.chapterId)
    : currentNode?.occurrences[0]
    ? getChapterTitle(currentNode.occurrences[0].chapterId)
    : null;
  const subchapterName = mainOccurrence
    ? getSubchapterTitle(
        mainOccurrence.chapterId,
        mainOccurrence.subchapterId
      )
    : currentNode?.occurrences[0]
    ? getSubchapterTitle(
        currentNode.occurrences[0].chapterId,
        currentNode.occurrences[0].subchapterId
      )
    : null;

  const nextMoves = currentNode ? Object.values(currentNode.nextMoves) : [];

  const arrowsToShow = useMemo(() => {
    const arrows: { from: string; to: string; color?: string }[] = [];
    if (mainOccurrence?.arrows) arrows.push(...mainOccurrence.arrows);
    if (currentNode) {
      const tempChess = new Chess(fen);
      for (const m of nextMoves) {
        try {
          const result = tempChess.move(m.san);
          if (result) {
            arrows.push({ from: result.from, to: result.to, color: "yellow" });
            tempChess.undo();
          }
        } catch (e) {}
      }
    }
    if (showThreats) {
      const threats = computeThreats(fen);
      for (const t of threats) {
        arrows.push({ from: t.from, to: t.to, color: "red" });
      }
    }
    return arrows.length > 0 ? arrows : undefined;
  }, [fen, mainOccurrence, nextMoves, currentNode, showThreats]);

  const circlesToShow = mainOccurrence?.circles;

  const handleMove = ({ from, to, promotion }: { from: string; to: string; promotion?: string }) => {
    try {
      const result = chess.move({ from, to, promotion: promotion || "q" });
      if (result) {
        setFen(chess.fen());
        setLastMove({ from: result.from, to: result.to });
        return true;
      }
    } catch (e) {}
    return false;
  };

  const handleSanClick = (san: string) => {
    try {
      const result = chess.move(san);
      if (result) {
        setFen(chess.fen());
        setLastMove({ from: result.from, to: result.to });
      }
    } catch (e) {}
  };

  const handleUndo = () => {
    const result = chess.undo();
    if (result) {
      setFen(chess.fen());
      const history = chess.history({ verbose: true }) as Move[];
      if (history.length > 0) {
        const prev = history[history.length - 1];
        setLastMove({ from: prev.from, to: prev.to });
      } else {
        setLastMove(undefined);
      }
    }
  };

  const handleReset = () => {
    chess.reset();
    setFen(chess.fen());
    setLastMove(undefined);
  };

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 sm:gap-8 items-center lg:items-start">
        {/* Board Column */}
        <div className="flex-1 flex flex-col items-center">
          <div className="wero-card p-2 sm:p-4 bg-white border-[3px] sm:border-[4px] w-full max-w-[500px] lg:max-w-none">
            <ChessboardPanel
              fen={fen}
              lastMove={lastMove}
              arrows={arrowsToShow}
              circles={circlesToShow}
              orientation="white"
              onMove={handleMove}
            />
          </div>
          
          <div className="mt-6 sm:mt-8 flex flex-row flex-wrap gap-2 sm:gap-4 justify-center">
            <button
              onClick={handleUndo}
              disabled={chess.history().length === 0}
              className="wero-button !px-3 sm:!px-6 !py-1.5 sm:!py-3 !text-[10px] sm:!text-xs bg-white disabled:opacity-50"
            >
              ⟲ Undo
            </button>
            <button
              onClick={handleReset}
              disabled={chess.history().length === 0}
              className="wero-button !px-3 sm:!px-6 !py-1.5 sm:!py-3 !text-[10px] sm:!text-xs bg-white disabled:opacity-50"
            >
              ↻ Reset
            </button>
            <button
              type="button"
              onClick={() => setShowThreats((v) => !v)}
              className={`wero-button !px-3 sm:!px-6 !py-1.5 sm:!py-3 !text-[10px] sm:!text-xs ${showThreats ? 'bg-wero-salmon text-white' : 'bg-white'}`}
            >
              {showThreats ? "⚠ Threats ON" : "⚠ Show Threats"}
            </button>
          </div>
        </div>

        {/* Info Sidebar */}
        <aside className="w-full lg:w-[460px] flex flex-col gap-6">
          <div className="wero-card p-0 overflow-hidden flex flex-col bg-white">
            <header className="p-4 sm:p-6 bg-black text-white flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-wero-yellow rounded-lg sm:rounded-xl border-2 border-white flex items-center justify-center font-black text-black text-[10px] sm:text-xs shadow-[2px_2px_0_0_#fff]">
                  R
                </div>
                <div>
                  <div className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-wero-cyan mb-0.5">
                    Rick Chess Coach
                  </div>
                  <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight leading-none">Explorateur</h2>
                </div>
              </div>
              <button
                onClick={onExit}
                className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border-2 border-white/20 hover:bg-white/10 transition"
              >
                ← Menu
              </button>
            </header>

            <div className="p-6 flex flex-col gap-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {!currentNode && (
                <div className="wero-card bg-wero-salmon/10 border-wero-salmon p-6 shadow-[4px_4px_0_0_#FF7A5C]">
                  <p className="font-black uppercase text-xs text-wero-salmon mb-1">Hors répertoire</p>
                  <p className="text-sm font-bold text-gray-700">
                    Cette position n'est pas encore couverte par vos lignes.
                  </p>
                </div>
              )}

              {currentNode && (
                <div className="flex flex-col gap-6">
                  <div className="wero-card bg-wero-purple/10 border-wero-purple p-6 shadow-[4px_4px_0_0_#7B61FF]">
                    <p className="text-[10px] font-black uppercase tracking-widest text-wero-purple mb-2">Position actuelle</p>
                    <p className="font-black text-lg leading-none mb-1">
                      {chapterName ? (
                        <Link
                          to={`/session?chapterId=${mainOccurrence?.chapterId}&lineName=${encodeURIComponent(mainOccurrence?.lineName || "")}`}
                          className="hover:underline"
                        >
                          {chapterName}
                        </Link>
                      ) : (
                        "Position de départ"
                      )}
                    </p>
                    {subchapterName && (
                      <p className="text-xs font-bold text-wero-purple/70 uppercase tracking-wide">{subchapterName}</p>
                    )}
                  </div>

                  {mainOccurrence?.comment && (
                    <div className="wero-card bg-gray-50 p-6 shadow-[4px_4px_0_0_#000]">
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 border-b border-black/10 pb-1">Notes du Répertoire</p>
                      <div
                        className="text-sm font-bold leading-relaxed text-gray-800"
                        dangerouslySetInnerHTML={{ __html: mainOccurrence.comment }}
                      />
                    </div>
                  )}

                  {nextMoves.length > 0 && (
                    <div className="flex flex-col gap-3">
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Coups recommandés</p>
                      <div className="flex flex-wrap gap-3">
                        {nextMoves.map((m) => (
                          <button
                            key={m.san}
                            onClick={() => handleSanClick(m.san)}
                            className="wero-button bg-wero-yellow text-sm px-6 py-2"
                          >
                            {m.san}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {nextMoves.length === 0 && (
                    <div className="wero-card bg-green-50 border-green-500 p-6 shadow-[4px_4px_0_0_#15803d] animate-in fade-in zoom-in duration-300">
                      <p className="text-xl font-black uppercase tracking-tight text-green-800">Fin de variante ✓</p>
                    </div>
                  )}
                </div>
              )}

              <LichessStats fen={fen} />

              <a
                href={`https://lichess.org/analysis/${fen.replace(/ /g, "_")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="wero-button bg-black text-white text-center flex items-center justify-center gap-2"
              >
                <span>♞ Continuer sur Lichess</span>
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

