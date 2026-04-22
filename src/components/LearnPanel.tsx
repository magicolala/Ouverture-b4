import type { RepertoireLine, MoveAnnotation } from "../data/repertoire";

interface LearnPanelProps {
  line: RepertoireLine;
  currentMoveIndex: number;
  /** Le coup à présenter ensuite (null si ligne terminée). */
  expectedMove: MoveAnnotation | null;
  /** True si la variante est terminée (currentMoveIndex === moves.length). */
  isLineComplete: boolean;
  onAdvance: () => void;
  onFinishLine: () => void;
  onExit: () => void;
}

function moveNumberLabel(moveIndex: number): string {
  // moveIndex 0 → "1.b", 1 → "1...n", 2 → "2.b", etc.
  const fullMove = Math.floor(moveIndex / 2) + 1;
  const isWhite = moveIndex % 2 === 0;
  return isWhite ? `${fullMove}.` : `${fullMove}…`;
}

export function LearnPanel({
  line,
  currentMoveIndex,
  expectedMove,
  isLineComplete,
  onAdvance,
  onFinishLine,
  onExit,
}: LearnPanelProps) {
  const totalMoves = line.moves.length;
  const progressPct = Math.round((currentMoveIndex / totalMoves) * 100);

  return (
    <div className="flex flex-col gap-4 p-4 bg-white border-2 border-black rounded-xl shadow-[4px_4px_0_0_#111]">
      <header className="flex items-center justify-between gap-2">
        <div>
          <div className="text-xs uppercase tracking-wider text-gray-500">
            Mode Apprendre
          </div>
          <h2 className="text-lg font-bold">{line.name}</h2>
        </div>
        <button
          onClick={onExit}
          className="text-sm px-3 py-1 rounded border border-gray-300 hover:bg-gray-100"
        >
          ← Menu
        </button>
      </header>

      {line.description && (
        <p className="text-sm text-gray-600 italic">{line.description}</p>
      )}

      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500 transition-all"
          style={{ width: `${progressPct}%` }}
        />
      </div>
      <div className="text-xs text-gray-500 text-right">
        {currentMoveIndex} / {totalMoves} coups
      </div>

      {!isLineComplete && expectedMove && (
        <div className="flex flex-col gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-baseline gap-2">
            <span className="text-xs text-gray-500">
              Coup suivant
            </span>
            <span className="font-mono text-xl font-bold">
              {moveNumberLabel(currentMoveIndex)} {expectedMove.san}
            </span>
          </div>
          {expectedMove.comment && (
            <div
              className="text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: expectedMove.comment }}
            />
          )}
        </div>
      )}

      {!isLineComplete && (
        <button
          onClick={onAdvance}
          className="w-full py-3 rounded-lg bg-black text-white font-bold hover:bg-gray-800 transition"
        >
          Coup suivant →
        </button>
      )}

      {isLineComplete && (
        <div className="flex flex-col gap-3 p-4 bg-green-50 border-2 border-green-500 rounded-lg">
          <div className="text-lg font-bold text-green-800">
            Variante parcourue ✓
          </div>
          <p className="text-sm text-green-700">
            Tu viens de voir toute la ligne. On passe en mode entraînement sur
            la MÊME variante pour la fixer en mémoire.
          </p>
          <button
            onClick={onFinishLine}
            className="w-full py-3 rounded-lg bg-green-600 text-white font-bold hover:bg-green-700 transition"
          >
            Variante terminée ✓ — Entraîner
          </button>
        </div>
      )}
    </div>
  );
}
