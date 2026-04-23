import { useState, useEffect } from 'react';

export function LichessStats({ fen }: { fen: string }) {
  const [stats, setStats] = useState<{ 
    white: number, 
    draws: number, 
    black: number, 
    total: number,
    moves: { san: string, white: number, draws: number, black: number, total: number }[]
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
        const url = `https://explorer.lichess.org/lichess?variant=standard&speeds=blitz,rapid,classical&ratings=1600,1800,2000,2200&fen=${encodeURIComponent(fen)}`;
        
        const headers: Record<string, string> = {
          'Accept': 'application/json',
        };
        
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const res = await fetch(url, { headers });
        
        if (res.status === 401) {
          if (isMounted) setIsUnauthorized(true);
          throw new Error('Unauthorized');
        }
        
        if (!res.ok) throw new Error('API error');
        const data = await res.json();
        
        if (isMounted) {
          const total = data.white + data.draws + data.black;
          if (total > 0) {
             const moves = (data.moves || []).map((m: any) => ({
               san: m.san,
               white: m.white,
               draws: m.draws,
               black: m.black,
               total: m.white + m.draws + m.black
             }));
             setStats({ white: data.white, draws: data.draws, black: data.black, total, moves });
          } else {
             setStats(null);
          }
          setLoading(false);
        }
      } catch (e) {
         if (isMounted) {
           if (e instanceof Error && e.message !== 'Unauthorized') {
             setStats(null);
           }
           setLoading(false);
         }
      }
    };

    const timer = setTimeout(fetchStats, 600);
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [fen, token]);

  const handleSaveToken = (newToken: string) => {
    localStorage.setItem('lichess_token', newToken);
    setToken(newToken);
    setShowTokenInput(false);
  };

  if (loading && !stats && !isUnauthorized) {
     return (
       <div className="bg-white border-[3px] border-black/10 rounded-xl p-3 pt-2 mb-4 sm:mb-6 animate-pulse shrink-0">
          <div className="flex justify-between items-baseline mb-2 border-b-2 border-dashed border-black/5 pb-1">
            <div className="h-3 w-1/3 bg-gray-200 rounded"></div>
          </div>
          <div className="h-6 w-full bg-gray-200 rounded-full mb-3"></div>
       </div>
     );
  }

  if (isUnauthorized) {
    return (
      <div className="bg-orange-50 border-2 border-orange-200 p-3 rounded-xl mb-4 text-xs">
        <p className="font-bold text-orange-800 flex items-center gap-2">
          ⚠️ Authentification Lichess requise
        </p>
        <p className="text-orange-700 mt-1">
          Lichess bloque l'accès anonyme. Pour voir les stats, renseignez un jeton (PAT).
        </p>
        {!showTokenInput ? (
          <button 
            onClick={() => setShowTokenInput(true)}
            className="mt-2 text-blue-600 font-bold underline underline-offset-2"
          >
            Configurer mon jeton Lichess
          </button>
        ) : (
          <div className="mt-2 flex gap-2">
            <input 
              type="password"
              placeholder="Votre jeton Lichess (lip_...)"
              className="flex-1 px-2 py-1 border border-orange-300 rounded text-[10px]"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSaveToken((e.target as HTMLInputElement).value);
              }}
            />
            <button 
              onClick={(e) => {
                const input = (e.currentTarget.previousSibling as HTMLInputElement);
                handleSaveToken(input.value);
              }}
              className="px-2 py-1 bg-orange-600 text-white rounded font-bold"
            >
              OK
            </button>
          </div>
        )}
      </div>
    );
  }

  if (!stats) {
     return null;
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
  };

  const wPct = (stats.white / stats.total) * 100;
  const dPct = (stats.draws / stats.total) * 100;
  const bPct = (stats.black / stats.total) * 100;

  const topMoves = stats.moves.slice(0, 3);

  return (
    <div className="bg-white border-[3px] border-black p-3 pt-2 rounded-2xl shadow-[4px_4px_0_0_#111] mb-4 sm:mb-6 shrink-0 transition-opacity animate-in fade-in">
      <div className="flex justify-between items-baseline mb-2 border-b-2 border-dashed border-black/10 pb-1">
        <span className="text-[10px] uppercase font-black tracking-widest text-[#3B82F6] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse"></span>
          Base Lichess
        </span>
        <span className="text-[10px] uppercase tracking-widest font-bold text-gray-500">{formatNumber(stats.total)} parties</span>
      </div>
      
      <div className="h-6 w-full rounded-full border-2 border-black flex overflow-hidden font-bold text-[10px] sm:text-xs shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] relative mb-1">
        {wPct > 0 && (
          <div title={`Blancs: ${Math.round(wPct)}%`} className="bg-white flex items-center justify-center text-black" style={{ width: `${wPct}%`, borderRight: dPct > 0 || bPct > 0 ? '2px solid black' : 'none' }}>
            {wPct > 8 && `${Math.round(wPct)}%`}
          </div>
        )}
        {dPct > 0 && (
          <div title={`Nulle: ${Math.round(dPct)}%`} className="bg-gray-300 flex items-center justify-center text-black" style={{ width: `${dPct}%`, borderRight: bPct > 0 ? '2px solid black' : 'none' }}>
            {dPct > 8 && `${Math.round(dPct)}%`}
          </div>
        )}
        {bPct > 0 && (
          <div title={`Noirs: ${Math.round(bPct)}%`} className="bg-black flex items-center justify-center text-white" style={{ width: `${bPct}%` }}>
            {bPct > 8 && `${Math.round(bPct)}%`}
          </div>
        )}
      </div>
      <div className="flex justify-between px-1 mb-3">
        <span className="text-[9px] font-bold text-gray-400">Blancs</span>
        <span className="text-[9px] font-bold text-gray-400">Nul</span>
        <span className="text-[9px] font-bold text-gray-400">Noirs</span>
      </div>

      {topMoves.length > 0 && (
        <div className="space-y-1.5">
          <div className="text-[9px] uppercase font-bold tracking-widest text-gray-500 mb-1 border-b-[1px] border-black/10 pb-1">Les choix fréquents :</div>
          {topMoves.map((m, i) => {
            const movePct = (m.total / stats.total) * 100;
            return (
              <div key={i} className="flex items-center gap-2 text-xs">
                <span className="font-mono font-bold w-12">{m.san}</span>
                <div className="flex-1 bg-gray-100 h-3 rounded-full border border-black/20 overflow-hidden relative">
                   <div className="h-full bg-[#EAB308] transition-all" style={{ width: `${Math.max(2, movePct)}%` }}></div>
                </div>
                <span className="font-black text-[10px] w-9 text-right text-gray-600">{Math.round(movePct)}%</span>
              </div>
            );
          })}
        </div>
      )}
      
      {token && (
        <button 
          onClick={() => {
            localStorage.removeItem('lichess_token');
            setToken('');
          }}
          className="mt-3 text-[8px] text-gray-400 hover:text-red-500 uppercase font-bold tracking-tighter"
        >
          Effacer mon jeton Lichess
        </button>
      )}
    </div>
  );
}

