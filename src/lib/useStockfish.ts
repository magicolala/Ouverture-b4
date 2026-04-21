import { useState, useEffect, useRef } from 'react';

interface StockfishState {
  evalScore: number;
  mate: number | null;
  bestMove: string;
  isThinking: boolean;
}

export function useStockfish(fen: string, enabled: boolean, depth = 12) {
  const [state, setState] = useState<StockfishState>({
    evalScore: 0,
    mate: null,
    bestMove: '',
    isThinking: false
  });
  
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    if (!enabled) return;

    let active = true;

    const startEngine = async () => {
      if (!workerRef.current) {
        try {
          // Fetch Stockfish 10 (Vanilla JS without SharedArrayBuffer requirements)
          const res = await fetch('https://cdnjs.cloudflare.com/ajax/libs/stockfish.js/10.0.2/stockfish.js');
          const text = await res.text();
          const blob = new Blob([text], { type: 'application/javascript' });
          workerRef.current = new Worker(URL.createObjectURL(blob));
          
          workerRef.current.onmessage = (e) => {
            if (!active) return;
            const line = e.data;
            
            if (typeof line !== 'string') return;

            if (line.startsWith('info') && line.includes('score')) {
              const cpMatch = line.match(/score cp (-?\d+)/);
              const mateMatch = line.match(/score mate (-?\d+)/);
              
              // In UCI, the score is from the perspective of the side to move
              const isBlackToMove = fen.split(' ')[1] === 'b';
              
              setState(s => {
                const next = { ...s, isThinking: true };
                if (cpMatch) {
                  const val = parseInt(cpMatch[1], 10) / 100;
                  next.evalScore = isBlackToMove ? -val : val; // Convert to absolute (+ is white, - is black)
                  next.mate = null;
                }
                if (mateMatch) {
                  const m = parseInt(mateMatch[1], 10);
                  next.mate = isBlackToMove ? -m : m;
                }
                return next;
              });
            }

            if (line.startsWith('bestmove')) {
              const bmMatch = line.match(/bestmove (\S+)/);
              if (bmMatch) {
                setState(s => ({ ...s, bestMove: bmMatch[1], isThinking: false }));
              }
            }
          };
          
          workerRef.current.postMessage('uci');
          workerRef.current.postMessage('isready');
        } catch (err) {
          console.error("Failed to load Stockfish", err);
        }
      }
      
      if (workerRef.current) {
        setState(s => ({ ...s, isThinking: true }));
        workerRef.current.postMessage('stop');
        workerRef.current.postMessage(`position fen ${fen}`);
        workerRef.current.postMessage(`go depth ${depth}`);
      }
    };

    startEngine();

    return () => {
      active = false;
      // We don't terminate the worker here to save initialization time,
      // we just ignore its current messages until fen changes.
    };
  }, [fen, enabled, depth]);

  return state;
}
