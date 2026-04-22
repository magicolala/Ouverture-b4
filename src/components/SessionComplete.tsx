import type { RepertoireLine } from "../data/repertoire";
import type { LineStats, SessionMode } from "../engine/types";

interface SessionCompleteProps {
  mode: SessionMode;
  line: RepertoireLine;
  stats: LineStats;
  hasNextLine: boolean;
  onNextLine: () => void;
  onRestart: () => void;
  onExit: () => void;
}

export function SessionComplete({
  mode,
  line,
  stats,
  hasNextLine,
  onNextLine,
  onRestart,
  onExit,
}: SessionCompleteProps) {
  const { perfectMoves, hintedMoves, totalUserMoves } = stats;
  const scorePct =
    totalUserMoves === 0
      ? 0
      : Math.round((perfectMoves / totalUserMoves) * 100);

  const isPractice = mode === "practice";

  return (
    <div className="flex flex-col gap-4 p-5 bg-white border-2 border-black rounded-xl shadow-[4px_4px_0_0_#111]">
      <div>
        <div className="text-xs uppercase tracking-wider text-gray-500">
          Variante terminée
        </div>
        <h2 className="text-xl font-bold">{line.name}</h2>
      </div>

      {isPractice && (
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="flex items-baseline gap-3">
            <div className="text-4xl font-bold text-green-600">
              {scorePct}%
            </div>
            <div className="text-sm text-gray-600">
              de coups parfaits
            </div>
          </div>
          <div className="mt-3 text-sm text-gray-700 flex gap-4">
            <span>
              ✓ {perfectMoves} parfait{perfectMoves > 1 ? "s" : ""}
            </span>
            <span>
              💡 {hintedMoves} avec aide
            </span>
            <span className="text-gray-400">
              / {totalUserMoves} coups
            </span>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        {hasNextLine && (
          <button
            onClick={onNextLine}
            className="w-full py-3 rounded-lg bg-black text-white font-bold hover:bg-gray-800 transition"
          >
            Variante suivante →
          </button>
        )}
        <button
          onClick={onRestart}
          className="w-full py-2 rounded-lg border-2 border-gray-300 font-semibold hover:bg-gray-50 transition"
        >
          Refaire cette variante
        </button>
        <button
          onClick={onExit}
          className="w-full py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
        >
          Retour au menu
        </button>
      </div>
    </div>
  );
}
