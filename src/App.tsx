import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AdminPanel } from "./components/AdminPanel";
import { useSession } from "./engine/useSession";
import { REPERTOIRE } from "./data/repertoire";
import {
  validateRepertoire,
  formatValidationReport,
} from "./lib/validateRepertoire";
import { HomePage } from "./pages/HomePage";
import { SessionPage } from "./pages/SessionPage";
import { ExplorerPage } from "./pages/ExplorerPage";

export default function App() {
  const session = useSession({ opponentMoveDelayMs: 500 });
  const navigate = useNavigate();

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

  const handleStartSession = (lines: any[], mode: any) => {
    session.start(lines, mode);
    navigate("/session");
  };

  const handleExitSession = () => {
    session.exit();
    navigate("/");
  };

  return (
    <div className="min-h-screen">
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              onStart={handleStartSession}
              onExplore={() => navigate("/explorer")}
              onAdmin={() => navigate("/admin")}
            />
          }
        />
        <Route
          path="/session"
          element={
            <SessionPage session={session} onExit={handleExitSession} />
          }
        />
        <Route
          path="/explorer"
          element={<ExplorerPage onExit={() => navigate("/")} />}
        />
        <Route
          path="/admin"
          element={<AdminPanel onExit={() => navigate("/")} />}
        />
      </Routes>
    </div>
  );
}

