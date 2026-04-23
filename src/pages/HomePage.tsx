import { RepertoireMenu } from "../components/RepertoireMenu";
import type { RepertoireLine } from "../data/repertoire";
import type { SessionMode } from "../engine/types";

interface HomePageProps {
  onStart: (queue: RepertoireLine[], mode: SessionMode) => void;
  onExplore: () => void;
  onAdmin: () => void;
}

export function HomePage({ onStart, onExplore, onAdmin }: HomePageProps) {
  return (
    <div className="min-h-screen bg-wero-bg text-black selection:bg-wero-yellow">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-6 text-center max-w-4xl mx-auto">
        <div className="inline-block px-4 py-1.5 rounded-full bg-wero-cyan border-[3px] border-black font-black text-[10px] uppercase tracking-widest mb-6 shadow-[3px_3px_0_0_#000]">
          Sokolsky Repertoire v4
        </div>
        <h1 className="text-6xl md:text-8xl font-[900] leading-[0.9] tracking-tighter mb-8 italic">
          MAÎTRISEZ <br />
          <span className="text-wero-purple">L'OUVERTURE 1.b4</span>
        </h1>
        <p className="text-lg md:text-xl font-bold text-gray-600 max-w-xl mx-auto leading-relaxed mb-10">
          Explorez, apprenez et maîtrisez l'Ouverture Sokolsky avec un système 
          d'entraînement dynamique.
        </p>
      </section>

      <main className="max-w-6xl mx-auto px-4 pb-20">
        <RepertoireMenu onStart={onStart} onExplore={onExplore} />
        
        {["localhost", "127.0.0.1"].includes(window.location.hostname) && (
          <div className="max-w-3xl mx-auto mt-12">
            <button
              onClick={onAdmin}
              className="w-full py-4 px-6 rounded-[2rem] bg-black text-white font-black text-sm uppercase tracking-widest hover:bg-gray-800 transition shadow-[6px_6px_0_0_#ccc] flex items-center justify-center gap-2"
            >
              <span>⚙️ Mode Admin</span>
              <span className="opacity-40 font-bold">• Éditer le répertoire</span>
            </button>
          </div>
        )}
      </main>

      <footer className="py-12 border-t-[3px] border-black bg-white text-center">
        <p className="text-[10px] font-black uppercase tracking-widest opacity-30">
          Chess Repertoire Master • Sokolsky Edition
        </p>
      </footer>
    </div>
  );
}

