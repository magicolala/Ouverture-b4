import React from "react";
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

  const files = orientation === "white" ? FILES : [...FILES].reverse();
  const ranks = orientation === "white" ? RANKS : [...RANKS].reverse();

  const getSquareToCoords = (sq: string) => {
    const f = files.indexOf(sq[0]);
    const r = ranks.indexOf(sq[1]);
    return {
      x: (f + 0.5) * 12.5,
      y: (r + 0.5) * 12.5,
    };
  };

  const colors = {
    green: "#84CC16", // Lime
    red: "#EC4899", // Rick Pink
    yellow: "#EAB308", // Yellow
    blue: "#3B82F6", // Blue
  };

  return (
    <div className="relative w-full aspect-square border-4 border-black rounded-xl overflow-hidden shadow-[8px_8px_0_0_#111]">
      <div className="grid grid-cols-8 grid-rows-8 w-full h-full">
        {ranks.map((rank, r) =>
          files.map((file, f) => {
            const sq = file + rank;
            const isLight = (f + r) % 2 === 0;
            const piece = board[r][f];
            
            // Note: board array is 0-indexed from a8 down to h1
            // r goes from 0 to 7 (8 to 1) -> maps correctly if orientation is white.
            // Wait, we need to map the board correctly based on orientation.
            // chess.js board() returns [0][0] = a8.
            // Let's grab the piece safely via game.get(sq)
            const actualPiece = game.get(sq as any);

            const isLastMove = lastMove?.from === sq || lastMove?.to === sq;
            const isSelected = selectedSquare === sq;
            const isHint = hintSquare === sq;

            // Compute valid moves if a square is selected (to show dots)
            let isMoveTarget = false;
            let isCaptureTarget = false;
            if (selectedSquare) {
              const moves = game.moves({ square: selectedSquare, verbose: true });
              const move = (moves as any[]).find((m) => m.to === sq);
              if (move) {
                isMoveTarget = true;
                if (actualPiece) isCaptureTarget = true;
              }
            }

            return (
              <div
                key={sq}
                onClick={() => onSquareClick?.(sq)}
                className={cn(
                  "relative flex items-center justify-center cursor-pointer select-none",
                  isLight ? "bg-white" : "bg-[#3B82F6]", // Rick Blue for dark squares
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
                  <div className="absolute w-[30%] h-[30%] rounded-full bg-black/20 z-20" />
                )}
                {isMoveTarget && isCaptureTarget && (
                  <div className="absolute inset-1 rounded-full border-4 border-black/20 z-20" />
                )}

                {/* Piece */}
                {actualPiece && renderPiece(actualPiece.color, actualPiece.type)}
              </div>
            );
          })
        )}
      </div>

      {/* SVG Overlay for Arrows & Circles */}
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

        {annotations?.arrows?.map((a, i) => {
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
