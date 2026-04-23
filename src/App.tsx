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

  // Background randomization
  useEffect(() => {
    const palettes = [
      { c1: "hsla(180, 100%, 90%, 1)", c2: "hsla(250, 100%, 90%, 1)" }, // Cyan/Purple
      { c1: "hsla(10, 100%, 90%, 1)", c2: "hsla(50, 100%, 90%, 1)" },   // Salmon/Yellow
      { c1: "hsla(140, 100%, 90%, 1)", c2: "hsla(210, 100%, 90%, 1)" }, // Lime/Blue
      { c1: "hsla(320, 100%, 92%, 1)", c2: "hsla(180, 100%, 92%, 1)" }, // Pink/Cyan
      { c1: "hsla(45, 100%, 90%, 1)", c2: "hsla(0, 100%, 90%, 1)" },    // Yellow/Red
    ];
    const palette = palettes[Math.floor(Math.random() * palettes.length)];
    document.body.style.setProperty("--bg-color-1", palette.c1);
    document.body.style.setProperty("--bg-color-2", palette.c2);
  }, []);

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

