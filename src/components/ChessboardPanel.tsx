import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import { Chessboard } from "react-chessboard";
import type { Arrow } from "react-chessboard";
import { Chess } from "chess.js";
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
  // Case sélectionnée pour le mode "clic-clic".
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);

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
    
    // Surlignage du dernier coup
    if (lastMove) {
      const high: CSSProperties = {
        background: "rgba(234, 179, 8, 0.35)",
      };
      styles[lastMove.from] = { ...styles[lastMove.from], ...high };
      styles[lastMove.to] = { ...styles[lastMove.to], ...high };
    }

    // Surlignage de la case sélectionnée (clic-clic)
    if (selectedSquare) {
      styles[selectedSquare] = {
        ...styles[selectedSquare],
        background: "rgba(123, 97, 255, 0.5)", // wero-purple
      };
    }

    // Cercles d'annotation
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
  }, [circles, lastMove, selectedSquare]);

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
    
    // Reset de la sélection clic-clic lors d'un drag
    setSelectedSquare(null);

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

  const handleSquareClick = ({ square }: { square: string }) => {
    if (disabled || !onMove) return;

    const game = new Chess(fen);

    // 1. Si aucune case n'est sélectionnée
    if (!selectedSquare) {
      const piece = game.get(square as any);
      // On ne sélectionne que si c'est une pièce qui peut bouger (trait actuel)
      if (piece && piece.color === game.turn()) {
        setSelectedSquare(square);
      }
      return;
    }

    // 2. Si on clique sur la même case, on déselectionne
    if (selectedSquare === square) {
      setSelectedSquare(null);
      return;
    }

    // 3. Si on clique sur une autre pièce de sa couleur, on change la sélection
    const pieceAtTarget = game.get(square as any);
    if (pieceAtTarget && pieceAtTarget.color === game.turn()) {
      setSelectedSquare(square);
      return;
    }

    // 4. On tente le coup
    const pieceToMove = game.get(selectedSquare as any);
    const isWhitePawn = pieceToMove?.type === "p" && pieceToMove?.color === "w";
    const isBlackPawn = pieceToMove?.type === "p" && pieceToMove?.color === "b";
    const isPromotion =
      (isWhitePawn && square[1] === "8") ||
      (isBlackPawn && square[1] === "1");

    const success = onMove({
      from: selectedSquare,
      to: square,
      promotion: isPromotion ? "q" : undefined,
    });

    if (success) {
      setSelectedSquare(null);
    } else {
      // Si le coup échoue mais qu'on a cliqué sur une autre pièce valide (déjà géré en 3, mais au cas où)
      setSelectedSquare(null);
    }
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
          onSquareClick: handleSquareClick,
          animationDurationInMs: 200,
          showNotation: true,
        }}
      />
    </div>
  );
}
