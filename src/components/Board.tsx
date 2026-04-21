import React, { useMemo, useState } from "react";
import { renderPiece } from "./Pieces";
import { cn } from "../utils";
import { MoveAnnotation } from "../data/repertoire";
import { Chess } from "chess.js";

interface BoardProps {
  game: Chess;
  orientation: "white" | "black";
  lastMove?: { from: string; to: string } | null;
  hintSquare?: string | null;
  annotations?: {
    arrows?: MoveAnnotation["arrows"];
    circles?: MoveAnnotation["circles"];
  };
  onSquareClick?: (square: string) => void;
  selectedSquare?: string | null;
}

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];
const RANKS = ["8", "7", "6", "5", "4", "3", "2", "1"];

export const Board: React.FC<BoardProps> = ({
  game,
  orientation,
  lastMove,
  hintSquare,
  annotations,
  onSquareClick,
  selectedSquare,
}) => {
  const board = game.board();

  // Pre-calculate orientation mapping
  const isWhite = orientation === "white";
  const files = isWhite ? FILES : [...FILES].reverse();
  const ranks = isWhite ? RANKS : [...RANKS].reverse();

  // Local state for user-drawn arrows (right click)
  const [userArrows, setUserArrows] = useState<{from: string, to: string}[]>([]);
  const [dragStartSq, setDragStartSq] = useState<string | null>(null);
  const [dragCurrentSq, setDragCurrentSq] = useState<string | null>(null);

  const getSquareToCoords = (sq: string) => {
    const f = files.indexOf(sq[0]);
    const r = ranks.indexOf(sq[1]);
    return {
      x: (f + 0.5) * 12.5,
      y: (r + 0.5) * 12.5,
    };
  };

  const getSquareToPercentage = (sq: string) => {
    const f = files.indexOf(sq[0]);
    const r = ranks.indexOf(sq[1]);
    return {
      left: `${f * 12.5}%`,
      top: `${r * 12.5}%`,
    };
  };

  const colors = {
    green: "#84CC16", // Lime
    red: "#EC4899", // Rick Pink
    yellow: "#EAB308", // Yellow
    blue: "#3B82F6", // Blue
  };

  // Clear drawn arrows on left click or piece interaction
  const handleLeftClick = (sq: string) => {
    setUserArrows([]);
    onSquareClick?.(sq);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent standard right-click menu
  };

  const handlePointerDown = (e: React.PointerEvent, sq: string) => {
    if (e.button === 2 || e.pointerType === 'pen' && e.buttons === 2) {
      // Right click started
      setDragStartSq(sq);
      setDragCurrentSq(sq);
      e.currentTarget.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerEnter = (e: React.PointerEvent, sq: string) => {
    if (dragStartSq !== null) {
      setDragCurrentSq(sq);
    }
  };

  const handlePointerUp = (e: React.PointerEvent, sq: string) => {
    if (dragStartSq !== null && dragCurrentSq !== null) {
      // Finished drawing
      const from = dragStartSq;
      const to = dragCurrentSq;
      
      if (from !== to) {
        setUserArrows((prev) => {
          // Toggle logic: if arrow exists, remove it, else add it
          const exists = prev.findIndex(a => a.from === from && a.to === to);
          if (exists >= 0) {
            return prev.filter((_, i) => i !== exists);
          } else {
            return [...prev, { from, to }];
          }
        });
      }
      
      setDragStartSq(null);
      setDragCurrentSq(null);
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const pieces = useMemo(() => {
    const pList: { sq: string; color: string; type: string; id: string }[] = [];
    
    FILES.forEach(f => {
      RANKS.forEach(r => {
        const sq = f + r;
        const pc = game.get(sq as any);
        if (pc) {
          // Uniqueness: typically sq + type is enough for simple reposition,
          // but for perfect animation of captures/promotions, many libs use deeper hashes.
          // For fluid CSS we rely on the React key representing the current occupier.
          pList.push({ sq, color: pc.color, type: pc.type, id: `${sq}-${pc.color}-${pc.type}` });
        }
      });
    });
    return pList;
  }, [game.fen()]); 

  return (
    <div className="relative w-full aspect-square border-4 border-black rounded-xl shadow-[8px_8px_0_0_#111] overflow-hidden bg-white">
      {/* 1. Underlying Squares Grid */}
      <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
        {ranks.map((rank, r) =>
          files.map((file, f) => {
            const sq = file + rank;
            const isLight = (f + r) % 2 === 0;
            
            const isLastMove = lastMove?.from === sq || lastMove?.to === sq;
            const isSelected = selectedSquare === sq;
            const isHint = hintSquare === sq;

            // valid move dots
            let isMoveTarget = false;
            let isCaptureTarget = false;
            if (selectedSquare) {
              const moves = game.moves({ square: selectedSquare, verbose: true });
              const move = (moves as any[]).find((m) => m.to === sq);
              if (move) {
                isMoveTarget = true;
                if (game.get(sq as any)) isCaptureTarget = true;
              }
            }

            return (
              <div
                key={`bg-${sq}`}
                onClick={() => handleLeftClick(sq)}
                onContextMenu={handleContextMenu}
                onPointerDown={(e) => handlePointerDown(e, sq)}
                onPointerEnter={(e) => handlePointerEnter(e, sq)}
                onPointerUp={(e) => handlePointerUp(e, sq)}
                className={cn(
                  "relative flex items-center justify-center cursor-pointer select-none w-full h-full",
                  isLight ? "bg-white" : "bg-[#3B82F6]",
                  isLastMove && "after:absolute after:inset-0 after:bg-yellow-300/40",
                  isSelected && "after:absolute after:inset-0 after:bg-yellow-400/60",
                  isHint && "after:absolute after:inset-0 after:bg-green-400/50 after:animate-pulse"
                )}
              >
                {/* Coordinates */}
                {f === 0 && (
                  <span
                    className={cn(
                      "absolute top-0.5 left-1 text-[10px] sm:text-xs font-bold",
                      isLight ? "text-[#3B82F6]" : "text-white"
                    )}
                  >
                    {rank}
                  </span>
                )}
                {r === 7 && (
                  <span
                    className={cn(
                      "absolute bottom-0.5 right-1 text-[10px] sm:text-xs font-bold",
                      isLight ? "text-[#3B82F6]" : "text-white"
                    )}
                  >
                    {file}
                  </span>
                )}

                {/* Move indicators */}
                {isMoveTarget && !isCaptureTarget && (
                  <div className="absolute w-[30%] h-[30%] rounded-full bg-black/20 z-10 pointer-events-none" />
                )}
                {isMoveTarget && isCaptureTarget && (
                  <div className="absolute inset-1 rounded-full border-4 border-black/20 z-10 pointer-events-none" />
                )}
              </div>
            );
          })
        )}
      </div>

      {/* 2. Absolute Animated Pieces */}
      <div className="absolute inset-0 pointer-events-none">
        {pieces.map((p) => {
          const pos = getSquareToPercentage(p.sq);
          return (
            <div
              key={`${p.color}-${p.type}-${p.sq}`} // Include sq in key to force re-render smoothly
              style={{
                left: pos.left,
                top: pos.top,
                width: "12.5%",
                height: "12.5%",
              }}
              className="absolute flex items-center justify-center transition-all duration-200 ease-in-out pointer-events-none z-20"
            >
              {renderPiece(p.color, p.type)}
            </div>
          );
        })}
      </div>

      {/* 3. SVG Overlay for Arrows & Circles */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-30" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          {Object.entries(colors).map(([name, color]) => (
            <marker
              key={name}
              id={`arrow-${name}`}
              viewBox="0 0 10 10"
              refX="7"
              refY="5"
              markerWidth="4"
              markerHeight="4"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill={color} />
            </marker>
          ))}
        </defs>

        {annotations?.circles?.map((c, i) => {
          const pos = getSquareToCoords(c.square);
          const color = colors[c.color as keyof typeof colors] || colors.green;
          return (
            <circle
              key={`circ-${i}`}
              cx={pos.x}
              cy={pos.y}
              r="5.5"
              fill="none"
              stroke={color}
              strokeWidth="1.5"
              opacity="0.9"
            />
          );
        })}

        {[...(annotations?.arrows || []), ...userArrows.map(a => ({...a, color: 'blue' as const}))].map((a, i) => {
          const from = getSquareToCoords(a.from);
          const to = getSquareToCoords(a.to);
          const dx = to.x - from.x;
          const dy = to.y - from.y;
          const len = Math.sqrt(dx * dx + dy * dy);
          const shortenStart = 3;
          const shortenEnd = 4.5;
          const sx = from.x + (dx / len) * shortenStart;
          const sy = from.y + (dy / len) * shortenStart;
          const ex = to.x - (dx / len) * shortenEnd;
          const ey = to.y - (dy / len) * shortenEnd;
          const colorName = a.color || "green";
          const colorHex = colors[colorName as keyof typeof colors] || colors.green;

          return (
            <line
              key={`arr-${i}`}
              x1={sx}
              y1={sy}
              x2={ex}
              y2={ey}
              stroke={colorHex}
              strokeWidth="2"
              strokeLinecap="round"
              markerEnd={`url(#arrow-${colorName})`}
              opacity="0.9"
            />
          );
        })}
      </svg>
    </div>
  );
};
