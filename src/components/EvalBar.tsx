import React from 'react';
import { cn } from '../utils';

interface EvalBarProps {
  evalScore: number;
  mate: number | null;
  orientation: 'white' | 'black';
}

export const EvalBar: React.FC<EvalBarProps> = ({ evalScore, mate, orientation }) => {
  let whiteAdvantage = evalScore;
  if (mate !== null) {
    whiteAdvantage = mate > 0 ? 10 : -10; // Treat mate as extreme advantage
  }
  
  // Non-linear mapping commonly used in chess UIs
  // A raw score of +1.0 roughly translates to a noticeable visual bump.
  // Cap it at [-10, 10] for calculating percentage.
  const cappedAdvantage = Math.max(-10, Math.min(10, whiteAdvantage));
  
  // Create percentage from 0 to 100 where 50 is equal. (scaled so +5 is almost full)
  let percentage = 50 + (cappedAdvantage / 10) * 50; 
  percentage = Math.max(0, Math.min(100, percentage));

  const isWhiteBottom = orientation === 'white';
  
  const displayVal = mate !== null ? `M${Math.abs(mate)}` : Math.abs(evalScore).toFixed(1);
  const showTextOnWhite = whiteAdvantage >= 0;

  return (
    <div className="w-4 sm:w-6 h-full bg-[#111] rounded-lg overflow-hidden flex flex-col border-[2px] border-black shadow-[3px_3px_0_0_#111] absolute left-[-24px] sm:left-[-36px] top-0 bottom-0">
      {isWhiteBottom ? (
        <>
          {/* Black portion top */}
          <div 
            className="w-full bg-[#2a2a2a] transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] relative flex flex-col items-center justify-end" 
            style={{ height: `${100 - percentage}%` }} 
          >
             {!showTextOnWhite && <span className="text-[9px] sm:text-[10px] font-bold text-white/80 pb-1">{displayVal}</span>}
          </div>
          
          {/* White portion bottom */}
          <div 
            className="w-full bg-slate-100 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] relative flex flex-col items-center justify-start" 
            style={{ height: `${percentage}%` }}
          >
             {showTextOnWhite && <span className="text-[9px] sm:text-[10px] font-bold text-black/80 pt-1">{displayVal}</span>}
          </div>
        </>
      ) : (
         /* Flipped board: Black bottom, White top */
        <>
          <div 
            className="w-full bg-slate-100 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] relative flex flex-col items-center justify-end" 
            style={{ height: `${percentage}%` }}
          >
             {showTextOnWhite && <span className="text-[9px] sm:text-[10px] font-bold text-black/80 pb-1">{displayVal}</span>}
          </div>
          <div 
            className="w-full bg-[#2a2a2a] transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] relative flex flex-col items-center justify-start" 
            style={{ height: `${100 - percentage}%` }} 
          >
             {!showTextOnWhite && <span className="text-[9px] sm:text-[10px] font-bold text-white/80 pt-1">{displayVal}</span>}
          </div>
        </>
      )}
    </div>
  );
};
