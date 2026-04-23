import { useMemo, useState } from "react";
import {
  CHAPTERS,
  getLinesBySubchapter,
  getMustKnowLines,
} from "../data/repertoire";
import type { ChapterId, RepertoireLine } from "../data/repertoire";
import { progressStore } from "../engine/progressStore";
import type { SessionMode } from "../engine/types";

interface RepertoireMenuProps {
  onStart: (queue: RepertoireLine[], mode: SessionMode) => void;
  onExplore?: () => void;
}

const PRIORITY_BADGE: Record<
  RepertoireLine["priority"],
  { label: string; cls: string }
> = {
  "must-know": {
    label: "ESSENTIEL",
    cls: "bg-wero-salmon text-white border-black",
  },
  important: {
    label: "IMPORTANT",
    cls: "bg-wero-yellow text-black border-black",
  },
  bonus: {
    label: "BONUS",
    cls: "bg-wero-cyan text-black border-black",
  },
};

export function RepertoireMenu({ onStart, onExplore }: RepertoireMenuProps) {
  const progress = useMemo(() => progressStore.getAll(), []);
  const [openChapters, setOpenChapters] = useState<Record<string, boolean>>(
    () => Object.fromEntries(CHAPTERS.map((c) => [c.id, c.order === 1])),
  );

  const toggleChapter = (id: ChapterId) =>
    setOpenChapters((s) => ({ ...s, [id]: !s[id] }));

  const handleMustKnow = () => {
    const lines = getMustKnowLines();
    if (lines.length > 0) onStart(lines, "practice");
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={handleMustKnow}
          className="wero-card p-8 bg-wero-salmon group flex flex-col items-start text-left"
        >
          <div className="w-12 h-12 bg-white rounded-full border-[3px] border-black flex items-center justify-center text-2xl mb-4 shadow-[3px_3px_0_0_#000]">
            🎯
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tight mb-2">Réviser l'essentiel</h2>
          <p className="font-bold opacity-70 text-sm leading-tight">
            Entraînement concentré sur toutes les lignes "must-know".
          </p>
        </button>

        {onExplore && (
          <button
            onClick={onExplore}
            className="wero-card p-8 bg-wero-cyan group flex flex-col items-start text-left"
          >
            <div className="w-12 h-12 bg-white rounded-full border-[3px] border-black flex items-center justify-center text-2xl mb-4 shadow-[3px_3px_0_0_#000]">
              🔍
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tight mb-2">Explorer Librement</h2>
            <p className="font-bold opacity-70 text-sm leading-tight">
              Parcourez toutes les positions et lisez le cours associé.
            </p>
          </button>
        )}
      </div>

      <div className="flex flex-col gap-6">
        {CHAPTERS.map((chapter) => {
          const isOpen = openChapters[chapter.id];
          return (
            <section
              key={chapter.id}
              className="wero-card overflow-hidden border-black border-[3px] bg-white"
            >
              <button
                onClick={() => toggleChapter(chapter.id)}
                className={`w-full flex items-center justify-between p-6 text-left transition-colors ${isOpen ? 'bg-wero-yellow' : 'hover:bg-gray-50'}`}
              >
                <div>
                  <h2 className="text-xl font-black uppercase tracking-tight">{chapter.title}</h2>
                  <p className="text-sm font-bold text-gray-500 mt-1">
                    {chapter.description}
                  </p>
                </div>
                <span className={`text-2xl transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>

              {isOpen && (
                <div className="bg-white border-t-[3px] border-black">
                  {chapter.subchapters.map((sub) => {
                    const lines = getLinesBySubchapter(chapter.id, sub.id);
                    if (lines.length === 0) return null;
                    return (
                      <div
                        key={sub.id}
                        className="p-6 border-b-[3px] border-black last:border-b-0"
                      >
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                          <div>
                            <h3 className="text-lg font-black uppercase tracking-tight text-wero-purple">{sub.title}</h3>
                            <p className="text-sm font-bold text-gray-400">
                              {sub.description}
                            </p>
                          </div>
                          <button
                            onClick={() => onStart(lines, "practice")}
                            className="text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full border-[2px] border-black bg-gray-100 hover:bg-black hover:text-white transition shadow-[3px_3px_0_0_#000]"
                          >
                            Entraîner tout ({lines.length})
                          </button>
                        </div>

                        <ul className="grid grid-cols-1 gap-3">
                          {lines.map((line) => {
                            const p = progress[line.name];
                            const badge = PRIORITY_BADGE[line.priority];
                            return (
                              <li
                                key={line.name}
                                className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-2xl border-[2px] border-black bg-gray-50 hover:bg-white transition-all shadow-[2px_2px_0_0_#000] hover:shadow-[4px_4px_0_0_#000] hover:translate-x-[-1px] hover:translate-y-[-1px]"
                              >
                                <div className="flex items-center gap-3 flex-1">
                                  <span
                                    className={`text-[8px] font-black px-2 py-1 rounded border-[1.5px] tracking-widest ${badge.cls}`}
                                  >
                                    {badge.label}
                                  </span>
                                  <span className="font-bold text-sm">
                                    {line.name}
                                  </span>
                                  <div className="flex items-center gap-1">
                                    {p?.learned && (
                                      <span className="w-5 h-5 bg-green-500 rounded-full border-[1.5px] border-black flex items-center justify-center text-[10px] text-white font-black" title="Parcourue">
                                        ✓
                                      </span>
                                    )}
                                    {p && p.bestScore >= 80 && (
                                      <span className="w-5 h-5 bg-wero-yellow rounded-full border-[1.5px] border-black flex items-center justify-center text-[10px] text-black font-black" title={`Score: ${p.bestScore}%`}>
                                        ★
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => onStart([line], "learn")}
                                    className="flex-1 sm:flex-none text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full border-[2px] border-black bg-white hover:bg-wero-yellow transition"
                                  >
                                    Apprendre
                                  </button>
                                  <button
                                    onClick={() => onStart([line], "practice")}
                                    className="flex-1 sm:flex-none text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full border-[2px] border-black bg-black text-white hover:bg-gray-800 transition"
                                  >
                                    Entraîner
                                  </button>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}

