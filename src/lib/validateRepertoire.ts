import { Chess } from 'chess.js';
import type { RepertoireLine, MoveAnnotation } from '../data/repertoire';

export type ValidationError = {
  lineIndex: number;
  lineName: string;
  category: string;
  ply: number; // 1 = premier demi-coup
  san: string;
  fenBefore: string;
  turnBefore: "w" | "b";
  message: string;
};

export type ValidationWarning = {
  lineIndex: number;
  lineName: string;
  category: string;
  ply?: number;
  san?: string;
  message: string;
};

export type ValidationReport = {
  ok: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
};

export type ValidateOptions = {
  /** si tu as des lignes qui démarrent d’une position spécifique */
  startFen?: string;
  /** callback par ligne pour gérer des départs différents */
  getStartFen?: (line: RepertoireLine) => string | undefined;
  /** essaie un parsing “souple” (utile si parfois tu as du SAN un peu sale) */
  sloppy?: boolean;
  /** valide aussi les squares des flèches / cercles */
  validateShapes?: boolean;
};

const SQUARE_RE = /^[a-h][1-8]$/;

function cleanSan(raw: string): string {
  let s = raw.trim();

  // retire "1.", "12.", "1..." au début si jamais
  s = s.replace(/^\s*\d+\s*\.\.\.\s*/g, "");
  s = s.replace(/^\s*\d+\s*\.\s*/g, "");

  // normalise les roques (certains mettent 0-0)
  s = s.replace(/^0-0-0$/i, "O-O-O").replace(/^0-0$/i, "O-O");

  return s.trim();
}

function shapeWarnings(
  lineIndex: number,
  line: RepertoireLine,
  move: MoveAnnotation,
  ply: number
): ValidationWarning[] {
  const warnings: ValidationWarning[] = [];
  const base = {
    lineIndex,
    lineName: line.name,
    category: line.category,
    ply,
    san: move.san,
  };

  if (move.arrows) {
    for (const a of move.arrows) {
      if (!SQUARE_RE.test(a.from)) {
        warnings.push({ ...base, message: `Arrow.from invalide: "${a.from}"` });
      }
      if (!SQUARE_RE.test(a.to)) {
        warnings.push({ ...base, message: `Arrow.to invalide: "${a.to}"` });
      }
    }
  }
  if (move.circles) {
    for (const c of move.circles) {
      if (!SQUARE_RE.test(c.square)) {
        warnings.push({ ...base, message: `Circle.square invalide: "${c.square}"` });
      }
    }
  }

  return warnings;
}

export function validateRepertoire(
  repertoire: RepertoireLine[],
  options: ValidateOptions = {}
): ValidationReport {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];

  const sloppy = options.sloppy ?? true;
  const validateShapes = options.validateShapes ?? true;

  repertoire.forEach((line, lineIndex) => {
    const startFen =
      options.getStartFen?.(line) ?? options.startFen ?? undefined;

    const chess = new Chess(startFen);

    line.moves.forEach((m, i) => {
      const ply = i + 1;

      if (!m?.san || typeof m.san !== "string") {
        errors.push({
          lineIndex,
          lineName: line.name,
          category: line.category,
          ply,
          san: String(m?.san),
          fenBefore: chess.fen(),
          turnBefore: chess.turn(),
          message: `SAN manquant ou invalide`,
        });
        return;
      }

      const san = cleanSan(m.san);
      const fenBefore = chess.fen();
      const turnBefore = chess.turn();

      if (validateShapes) {
        warnings.push(...shapeWarnings(lineIndex, line, m, ply));
      }

      let played: any = null;

      try {
        // @ts-ignore Support both chess.js signatures (v0.12 vs v1.0)
        played = chess.move(san, { sloppy });
      } catch (e) {
        played = null;
      }
      
      if (!played) {
          try { played = chess.move(san); } catch (e) { played = null; }
      }

      if (!played) {
        errors.push({
          lineIndex,
          lineName: line.name,
          category: line.category,
          ply,
          san: m.san,
          fenBefore,
          turnBefore,
          message: `Coup illégal ou SAN non reconnu: "${m.san}" (après nettoyage: "${san}")`,
        });
      }
    });

    // warning si une ligne est vide
    if (!line.moves?.length) {
      warnings.push({
        lineIndex,
        lineName: line.name,
        category: line.category,
        message: "Ligne sans coups (moves vide).",
      });
    }
  });

  return { ok: errors.length === 0, errors, warnings };
}

/** Petit helper pour afficher un rapport lisible */
export function formatValidationReport(report: ValidationReport): string {
  if (report.ok && report.warnings.length === 0) return "✅ Repertoire OK (aucune erreur, aucun warning).";

  const lines: string[] = [];
  if (!report.ok) {
    lines.push(`❌ ${report.errors.length} erreur(s)`);
    for (const e of report.errors) {
      lines.push(
        `- [${e.lineIndex}] ${e.category} / ${e.lineName} | ply ${e.ply} | ${e.turnBefore} to move | SAN="${e.san}" | ${e.message}`
      );
      lines.push(`  FEN avant: ${e.fenBefore}`);
    }
  } else {
    lines.push("✅ Aucun coup illégal.");
  }

  if (report.warnings.length) {
    lines.push(`⚠️ ${report.warnings.length} warning(s)`);
    for (const w of report.warnings) {
      const where =
        w.ply != null
          ? `ply ${w.ply}${w.san ? ` (SAN="${w.san}")` : ""}`
          : "ligne";
      lines.push(`- [${w.lineIndex}] ${w.category} / ${w.lineName} | ${where} | ${w.message}`);
    }
  }

  return lines.join("\n");
}
