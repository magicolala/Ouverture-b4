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
    <div className="wero-card p-0 overflow-hidden flex flex-col bg-white">
      <header className="p-6 bg-black text-white flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-wero-yellow rounded-xl border-2 border-white flex items-center justify-center font-black text-black text-xs shadow-[2px_2px_0_0_#fff]">
            R
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-wero-salmon mb-0.5">
              Rick Chess Coach
            </div>
            <h2 className="text-xl font-black uppercase tracking-tight leading-none">{line.name}</h2>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onRestart}
            className="text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded-full border-2 border-white/20 hover:bg-white/10 transition"
            title="Restart line"
          >
            ↻
          </button>
          <button
            onClick={onExit}
            className="text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full border-2 border-white/20 hover:bg-white/10 transition"
          >
            ← Menu
          </button>
        </div>
      </header>

      <div className="p-6 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="h-4 w-full bg-gray-100 rounded-full border-[2.5px] border-black overflow-hidden shadow-[2px_2px_0_0_#000]">
            <div
              className="h-full bg-wero-salmon transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-400">
            <div className="flex items-center gap-2">
              <span>Essais :</span>
              <AttemptDots attempts={attemptsOnCurrentMove} />
            </div>
            <div>{currentMoveIndex} / {totalMoves} coups</div>
          </div>
        </div>

        {/* Status Zone */}
        {!showSolution && isWaitingOpponent && (
          <div className="wero-card bg-wero-purple/10 border-wero-purple p-6 shadow-[4px_4px_0_0_#7B61FF]">
            <p className="font-black uppercase text-xs text-wero-purple animate-pulse">L'adversaire réfléchit…</p>
          </div>
        )}

        {!showSolution && isUserTurn && (
          <div className="wero-card bg-gray-50 p-6 shadow-[4px_4px_0_0_#000]">
            <p className="font-black uppercase text-xs text-gray-500 mb-2 border-b border-black/10 pb-1">À vous de jouer</p>
            <p className="text-sm font-bold text-gray-800">Trouvez la réponse correcte pour cette position.</p>
            {lastError && (
              <div className="mt-4 p-3 bg-wero-salmon/10 border-2 border-wero-salmon rounded-xl text-wero-salmon font-black text-xs animate-bounce">
                ✗ {lastError} n'est pas le bon coup.
              </div>
            )}
          </div>
        )}

        {showSolution && expectedMove && (
          <div className="wero-card bg-wero-yellow p-6 shadow-[4px_4px_0_0_#000] animate-in slide-in-from-bottom-4 duration-300">
            <p className="text-[10px] font-black uppercase tracking-widest text-black/50 mb-2">Solution du Coach</p>
            <div className="text-4xl font-black italic tracking-tighter mb-4">
              {expectedMove.san}
            </div>
            {expectedMove.comment && (
              <div
                className="text-sm font-bold leading-relaxed text-black/80 mb-6"
                dangerouslySetInnerHTML={{ __html: expectedMove.comment }}
              />
            )}
            <button
              onClick={onContinueAfterSolution}
              className="wero-button bg-black text-white w-full"
            >
              Continuer →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
