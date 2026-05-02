import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Chess } from "chess.js";
import {
  BookOpen,
  Check,
  ChevronDown,
  PanelLeftClose,
  PanelLeftOpen,
  Play,
  Star,
} from "lucide-react";
import { computeThreats } from "../lib/threats";
import { ChessboardPanel } from "../components/ChessboardPanel";
import { LearnPanel } from "../components/LearnPanel";
import { PracticePanel } from "../components/PracticePanel";
import { SessionComplete } from "../components/SessionComplete";
import { playMoveSound, playErrorSound, playSuccessSound } from "../lib/sounds";
import { useSession } from "../engine/useSession";
import {
  CHAPTERS,
  getLinesBySubchapter,
  REPERTOIRE,
} from "../data/repertoire";
import type { ChapterId, RepertoireLine } from "../data/repertoire";
import { progressStore } from "../engine/progressStore";
import type { SessionMode } from "../engine/types";

interface SessionPageProps {
  session: ReturnType<typeof useSession>;
  onExit: () => void;
}

export function SessionPage({ session, onExit }: SessionPageProps) {
  const { state, currentLine, fen, lastMove, expectedMove } = session;
  const [showThreats, setShowThreats] = useState(true);
  const [isCourseSidebarOpen, setIsCourseSidebarOpen] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (state.queue.length === 0) {
      const chapterId = searchParams.get("chapterId");
      const lineName = searchParams.get("lineName");
      const mode = (searchParams.get("mode") as SessionMode) || "learn";
      const moveIndexStr = searchParams.get("move");
      const moveIndex = moveIndexStr ? parseInt(moveIndexStr, 10) : 0;

      if (lineName) {
        const line = REPERTOIRE.find((l) => l.name === lineName);
        if (line) {
          session.start([line], mode, moveIndex);
        }
      } else if (chapterId) {
        const lines = REPERTOIRE.filter((l) => l.chapter === chapterId);
        if (lines.length > 0) {
          session.start(lines, mode);
        }
      }
    }
  }, [searchParams, state.queue.length, session]);

  useEffect(() => {
    if (state.queue.length > 0 && currentLine) {
      const params: Record<string, string> = {
        lineName: currentLine.name,
        mode: state.mode,
      };
      if (state.currentMoveIndex > 0) {
        params.move = state.currentMoveIndex.toString();
      }

      const currentLineInUrl = searchParams.get("lineName");
      const currentMoveInUrl = searchParams.get("move") || "0";
      const currentModeInUrl = searchParams.get("mode");

      if (
        currentLineInUrl !== params.lineName ||
        currentMoveInUrl !== (params.move || "0") ||
        currentModeInUrl !== params.mode
      ) {
        setSearchParams(params, { replace: true });
      }
    }
  }, [
    currentLine,
    state.mode,
    state.currentMoveIndex,
    state.queue.length,
    setSearchParams,
    searchParams,
  ]);

  useEffect(() => {
    if (state.phase === "line-complete" && state.mode === "practice") {
      playSuccessSound();
    }
  }, [state.phase, state.mode]);

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

  const showCompleteScreen =
    state.phase === "line-complete" && state.mode === "practice";
  const showSessionCompleteScreen =
    state.phase === "session-complete" && state.queue.length > 0;
  const hasNextLineInQueue = state.currentLineIndex + 1 < state.queue.length;
  const showAnnotations = state.mode === "learn" || state.showSolution;

  const threatArrows = useMemo(() => {
    if (!showThreats) return [];
    return computeThreats(fen).map((t) => ({
      from: t.from,
      to: t.to,
      color: "red" as const,
    }));
  }, [showThreats, fen]);

  const arrowsToShow = useMemo(() => {
    const arrows: { from: string; to: string; color?: string }[] = [];
    if (showAnnotations && expectedMove) {
      try {
        const chess = new Chess(fen);
        const move = chess.move(expectedMove.san);
        if (move) {
          arrows.push({ from: move.from, to: move.to, color: "yellow" });
        }
      } catch {
        // Invalid FEN or illegal move: keep the board without the hint arrow.
      }
    }
    arrows.push(...threatArrows);
    return arrows.length > 0 ? arrows : undefined;
  }, [showAnnotations, expectedMove, fen, threatArrows]);

  const circlesToShow = showAnnotations ? expectedMove?.circles : undefined;

  const handleMove = ({
    from,
    to,
    promotion,
  }: {
    from: string;
    to: string;
    promotion?: string;
  }): boolean => {
    const result = session.tryUserMove(from, to, promotion);
    if (result === "ok") {
      playMoveSound();
      return true;
    }
    if (result === "wrong") {
      playErrorSound();
      return false;
    }
    return false;
  };

  const handleStartFromSidebar = (
    queue: RepertoireLine[],
    mode: SessionMode,
  ) => {
    if (queue.length === 0) return;
    session.start(queue, mode);
    setSearchParams({ lineName: queue[0].name, mode }, { replace: true });
  };

  if (!currentLine || state.queue.length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-4 flex justify-center items-center h-screen">
        <p>Aucune session en cours.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-3 sm:p-6">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-4 flex items-center justify-between gap-3 lg:hidden">
          <button
            type="button"
            onClick={() => setIsCourseSidebarOpen((v) => !v)}
            className="wero-button bg-white !px-4 !py-2 !text-[10px] flex items-center gap-2"
            title={
              isCourseSidebarOpen
                ? "Fermer la liste des cours"
                : "Ouvrir la liste des cours"
            }
          >
            {isCourseSidebarOpen ? (
              <PanelLeftClose size={16} />
            ) : (
              <PanelLeftOpen size={16} />
            )}
            <span>Cours</span>
          </button>
          <div className="min-w-0 flex-1 text-right">
            <p className="truncate text-xs font-black uppercase">
              {currentLine.name}
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-5 sm:gap-6 items-stretch lg:items-start">
          {isCourseSidebarOpen && (
            <CourseSidebar
              activeLineName={currentLine.name}
              onStart={handleStartFromSidebar}
              onClose={() => setIsCourseSidebarOpen(false)}
            />
          )}

          {!isCourseSidebarOpen && (
            <button
              type="button"
              onClick={() => setIsCourseSidebarOpen(true)}
              className="hidden lg:flex sticky top-6 h-12 w-12 shrink-0 items-center justify-center rounded-full border-[3px] border-black bg-white shadow-[4px_4px_0_0_#000] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#000]"
              title="Ouvrir la liste des cours"
              aria-label="Ouvrir la liste des cours"
            >
              <PanelLeftOpen size={22} />
            </button>
          )}

          <div className="flex-1 flex flex-col lg:flex-row gap-6 sm:gap-8 items-center lg:items-start min-w-0">
            <div className="flex-1 flex flex-col items-center min-w-0">
              <div className="wero-card p-2 sm:p-4 bg-white border-[3px] sm:border-[4px] w-full max-w-[500px] lg:max-w-none">
                <ChessboardPanel
                  fen={fen}
                  arrows={arrowsToShow}
                  circles={circlesToShow}
                  lastMove={lastMove}
                  orientation="white"
                  disabled={
                    state.phase === "waiting-opponent" ||
                    state.phase === "line-complete" ||
                    state.phase === "session-complete" ||
                    state.showSolution
                  }
                  onMove={handleMove}
                />
              </div>

              <div className="mt-6 sm:mt-8 flex flex-row sm:flex-col items-center gap-3 sm:gap-4 w-full justify-center">
                <div className="flex items-center gap-3 bg-black text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border-[2px] sm:border-[3px] border-black shadow-[3px_3px_0_0_#ccc] sm:shadow-[4px_4px_0_0_#ccc]">
                  <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest opacity-60">
                    Ligne
                  </span>
                  <span className="text-xs sm:text-sm font-black italic">
                    {state.currentLineIndex + 1} / {state.queue.length}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setShowThreats((v) => !v)}
                  className={`wero-button !py-1.5 sm:!py-3 !text-[10px] sm:!text-xs ${
                    showThreats ? "bg-wero-salmon text-white" : "bg-white"
                  }`}
                >
                  {showThreats ? "Threats ON" : "Show Threats"}
                </button>
              </div>
            </div>

            <aside className="w-full lg:w-[460px] flex flex-col gap-6 shrink-0">
              {showSessionCompleteScreen && (
                <SessionComplete
                  mode={state.mode}
                  line={currentLine}
                  stats={state.stats}
                  hasNextLine={false}
                  onNextLine={() => {}}
                  onRestart={session.restartLine}
                  onExit={onExit}
                />
              )}

              {!showSessionCompleteScreen && showCompleteScreen && (
                <SessionComplete
                  mode={state.mode}
                  line={currentLine}
                  stats={state.stats}
                  hasNextLine={hasNextLineInQueue}
                  onNextLine={session.nextLine}
                  onRestart={session.restartLine}
                  onExit={onExit}
                />
              )}

              {!showCompleteScreen &&
                !showSessionCompleteScreen &&
                state.mode === "learn" && (
                  <LearnPanel
                    line={currentLine}
                    currentMoveIndex={state.currentMoveIndex}
                    fen={fen}
                    expectedMove={expectedMove}
                    isLineComplete={state.phase === "line-complete"}
                    onAdvance={session.advanceLearn}
                    onFinishLine={session.finishLearnLine}
                    onExit={onExit}
                  />
                )}

              {!showCompleteScreen &&
                !showSessionCompleteScreen &&
                state.mode === "practice" && (
                  <PracticePanel
                    line={currentLine}
                    currentMoveIndex={state.currentMoveIndex}
                    expectedMove={expectedMove}
                    attemptsOnCurrentMove={state.attemptsOnCurrentMove}
                    showSolution={state.showSolution}
                    lastError={state.lastError}
                    isUserTurn={session.isUserTurn}
                    isWaitingOpponent={state.phase === "waiting-opponent"}
                    onContinueAfterSolution={session.continueAfterSolution}
                    onRestart={session.restartLine}
                    onExit={onExit}
                  />
                )}
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

interface CourseSidebarProps {
  activeLineName: string;
  onStart: (queue: RepertoireLine[], mode: SessionMode) => void;
  onClose: () => void;
}

const PRIORITY_STYLE: Record<RepertoireLine["priority"], string> = {
  "must-know": "bg-wero-salmon text-white",
  important: "bg-wero-yellow text-black",
  bonus: "bg-wero-cyan text-black",
};

function CourseSidebar({
  activeLineName,
  onStart,
  onClose,
}: CourseSidebarProps) {
  const progress = useMemo(() => progressStore.getAll(), []);
  const activeLine = useMemo(
    () => REPERTOIRE.find((line) => line.name === activeLineName),
    [activeLineName],
  );
  const [openChapters, setOpenChapters] = useState<Record<string, boolean>>(
    () =>
      Object.fromEntries(
        CHAPTERS.map((chapter) => [
          chapter.id,
          chapter.id === activeLine?.chapter || chapter.order === 1,
        ]),
      ),
  );

  useEffect(() => {
    if (!activeLine) return;
    setOpenChapters((current) => ({ ...current, [activeLine.chapter]: true }));
  }, [activeLine]);

  const toggleChapter = (id: ChapterId) => {
    setOpenChapters((current) => ({ ...current, [id]: !current[id] }));
  };

  return (
    <aside className="w-full lg:w-[340px] xl:w-[380px] shrink-0 lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)]">
      <div className="wero-card bg-white overflow-hidden h-full flex flex-col">
        <div className="p-4 border-b-[3px] border-black bg-wero-yellow flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-black uppercase tracking-widest text-black/60">
              Cours
            </p>
            <h2 className="text-lg font-black uppercase truncate">
              Repertoire 1.b4
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="h-10 w-10 shrink-0 rounded-full border-[2px] border-black bg-white flex items-center justify-center shadow-[2px_2px_0_0_#000] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_#000]"
            title="Fermer la liste des cours"
            aria-label="Fermer la liste des cours"
          >
            <PanelLeftClose size={18} />
          </button>
        </div>

        <div className="custom-scrollbar overflow-y-auto p-3 flex flex-col gap-3 lg:max-h-[calc(100vh-9rem)]">
          {CHAPTERS.map((chapter) => {
            const isOpen = openChapters[chapter.id];
            const chapterLines = REPERTOIRE.filter(
              (line) => line.chapter === chapter.id,
            );

            return (
              <section
                key={chapter.id}
                className="rounded-2xl border-[2px] border-black bg-white overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleChapter(chapter.id)}
                  className={`w-full p-3 flex items-center justify-between gap-3 text-left transition ${
                    isOpen ? "bg-black text-white" : "bg-gray-50 hover:bg-white"
                  }`}
                >
                  <div className="min-w-0">
                    <h3 className="text-[12px] font-black uppercase truncate">
                      {chapter.title}
                    </h3>
                    <p
                      className={`text-[10px] font-bold ${
                        isOpen ? "text-white/60" : "text-gray-500"
                      }`}
                    >
                      {chapterLines.length} lignes
                    </p>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t-[2px] border-black">
                    {chapter.subchapters.map((subchapter) => {
                      const lines = getLinesBySubchapter(
                        chapter.id,
                        subchapter.id,
                      );
                      if (lines.length === 0) return null;

                      return (
                        <div
                          key={subchapter.id}
                          className="p-3 border-b-[2px] border-black last:border-b-0"
                        >
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <h4 className="text-[11px] font-black uppercase text-wero-purple">
                              {subchapter.title}
                            </h4>
                            <button
                              type="button"
                              onClick={() => onStart(lines, "practice")}
                              className="h-8 w-8 shrink-0 rounded-full border-[2px] border-black bg-gray-100 flex items-center justify-center transition hover:bg-black hover:text-white"
                              title={`Entrainer ${subchapter.title}`}
                              aria-label={`Entrainer ${subchapter.title}`}
                            >
                              <Play size={14} fill="currentColor" />
                            </button>
                          </div>

                          <ul className="flex flex-col gap-2">
                            {lines.map((line) => {
                              const isActive = line.name === activeLineName;
                              const lineProgress = progress[line.name];

                              return (
                                <li key={line.name}>
                                  <div
                                    className={`rounded-xl border-[2px] p-2 transition ${
                                      isActive
                                        ? "border-black bg-wero-cyan shadow-[2px_2px_0_0_#000]"
                                        : "border-gray-200 bg-gray-50 hover:border-black hover:bg-white"
                                    }`}
                                  >
                                    <div className="flex items-start gap-2">
                                      <span
                                        className={`mt-0.5 h-4 min-w-4 rounded border border-black text-[7px] font-black flex items-center justify-center ${PRIORITY_STYLE[line.priority]}`}
                                        title={line.priority}
                                      >
                                        !
                                      </span>
                                      <button
                                        type="button"
                                        onClick={() => onStart([line], "learn")}
                                        className="min-w-0 flex-1 text-left"
                                      >
                                        <span className="block text-[12px] font-black leading-tight">
                                          {line.name}
                                        </span>
                                        {line.description && (
                                          <span className="mt-1 block max-h-8 overflow-hidden text-[10px] font-bold leading-snug text-gray-500">
                                            {line.description}
                                          </span>
                                        )}
                                      </button>
                                    </div>

                                    <div className="mt-2 flex items-center justify-between gap-2">
                                      <div className="flex items-center gap-1 text-gray-500">
                                        {lineProgress?.learned && (
                                          <Check
                                            size={14}
                                            className="text-green-600"
                                            aria-label="Appris"
                                          />
                                        )}
                                        {lineProgress &&
                                          lineProgress.bestScore >= 80 && (
                                            <Star
                                              size={14}
                                              className="text-amber-500"
                                              fill="currentColor"
                                              aria-label="Score eleve"
                                            />
                                          )}
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <button
                                          type="button"
                                          onClick={() => onStart([line], "learn")}
                                          className="h-8 w-8 rounded-full border-[2px] border-black bg-white flex items-center justify-center transition hover:bg-wero-yellow"
                                          title="Apprendre"
                                          aria-label={`Apprendre ${line.name}`}
                                        >
                                          <BookOpen size={14} />
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() =>
                                            onStart([line], "practice")
                                          }
                                          className="h-8 w-8 rounded-full border-[2px] border-black bg-black text-white flex items-center justify-center transition hover:bg-gray-800"
                                          title="Entrainer"
                                          aria-label={`Entrainer ${line.name}`}
                                        >
                                          <Play size={13} fill="currentColor" />
                                        </button>
                                      </div>
                                    </div>
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
    </aside>
  );
}
