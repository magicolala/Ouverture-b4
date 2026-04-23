import type { RepertoireLine, MoveAnnotation } from "../data/repertoire";
import { LichessStats } from "./LichessStats";

interface LearnPanelProps {
  line: RepertoireLine;
  currentMoveIndex: number;
  fen: string;
  /** Le coup à présenter ensuite (null si ligne terminée). */
  expectedMove: MoveAnnotation | null;
  /** True si la variante est terminée (currentMoveIndex === moves.length). */
  isLineComplete: boolean;
  onAdvance: () => void;
  onFinishLine: () => void;
  onExit: () => void;
}

function moveNumberLabel(moveIndex: number): string {
  const fullMove = Math.floor(moveIndex / 2) + 1;
  const isWhite = moveIndex % 2 === 0;
  return isWhite ? `${fullMove}.` : `${fullMove}…`;
}

export function LearnPanel({
  line,
  currentMoveIndex,
  fen,
  expectedMove,
  isLineComplete,
  onAdvance,
  onFinishLine,
  onExit,
}: LearnPanelProps) {
  const totalMoves = line.moves.length;
  const progressPct = Math.round((currentMoveIndex / totalMoves) * 100);

  return (
    <div className="wero-card p-0 overflow-hidden flex flex-col bg-white">
      <header className="p-6 bg-black text-white flex items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-black uppercase tracking-widest text-wero-yellow mb-1">
            Mode Apprendre
          </div>
          <h2 className="text-xl font-black uppercase tracking-tight leading-none">{line.name}</h2>
        </div>
        <button
          onClick={onExit}
          className="text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full border-2 border-white/20 hover:bg-white/10 transition"
        >
          ← Menu
        </button>
      </header>

      <div className="p-6 flex flex-col gap-6">
        {line.description && (
          <p className="text-sm font-bold text-gray-500 italic">{line.description}</p>
        )}

        <div className="flex flex-col gap-2">
          <div className="h-4 w-full bg-gray-100 rounded-full border-[2.5px] border-black overflow-hidden shadow-[2px_2px_0_0_#000]">
            <div
              className="h-full bg-wero-cyan transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">
            Progression : {currentMoveIndex} / {totalMoves} coups ({progressPct}%)
          </div>
        </div>

        {!isLineComplete && expectedMove && (
          <div className="wero-card bg-gray-50 p-6 border-[2px] shadow-[4px_4px_0_0_#000]">
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                Coup suivant
              </span>
              <span className="text-3xl font-black italic tracking-tighter text-wero-purple">
                {moveNumberLabel(currentMoveIndex)} {expectedMove.san}
              </span>
            </div>
            {expectedMove.comment && (
              <div
                className="text-sm font-bold leading-relaxed text-gray-800 prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: expectedMove.comment }}
              />
            )}
          </div>
        )}

        {!isLineComplete && (
          <button
            onClick={onAdvance}
            className="wero-button bg-wero-yellow text-black w-full"
          >
            Coup suivant →
          </button>
        )}

        {isLineComplete && (
          <div className="flex flex-col gap-6 animate-in fade-in zoom-in duration-300">
            <div className="wero-card bg-green-50 border-green-500 p-6 shadow-[4px_4px_0_0_#15803d]">
              <div className="text-2xl font-black uppercase tracking-tight text-green-800 mb-2">
                Variante apprise ✓
              </div>
              <p className="text-sm font-bold text-green-700 leading-tight">
                Excellent ! Vous avez parcouru toute la ligne. Prêt pour l'entraînement ?
              </p>
            </div>

            <LichessStats fen={fen} />

            <div className="flex flex-col gap-3">
              <a
                href={`https://lichess.org/analysis/${fen.replace(/ /g, "_")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="wero-button bg-black text-white text-center flex items-center justify-center gap-2"
              >
                <span>♞ Explorer sur Lichess</span>
              </a>
              <button
                onClick={onFinishLine}
                className="wero-button bg-green-500 text-white"
              >
                Passer à l'entraînement ✓
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

