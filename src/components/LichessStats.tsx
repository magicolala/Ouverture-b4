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

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const fetchStats = async () => {
      try {
        // Query Lichess API for the given position
        // speeds=blitz,rapid,classical and ratings=1600-2200 (focus on club/tournament players)
        const url = `https://explorer.lichess.ovh/lichess?variant=standard&speeds=blitz,rapid,classical&ratings=1600,1800,2000,2200&fen=${encodeURIComponent(fen)}`;
        const res = await fetch(url);
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
           setStats(null);
           setLoading(false);
         }
      }
    };

    // Debounce to respect Lichess 1 request/second rate limits
    const timer = setTimeout(fetchStats, 600);
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [fen]);

  if (loading && !stats) {
     return (
       <div className="bg-white border-[3px] border-black/10 rounded-xl p-3 pt-2 mb-4 sm:mb-6 animate-pulse shrink-0">
          <div className="flex justify-between items-baseline mb-2 border-b-2 border-dashed border-black/5 pb-1">
            <div className="h-3 w-1/3 bg-gray-200 rounded"></div>
          </div>
          <div className="h-6 w-full bg-gray-200 rounded-full mb-3"></div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-100 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-100 rounded"></div>
          </div>
       </div>
     );
  }

  if (!stats) {
     return null; // Don't show if there are no games in DB
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
  };

  const wPct = (stats.white / stats.total) * 100;
  const dPct = (stats.draws / stats.total) * 100;
  const bPct = (stats.black / stats.total) * 100;

  // Filter top moves (max 3)
  const topMoves = stats.moves.slice(0, 3);

  return (
    <div className="bg-white border-[3px] border-black p-3 pt-2 rounded-2xl shadow-[4px_4px_0_0_#111] mb-4 sm:mb-6 shrink-0 transition-opacity animate-in fade-in">
      <div className="flex justify-between items-baseline mb-2 border-b-2 border-dashed border-black/10 pb-1">
        <span className="text-[10px] uppercase font-black tracking-widest text-[#3B82F6] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse"></span>
          Base Lichess (Probabilités Humaines)
        </span>
        <span className="text-[10px] uppercase tracking-widest font-bold text-gray-500">{formatNumber(stats.total)} parties</span>
      </div>
      
      {/* Global Win/Loss logic */}
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

      {/* Probability moves */}
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
    </div>
  );
}
