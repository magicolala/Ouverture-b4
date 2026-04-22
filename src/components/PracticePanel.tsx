import type { RepertoireLine, MoveAnnotation } from "../data/repertoire";
import { MAX_ATTEMPTS } from "../engine/types";

interface PracticePanelProps {
  line: RepertoireLine;
  currentMoveIndex: number;
  expectedMove: MoveAnnotation | null;
  attemptsOnCurrentMove: number;
  showSolution: boolean;
  lastError: string | null;
  isUserTurn: boolean;
  isWaitingOpponent: boolean;
  onContinueAfterSolution: () => void;
  onRestart: () => void;
  onExit: () => void;
}

function AttemptDots({ attempts }: { attempts: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: MAX_ATTEMPTS }).map((_, i) => (
        <span
          key={i}
          className={
            "inline-block w-3 h-3 rounded-full border-2 " +
            (i < attempts
              ? "bg-red-500 border-red-600"
              : "bg-white border-gray-300")
          }
        />
      ))}
    </div>
  );
}

export function PracticePanel({
  line,
  currentMoveIndex,
  expectedMove,
  attemptsOnCurrentMove,
  showSolution,
  lastError,
  isUserTurn,
  isWaitingOpponent,
  onContinueAfterSolution,
  onRestart,
  onExit,
}: PracticePanelProps) {
  const totalMoves = line.moves.length;
  const progressPct = Math.round((currentMoveIndex / totalMoves) * 100);

  return (
    <div className="flex flex-col gap-4 p-4 bg-white border-2 border-black rounded-xl shadow-[4px_4px_0_0_#111]">
      <header className="flex items-center justify-between gap-2">
        <div>
          <div className="text-xs uppercase tracking-wider text-orange-600 font-bold">
            Mode Entraînement
          </div>
          <h2 className="text-lg font-bold">{line.name}</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onRestart}
            className="text-sm px-3 py-1 rounded border border-gray-300 hover:bg-gray-100"
            title="Recommencer la variante"
          >
            ↻
          </button>
          <button
            onClick={onExit}
            className="text-sm px-3 py-1 rounded border border-gray-300 hover:bg-gray-100"
          >
            ← Menu
          </button>
        </div>
      </header>

      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-orange-500 transition-all"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-600">Essais :</span>
          <AttemptDots attempts={attemptsOnCurrentMove} />
        </div>
        <div className="text-xs text-gray-500">
          {currentMoveIndex} / {totalMoves}
        </div>
      </div>

      {/* Zone de statut */}
      {!showSolution && isWaitingOpponent && (
        <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-sm text-blue-800">
          L'adversaire réfléchit…
        </div>
      )}

      {!showSolution && isUserTurn && (
        <div className="p-3 rounded-lg bg-gray-50 border border-gray-200 text-sm">
          À toi de jouer. Trouve le bon coup !
          {lastError && (
            <div className="mt-2 text-red-600 font-semibold">
              ✗ {lastError} n'est pas le coup attendu.
            </div>
          )}
        </div>
      )}

      {showSolution && expectedMove && (
        <div className="flex flex-col gap-3 p-4 bg-yellow-50 border-2 border-yellow-500 rounded-lg">
          <div className="text-sm font-bold text-yellow-900">
            Solution révélée
          </div>
          <div className="font-mono text-xl font-bold">
            {expectedMove.san}
          </div>
          {expectedMove.comment && (
            <div
              className="text-sm leading-relaxed text-yellow-900"
              dangerouslySetInnerHTML={{ __html: expectedMove.comment }}
            />
          )}
          <button
            onClick={onContinueAfterSolution}
            className="w-full py-2 rounded-lg bg-yellow-600 text-white font-bold hover:bg-yellow-700 transition"
          >
            Continuer →
          </button>
        </div>
      )}
    </div>
  );
}
