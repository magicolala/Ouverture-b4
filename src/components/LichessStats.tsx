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

  useEffect(() => {
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
  }, [fen, token, db]);

  const handleSaveToken = (newToken: string) => {
    localStorage.setItem('lichess_token', newToken);
    setToken(newToken);
    setShowTokenInput(false);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
  };

  return (
    <div className="bg-white border-[3px] border-black p-3 pt-2 rounded-2xl shadow-[4px_4px_0_0_#111] mb-4 sm:mb-6 shrink-0 transition-opacity animate-in fade-in">
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
        {stats && !loading && !isUnauthorized && (
          <span className="text-[9px] uppercase tracking-widest font-bold text-gray-400">{formatNumber(stats.total)} parties</span>
        )}
      </div>

      {loading && (
        <div className="py-8 flex flex-col items-center justify-center gap-2">
          <div className="w-6 h-6 border-[3px] border-black border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Chargement...</p>
        </div>
      )}

      {isUnauthorized && !loading && (
        <div className="bg-orange-50 border-2 border-orange-200 p-4 rounded-xl mb-2">
          <p className="text-[10px] font-black uppercase text-orange-800 mb-2">⚠️ Accès restreint</p>
          <p className="text-[10px] text-orange-700 font-bold leading-tight mb-3">Lichess demande une authentification.</p>
          
          <div className="flex flex-col gap-2">
            {!showTokenInput ? (
              <button 
                onClick={() => setShowTokenInput(true)}
                className="wero-button !py-1.5 !text-[9px] bg-orange-600 text-white"
              >
                Saisir mon jeton
              </button>
            ) : (
              <div className="flex gap-1">
                <input 
                  type="password"
                  placeholder="lip_..."
                  className="flex-1 px-3 py-1.5 border-2 border-black rounded-full text-[9px] font-bold"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveToken((e.target as HTMLInputElement).value);
                  }}
                />
                <button 
                  onClick={(e) => {
                    const input = (e.currentTarget.previousSibling as HTMLInputElement);
                    handleSaveToken(input.value);
                  }}
                  className="wero-button !py-1 !px-3 bg-black text-white"
                >
                  OK
                </button>
              </div>
            )}
            <a 
              href="https://lichess.org/account/oauth/token/create?scopes[]=explorer:read&description=Sokolsky+App"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[8px] font-bold text-blue-600 hover:underline text-center"
            >
              Créer un jeton sur Lichess.org
            </a>
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
                  <div className="text-[10px] font-bold truncate group-hover:underline">
                    {g.white.name} vs {g.black.name}
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      )}

      {token && (
        <button 
          onClick={() => {
            localStorage.removeItem('lichess_token');
            setToken('');
          }}
          className="mt-4 text-[8px] text-gray-400 hover:text-red-500 uppercase font-black tracking-tighter"
        >
          Effacer mon jeton Lichess
        </button>
      )}
    </div>
  );
}

