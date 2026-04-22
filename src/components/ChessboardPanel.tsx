import type { CSSProperties } from "react";
import { useMemo } from "react";
import { Chessboard } from "react-chessboard";
import type { Arrow } from "react-chessboard";
import type { MoveAnnotation } from "../data/repertoire";

interface ChessboardPanelProps {
  fen: string;
  /** Flèches à afficher (null = rien). */
  arrows?: MoveAnnotation["arrows"];
  /** Cercles à afficher sur certaines cases (null = rien). */
  circles?: MoveAnnotation["circles"];
  /** Coup à surligner (from→to). */
  lastMove?: { from: string; to: string } | null;
  /** Orientation du plateau. Par défaut : blancs en bas. */
  orientation?: "white" | "black";
  /** Si true, l'utilisateur ne peut pas bouger les pièces. */
  disabled?: boolean;
  /**
   * Appelée quand l'utilisateur glisse une pièce. Retourner `true` accepte le
   * drop (react-chessboard fera l'animation), `false` annule.
   * Le parent (hook de session) se charge de valider la légalité du coup.
   */
  onMove?: (args: {
    from: string;
    to: string;
    promotion?: string;
  }) => boolean;
  /** ID unique (utile si plusieurs plateaux sur la page). */
  id?: string;
}

// Map nos couleurs sémantiques → couleurs CSS pour react-chessboard / overlays.
const COLOR_MAP: Record<string, string> = {
  green: "#15803d",
  red: "#dc2626",
  yellow: "#eab308",
  blue: "#2563eb",
};

function resolveColor(name?: string): string {
  if (!name) return COLOR_MAP.green;
  return COLOR_MAP[name] ?? name;
}

export function ChessboardPanel({
  fen,
  arrows,
  circles,
  lastMove,
  orientation = "white",
  disabled = false,
  onMove,
  id = "repertoire-board",
}: ChessboardPanelProps) {
  // Conversion : MoveAnnotation.arrows ({from,to,color}) → Arrow ({startSquare,endSquare,color}).
  const boardArrows: Arrow[] = useMemo(() => {
    if (!arrows) return [];
    return arrows.map((a) => ({
      startSquare: a.from,
      endSquare: a.to,
      color: resolveColor(a.color),
    }));
  }, [arrows]);

  // Cercles : on surligne via squareStyles (box-shadow inset = anneau).
  // Dernier coup : surligné en jaune translucide.
  const squareStyles = useMemo(() => {
    const styles: Record<string, CSSProperties> = {};
    if (lastMove) {
      const high: CSSProperties = {
        background: "rgba(234, 179, 8, 0.35)",
      };
      styles[lastMove.from] = { ...styles[lastMove.from], ...high };
      styles[lastMove.to] = { ...styles[lastMove.to], ...high };
    }
    if (circles) {
      for (const c of circles) {
        const color = resolveColor(c.color);
        styles[c.square] = {
          ...styles[c.square],
          boxShadow: `inset 0 0 0 4px ${color}`,
          borderRadius: 4,
        };
      }
    }
    return styles;
  }, [circles, lastMove]);

  const handleDrop = ({
    sourceSquare,
    targetSquare,
    piece,
  }: {
    sourceSquare: string;
    targetSquare: string | null;
    piece: { pieceType: string };
  }): boolean => {
    if (!targetSquare || disabled || !onMove) return false;
    // Promotion : si un pion blanc arrive en 8, on force la dame par défaut.
    // (Le répertoire Sokolsky n'a pas de promotion critique — on simplifie.)
    const isWhitePawn = piece.pieceType === "wP";
    const isBlackPawn = piece.pieceType === "bP";
    const isPromotion =
      (isWhitePawn && targetSquare[1] === "8") ||
      (isBlackPawn && targetSquare[1] === "1");
    return onMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: isPromotion ? "q" : undefined,
    });
  };

  return (
    <div className="w-full max-w-[640px] mx-auto">
      <Chessboard
        options={{
          id,
          position: fen,
          boardOrientation: orientation,
          allowDragging: !disabled,
          allowDrawingArrows: true,
          arrows: boardArrows,
          squareStyles,
          onPieceDrop: handleDrop,
          animationDurationInMs: 200,
          showNotation: true,
        }}
      />
    </div>
  );
}
