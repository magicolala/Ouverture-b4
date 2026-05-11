import { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
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
import { DocumentationPage } from "./pages/DocumentationPage";

import { ToastProvider } from "./components/Toast";

export default function App() {
  const session = useSession({ opponentMoveDelayMs: 500 });
  const navigate = useNavigate();
  const location = useLocation();

  // Background randomization on each navigation
  useEffect(() => {
    const palettes = [
      { // Cyan/Purple/Blue
        c1: "hsla(180, 100%, 92%, 1)", c2: "hsla(250, 100%, 92%, 1)",
        c3: "hsla(210, 100%, 94%, 1)", c4: "hsla(280, 100%, 94%, 1)" 
      },
      { // Salmon/Yellow/Orange
        c1: "hsla(10, 100%, 92%, 1)", c2: "hsla(50, 100%, 92%, 1)",
        c3: "hsla(30, 100%, 94%, 1)", c4: "hsla(60, 100%, 94%, 1)"
      },
      { // Lime/Emerald/Teal
        c1: "hsla(140, 100%, 92%, 1)", c2: "hsla(170, 100%, 92%, 1)",
        c3: "hsla(155, 100%, 94%, 1)", c4: "hsla(190, 100%, 94%, 1)"
      },
      { // Pink/Rose/Indigo
        c1: "hsla(330, 100%, 94%, 1)", c2: "hsla(260, 100%, 94%, 1)",
        c3: "hsla(350, 100%, 96%, 1)", c4: "hsla(230, 100%, 96%, 1)"
      },
      { // Gold/Amber/Yellow
        c1: "hsla(45, 100%, 92%, 1)", c2: "hsla(55, 100%, 92%, 1)",
        c3: "hsla(40, 100%, 94%, 1)", c4: "hsla(65, 100%, 94%, 1)"
      },
    ];
    
    const palette = palettes[Math.floor(Math.random() * palettes.length)];
    const root = document.body;
    root.style.setProperty("--bg-color-1", palette.c1);
    root.style.setProperty("--bg-color-2", palette.c2);
    root.style.setProperty("--bg-color-3", palette.c3);
    root.style.setProperty("--bg-color-4", palette.c4);
  }, [location.pathname]);

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
    <ToastProvider>
      <div className="min-h-screen">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onStart={handleStartSession}
                onExplore={() => navigate("/explorer")}
                onDocumentation={() => navigate("/documentation")}
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
          <Route
            path="/documentation"
            element={<DocumentationPage onExit={() => navigate("/")} />}
          />
        </Routes>
      </div>
    </ToastProvider>
  );
}
