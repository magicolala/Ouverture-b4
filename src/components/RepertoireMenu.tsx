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
  /** Démarre une session avec une file de lignes. */
  onStart: (queue: RepertoireLine[], mode: SessionMode) => void;
}

const PRIORITY_BADGE: Record<
  RepertoireLine["priority"],
  { label: string; cls: string }
> = {
  "must-know": {
    label: "Essentiel",
    cls: "bg-red-100 text-red-800 border-red-300",
  },
  important: {
    label: "Important",
    cls: "bg-orange-100 text-orange-800 border-orange-300",
  },
  bonus: {
    label: "Bonus",
    cls: "bg-blue-100 text-blue-800 border-blue-300",
  },
};

export function RepertoireMenu({ onStart }: RepertoireMenuProps) {
  // Lu une fois au montage : suffisant tant qu'on ne reste pas sur l'écran pendant une session.
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
    <div className="flex flex-col gap-5 max-w-3xl mx-auto p-4">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Répertoire 1.b4 — Sokolsky</h1>
        <p className="text-sm text-gray-600">
          Apprends chaque variante dans l'ordre, puis entraîne-toi pour la
          mémoriser.
        </p>
      </header>

      <button
        onClick={handleMustKnow}
        className="w-full py-4 px-4 rounded-xl bg-red-600 text-white font-bold text-lg shadow-[4px_4px_0_0_#111] border-2 border-black hover:bg-red-700 transition"
      >
        🎯 Réviser l'essentiel
        <span className="block text-xs font-normal mt-1 opacity-90">
          Entraînement sur toutes les lignes must-know
        </span>
      </button>

      {CHAPTERS.map((chapter) => {
        const isOpen = openChapters[chapter.id];
        return (
          <section
            key={chapter.id}
            className="border-2 border-black rounded-xl bg-white shadow-[4px_4px_0_0_#111] overflow-hidden"
          >
            <button
              onClick={() => toggleChapter(chapter.id)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
            >
              <div>
                <h2 className="text-lg font-bold">{chapter.title}</h2>
                <p className="text-xs text-gray-500 mt-1">
                  {chapter.description}
                </p>
              </div>
              <span className="text-xl ml-3">{isOpen ? "▾" : "▸"}</span>
            </button>

            {isOpen && (
              <div className="border-t-2 border-black">
                {chapter.subchapters.map((sub) => {
                  const lines = getLinesBySubchapter(chapter.id, sub.id);
                  if (lines.length === 0) return null;
                  return (
                    <div
                      key={sub.id}
                      className="p-4 border-b border-gray-200 last:border-b-0"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">{sub.title}</h3>
                          <p className="text-xs text-gray-500">
                            {sub.description}
                          </p>
                        </div>
                        <button
                          onClick={() => onStart(lines, "practice")}
                          className="text-xs px-2 py-1 rounded border border-gray-300 hover:bg-gray-100"
                          title="Entraîner tout le sous-chapitre"
                        >
                          Entraîner tout ({lines.length})
                        </button>
                      </div>

                      <ul className="flex flex-col gap-1.5">
                        {lines.map((line) => {
                          const p = progress[line.name];
                          const badge = PRIORITY_BADGE[line.priority];
                          return (
                            <li
                              key={line.name}
                              className="flex items-center gap-2 p-2 rounded border border-gray-200 hover:border-gray-400"
                            >
                              <span
                                className={
                                  "text-[10px] font-bold px-1.5 py-0.5 rounded border " +
                                  badge.cls
                                }
                              >
                                {badge.label}
                              </span>
                              <span className="flex-1 text-sm">
                                {line.name}
                              </span>
                              <div className="flex items-center gap-1 text-xs">
                                {p?.learned && (
                                  <span
                                    className="text-green-600"
                                    title="Parcourue en mode Apprendre"
                                  >
                                    ✓
                                  </span>
                                )}
                                {p && p.bestScore >= 80 && (
                                  <span
                                    className="text-yellow-500"
                                    title={`Meilleur score : ${p.bestScore}%`}
                                  >
                                    ★
                                  </span>
                                )}
                              </div>
                              <button
                                onClick={() => onStart([line], "learn")}
                                className="text-xs px-2 py-1 rounded bg-black text-white hover:bg-gray-800"
                              >
                                Apprendre
                              </button>
                              <button
                                onClick={() => onStart([line], "practice")}
                                className="text-xs px-2 py-1 rounded border border-gray-400 hover:bg-gray-100"
                              >
                                Entraîner
                              </button>
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
  );
}
