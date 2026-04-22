import { useEffect, useMemo, useState } from "react";
import { Chess } from "chess.js";
import { ChessboardPanel } from "./components/ChessboardPanel";
import { LearnPanel } from "./components/LearnPanel";
import { PracticePanel } from "./components/PracticePanel";
import { SessionComplete } from "./components/SessionComplete";
import { RepertoireMenu } from "./components/RepertoireMenu";
import { AdminPanel } from "./components/AdminPanel";
import { useSession } from "./engine/useSession";
import {
  playMoveSound,
  playErrorSound,
  playSuccessSound,
} from "./lib/sounds";
import { REPERTOIRE } from "./data/repertoire";
import {
  validateRepertoire,
  formatValidationReport,
} from "./lib/validateRepertoire";

export default function App() {
  const session = useSession({ opponentMoveDelayMs: 500 });
  const { state, currentLine, fen, lastMove, expectedMove } = session;
  const [adminMode, setAdminMode] = useState(false);

  // Validation du répertoire au démarrage (dev only).
  useEffect(() => {
    const report = validateRepertoire(REPERTOIRE, {
      sloppy: true,
      validateShapes: true,
    });
    if (!report.ok || report.warnings.length > 0) {
      console.warn("Sokolsky Validator:\n" + formatValidationReport(report));
    } else {
      console.log("Sokolsky Validator: " + formatValidationReport(report));
    }
  }, []);

  // Sons sur changements d'état.
  useEffect(() => {
    if (state.phase === "line-complete" && state.mode === "practice") {
      playSuccessSound();
    }
  }, [state.phase, state.mode]);

  const inSession = currentLine != null;
  const showCompleteScreen =
    state.phase === "line-complete" && state.mode === "practice";
  const showSessionCompleteScreen =
    state.phase === "session-complete" && state.queue.length > 0;
  const hasNextLineInQueue = state.currentLineIndex + 1 < state.queue.length;

  // En PRACTICE, annotations masquées tant que l'utilisateur cherche.
  const showAnnotations = state.mode === "learn" || state.showSolution;

  // Flèche jaune auto-générée pour le coup à jouer (from→to).
  const arrowsToShow = useMemo(() => {
    if (!showAnnotations || !expectedMove) return undefined;
    try {
      const chess = new Chess(fen);
      const move = chess.move(expectedMove.san);
      if (move) {
        return [{ from: move.from, to: move.to, color: "yellow" as const }];
      }
    } catch {
      // FEN invalide ou coup illégal : on ne montre pas de flèche.
    }
    return undefined;
  }, [showAnnotations, expectedMove, fen]);
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

  if (adminMode) {
    return <AdminPanel onExit={() => setAdminMode(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#fdfaf6] text-gray-900">
      {!inSession && (
        <>
          <RepertoireMenu onStart={session.start} />
          <div className="max-w-3xl mx-auto px-4 pb-6">
            <button
              onClick={() => setAdminMode(true)}
              className="w-full py-3 px-4 rounded-xl bg-gray-800 text-gray-300 font-semibold text-sm border-2 border-gray-600 hover:bg-gray-700 transition shadow"
            >
              ⚙️ Mode Admin — Éditer le répertoire
            </button>
          </div>
        </>
      )}

      {inSession && state.queue.length > 0 && (
        <div className="max-w-6xl mx-auto p-4 flex flex-col lg:flex-row gap-6">
          <div className="flex-1 min-w-0">
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
            <div className="mt-2 text-center text-xs text-gray-500">
              Ligne {state.currentLineIndex + 1} / {state.queue.length}
            </div>
          </div>

          <aside className="w-full lg:w-[380px] flex flex-col gap-4">
            {currentLine && showSessionCompleteScreen && (
              <SessionComplete
                mode={state.mode}
                line={currentLine}
                stats={state.stats}
                hasNextLine={false}
                onNextLine={() => {}}
                onRestart={session.restartLine}
                onExit={session.exit}
              />
            )}

            {currentLine &&
              !showSessionCompleteScreen &&
              showCompleteScreen && (
                <SessionComplete
                  mode={state.mode}
                  line={currentLine}
                  stats={state.stats}
                  hasNextLine={hasNextLineInQueue}
                  onNextLine={session.nextLine}
                  onRestart={session.restartLine}
                  onExit={session.exit}
                />
              )}

            {currentLine &&
              !showCompleteScreen &&
              !showSessionCompleteScreen &&
              state.mode === "learn" && (
                <LearnPanel
                  line={currentLine}
                  currentMoveIndex={state.currentMoveIndex}
                  expectedMove={expectedMove}
                  isLineComplete={state.phase === "line-complete"}
                  onAdvance={session.advanceLearn}
                  onFinishLine={session.finishLearnLine}
                  onExit={session.exit}
                />
              )}

            {currentLine &&
              !showCompleteScreen &&
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
                  onExit={session.exit}
                />
              )}
          </aside>
        </div>
      )}
    </div>
  );
}
