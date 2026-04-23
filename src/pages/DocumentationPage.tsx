import { useNavigate } from "react-router-dom";

interface DocumentationPageProps {
  onExit: () => void;
}

export function DocumentationPage({ onExit }: DocumentationPageProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-black selection:bg-wero-yellow flex flex-col pb-20">
      {/* Header */}
      <header className="w-full bg-black text-white py-4 px-6 flex justify-between items-center border-b-[4px] border-black sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <div className="w-8 h-8 bg-wero-yellow rounded-lg border-2 border-white flex items-center justify-center font-black text-black text-sm shadow-[2px_2px_0_0_#fff]">
            R
          </div>
          <span className="font-black uppercase tracking-tighter text-sm italic">Rick Chess Coach</span>
        </div>
        <button 
          onClick={onExit}
          className="text-xs font-black uppercase tracking-widest px-4 py-2 bg-wero-salmon rounded-full border-2 border-white shadow-[2px_2px_0_0_#fff] active:translate-y-[1px] active:shadow-none"
        >
          Retour
        </button>
      </header>

      <main className="max-w-4xl mx-auto px-4 pt-12 sm:pt-20">
        {/* Hero */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-wero-purple border-[3px] border-black font-black text-[10px] uppercase tracking-widest mb-6 shadow-[3px_3px_0_0_#000] text-white">
            🎓 Guide & Documentation
          </div>
          <h1 className="text-5xl sm:text-7xl font-[900] leading-[0.9] tracking-tighter mb-6 italic">
            MAÎTRISER <br />
            <span className="text-wero-salmon">L'ART DE 1.b4</span>
          </h1>
          <p className="text-xl font-bold text-gray-600 leading-relaxed max-w-2xl">
            Bienvenue dans le manuel officiel du système <strong>Rick Wallas</strong>. 
            Apprenez les secrets de l'ouverture Sokolsky et comment tirer le meilleur parti de ce répertoire.
          </p>
        </div>

        {/* Introduction Section */}
        <section className="mb-16">
          <div className="wero-card p-8 sm:p-12 bg-white relative overflow-hidden">
            <div className="absolute top-[-20px] right-[-20px] text-8xl opacity-5 pointer-events-none font-black italic">01</div>
            <h2 className="text-3xl font-black uppercase tracking-tight mb-6 flex items-center gap-4">
              <span className="w-10 h-10 bg-wero-yellow rounded-xl border-[3px] border-black flex items-center justify-center text-xl shadow-[3px_3px_0_0_#000]">🐒</span>
              L'Esprit de l'Orang-outan
            </h2>
            <div className="space-y-6 text-lg font-medium leading-relaxed text-gray-700">
              <p>
                L'Ouverture Sokolsky (1.b4), également connue sous le nom de <strong>Polonaise</strong> ou <strong>Orang-outan</strong>, est l'un des coups les plus surprenants du premier coup.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="p-6 bg-gray-50 border-[3px] border-black rounded-3xl">
                  <h3 className="font-black uppercase text-sm mb-2 text-wero-purple">Espace & Flanc</h3>
                  <p className="text-sm">Au lieu de prendre le centre immédiatement, on réclame un avantage spatial massif à l'aile dame et on développe un puissant fianchetto en b2.</p>
                </div>
                <div className="p-6 bg-gray-50 border-[3px] border-black rounded-3xl">
                  <h3 className="font-black uppercase text-sm mb-2 text-wero-cyan">Psychologie</h3>
                  <p className="text-sm">En sortant des sentiers battus dès le coup 1, vous forcez votre adversaire à réfléchir par lui-même, souvent dans des positions qu'il n'a jamais étudiées.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Strategic Principles */}
        <section className="mb-16">
          <h2 className="text-4xl font-[900] tracking-tighter italic mb-8 uppercase">Principes Stratégiques</h2>
          <div className="grid grid-cols-1 gap-8">
            {/* a3 Rule */}
            <div className="wero-card p-8 bg-wero-cyan">
              <h3 className="text-2xl font-black uppercase mb-4 italic">La Règle du Pion a3</h3>
              <p className="font-bold mb-6">L'une des erreurs les plus fréquentes est de jouer 3.a3 par automatisme. Voici quand le jouer :</p>
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <span className="shrink-0 w-6 h-6 bg-green-500 rounded-full border-2 border-black flex items-center justify-center text-white text-xs">✓</span>
                  <p className="text-sm font-bold"><strong>OUI</strong> si le fou f8 menace réellement de capturer b4 (ex: structures avec ...e6 ou ...Fe7) et que e5 n'est pas en prise.</p>
                </li>
                <li className="flex gap-4">
                  <span className="shrink-0 w-6 h-6 bg-red-500 rounded-full border-2 border-black flex items-center justify-center text-white text-xs">✕</span>
                  <p className="text-sm font-bold"><strong>NON</strong> si le fou est fianchetté en g7. a3 serait un tempo perdu.</p>
                </li>
                <li className="flex gap-4">
                  <span className="shrink-0 w-6 h-6 bg-red-500 rounded-full border-2 border-black flex items-center justify-center text-white text-xs">✕</span>
                  <p className="text-sm font-bold"><strong>NON</strong> si le pion e5 est en prise. On préfère échanger notre pion d'aile contre son pion central.</p>
                </li>
              </ul>
            </div>

            {/* c4 Rule */}
            <div className="wero-card p-8 bg-wero-yellow">
              <h3 className="text-2xl font-black uppercase mb-4 italic">Le Timing de c4</h3>
              <p className="text-sm font-bold leading-relaxed">
                <strong>Règle d'or :</strong> Jouez toujours <strong>c4 AVANT Cc3</strong>. <br /><br />
                Développer le cavalier en c3 prématurément bloque votre pion c et vous prive de la poussée c4, qui est essentielle pour contester le centre noir (notamment contre d5).
              </p>
            </div>
          </div>
        </section>

        {/* Training System */}
        <section className="mb-16">
          <div className="wero-card p-8 sm:p-12 bg-black text-white">
            <h2 className="text-3xl font-black uppercase tracking-tight mb-8">Le Système d'Entraînement</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <div className="w-12 h-12 bg-white rounded-2xl border-[3px] border-wero-purple flex items-center justify-center text-2xl mb-4 text-black">📖</div>
                <h3 className="text-xl font-black uppercase mb-2">Mode Apprendre</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Utilisez ce mode pour découvrir les lignes. Les coups sont indiqués par des flèches et des commentaires détaillés expliquent chaque idée stratégique. Prenez le temps de lire !
                </p>
              </div>
              <div>
                <div className="w-12 h-12 bg-white rounded-2xl border-[3px] border-wero-salmon flex items-center justify-center text-2xl mb-4 text-black">⚔️</div>
                <h3 className="text-xl font-black uppercase mb-2">Mode Entraîner</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Testez vos connaissances. Vous devez trouver les coups du répertoire par vous-même. En cas d'erreur, le coach vous corrigera. Visez un score de 100% pour maîtriser la ligne.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Repertoire Structure */}
        <section className="mb-16">
          <h2 className="text-4xl font-[900] tracking-tighter italic mb-8 uppercase">Structure du Répertoire</h2>
          <div className="space-y-6">
            <div className="flex gap-6 p-6 border-[3px] border-black rounded-[2rem] bg-white">
              <div className="shrink-0 w-16 h-16 bg-wero-salmon rounded-2xl border-[3px] border-black flex items-center justify-center text-2xl shadow-[4px_4px_0_0_#000]">🎯</div>
              <div>
                <h4 className="font-black uppercase text-lg">Must-Know (Essentiel)</h4>
                <p className="text-sm text-gray-500 font-bold italic">Lignes critiques, pièges fréquents et schémas que vous rencontrerez dans 80% des parties.</p>
              </div>
            </div>
            <div className="flex gap-6 p-6 border-[3px] border-black rounded-[2rem] bg-white">
              <div className="shrink-0 w-16 h-16 bg-wero-yellow rounded-2xl border-[3px] border-black flex items-center justify-center text-2xl shadow-[4px_4px_0_0_#000]">⭐</div>
              <div>
                <h4 className="font-black uppercase text-lg">Important</h4>
                <p className="text-sm text-gray-500 font-bold italic">Variantes solides et réponses noires intelligentes qui demandent une connaissance précise.</p>
              </div>
            </div>
            <div className="flex gap-6 p-6 border-[3px] border-black rounded-[2rem] bg-white">
              <div className="shrink-0 w-16 h-16 bg-wero-cyan rounded-2xl border-[3px] border-black flex items-center justify-center text-2xl shadow-[4px_4px_0_0_#000]">🎁</div>
              <div>
                <h4 className="font-black uppercase text-lg">Bonus</h4>
                <p className="text-sm text-gray-500 font-bold italic">Réponses rares, excentriques ou lignes complexes pour approfondir votre compréhension.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer message */}
        <div className="text-center py-12 flex flex-col items-center gap-6">
          <div>
            <p className="text-sm font-black uppercase tracking-widest text-gray-400 mb-4">Prêt à dominer ?</p>
            <button 
              onClick={() => navigate("/")}
              className="wero-button bg-wero-purple text-white text-lg px-12 py-6"
            >
              Commencer l'Entraînement
            </button>
          </div>
          
          <a 
            href="https://github.com/magicolala" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-4 py-2 border-2 border-black rounded-full hover:bg-black hover:text-white transition-colors shadow-[2px_2px_0_0_#000]"
          >
            <span>GitHub</span>
            <span className="opacity-40">@magicolala</span>
          </a>
        </div>
      </main>
    </div>
  );
}
