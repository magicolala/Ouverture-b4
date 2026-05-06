import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight, 
  Eye, 
  EyeOff 
} from "lucide-react";

interface BoardControlsProps {
  onPrev: () => void;
  onNext: () => void;
  onStart: () => void;
  onEnd: () => void;
  canPrev: boolean;
  canNext: boolean;
  showThreats: boolean;
  onToggleThreats: () => void;
  currentInfo?: string;
}

export function BoardControls({
  onPrev,
  onNext,
  onStart,
  onEnd,
  canPrev,
  canNext,
  showThreats,
  onToggleThreats,
  currentInfo
}: BoardControlsProps) {
  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-[500px]">
      {/* Main Navigation Bar */}
      <div className="flex items-center justify-between w-full bg-white border-[3px] border-black rounded-2xl p-1.5 shadow-[4px_4px_0_0_#000]">
        <div className="flex items-center gap-1">
          <button
            onClick={onStart}
            disabled={!canPrev}
            className="p-2 sm:p-3 rounded-xl hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            title="Début"
          >
            <ChevronsLeft size={20} />
          </button>
          <button
            onClick={onPrev}
            disabled={!canPrev}
            className="p-2 sm:p-3 rounded-xl hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            title="Précédent"
          >
            <ChevronLeft size={20} />
          </button>
        </div>

        {currentInfo && (
          <div className="flex-1 text-center px-2">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-tighter truncate block">
              {currentInfo}
            </span>
          </div>
        )}

        <div className="flex items-center gap-1">
          <button
            onClick={onNext}
            disabled={!canNext}
            className="p-2 sm:p-3 rounded-xl hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            title="Suivant"
          >
            <ChevronRight size={20} />
          </button>
          <button
            onClick={onEnd}
            disabled={!canNext}
            className="p-2 sm:p-3 rounded-xl hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            title="Fin"
          >
            <ChevronsRight size={20} />
          </button>
        </div>
      </div>

      {/* Secondary Controls (Threats, etc.) */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleThreats}
          className={`wero-button !py-2 !px-4 !text-[10px] flex items-center gap-2 ${
            showThreats ? "bg-wero-salmon text-white" : "bg-white text-black"
          }`}
        >
          {showThreats ? <EyeOff size={14} /> : <Eye size={14} />}
          <span>{showThreats ? "Masquer Menaces" : "Voir Menaces"}</span>
        </button>
      </div>
    </div>
  );
}
