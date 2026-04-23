import { RepertoireMenu } from "../components/RepertoireMenu";
import type { RepertoireLine } from "../data/repertoire";
import type { SessionMode } from "../engine/types";

interface HomePageProps {
  onStart: (queue: RepertoireLine[], mode: SessionMode) => void;
  onExplore: () => void;
  onDocumentation: () => void;
  onAdmin: () => void;
}

export function HomePage({ onStart, onExplore, onDocumentation, onAdmin }: HomePageProps) {
  return (
    <div className="min-h-screen text-black selection:bg-wero-yellow flex flex-col">
      {/* Rick Chess Coach Branding Header */}
      <div className="w-full bg-black text-white py-3 px-6 flex justify-between items-center border-b-[4px] border-black">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-wero-yellow rounded-lg border-2 border-white flex items-center justify-center font-black text-black text-sm shadow-[2px_2px_0_0_#fff]">
            R
          </div>
          <span className="font-black uppercase tracking-tighter text-sm italic">Rick Chess Coach</span>
        </div>
        <div className="hidden sm:block text-[10px] font-black uppercase tracking-widest text-wero-cyan">
          Premium Training System
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-12 sm:pt-20 pb-8 sm:pb-12 px-4 sm:px-6 text-center max-w-4xl mx-auto flex-1">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-wero-cyan border-[3px] border-black font-black text-[9px] sm:text-[10px] uppercase tracking-widest mb-4 sm:mb-6 shadow-[3px_3px_0_0_#000]">
          <span>Sokolsky Repertoire v4</span>
          <span className="opacity-40">|</span>
          <span className="text-white">By Rick Wallas</span>
        </div>
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-[900] leading-[0.9] tracking-tighter mb-6 sm:mb-8 italic">
          MAÎTRISEZ <br />
          <span className="text-wero-purple">L'OUVERTURE 1.b4</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl font-bold text-gray-600 max-w-xl mx-auto leading-relaxed mb-8 sm:mb-10 px-4 sm:px-0">
          Entraînez-vous sur le système complet construit par <strong>Rick Wallas</strong> pour dominer avec l'Orang-outan.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button 
            onClick={onDocumentation}
            className="wero-button bg-wero-purple text-white flex items-center gap-3 py-4 sm:py-5 px-8 sm:px-10"
          >
            <span className="text-xl">🎓</span>
            <span className="text-xs sm:text-sm">Lire le Guide</span>
          </button>
          <button 
            onClick={onExplore}
            className="wero-button bg-white text-black flex items-center gap-3 py-4 sm:py-5 px-8 sm:px-10"
          >
            <span className="text-xl">🔍</span>
            <span className="text-xs sm:text-sm">Explorer</span>
          </button>
        </div>

        <main className="max-w-6xl mx-auto pb-20 text-left">
          <RepertoireMenu 
            onStart={onStart} 
            onExplore={onExplore} 
            onDocumentation={onDocumentation} 
          />
          
          {["localhost", "127.0.0.1"].includes(window.location.hostname) && (
            <div className="max-w-3xl mx-auto mt-12">
              <button
                onClick={onAdmin}
                className="wero-button bg-black text-white w-full py-5 flex items-center justify-center gap-4"
              >
                <span className="text-lg">⚙️</span>
                <span className="uppercase tracking-widest text-xs">Accès Créateur • Admin Panel</span>
              </button>
            </div>
          )}
        </main>
      </section>

      <footer className="py-12 border-t-[4px] border-black bg-white text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-wero-purple rounded-2xl border-[3px] border-black flex items-center justify-center text-2xl shadow-[4px_4px_0_0_#000]">
            👑
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-widest mb-1">
              Rick Chess Coach
            </p>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">
              Design & Répertoire par Rick Wallas • © 2026
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

