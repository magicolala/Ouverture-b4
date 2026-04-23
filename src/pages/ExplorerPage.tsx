import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Chess, Move } from "chess.js";
import { ChessboardPanel } from "../components/ChessboardPanel";
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
  const [chess] = useState(() => new Chess());
  const [fen, setFen] = useState(chess.fen());
  const [lastMove, setLastMove] = useState<any>();
  const [showThreats, setShowThreats] = useState(true);

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

  // We find the first occurrence that has a comment
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
    
    // Add current position's explicit arrows
    if (mainOccurrence?.arrows) {
      arrows.push(...mainOccurrence.arrows);
    }
    
    // Preview arrows for next moves
    if (currentNode) {
      const tempChess = new Chess(fen);
      for (const m of nextMoves) {
        try {
          const result = tempChess.move(m.san);
          if (result) {
            arrows.push({ from: result.from, to: result.to, color: "yellow" });
            tempChess.undo();
          }
          
          // Also check if the next move has explicit arrows or circles, we could add them,
          // but just yellow arrows for the move itself is usually enough for previewing next moves.
        } catch (e) {}
      }
    }
    
    // Add threat arrows
    if (showThreats) {
      const threats = computeThreats(fen);
      for (const t of threats) {
        arrows.push({ from: t.from, to: t.to, color: "red" });
      }
    }
    
    return arrows.length > 0 ? arrows : undefined;
  }, [fen, mainOccurrence, nextMoves, currentNode, showThreats]);

  const circlesToShow = mainOccurrence?.circles;

  const handleMove = ({
    from,
    to,
    promotion,
  }: {
    from: string;
    to: string;
    promotion?: string;
  }) => {
    try {
      const result = chess.move({ from, to, promotion: promotion || "q" });
      if (result) {
        setFen(chess.fen());
        setLastMove({ from: result.from, to: result.to });
        return true;
      }
    } catch (e) {
      // Illegal move
    }
    return false;
  };

  const handleSanClick = (san: string) => {
    try {
      const result = chess.move(san);
      if (result) {
        setFen(chess.fen());
        setLastMove({ from: result.from, to: result.to });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUndo = () => {
    const result = chess.undo();
    if (result) {
      setFen(chess.fen());
      // Retrieve the previous last move from history
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
    <div className="max-w-6xl mx-auto p-4 flex flex-col lg:flex-row gap-6">
      <div className="flex-1 min-w-0">
        <ChessboardPanel
          fen={fen}
          lastMove={lastMove}
          arrows={arrowsToShow}
          circles={circlesToShow}
          orientation="white"
          onMove={handleMove}
        />
        <div className="mt-4 flex gap-4 justify-center">
          <button
            onClick={handleUndo}
            disabled={chess.history().length === 0}
            className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
          >
            ⟲ Annuler le coup
          </button>
          <button
            onClick={handleReset}
            disabled={chess.history().length === 0}
            className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
          >
            ↻ Revenir au début
          </button>
        </div>
        <div className="mt-4 flex items-center justify-center">
          <button
            type="button"
            onClick={() => setShowThreats((v) => !v)}
            aria-pressed={showThreats}
            title="Affiche en rouge les pièces du camp au trait qui peuvent être capturées avec gain matériel (raccourci : X)"
            className={
              "px-3 py-1.5 rounded-md border text-sm font-medium transition " +
              (showThreats
                ? "bg-red-600 text-white border-red-700 hover:bg-red-700"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50")
            }
          >
            {showThreats ? "⚠ Menaces ON" : "⚠ Afficher les menaces"}
          </button>
        </div>
      </div>

      <aside className="w-full lg:w-[420px] flex flex-col gap-4">
        <div className="flex flex-col gap-4 p-4 bg-white border-2 border-black rounded-xl shadow-[4px_4px_0_0_#111] h-full">
          <header className="flex items-center justify-between gap-2 border-b border-gray-200 pb-3">
            <div>
              <div className="text-xs uppercase tracking-wider text-gray-500">
                Mode Libre
              </div>
              <h2 className="text-lg font-bold">Explorateur du Répertoire</h2>
            </div>
            <button
              onClick={onExit}
              className="text-sm px-3 py-1 rounded border border-gray-300 hover:bg-gray-100"
            >
              ← Menu
            </button>
          </header>

          <div className="flex-1 overflow-y-auto pr-2">
            {!currentNode && (
              <div className="p-4 bg-orange-50 border border-orange-200 text-orange-800 rounded-lg">
                <p className="font-semibold">Hors du répertoire</p>
                <p className="text-sm mt-1">
                  Cette position n'est pas couverte par vos lignes actuelles.
                </p>
              </div>
            )}

            {currentNode && (
              <div className="flex flex-col gap-4">
                <div className="p-3 bg-blue-50 border border-blue-200 text-blue-900 rounded-lg">
                  <p className="text-xs uppercase tracking-wider opacity-70 mb-1">
                    Position actuelle
                  </p>
                  <p className="font-bold text-sm">
                    {chapterName ? (
                      <Link
                        to={`/session?chapterId=${mainOccurrence?.chapterId}&lineName=${encodeURIComponent(mainOccurrence?.lineName || "")}`}
                        className="underline hover:text-blue-700"
                        title="Démarrer l'apprentissage sur cette ligne"
                      >
                        {chapterName}
                      </Link>
                    ) : (
                      "Position de départ"
                    )}
                  </p>
                  {subchapterName && (
                    <p className="text-sm italic opacity-80">{subchapterName}</p>
                  )}
                </div>

                {mainOccurrence?.comment && (
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                      Commentaire sur le dernier coup
                    </p>
                    <div
                      className="text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: mainOccurrence.comment,
                      }}
                    />
                  </div>
                )}

                {nextMoves.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                      Coups suivants recommandés
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {nextMoves.map((m) => (
                        <button
                          key={m.san}
                          onClick={() => handleSanClick(m.san)}
                          className="px-3 py-1.5 bg-gray-100 border border-gray-300 rounded font-mono font-bold text-sm hover:bg-gray-200 transition"
                        >
                          {m.san}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {nextMoves.length === 0 && (
                  <div className="flex flex-col gap-3">
                    <div className="p-3 bg-green-50 border border-green-200 text-green-800 rounded-lg text-sm">
                      <strong>Fin de la variante !</strong> Vous avez atteint la
                      fin d'une ligne du répertoire.
                    </div>
                    <a
                      href={`https://lichess.org/analysis/${fen.replace(/ /g, "_")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg bg-[#2b2b2b] text-white font-bold text-sm hover:bg-[#1a1a1a] transition shadow"
                    >
                      <span>♞ Explorer la suite sur Lichess</span>
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
