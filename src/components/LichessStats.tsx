import { useState, useEffect } from 'react';

export function LichessStats({ fen }: { fen: string }) {
  const [stats, setStats] = useState<{ white: number, draws: number, black: number, total: number } | null>(null);
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
             setStats({ white: data.white, draws: data.draws, black: data.black, total });
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
          <div className="h-6 w-full bg-gray-200 rounded-full"></div>
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

  return (
    <div className="bg-white border-[3px] border-black p-3 pt-2 rounded-2xl shadow-[4px_4px_0_0_#111] mb-4 sm:mb-6 shrink-0 transition-opacity animate-in fade-in">
      <div className="flex justify-between items-baseline mb-2 border-b-2 border-dashed border-black/10 pb-1">
        <span className="text-[10px] uppercase font-black tracking-widest text-[#3B82F6] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse"></span>
          Base Lichess
        </span>
        <span className="text-[10px] uppercase tracking-widest font-bold text-gray-500">{formatNumber(stats.total)} parties</span>
      </div>
      <div className="h-6 w-full rounded-full border-2 border-black flex overflow-hidden font-bold text-[10px] sm:text-xs shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] relative">
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
        
        {/* Helper tooltips overlay via standard title attributes above */}
      </div>
      <div className="flex justify-between mt-1 px-1">
        <span className="text-[9px] font-bold text-gray-400">Blancs</span>
        <span className="text-[9px] font-bold text-gray-400">Nul</span>
        <span className="text-[9px] font-bold text-gray-400">Noirs</span>
      </div>
    </div>
  );
}
