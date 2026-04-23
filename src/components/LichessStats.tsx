import { useState, useEffect } from 'react';

type Database = 'lichess' | 'masters';

interface Game {
  id: string;
  white: { name: string; rating: number };
  black: { name: string; rating: number };
  year: number;
  winner?: 'white' | 'black';
}

export function LichessStats({ fen }: { fen: string }) {
  const [db, setDb] = useState<Database>('lichess');
  const [stats, setStats] = useState<{ 
    white: number, 
    draws: number, 
    black: number, 
    total: number,
    openingName?: string,
    moves: { san: string, white: number, draws: number, black: number, total: number }[],
    topGames: Game[]
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [isUnauthorized, setIsUnauthorized] = useState(false);
  const [showTokenInput, setShowTokenInput] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('lichess_token') || '');
  const [isHidden, setIsHidden] = useState(localStorage.getItem('lichess_stats_hidden') === 'true');

  useEffect(() => {
    if (isHidden) return;
    
    let isMounted = true;
    setLoading(true);
    setIsUnauthorized(false);

    const fetchStats = async () => {
      try {
        const baseUrl = db === 'masters' 
          ? 'https://explorer.lichess.org/masters'
          : 'https://explorer.lichess.org/lichess';
        
        const params = new URLSearchParams({
          fen: fen
        });

        if (db === 'lichess') {
          params.append('variant', 'standard');
          params.append('speeds', 'blitz,rapid,classical');
          params.append('ratings', '1600,1800,2000,2200');
        }

        const url = `${baseUrl}?${params.toString()}`;
        
        const headers: Record<string, string> = {
          'Accept': 'application/json',
        };
        
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const res = await fetch(url, { headers });
        
        if (res.status === 401) {
          if (isMounted) setIsUnauthorized(true);
          setLoading(false);
          return;
        }
        
        if (!res.ok) throw new Error('API error');
        const data = await res.json();
        
        if (isMounted) {
          const total = data.white + data.draws + data.black;
          if (total > 0 || (data.moves && data.moves.length > 0)) {
             const moves = (data.moves || []).map((m: any) => ({
               san: m.san,
               white: m.white,
               draws: m.draws,
               black: m.black,
               total: m.white + m.draws + m.black
             }));

             const topGames = (data.topGames || []).map((g: any) => ({
               id: g.id,
               white: g.white,
               black: g.black,
               year: g.year,
               winner: g.winner
             }));

             setStats({ 
               white: data.white, 
               draws: data.draws, 
               black: data.black, 
               total, 
               openingName: data.opening?.name,
               moves,
               topGames
             });
          } else {
             setStats(null);
          }
          setLoading(false);
        }
      } catch (e) {
         if (isMounted) {
           setStats(null);
           setLoading(false);
         }
      }
    };

    const timer = setTimeout(fetchStats, 600);
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [fen, token, db, isHidden]);

  const handleSaveToken = (newToken: string) => {
    const trimmed = newToken.trim();
    localStorage.setItem('lichess_token', trimmed);
    setToken(trimmed);
    setShowTokenInput(false);
  };

  const toggleHidden = () => {
    const next = !isHidden;
    setIsHidden(next);
    localStorage.setItem('lichess_stats_hidden', String(next));
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
  };

  if (isHidden) {
    return (
      <button 
        onClick={toggleHidden}
        className="w-full py-3 border-2 border-dashed border-black/10 rounded-2xl text-[9px] font-black uppercase tracking-widest text-gray-400 hover:border-black/30 hover:text-gray-600 transition-all"
      >
        📊 Afficher les stats mondiales Lichess
      </button>
    );
  }

  return (
    <div className="bg-white border-[3px] border-black p-3 pt-2 rounded-2xl shadow-[4px_4px_0_0_#111] mb-4 sm:mb-6 shrink-0 transition-all animate-in fade-in slide-in-from-bottom-2">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-1 bg-gray-100 p-1 rounded-full border-[2px] border-black">
          <button 
            onClick={() => setDb('lichess')}
            className={`text-[8px] sm:text-[9px] font-black px-3 py-1 rounded-full transition-colors ${db === 'lichess' ? 'bg-black text-white' : 'text-gray-400 hover:text-black'}`}
          >
            LICHESS
          </button>
          <button 
            onClick={() => setDb('masters')}
            className={`text-[8px] sm:text-[9px] font-black px-3 py-1 rounded-full transition-colors ${db === 'masters' ? 'bg-black text-white' : 'text-gray-400 hover:text-black'}`}
          >
            MASTERS
          </button>
        </div>
        <div className="flex items-center gap-2">
          {stats && !loading && !isUnauthorized && (
            <span className="text-[9px] uppercase tracking-widest font-bold text-gray-400">{formatNumber(stats.total)} parties</span>
          )}
          <button 
            onClick={toggleHidden}
            title="Masquer les stats"
            className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-black transition-colors"
          >
            ✕
          </button>
        </div>
      </div>

      {loading && (
        <div className="py-8 flex flex-col items-center justify-center gap-2">
          <div className="w-6 h-6 border-[3px] border-black border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Analyse Lichess...</p>
        </div>
      )}

      {isUnauthorized && !loading && (
        <div className="bg-wero-cyan/5 border-2 border-black/10 p-4 rounded-xl mb-2 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-wero-cyan/10 rounded-full -mr-8 -mt-8 blur-2xl group-hover:bg-wero-cyan/20 transition-all"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm">🔑</span>
              <p className="text-[10px] font-black uppercase text-black">Jeton API Requis</p>
            </div>
            <p className="text-[9px] text-gray-600 font-bold leading-tight mb-4">
              Lichess a restreint son explorateur. Pour voir les stats, créez un jeton gratuit sur leur site.
            </p>
            
            <div className="flex flex-col gap-2">
              {!showTokenInput ? (
                <button 
                  onClick={() => setShowTokenInput(true)}
                  className="wero-button !py-2 !text-[9px] bg-black text-white w-full"
                >
                  Configurer mon accès
                </button>
              ) : (
                <div className="space-y-2">
                  <div className="flex gap-1">
                    <input 
                      type="password"
                      placeholder="Collez votre jeton lip_..."
                      autoFocus
                      className="flex-1 px-3 py-2 border-2 border-black rounded-xl text-[9px] font-bold focus:ring-2 focus:ring-wero-cyan outline-none"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSaveToken((e.target as HTMLInputElement).value);
                      }}
                    />
                    <button 
                      onClick={(e) => {
                        const input = (e.currentTarget.previousSibling as HTMLInputElement);
                        handleSaveToken(input.value);
                      }}
                      className="wero-button !py-1 !px-4 bg-wero-cyan text-black"
                    >
                      OK
                    </button>
                  </div>
                  <button 
                    onClick={() => setShowTokenInput(false)}
                    className="text-[8px] font-black uppercase text-gray-400 hover:text-black w-full text-center"
                  >
                    Annuler
                  </button>
                </div>
              )}
              
              {!showTokenInput && (
                <a 
                  href="https://lichess.org/account/oauth/token/create?scopes[]=explorer:read&description=Sokolsky+App"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[9px] font-bold text-wero-purple hover:underline text-center flex items-center justify-center gap-1 mt-1"
                >
                  <span>Créer un jeton sur Lichess.org</span>
                  <span className="text-[10px]">↗</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {!loading && !isUnauthorized && stats && (
        <div className="flex flex-col gap-4">
          {stats.openingName && (
            <div className="bg-wero-purple/10 border-[2px] border-wero-purple/30 rounded-xl p-2">
              <p className="text-[8px] font-black uppercase tracking-widest text-wero-purple/60 mb-0.5">Ouverture</p>
              <p className="text-[10px] sm:text-xs font-black text-wero-purple leading-tight">{stats.openingName}</p>
            </div>
          )}

          <div className="flex flex-col gap-1">
            <div className="h-6 w-full rounded-full border-2 border-black flex overflow-hidden font-bold text-[10px] sm:text-xs shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] relative">
              {(stats.white / stats.total * 100) > 0 && (
                <div title={`Blancs: ${Math.round(stats.white / stats.total * 100)}%`} className="bg-white flex items-center justify-center text-black" style={{ width: `${stats.white / stats.total * 100}%`, borderRight: (stats.draws + stats.black) > 0 ? '2px solid black' : 'none' }}>
                  {stats.white / stats.total * 100 > 8 && `${Math.round(stats.white / stats.total * 100)}%`}
                </div>
              )}
              {(stats.draws / stats.total * 100) > 0 && (
                <div title={`Nulle: ${Math.round(stats.draws / stats.total * 100)}%`} className="bg-gray-300 flex items-center justify-center text-black" style={{ width: `${stats.draws / stats.total * 100}%`, borderRight: stats.black > 0 ? '2px solid black' : 'none' }}>
                  {stats.draws / stats.total * 100 > 8 && `${Math.round(stats.draws / stats.total * 100)}%`}
                </div>
              )}
              {(stats.black / stats.total * 100) > 0 && (
                <div title={`Noirs: ${Math.round(stats.black / stats.total * 100)}%`} className="bg-black flex items-center justify-center text-white" style={{ width: `${stats.black / stats.total * 100}%` }}>
                  {stats.black / stats.total * 100 > 8 && `${Math.round(stats.black / stats.total * 100)}%`}
                </div>
              )}
            </div>
            <div className="flex justify-between px-1">
              <span className="text-[9px] font-bold text-gray-400">Blancs</span>
              <span className="text-[9px] font-bold text-gray-400">Nul</span>
              <span className="text-[9px] font-bold text-gray-400">Noirs</span>
            </div>
          </div>

          {stats.moves.length > 0 && (
            <div className="space-y-1.5">
              <div className="text-[9px] uppercase font-bold tracking-widest text-gray-500 mb-1 border-b-[1px] border-black/10 pb-1">Meilleurs coups :</div>
              {stats.moves.slice(0, 3).map((m, i) => {
                const movePct = (m.total / stats.total) * 100;
                return (
                  <div key={i} className="flex items-center gap-2 text-[10px] sm:text-xs">
                    <span className="font-mono font-bold w-10 sm:w-12 shrink-0">{m.san}</span>
                    <div className="flex-1 bg-gray-100 h-2.5 sm:h-3 rounded-full border border-black/20 overflow-hidden relative">
                       <div className="h-full bg-wero-yellow transition-all" style={{ width: `${Math.max(2, movePct)}%` }}></div>
                    </div>
                    <span className="font-black text-[9px] sm:text-[10px] w-8 sm:w-9 text-right text-gray-600 shrink-0">{Math.round(movePct)}%</span>
                  </div>
                );
              })}
            </div>
          )}

          {stats.topGames.length > 0 && (
            <div className="space-y-2">
              <div className="text-[9px] uppercase font-bold tracking-widest text-gray-500 mb-1 border-b-[1px] border-black/10 pb-1">Parties notables :</div>
              {stats.topGames.slice(0, 2).map((g) => (
                <a 
                  key={g.id}
                  href={`https://lichess.org/${g.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-2 rounded-xl bg-gray-50 border-[2px] border-black/5 hover:border-black/20 transition-all group"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[9px] font-black text-gray-400">{g.year}</span>
                    {g.winner && (
                      <span className={`text-[8px] font-black px-1.5 py-0.5 rounded border ${g.winner === 'white' ? 'bg-white text-black' : 'bg-black text-white'}`}>
                        {g.winner === 'white' ? '1-0' : '0-1'}
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] font-bold truncate group-hover:underline text-black">
                    {g.white.name} vs {g.black.name}
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      )}

      {!loading && isUnauthorized && token && (
        <div className="mt-4 p-2 bg-red-50 border border-red-200 rounded-lg text-center">
          <p className="text-[8px] font-black text-red-600 uppercase mb-2">Jeton actuel invalide ou expiré</p>
          <button 
            onClick={() => {
              localStorage.removeItem('lichess_token');
              setToken('');
            }}
            className="text-[9px] font-black text-white bg-red-600 px-4 py-1 rounded-full uppercase tracking-tighter"
          >
            Effacer et recommencer
          </button>
        </div>
      )}

      {token && !isUnauthorized && !loading && (
        <button 
          onClick={() => {
            localStorage.removeItem('lichess_token');
            setToken('');
          }}
          className="mt-6 text-[8px] text-gray-300 hover:text-red-500 uppercase font-black tracking-tighter transition-colors w-full text-center"
        >
          Déconnecter mon compte Lichess
        </button>
      )}
    </div>
  );
}

