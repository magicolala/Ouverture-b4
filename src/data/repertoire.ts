import { Chess } from "chess.js";

export const C = {
  B4: "<em>Ouverture Sokolsky (1.b4).</em> Coup surprise qui gagne de l’espace à l’aile dame. <strong>Idée centrale :</strong> fianchetto du fou en b2 pour peser sur la grande diagonale <strong>a1–h8</strong> et mettre la pression sur <strong>e5</strong>.",
  E5: "Réponse la plus ambitieuse. Noir prend le centre et <strong>attaque immédiatement b4</strong>. Notre compensation : développement rapide et pression durable sur la diagonale a1–h8 (souvent on privilégie l’activité plutôt que “défendre le pion”).",
  BB2: "<em>Coup clé.</em> Le fou se place sur la grande diagonale et vise <strong>e5</strong>. <strong>Motif fréquent :</strong> si Noir “ramasse” b4 trop tôt, le pion e5 devient souvent tactiquement vulnérable (défense insuffisante / surcharge).",
  D6: "Défense solide de <strong>e5</strong> : structure type <strong>Philidor</strong>. En contrepartie, Noir se développe un peu plus lentement (le fou f8 manque d’air), ce qui nous laisse le temps d’installer <strong>c4</strong> et de finir le développement proprement.",
  E3: "Coup sobre mais important : ouvre le fou f1 et prépare <strong>Cf3</strong>. <strong>Plan standard :</strong> c4, Fe2, roque, puis Cc3 et/ou d4 selon la réaction noire.",
  NF6: "Développement naturel : contrôle <strong>e4</strong> et <strong>d5</strong>, et accélère le roque. Rien d’urgent : on continue notre mise en place.",
  C4_ANTI_D6: "<em>Setup anti-…d6.</em> On fixe de l’espace à l’aile dame et on prépare <strong>Cc3</strong>. <strong>Note pratique :</strong> ici, <strong>a3 n’est pas prioritaire</strong> : on gagne plus en tempo en développant vite (c4 + Cc3).",
  BE7: "Noir prépare le roque. Position solide mais assez passive : à nous de garder l’initiative par le développement et le jeu central au bon moment.",
  BE2: "Développement harmonieux. On réserve souvent <strong>Fd3</strong> (qui peut gêner certains plans centraux) et on sécurise le roque. <strong>Suite logique :</strong> 0-0 puis Cc3 / d4 selon la position.",
  OO: "Roque : Noir met son roi en sécurité. La question devient : quand jouer <strong>d4</strong> (ou cxd5) pour ouvrir le jeu avec nos pièces mieux placées ?",
  NC3_TARGET: "<em>Position type atteinte.</em> Nos pièces sortent sans concessions. <strong>Plans :</strong><br>• <span style='color:#81b64c'>Cf3 + 0-0</span> (finir le développement)<br>• <span style='color:#e8a33d'>d4</span> pour contester le centre<br>• <span style='color:#e8a33d'>a4–a5</span> pour grignoter l’aile dame si Noir reste passif",
  A3_MANDATORY: "<em>⚠️ Coup très important.</em> <strong>a3</strong> stabilise b4 et coupe l’idée …a5 qui peut fissurer ton aile dame. <strong>Règle pratique :</strong> contre les structures avec …d5, <strong>on ne “saute” presque jamais a3</strong>.",
  C4_VS_D5: "<em>Setup complet.</em> Le bloc <strong>b4–c4</strong> met la pression sur d5. <strong>Plans :</strong><br>• cxd5 au bon moment pour ouvrir des lignes<br>• d4 si le centre le permet<br>• Cc3 + roque pour transformer l’espace en initiative",
  FIANCHETTO_NO_A3: "<em>⚠️ Setup différent.</em> Face au fianchetto, l’objectif est de développer vite et de contester le centre. <strong>Ici, a3 est souvent lent</strong> : on préfère <strong>Nf3</strong>, <strong>c4</strong>, <strong>Be2</strong>, roque, puis <strong>d4</strong> au bon moment.",
  PIEGE_BXB4_ERROR: "<em>⚠️ GROSSE ERREUR !</em> Noir prend le pion au lieu de développer. Le fou f8 abandonne la défense de g7 et la grande diagonale est grande ouverte.",
  PIEGE_BXG7: "<em>🎯 LE PIÈGE CLASSIQUE !</em> On va <strong>manger la tour h8</strong> au coup suivant pour un gain matériel énorme. À retenir par cœur.",
  CONTRE_C5: "Contre-attaque sur l'aile dame. Noir veut liquider b4 pour nous délester de notre avantage d'espace.",
  CONTRE_C5_D4: "<em>🎯 Coup clé !</em> On ouvre le jeu au centre ET on attaque le fou c5. Gain d'espace et forte initiative.",
  D5: "Réponse classique. Noir occupe le centre sans défier directement b4."
} as const;

// ============================================================================
// STRUCTURE EN CHAPITRES
// ============================================================================
// Un chapitre = une grande famille de réponses noires (e5, d5, Cf6, autres).
// Un sous-chapitre = un thème dans le chapitre (main line, pièges, side...).
// ============================================================================

export type ChapterId = "e5" | "d5" | "nf6" | "other";
export type SubchapterId =
  | "main"          // Ligne principale à savoir par cœur
  | "traps"         // Pièges tactiques à connaître
  | "sidelines"     // Variantes secondaires fréquentes
  | "transpositions"// Transpositions vers des positions connues
  | "rare";         // Réponses rares ou douteuses

export type Priority = "must-know" | "important" | "bonus";

export interface Chapter {
  id: ChapterId;
  title: string;
  order: number;
  description: string;
  subchapters: Subchapter[];
}

export interface Subchapter {
  id: SubchapterId;
  title: string;
  order: number;
  description: string;
}

export const CHAPTERS: Chapter[] = [
  {
    id: "e5",
    title: "Chapitre 1 — Contre 1…e5",
    order: 1,
    description: "La réponse la plus ambitieuse et la plus fréquente. Noir attaque immédiatement b4 et prend le centre. Notre plan : Fb2 pour presser e5 sur la grande diagonale, puis développement rapide.",
    subchapters: [
      { id: "main", title: "Ligne principale (…d6, Philidor)", order: 1, description: "La structure la plus solide des Noirs. À maîtriser en priorité — c'est 60% de tes parties." },
      { id: "traps", title: "Pièges tactiques", order: 2, description: "Les coups noirs qui laissent du matériel : 2…d5 ?!, 2…Cf6 puis …Fxb4 ??" },
      { id: "sidelines", title: "Variantes secondaires", order: 3, description: "2…Cc6 (chasser avec b5), 2…Cf6 (échange simplifiant)." },
      { id: "rare", title: "Réponses rares", order: 4, description: "…f6, …e4, …Db6, …Fe6, …Ff5, …a6, …f5, …Fe7…" }
    ]
  },
  {
    id: "d5",
    title: "Chapitre 2 — Contre 1…d5",
    order: 2,
    description: "Réponse classique et solide. Noir occupe le centre sans défier b4. Notre plan : setup avec Fb2, e3, a3 (obligatoire !), puis c4 pour presser d5.",
    subchapters: [
      { id: "main", title: "Ligne principale (setup avec a3)", order: 1, description: "Le plan standard : Fb2, e3, a3, Cf3, Fe2, O-O, c4. Position de référence à connaître." },
      { id: "traps", title: "Le piège 3…Fxb4 ?? 4.Fxg7 !", order: 2, description: "LE piège classique de la Sokolsky. À connaître par cœur — tu le verras souvent." },
      { id: "sidelines", title: "3…c5 : le contre central", order: 3, description: "La tentative de contre-attaque. On capture en c5 et on ouvre avec d4." },
      { id: "transpositions", title: "2…Ff5, 2…c6 (Slave renversé)", order: 4, description: "Variantes où Noir sort le fou ou joue Slave. On garde notre setup avec c4." },
      { id: "rare", title: "Réponses rares", order: 5, description: "2…Cc6, 2…e5, 2…d4, 2…f6, 2…a6…" }
    ]
  },
  {
    id: "nf6",
    title: "Chapitre 3 — Contre 1…Cf6",
    order: 3,
    description: "L'anti-Sokolsky moderne. Noir développe sans s'engager et attend. Beaucoup de lignes transposent vers 1…d5 ou 1…e5. Les deux réponses à vraiment connaître : …g6 (fianchetto) et …d5.",
    subchapters: [
      { id: "transpositions", title: "2…d5 : transposition", order: 1, description: "Transpose directement vers le Chapitre 2. Même plan : a3 + c4." },
      { id: "main", title: "2…g6 : le fianchetto (pas de a3 !)", order: 2, description: "⚠️ Ici on oublie a3 ! On développe vite : c4, Fe2, O-O, d4 au bon moment." },
      { id: "traps", title: "2…e5 !? : la provocation", order: 3, description: "Noir offre e5. On prend et on attend …Fxb4 ?? pour le piège classique." },
      { id: "sidelines", title: "2…d6 : système hybride", order: 4, description: "Structure Philidor. On revient au plan anti-…d6 du Chapitre 1." }
    ]
  },
  {
    id: "other",
    title: "Chapitre 4 — Autres réponses",
    order: 4,
    description: "Toutes les réponses noires moins fréquentes. La plupart transposent vers les chapitres 1-3. Les 3 à vraiment connaître : 1…e6 (→ d5), 1…g6 (fianchetto) et 1…c5 (on prend !).",
    subchapters: [
      { id: "transpositions", title: "1…e6 : transposition vers d5", order: 1, description: "Très fréquent. Transpose souvent vers le Chapitre 2 après …d5." },
      { id: "main", title: "1…g6 : fianchetto direct", order: 2, description: "Comme 1…Cf6 2…g6 : pas de a3, développement rapide + c4." },
      { id: "sidelines", title: "1…c6 et 1…d6+e5", order: 3, description: "Caro-Kann inversé et Philidor renversé. On applique nos plans standards." },
      { id: "rare", title: "1…c5, 1…a5, 1…b6, 1…f5", order: 4, description: "Réponses agressives ou excentriques. Réponses courtes mais à savoir." }
    ]
  }
];

// ============================================================================
// INTERFACES
// ============================================================================

export interface MoveAnnotation {
  san: string;
  comment?: string;
  arrows?: { from: string; to: string; color?: string }[];
  circles?: { square: string; color?: string }[];
}

export interface RepertoireLine {
  id?: string;
  name: string;
  /** @deprecated utiliser chapter + subchapter. Conservé pour compatibilité. */
  category: string;
  chapter: ChapterId;
  subchapter: SubchapterId;
  priority: Priority;
  description?: string;
  moves: MoveAnnotation[];
}

// ============================================================================
// RÉPERTOIRE
// ============================================================================

export const REPERTOIRE: RepertoireLine[] = [
  // ==========================================================================
  // CHAPITRE 1 — CONTRE 1...e5
  // ==========================================================================

  // --- 1.1 Ligne principale (main) ---
  {
    name: "Ligne principale ...e5 ...d6",
    category: "Contre 1...e5",
    chapter: "e5",
    subchapter: "main",
    priority: "must-know",
    description: "La ligne de référence contre 1…e5. À connaître parfaitement : elle apparaît dans la majorité de tes parties.",
    moves: [
      { san: "b4", comment: C.B4, arrows: [{"from":"b2","to":"b4","color":"green"},{"from":"c1","to":"b2","color":"yellow"}], circles: [{"square":"b4","color":"green"},{"square":"h8","color":"yellow"}] },
      { san: "e5", comment: C.E5, arrows: [{"from":"e5","to":"b2","color":"yellow"}], circles: [{"square":"e5","color":"red"}] },
      { san: "Bb2", comment: C.BB2, arrows: [{"from":"b2","to":"e5","color":"green"}], circles: [{"square":"b2","color":"green"},{"square":"e5","color":"red"}] },
      { san: "d6", comment: C.D6, arrows: [{"from":"d6","to":"e5","color":"yellow"}] },
      { san: "e3", comment: C.E3, arrows: [{"from":"f1","to":"e2","color":"yellow"},{"from":"g1","to":"f3","color":"yellow"}] },
      { san: "Nf6", comment: C.NF6, circles: [{"square":"e4","color":"yellow"}] },
      { san: "c4", comment: C.C4_ANTI_D6, arrows: [{"from":"c2","to":"c4","color":"green"}], circles: [{"square":"d5","color":"yellow"}] },
      { san: "Be7", comment: C.BE7 },
      { san: "Be2", comment: C.BE2, arrows: [{"from":"f1","to":"e2","color":"green"}] },
      { san: "O-O", comment: C.OO },
      { san: "Nc3", comment: C.NC3_TARGET, arrows: [{"from":"d2","to":"d4","color":"yellow"},{"from":"a2","to":"a4","color":"yellow"}], circles: [{"square":"d4","color":"green"}] },
    ]
  },

  // --- 1.2 Pièges (traps) ---
  {
    name: "2...d5 : prise gratuite",
    category: "Contre 1...e5",
    chapter: "e5",
    subchapter: "traps",
    priority: "must-know",
    description: "Noir laisse e5 gratuit. On prend et on file.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "e5", comment: C.E5 },
      { san: "Bb2", comment: C.BB2 },
      { san: "d5", circles: [{"square":"e5","color":"red"}] },
      { san: "Bxe5", arrows: [{"from":"b2","to":"e5","color":"green"}], circles: [{"square":"e5","color":"green"}] },
      { san: "Nc6" },
      { san: "Bb2", arrows: [{"from":"e5","to":"b2","color":"green"}] },
    ]
  },
  {
    name: "2...Cf6 : échange simplifiant",
    category: "Contre 1...e5",
    chapter: "e5",
    subchapter: "traps",
    priority: "must-know",
    description: "Après Fxe5, si Noir joue …Fxb4 ?? c'est le piège : on file avec Cf3 et on garde la pression.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "e5", comment: C.E5 },
      { san: "Bb2", comment: C.BB2 },
      { san: "Nf6", comment: C.NF6 },
      { san: "Bxe5", arrows: [{"from":"b2","to":"e5","color":"green"}] },
      { san: "Bxb4", comment: C.PIEGE_BXB4_ERROR },
      { san: "Nf3", arrows: [{"from":"g1","to":"f3","color":"green"}] },
      { san: "d6" },
      { san: "Bb2", arrows: [{"from":"e5","to":"b2","color":"yellow"}] },
    ]
  },
  {
    name: "2...Cf6 : échange simplifiant (Nc6 Bb2...)",
    category: "Contre 1...e5",
    chapter: "e5",
    subchapter: "traps",
    priority: "bonus",
    description: "Sous-variante : Noir joue …Cc6 après le piège. On reste solide avec Fb2.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "e5", comment: C.E5 },
      { san: "Bb2", comment: C.BB2 },
      { san: "Nf6", comment: C.NF6 },
      { san: "Bxe5", arrows: [{"from":"b2","to":"e5","color":"green"}] },
      { san: "Bxb4", comment: C.PIEGE_BXB4_ERROR },
      { san: "Nf3", arrows: [{"from":"g1","to":"f3","color":"green"}] },
      { san: "Nc6" },
      { san: "Bb2" },
    ]
  },
  {
    name: "2...Cf6 : échange simplifiant (O-O e3 d5 c4...)",
    category: "Contre 1...e5",
    chapter: "e5",
    subchapter: "traps",
    priority: "bonus",
    description: "Sous-variante : Noir préfère roquer plutôt que prendre b4. On continue notre plan avec c4.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "e5", comment: C.E5 },
      { san: "Bb2", comment: C.BB2 },
      { san: "Nf6", comment: C.NF6 },
      { san: "Bxe5", arrows: [{"from":"b2","to":"e5","color":"green"}] },
      { san: "Bxb4", comment: C.PIEGE_BXB4_ERROR },
      { san: "Nf3", arrows: [{"from":"g1","to":"f3","color":"green"}] },
      { san: "O-O", comment: C.OO },
      { san: "e3", comment: C.E3 },
      { san: "d5" },
      { san: "c4", comment: C.C4_ANTI_D6 },
    ]
  },

  // --- 1.3 Variantes secondaires (sidelines) ---
  {
    name: "2...Cc6 : chasser avec b5",
    category: "Contre 1...e5",
    chapter: "e5",
    subchapter: "sidelines",
    priority: "important",
    description: "Noir défend e5 avec le cavalier. On chasse avec b5 pour gagner un tempo et cibler e5.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "e5", comment: C.E5 },
      { san: "Bb2", comment: C.BB2 },
      { san: "Nc6", circles: [{"square":"c6","color":"red"}] },
      { san: "b5", arrows: [{"from":"b4","to":"b5","color":"green"}], circles: [{"square":"c6","color":"red"}] },
      { san: "Nd4" },
      { san: "e3", comment: C.E3, arrows: [{"from":"e3","to":"d4","color":"red"}] },
      { san: "Nf5" },
      { san: "Bxe5", arrows: [{"from":"b2","to":"e5","color":"green"}], circles: [{"square":"e5","color":"green"}] },
      { san: "d6" },
      { san: "Bb2", arrows: [{"from":"e5","to":"b2","color":"green"}] },
    ]
  },
  {
    name: "2...Cc6 : chasser avec b5 (Nxb5 Bxb5 c6 Be2...)",
    category: "Contre 1...e5",
    chapter: "e5",
    subchapter: "sidelines",
    priority: "bonus",
    description: "Sous-variante : Noir accepte l'échange. On obtient la paire de fous.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "e5", comment: C.E5 },
      { san: "Bb2", comment: C.BB2 },
      { san: "Nc6", circles: [{"square":"c6","color":"red"}] },
      { san: "b5", arrows: [{"from":"b4","to":"b5","color":"green"}], circles: [{"square":"c6","color":"red"}] },
      { san: "Nd4" },
      { san: "e3", comment: C.E3, arrows: [{"from":"e3","to":"d4","color":"red"}] },
      { san: "Nxb5" },
      { san: "Bxb5" },
      { san: "c6" },
      { san: "Be2", comment: C.BE2 },
    ]
  },
  {
    name: "2...Cc6 : chasser avec b5 (Ne6 Bxe5 d6 Bb2...)",
    category: "Contre 1...e5",
    chapter: "e5",
    subchapter: "sidelines",
    priority: "bonus",
    description: "Sous-variante : le cavalier recule en e6. On prend en e5 et on reste solide.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "e5", comment: C.E5 },
      { san: "Bb2", comment: C.BB2 },
      { san: "Nc6", circles: [{"square":"c6","color":"red"}] },
      { san: "b5", arrows: [{"from":"b4","to":"b5","color":"green"}], circles: [{"square":"c6","color":"red"}] },
      { san: "Nd4" },
      { san: "e3", comment: C.E3, arrows: [{"from":"e3","to":"d4","color":"red"}] },
      { san: "Ne6" },
      { san: "Bxe5" },
      { san: "d6" },
      { san: "Bb2" },
    ]
  },

  // --- 1.4 Réponses rares (rare) ---
  {
    name: "Ligne principale ...e5 ...d6 (f6 a3 d5 e3...)",
    category: "Contre 1...e5",
    chapter: "e5",
    subchapter: "rare",
    priority: "bonus",
    description: "…f6 défend e5 mais affaiblit le roi. On développe tranquillement.",
    moves: [
      { san: "b4", comment: C.B4, arrows: [{"from":"b2","to":"b4","color":"green"},{"from":"c1","to":"b2","color":"yellow"}], circles: [{"square":"b4","color":"green"},{"square":"h8","color":"yellow"}] },
      { san: "e5", comment: C.E5, arrows: [{"from":"e5","to":"b2","color":"yellow"}], circles: [{"square":"e5","color":"red"}] },
      { san: "Bb2", comment: C.BB2, arrows: [{"from":"b2","to":"e5","color":"green"}], circles: [{"square":"b2","color":"green"},{"square":"e5","color":"red"}] },
      { san: "f6" },
      { san: "a3", comment: C.A3_MANDATORY },
      { san: "d5" },
      { san: "e3", comment: C.E3 },
    ]
  },
  {
    name: "Ligne principale ...e5 ...d6 (e4 e3 d5 c4 c6 Qb3...)",
    category: "Contre 1...e5",
    chapter: "e5",
    subchapter: "rare",
    priority: "bonus",
    description: "…e4 pousse le pion pour gagner de l'espace. On réplique par e3 et c4.",
    moves: [
      { san: "b4", comment: C.B4, arrows: [{"from":"b2","to":"b4","color":"green"},{"from":"c1","to":"b2","color":"yellow"}], circles: [{"square":"b4","color":"green"},{"square":"h8","color":"yellow"}] },
      { san: "e5", comment: C.E5, arrows: [{"from":"e5","to":"b2","color":"yellow"}], circles: [{"square":"e5","color":"red"}] },
      { san: "Bb2", comment: C.BB2, arrows: [{"from":"b2","to":"e5","color":"green"}], circles: [{"square":"b2","color":"green"},{"square":"e5","color":"red"}] },
      { san: "e4" },
      { san: "e3", comment: C.E3 },
      { san: "d5" },
      { san: "c4", comment: C.C4_ANTI_D6 },
      { san: "c6" },
      { san: "Qb3" },
    ]
  },
  {
    name: "Ligne principale ...e5 ...d6 (Qf6 a3...)",
    category: "Contre 1...e5",
    chapter: "e5",
    subchapter: "rare",
    priority: "bonus",
    description: "…Df6 sort la dame tôt pour défendre e5. On joue a3 pour éviter tout …Fxb4.",
    moves: [
      { san: "b4", comment: C.B4, arrows: [{"from":"b2","to":"b4","color":"green"},{"from":"c1","to":"b2","color":"yellow"}], circles: [{"square":"b4","color":"green"},{"square":"h8","color":"yellow"}] },
      { san: "e5", comment: C.E5, arrows: [{"from":"e5","to":"b2","color":"yellow"}], circles: [{"square":"e5","color":"red"}] },
      { san: "Bb2", comment: C.BB2, arrows: [{"from":"b2","to":"e5","color":"green"}], circles: [{"square":"b2","color":"green"},{"square":"e5","color":"red"}] },
      { san: "Qf6" },
      { san: "a3", comment: C.A3_MANDATORY },
    ]
  },
  {
    name: "Ligne principale ...e5 ...d6 (Be6 Nf3...)",
    category: "Contre 1...e5",
    chapter: "e5",
    subchapter: "rare",
    priority: "bonus",
    description: "Variante avec …Fe6 au 3e coup. Développement normal avec Cf3.",
    moves: [
      { san: "b4", comment: C.B4, arrows: [{"from":"b2","to":"b4","color":"green"},{"from":"c1","to":"b2","color":"yellow"}], circles: [{"square":"b4","color":"green"},{"square":"h8","color":"yellow"}] },
      { san: "e5", comment: C.E5, arrows: [{"from":"e5","to":"b2","color":"yellow"}], circles: [{"square":"e5","color":"red"}] },
      { san: "Bb2", comment: C.BB2, arrows: [{"from":"b2","to":"e5","color":"green"}], circles: [{"square":"b2","color":"green"},{"square":"e5","color":"red"}] },
      { san: "d6", comment: C.D6, arrows: [{"from":"d6","to":"e5","color":"yellow"}] },
      { san: "e3", comment: C.E3, arrows: [{"from":"f1","to":"e2","color":"yellow"},{"from":"g1","to":"f3","color":"yellow"}] },
      { san: "Be6" },
      { san: "Nf3" },
    ]
  },
  {
    name: "Ligne principale ...e5 ...d6 (Nc6 b5 Nce7 c4...)",
    category: "Contre 1...e5",
    chapter: "e5",
    subchapter: "rare",
    priority: "bonus",
    description: "…Cc6 au 3e coup : on chasse avec b5 comme d'habitude.",
    moves: [
      { san: "b4", comment: C.B4, arrows: [{"from":"b2","to":"b4","color":"green"},{"from":"c1","to":"b2","color":"yellow"}], circles: [{"square":"b4","color":"green"},{"square":"h8","color":"yellow"}] },
      { san: "e5", comment: C.E5, arrows: [{"from":"e5","to":"b2","color":"yellow"}], circles: [{"square":"e5","color":"red"}] },
      { san: "Bb2", comment: C.BB2, arrows: [{"from":"b2","to":"e5","color":"green"}], circles: [{"square":"b2","color":"green"},{"square":"e5","color":"red"}] },
      { san: "d6", comment: C.D6, arrows: [{"from":"d6","to":"e5","color":"yellow"}] },
      { san: "e3", comment: C.E3, arrows: [{"from":"f1","to":"e2","color":"yellow"},{"from":"g1","to":"f3","color":"yellow"}] },
      { san: "Nc6" },
      { san: "b5" },
      { san: "Nce7" },
      { san: "c4", comment: C.C4_ANTI_D6 },
    ]
  },
  {
    name: "Ligne principale ...e5 ...d6 (Bf5 Nf3...)",
    category: "Contre 1...e5",
    chapter: "e5",
    subchapter: "rare",
    priority: "bonus",
    description: "…Ff5 développe le fou dame. Développement normal.",
    moves: [
      { san: "b4", comment: C.B4, arrows: [{"from":"b2","to":"b4","color":"green"},{"from":"c1","to":"b2","color":"yellow"}], circles: [{"square":"b4","color":"green"},{"square":"h8","color":"yellow"}] },
      { san: "e5", comment: C.E5, arrows: [{"from":"e5","to":"b2","color":"yellow"}], circles: [{"square":"e5","color":"red"}] },
      { san: "Bb2", comment: C.BB2, arrows: [{"from":"b2","to":"e5","color":"green"}], circles: [{"square":"b2","color":"green"},{"square":"e5","color":"red"}] },
      { san: "d6", comment: C.D6, arrows: [{"from":"d6","to":"e5","color":"yellow"}] },
      { san: "e3", comment: C.E3, arrows: [{"from":"f1","to":"e2","color":"yellow"},{"from":"g1","to":"f3","color":"yellow"}] },
      { san: "Bf5" },
      { san: "Nf3" },
    ]
  },
  {
    name: "Ligne principale ...e5 ...d6 (a6 c4...)",
    category: "Contre 1...e5",
    chapter: "e5",
    subchapter: "rare",
    priority: "bonus",
    description: "…a6 attend. On continue notre plan avec c4.",
    moves: [
      { san: "b4", comment: C.B4, arrows: [{"from":"b2","to":"b4","color":"green"},{"from":"c1","to":"b2","color":"yellow"}], circles: [{"square":"b4","color":"green"},{"square":"h8","color":"yellow"}] },
      { san: "e5", comment: C.E5, arrows: [{"from":"e5","to":"b2","color":"yellow"}], circles: [{"square":"e5","color":"red"}] },
      { san: "Bb2", comment: C.BB2, arrows: [{"from":"b2","to":"e5","color":"green"}], circles: [{"square":"b2","color":"green"},{"square":"e5","color":"red"}] },
      { san: "d6", comment: C.D6, arrows: [{"from":"d6","to":"e5","color":"yellow"}] },
      { san: "e3", comment: C.E3, arrows: [{"from":"f1","to":"e2","color":"yellow"},{"from":"g1","to":"f3","color":"yellow"}] },
      { san: "a6" },
      { san: "c4", comment: C.C4_ANTI_D6 },
    ]
  },
  {
    name: "Ligne principale ...e5 ...d6 (f5 c4 Nf6 Nc3 Be7 Nf3 O-O Be2...)",
    category: "Contre 1...e5",
    chapter: "e5",
    subchapter: "rare",
    priority: "bonus",
    description: "…f5 ambitieux mais affaiblit. On joue notre setup complet : c4, Cc3, Cf3, Fe2.",
    moves: [
      { san: "b4", comment: C.B4, arrows: [{"from":"b2","to":"b4","color":"green"},{"from":"c1","to":"b2","color":"yellow"}], circles: [{"square":"b4","color":"green"},{"square":"h8","color":"yellow"}] },
      { san: "e5", comment: C.E5, arrows: [{"from":"e5","to":"b2","color":"yellow"}], circles: [{"square":"e5","color":"red"}] },
      { san: "Bb2", comment: C.BB2, arrows: [{"from":"b2","to":"e5","color":"green"}], circles: [{"square":"b2","color":"green"},{"square":"e5","color":"red"}] },
      { san: "d6", comment: C.D6, arrows: [{"from":"d6","to":"e5","color":"yellow"}] },
      { san: "e3", comment: C.E3, arrows: [{"from":"f1","to":"e2","color":"yellow"},{"from":"g1","to":"f3","color":"yellow"}] },
      { san: "f5" },
      { san: "c4", comment: C.C4_ANTI_D6 },
      { san: "Nf6", comment: C.NF6 },
      { san: "Nc3", comment: C.NC3_TARGET },
      { san: "Be7", comment: C.BE7 },
      { san: "Nf3" },
      { san: "O-O", comment: C.OO },
      { san: "Be2", comment: C.BE2 },
    ]
  },
  {
    name: "Ligne principale ...e5 ...d6 (Be7 c4 Nf6 Be2 O-O Nc3...)",
    category: "Contre 1...e5",
    chapter: "e5",
    subchapter: "rare",
    priority: "bonus",
    description: "…Fe7 au 3e coup : inversion classique. Même plan.",
    moves: [
      { san: "b4", comment: C.B4, arrows: [{"from":"b2","to":"b4","color":"green"},{"from":"c1","to":"b2","color":"yellow"}], circles: [{"square":"b4","color":"green"},{"square":"h8","color":"yellow"}] },
      { san: "e5", comment: C.E5, arrows: [{"from":"e5","to":"b2","color":"yellow"}], circles: [{"square":"e5","color":"red"}] },
      { san: "Bb2", comment: C.BB2, arrows: [{"from":"b2","to":"e5","color":"green"}], circles: [{"square":"b2","color":"green"},{"square":"e5","color":"red"}] },
      { san: "d6", comment: C.D6, arrows: [{"from":"d6","to":"e5","color":"yellow"}] },
      { san: "e3", comment: C.E3, arrows: [{"from":"f1","to":"e2","color":"yellow"},{"from":"g1","to":"f3","color":"yellow"}] },
      { san: "Be7", comment: C.BE7 },
      { san: "c4", comment: C.C4_ANTI_D6 },
      { san: "Nf6", comment: C.NF6 },
      { san: "Be2", comment: C.BE2 },
      { san: "O-O", comment: C.OO },
      { san: "Nc3", comment: C.NC3_TARGET },
    ]
  },
  {
    name: "Ligne principale ...e5 ...d6 (Be6 Nc3...)",
    category: "Contre 1...e5",
    chapter: "e5",
    subchapter: "rare",
    priority: "bonus",
    description: "…Fe6 après …Cf6. On continue avec c4 puis Cc3.",
    moves: [
      { san: "b4", comment: C.B4, arrows: [{"from":"b2","to":"b4","color":"green"},{"from":"c1","to":"b2","color":"yellow"}], circles: [{"square":"b4","color":"green"},{"square":"h8","color":"yellow"}] },
      { san: "e5", comment: C.E5, arrows: [{"from":"e5","to":"b2","color":"yellow"}], circles: [{"square":"e5","color":"red"}] },
      { san: "Bb2", comment: C.BB2, arrows: [{"from":"b2","to":"e5","color":"green"}], circles: [{"square":"b2","color":"green"},{"square":"e5","color":"red"}] },
      { san: "d6", comment: C.D6, arrows: [{"from":"d6","to":"e5","color":"yellow"}] },
      { san: "e3", comment: C.E3, arrows: [{"from":"f1","to":"e2","color":"yellow"},{"from":"g1","to":"f3","color":"yellow"}] },
      { san: "Nf6", comment: C.NF6, circles: [{"square":"e4","color":"yellow"}] },
      { san: "c4", comment: C.C4_ANTI_D6, arrows: [{"from":"c2","to":"c4","color":"green"}], circles: [{"square":"d5","color":"yellow"}] },
      { san: "Be6" },
      { san: "Nc3", comment: C.NC3_TARGET },
    ]
  },

  // ==========================================================================
  // CHAPITRE 2 — CONTRE 1...d5
  // ==========================================================================

  // --- 2.1 Ligne principale (main) ---
  {
    name: "Ligne principale : setup avec a3",
    category: "Contre 1...d5",
    chapter: "d5",
    subchapter: "main",
    priority: "must-know",
    description: "Position de référence contre 1…d5. À connaître par cœur : Fb2, e3, a3, Cf3, Fe2, O-O, c4.",
    moves: [
      { san: "b4", comment: C.B4, arrows: [{"from":"b2","to":"b4","color":"green"}] },
      { san: "d5", comment: C.D5, circles: [{"square":"d5","color":"red"}] },
      { san: "Bb2", comment: C.BB2, arrows: [{"from":"c1","to":"b2","color":"green"}] },
      { san: "Nf6", comment: C.NF6 },
      { san: "e3", comment: C.E3, arrows: [{"from":"f1","to":"e2","color":"yellow"}] },
      { san: "e6" },
      { san: "a3", comment: C.A3_MANDATORY, arrows: [{"from":"a2","to":"a3","color":"green"},{"from":"a7","to":"a5","color":"red"}], circles: [{"square":"b4","color":"green"}] },
      { san: "Be7", comment: C.BE7 },
      { san: "Nf3", arrows: [{"from":"g1","to":"f3","color":"green"}] },
      { san: "O-O", comment: C.OO },
      { san: "c4", comment: C.C4_VS_D5, arrows: [{"from":"c2","to":"c4","color":"green"},{"from":"c4","to":"d5","color":"yellow"}], circles: [{"square":"d5","color":"yellow"}] },
    ]
  },
  {
    name: "Ligne principale : setup avec a3 (Bd6 c4...)",
    category: "Contre 1...d5",
    chapter: "d5",
    subchapter: "main",
    priority: "important",
    description: "Noir préfère …Fd6 plus actif. On continue quand même avec c4.",
    moves: [
      { san: "b4", comment: C.B4, arrows: [{"from":"b2","to":"b4","color":"green"}] },
      { san: "d5", comment: C.D5, circles: [{"square":"d5","color":"red"}] },
      { san: "Bb2", comment: C.BB2, arrows: [{"from":"c1","to":"b2","color":"green"}] },
      { san: "Nf6", comment: C.NF6 },
      { san: "e3", comment: C.E3, arrows: [{"from":"f1","to":"e2","color":"yellow"}] },
      { san: "e6" },
      { san: "a3", comment: C.A3_MANDATORY, arrows: [{"from":"a2","to":"a3","color":"green"},{"from":"a7","to":"a5","color":"red"}], circles: [{"square":"b4","color":"green"}] },
      { san: "Bd6" },
      { san: "c4", comment: C.C4_VS_D5 },
    ]
  },

  // --- 2.2 Pièges (traps) ---
  {
    name: "Piège : 3...Fxb4 ?? 4.Fxg7 !",
    category: "Contre 1...d5",
    chapter: "d5",
    subchapter: "traps",
    priority: "must-know",
    description: "⚠️ LE piège classique de la Sokolsky. À connaître absolument — tu le verras souvent dans tes parties.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "d5", comment: C.D5 },
      { san: "Bb2", comment: C.BB2 },
      { san: "e6" },
      { san: "e3", comment: C.E3 },
      { san: "Bxb4", comment: C.PIEGE_BXB4_ERROR, circles: [{"square":"g7","color":"red"},{"square":"b4","color":"red"}] },
      { san: "Bxg7", comment: C.PIEGE_BXG7, arrows: [{"from":"b2","to":"g7","color":"green"},{"from":"g7","to":"h8","color":"green"}], circles: [{"square":"g7","color":"green"},{"square":"h8","color":"red"}] },
    ]
  },
  {
    name: "Piège : 3...Fxb4 ?? 4.Fxg7 ! (Nf6 a3 Be7 Nf3 O-O c4...)",
    category: "Contre 1...d5",
    chapter: "d5",
    subchapter: "traps",
    priority: "bonus",
    description: "Version étendue de la ligne principale avec rappel de la menace Fxg7.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "d5", comment: C.D5 },
      { san: "Bb2", comment: C.BB2 },
      { san: "e6" },
      { san: "e3", comment: C.E3 },
      { san: "Nf6", comment: C.NF6 },
      { san: "a3", comment: C.A3_MANDATORY },
      { san: "Be7", comment: C.BE7 },
      { san: "Nf3" },
      { san: "O-O", comment: C.OO },
      { san: "c4", comment: C.C4_VS_D5 },
    ]
  },
  {
    name: "Piège : 3...Fxb4 ?? 4.Fxg7 ! (Nf6 a3 Bd6 c4...)",
    category: "Contre 1...d5",
    chapter: "d5",
    subchapter: "traps",
    priority: "bonus",
    description: "Sous-variante avec …Fd6 après a3.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "d5", comment: C.D5 },
      { san: "Bb2", comment: C.BB2 },
      { san: "e6" },
      { san: "e3", comment: C.E3 },
      { san: "Nf6", comment: C.NF6 },
      { san: "a3", comment: C.A3_MANDATORY },
      { san: "Bd6" },
      { san: "c4", comment: C.C4_VS_D5 },
    ]
  },

  // --- 2.3 3...c5 : le contre central (sidelines) ---
  {
    name: "3...c5 : le contre central",
    category: "Contre 1...d5",
    chapter: "d5",
    subchapter: "sidelines",
    priority: "important",
    description: "La tentative de contre-attaque des Noirs. On prend en c5 et on ouvre avec d4.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "d5", comment: C.D5 },
      { san: "Bb2", comment: C.BB2 },
      { san: "Nf6", comment: C.NF6 },
      { san: "e3", comment: C.E3 },
      { san: "e6" },
      { san: "a3", comment: C.A3_MANDATORY, arrows: [{"from":"a2","to":"a3","color":"green"}] },
      { san: "c5", comment: C.CONTRE_C5, arrows: [{"from":"c5","to":"b4","color":"red"}] },
      { san: "bxc5", arrows: [{"from":"b4","to":"c5","color":"green"}] },
      { san: "Bxc5" },
      { san: "Nf3" },
      { san: "Nc6" },
      { san: "d4", comment: C.CONTRE_C5_D4, arrows: [{"from":"d2","to":"d4","color":"green"},{"from":"d4","to":"c5","color":"red"}], circles: [{"square":"c5","color":"red"}] },
    ]
  },
  {
    name: "3...c5 : le contre central (O-O c4...)",
    category: "Contre 1...d5",
    chapter: "d5",
    subchapter: "sidelines",
    priority: "bonus",
    description: "Variante où Noir roque avant …Cc6. On préfère c4 à d4 ici.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "d5", comment: C.D5 },
      { san: "Bb2", comment: C.BB2 },
      { san: "Nf6", comment: C.NF6 },
      { san: "e3", comment: C.E3 },
      { san: "e6" },
      { san: "a3", comment: C.A3_MANDATORY, arrows: [{"from":"a2","to":"a3","color":"green"}] },
      { san: "c5", comment: C.CONTRE_C5, arrows: [{"from":"c5","to":"b4","color":"red"}] },
      { san: "bxc5", arrows: [{"from":"b4","to":"c5","color":"green"}] },
      { san: "Bxc5" },
      { san: "Nf3" },
      { san: "O-O", comment: C.OO },
      { san: "c4", comment: C.C4_VS_D5 },
    ]
  },

  // --- 2.4 Transpositions (Ff5, c6) ---
  {
    name: "2...Ff5 : le fou actif",
    category: "Contre 1...d5",
    chapter: "d5",
    subchapter: "transpositions",
    priority: "important",
    description: "Noir sort vite le fou avant …e6. On garde notre setup avec e3 et a3.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "d5", comment: C.D5 },
      { san: "Bb2", comment: C.BB2 },
      { san: "Bf5", arrows: [{"from":"c8","to":"f5","color":"yellow"}] },
      { san: "e3", comment: C.E3 },
      { san: "Nf6", comment: C.NF6 },
      { san: "Nf3" },
      { san: "e6" },
      { san: "a3", comment: C.A3_MANDATORY, arrows: [{"from":"a2","to":"a3","color":"green"},{"from":"c2","to":"c4","color":"yellow"}] },
    ]
  },
  {
    name: "2...c6 : Slave renversé",
    category: "Contre 1...d5",
    chapter: "d5",
    subchapter: "transpositions",
    priority: "important",
    description: "Structure Slave inversée. On attaque d5 avec c4.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "d5", comment: C.D5 },
      { san: "Bb2", comment: C.BB2 },
      { san: "c6", circles: [{"square":"c6","color":"yellow"}] },
      { san: "e3", comment: C.E3 },
      { san: "Nf6", comment: C.NF6 },
      { san: "Nf3" },
      { san: "Bg4" },
      { san: "c4", comment: C.C4_VS_D5, arrows: [{"from":"c2","to":"c4","color":"green"},{"from":"c4","to":"d5","color":"yellow"}] },
    ]
  },
  {
    name: "Ligne principale : setup avec a3 (Bf5 Nf3 c6 c4...)",
    category: "Contre 1...d5",
    chapter: "d5",
    subchapter: "transpositions",
    priority: "bonus",
    description: "Variante Ff5 + c6. On continue avec c4.",
    moves: [
      { san: "b4", comment: C.B4, arrows: [{"from":"b2","to":"b4","color":"green"}] },
      { san: "d5", comment: C.D5, circles: [{"square":"d5","color":"red"}] },
      { san: "Bb2", comment: C.BB2, arrows: [{"from":"c1","to":"b2","color":"green"}] },
      { san: "Nf6", comment: C.NF6 },
      { san: "e3", comment: C.E3, arrows: [{"from":"f1","to":"e2","color":"yellow"}] },
      { san: "Bf5" },
      { san: "Nf3" },
      { san: "c6" },
      { san: "c4", comment: C.C4_VS_D5 },
    ]
  },
  {
    name: "Ligne principale : setup avec a3 (Bf5 Nf3 e6 a3...)",
    category: "Contre 1...d5",
    chapter: "d5",
    subchapter: "transpositions",
    priority: "bonus",
    description: "Variante Ff5 + e6. On joue a3 obligatoire.",
    moves: [
      { san: "b4", comment: C.B4, arrows: [{"from":"b2","to":"b4","color":"green"}] },
      { san: "d5", comment: C.D5, circles: [{"square":"d5","color":"red"}] },
      { san: "Bb2", comment: C.BB2, arrows: [{"from":"c1","to":"b2","color":"green"}] },
      { san: "Nf6", comment: C.NF6 },
      { san: "e3", comment: C.E3, arrows: [{"from":"f1","to":"e2","color":"yellow"}] },
      { san: "Bf5" },
      { san: "Nf3" },
      { san: "e6" },
      { san: "a3", comment: C.A3_MANDATORY },
    ]
  },
  {
    name: "Ligne principale : setup avec a3 (c6 Nf3 Bf5 c4...)",
    category: "Contre 1...d5",
    chapter: "d5",
    subchapter: "transpositions",
    priority: "bonus",
    description: "Variante c6 puis Ff5. Même idée : c4.",
    moves: [
      { san: "b4", comment: C.B4, arrows: [{"from":"b2","to":"b4","color":"green"}] },
      { san: "d5", comment: C.D5, circles: [{"square":"d5","color":"red"}] },
      { san: "Bb2", comment: C.BB2, arrows: [{"from":"c1","to":"b2","color":"green"}] },
      { san: "Nf6", comment: C.NF6 },
      { san: "e3", comment: C.E3, arrows: [{"from":"f1","to":"e2","color":"yellow"}] },
      { san: "c6" },
      { san: "Nf3" },
      { san: "Bf5" },
      { san: "c4", comment: C.C4_VS_D5 },
    ]
  },
  {
    name: "Ligne principale : setup avec a3 (c6 Nf3 Bg4 c4...)",
    category: "Contre 1...d5",
    chapter: "d5",
    subchapter: "transpositions",
    priority: "bonus",
    description: "Variante c6 puis Fg4. c4 reste la clé.",
    moves: [
      { san: "b4", comment: C.B4, arrows: [{"from":"b2","to":"b4","color":"green"}] },
      { san: "d5", comment: C.D5, circles: [{"square":"d5","color":"red"}] },
      { san: "Bb2", comment: C.BB2, arrows: [{"from":"c1","to":"b2","color":"green"}] },
      { san: "Nf6", comment: C.NF6 },
      { san: "e3", comment: C.E3, arrows: [{"from":"f1","to":"e2","color":"yellow"}] },
      { san: "c6" },
      { san: "Nf3" },
      { san: "Bg4" },
      { san: "c4", comment: C.C4_VS_D5 },
    ]
  },
  {
    name: "2...c6 : Slave renversé (Bf5 Nf3 Nf6 c4...)",
    category: "Contre 1...d5",
    chapter: "d5",
    subchapter: "transpositions",
    priority: "bonus",
    description: "Slave + Ff5 + Cf6. Même plan.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "d5", comment: C.D5 },
      { san: "Bb2", comment: C.BB2 },
      { san: "c6", circles: [{"square":"c6","color":"yellow"}] },
      { san: "e3", comment: C.E3 },
      { san: "Bf5" },
      { san: "Nf3" },
      { san: "Nf6", comment: C.NF6 },
      { san: "c4", comment: C.C4_VS_D5 },
    ]
  },
  {
    name: "2...c6 : Slave renversé (Bf5 Nf3 e6 c4...)",
    category: "Contre 1...d5",
    chapter: "d5",
    subchapter: "transpositions",
    priority: "bonus",
    description: "Slave + Ff5 + e6. c4 attaque d5.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "d5", comment: C.D5 },
      { san: "Bb2", comment: C.BB2 },
      { san: "c6", circles: [{"square":"c6","color":"yellow"}] },
      { san: "e3", comment: C.E3 },
      { san: "Bf5" },
      { san: "Nf3" },
      { san: "e6" },
      { san: "c4", comment: C.C4_VS_D5 },
    ]
  },
  {
    name: "2...c6 : Slave renversé (Bf5 c4...)",
    category: "Contre 1...d5",
    chapter: "d5",
    subchapter: "transpositions",
    priority: "bonus",
    description: "Ordre alternatif avec Cf6 avant Ff5.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "d5", comment: C.D5 },
      { san: "Bb2", comment: C.BB2 },
      { san: "c6", circles: [{"square":"c6","color":"yellow"}] },
      { san: "e3", comment: C.E3 },
      { san: "Nf6", comment: C.NF6 },
      { san: "Nf3" },
      { san: "Bf5" },
      { san: "c4", comment: C.C4_VS_D5 },
    ]
  },
  {
    name: "2...Ff5 : le fou actif (c6 Nf3 Nf6 c4...)",
    category: "Contre 1...d5",
    chapter: "d5",
    subchapter: "transpositions",
    priority: "bonus",
    description: "Ff5 + c6 + Cf6.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "d5", comment: C.D5 },
      { san: "Bb2", comment: C.BB2 },
      { san: "Bf5", arrows: [{"from":"c8","to":"f5","color":"yellow"}] },
      { san: "e3", comment: C.E3 },
      { san: "c6" },
      { san: "Nf3" },
      { san: "Nf6", comment: C.NF6 },
      { san: "c4", comment: C.C4_VS_D5 },
    ]
  },
  {
    name: "2...Ff5 : le fou actif (c6 Nf3 e6 c4...)",
    category: "Contre 1...d5",
    chapter: "d5",
    subchapter: "transpositions",
    priority: "bonus",
    description: "Ff5 + c6 + e6.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "d5", comment: C.D5 },
      { san: "Bb2", comment: C.BB2 },
      { san: "Bf5", arrows: [{"from":"c8","to":"f5","color":"yellow"}] },
      { san: "e3", comment: C.E3 },
      { san: "c6" },
      { san: "Nf3" },
      { san: "e6" },
      { san: "c4", comment: C.C4_VS_D5 },
    ]
  },
  {
    name: "2...Ff5 : le fou actif (e6 Nf3 c6 c4...)",
    category: "Contre 1...d5",
    chapter: "d5",
    subchapter: "transpositions",
    priority: "bonus",
    description: "Ff5 + e6 + c6.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "d5", comment: C.D5 },
      { san: "Bb2", comment: C.BB2 },
      { san: "Bf5", arrows: [{"from":"c8","to":"f5","color":"yellow"}] },
      { san: "e3", comment: C.E3 },
      { san: "e6" },
      { san: "Nf3" },
      { san: "c6" },
      { san: "c4", comment: C.C4_VS_D5 },
    ]
  },
  {
    name: "2...Ff5 : le fou actif (e6 Nf3 Nf6 a3...)",
    category: "Contre 1...d5",
    chapter: "d5",
    subchapter: "transpositions",
    priority: "bonus",
    description: "Ff5 + e6 + Cf6 : a3 obligatoire avant c4.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "d5", comment: C.D5 },
      { san: "Bb2", comment: C.BB2 },
      { san: "Bf5", arrows: [{"from":"c8","to":"f5","color":"yellow"}] },
      { san: "e3", comment: C.E3 },
      { san: "e6" },
      { san: "Nf3" },
      { san: "Nf6", comment: C.NF6 },
      { san: "a3", comment: C.A3_MANDATORY },
    ]
  },
  {
    name: "2...Ff5 : le fou actif (c6 c4...)",
    category: "Contre 1...d5",
    chapter: "d5",
    subchapter: "transpositions",
    priority: "bonus",
    description: "Variante rapide Ff5 + Cf6 + c6.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "d5", comment: C.D5 },
      { san: "Bb2", comment: C.BB2 },
      { san: "Bf5", arrows: [{"from":"c8","to":"f5","color":"yellow"}] },
      { san: "e3", comment: C.E3 },
      { san: "Nf6", comment: C.NF6 },
      { san: "Nf3" },
      { san: "c6" },
      { san: "c4", comment: C.C4_VS_D5 },
    ]
  },

  // --- 2.5 Réponses rares ---
  {
    name: "2...Cc6 : chasser avec b5",
    category: "Contre 1...d5",
    chapter: "d5",
    subchapter: "rare",
    priority: "bonus",
    description: "…Cc6 au 2e coup : on chasse avec b5.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "d5", comment: C.D5 },
      { san: "Bb2", comment: C.BB2 },
      { san: "Nc6", circles: [{"square":"c6","color":"red"}] },
      { san: "b5", arrows: [{"from":"b4","to":"b5","color":"green"}], circles: [{"square":"c6","color":"red"}] },
    ]
  },
  {
    name: "2...Cc6 : chasser avec b5 (Na5 e3...)",
    category: "Contre 1...d5",
    chapter: "d5",
    subchapter: "rare",
    priority: "bonus",
    description: "Le cavalier va en a5 après b5. Développement normal.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "d5", comment: C.D5 },
      { san: "Bb2", comment: C.BB2 },
      { san: "Nc6", circles: [{"square":"c6","color":"red"}] },
      { san: "b5", arrows: [{"from":"b4","to":"b5","color":"green"}], circles: [{"square":"c6","color":"red"}] },
      { san: "Na5" },
      { san: "e3", comment: C.E3 },
    ]
  },
  {
    name: "2...Cc6 : chasser avec b5 (Nb8 e3...)",
    category: "Contre 1...d5",
    chapter: "d5",
    subchapter: "rare",
    priority: "bonus",
    description: "Le cavalier revient en b8. Tempo gagné, on continue.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "d5", comment: C.D5 },
      { san: "Bb2", comment: C.BB2 },
      { san: "Nc6", circles: [{"square":"c6","color":"red"}] },
      { san: "b5", arrows: [{"from":"b4","to":"b5","color":"green"}], circles: [{"square":"c6","color":"red"}] },
      { san: "Nb8" },
      { san: "e3", comment: C.E3 },
    ]
  },
  {
    name: "Ligne principale : setup avec a3 (e5 Bxe5 Nc6 Bb2...)",
    category: "Contre 1...d5",
    chapter: "d5",
    subchapter: "rare",
    priority: "bonus",
    description: "Noir joue …e5 contre 1…d5. On prend en e5.",
    moves: [
      { san: "b4", comment: C.B4, arrows: [{"from":"b2","to":"b4","color":"green"}] },
      { san: "d5", comment: C.D5, circles: [{"square":"d5","color":"red"}] },
      { san: "Bb2", comment: C.BB2, arrows: [{"from":"c1","to":"b2","color":"green"}] },
      { san: "e5" },
      { san: "Bxe5" },
      { san: "Nc6" },
      { san: "Bb2" },
    ]
  },
  {
    name: "Ligne principale : setup avec a3 (d4 Nf3 Nc6 b5...)",
    category: "Contre 1...d5",
    chapter: "d5",
    subchapter: "rare",
    priority: "bonus",
    description: "…d4 pousse le pion. Cf3 le contourne, b5 chasse Cc6.",
    moves: [
      { san: "b4", comment: C.B4, arrows: [{"from":"b2","to":"b4","color":"green"}] },
      { san: "d5", comment: C.D5, circles: [{"square":"d5","color":"red"}] },
      { san: "Bb2", comment: C.BB2, arrows: [{"from":"c1","to":"b2","color":"green"}] },
      { san: "d4" },
      { san: "Nf3" },
      { san: "Nc6" },
      { san: "b5" },
    ]
  },
  {
    name: "Ligne principale : setup avec a3 (f6 e3 e5 a3...)",
    category: "Contre 1...d5",
    chapter: "d5",
    subchapter: "rare",
    priority: "bonus",
    description: "…f6 prépare …e5. a3 sécurise b4.",
    moves: [
      { san: "b4", comment: C.B4, arrows: [{"from":"b2","to":"b4","color":"green"}] },
      { san: "d5", comment: C.D5, circles: [{"square":"d5","color":"red"}] },
      { san: "Bb2", comment: C.BB2, arrows: [{"from":"c1","to":"b2","color":"green"}] },
      { san: "f6" },
      { san: "e3", comment: C.E3 },
      { san: "e5" },
      { san: "a3", comment: C.A3_MANDATORY },
    ]
  },
  {
    name: "Ligne principale : setup avec a3 (a6 e3 Nc6 a3...)",
    category: "Contre 1...d5",
    chapter: "d5",
    subchapter: "rare",
    priority: "bonus",
    description: "…a6 attend et prépare …b5. On joue notre plan.",
    moves: [
      { san: "b4", comment: C.B4, arrows: [{"from":"b2","to":"b4","color":"green"}] },
      { san: "d5", comment: C.D5, circles: [{"square":"d5","color":"red"}] },
      { san: "Bb2", comment: C.BB2, arrows: [{"from":"c1","to":"b2","color":"green"}] },
      { san: "a6" },
      { san: "e3", comment: C.E3 },
      { san: "Nc6" },
      { san: "a3", comment: C.A3_MANDATORY },
    ]
  },
  {
    name: "Piège : 3...Fxb4 ?? 4.Fxg7 ! (Nf6 a3 c5 bxc5 Bxc5 Nf3 O-O c4...)",
    category: "Contre 1...d5",
    chapter: "d5",
    subchapter: "rare",
    priority: "bonus",
    description: "Transposition vers 3…c5 après d5.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "d5", comment: C.D5 },
      { san: "Bb2", comment: C.BB2 },
      { san: "e6" },
      { san: "e3", comment: C.E3 },
      { san: "Nf6", comment: C.NF6 },
      { san: "a3", comment: C.A3_MANDATORY },
      { san: "c5", comment: C.CONTRE_C5 },
      { san: "bxc5" },
      { san: "Bxc5" },
      { san: "Nf3" },
      { san: "O-O", comment: C.OO },
      { san: "c4", comment: C.C4_VS_D5 },
    ]
  },
  {
    name: "Piège : 3...Fxb4 ?? 4.Fxg7 ! (Nf6 a3 c5 bxc5 Bxc5 Nf3 Nc6 d4...)",
    category: "Contre 1...d5",
    chapter: "d5",
    subchapter: "rare",
    priority: "bonus",
    description: "Autre ordre : d4 après …Cc6.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "d5", comment: C.D5 },
      { san: "Bb2", comment: C.BB2 },
      { san: "e6" },
      { san: "e3", comment: C.E3 },
      { san: "Nf6", comment: C.NF6 },
      { san: "a3", comment: C.A3_MANDATORY },
      { san: "c5", comment: C.CONTRE_C5 },
      { san: "bxc5" },
      { san: "Bxc5" },
      { san: "Nf3" },
      { san: "Nc6" },
      { san: "d4", comment: C.CONTRE_C5_D4 },
    ]
  },

  // ==========================================================================
  // CHAPITRE 3 — CONTRE 1...Cf6
  // ==========================================================================

  // --- 3.1 Transposition vers d5 (transpositions) ---
  {
    name: "2...d5 : transposition",
    category: "Contre 1...Cf6",
    chapter: "nf6",
    subchapter: "transpositions",
    priority: "must-know",
    description: "Transpose directement vers le Chapitre 2. Même plan standard.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "Nf6", comment: C.NF6, circles: [{"square":"e4","color":"yellow"}] },
      { san: "Bb2", comment: C.BB2 },
      { san: "d5" },
      { san: "e3", comment: C.E3 },
      { san: "e6" },
      { san: "a3", comment: C.A3_MANDATORY, arrows: [{"from":"a2","to":"a3","color":"green"}] },
      { san: "Be7", comment: C.BE7 },
      { san: "Nf3" },
      { san: "O-O", comment: C.OO },
      { san: "c4", comment: C.C4_ANTI_D6, arrows: [{"from":"c2","to":"c4","color":"green"}] },
    ]
  },
  {
    name: "2...d5 : transposition (e6 a3 Be7 e3 d5 Nf3 O-O c4...)",
    category: "Contre 1...Cf6",
    chapter: "nf6",
    subchapter: "transpositions",
    priority: "bonus",
    description: "Ordre alternatif avec …e6 avant …d5.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "Nf6", comment: C.NF6, circles: [{"square":"e4","color":"yellow"}] },
      { san: "Bb2", comment: C.BB2 },
      { san: "e6" },
      { san: "a3", comment: C.A3_MANDATORY },
      { san: "Be7", comment: C.BE7 },
      { san: "e3", comment: C.E3 },
      { san: "d5" },
      { san: "Nf3" },
      { san: "O-O", comment: C.OO },
      { san: "c4", comment: C.C4_ANTI_D6 },
    ]
  },
  {
    name: "2...d5 : transposition (e6 a3 a5 b5...)",
    category: "Contre 1...Cf6",
    chapter: "nf6",
    subchapter: "transpositions",
    priority: "bonus",
    description: "Noir tente …a5 malgré a3. On avance b5.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "Nf6", comment: C.NF6, circles: [{"square":"e4","color":"yellow"}] },
      { san: "Bb2", comment: C.BB2 },
      { san: "e6" },
      { san: "a3", comment: C.A3_MANDATORY },
      { san: "a5" },
      { san: "b5" },
    ]
  },
  {
    name: "2...d5 : transposition (e6 a3 d5 e3 c5 bxc5 Bxc5 Nf3 O-O c4...)",
    category: "Contre 1...Cf6",
    chapter: "nf6",
    subchapter: "transpositions",
    priority: "bonus",
    description: "Transposition vers la variante …c5 du Chapitre 2.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "Nf6", comment: C.NF6, circles: [{"square":"e4","color":"yellow"}] },
      { san: "Bb2", comment: C.BB2 },
      { san: "e6" },
      { san: "a3", comment: C.A3_MANDATORY },
      { san: "d5" },
      { san: "e3", comment: C.E3 },
      { san: "c5", comment: C.CONTRE_C5 },
      { san: "bxc5" },
      { san: "Bxc5" },
      { san: "Nf3" },
      { san: "O-O", comment: C.OO },
      { san: "c4", comment: C.C4_ANTI_D6 },
    ]
  },
  {
    name: "2...d5 : transposition (e6 a3 d5 e3 c5 bxc5 Bxc5 Nf3 Nc6 d4...)",
    category: "Contre 1...Cf6",
    chapter: "nf6",
    subchapter: "transpositions",
    priority: "bonus",
    description: "Variante …c5 avec …Cc6 et d4.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "Nf6", comment: C.NF6, circles: [{"square":"e4","color":"yellow"}] },
      { san: "Bb2", comment: C.BB2 },
      { san: "e6" },
      { san: "a3", comment: C.A3_MANDATORY },
      { san: "d5" },
      { san: "e3", comment: C.E3 },
      { san: "c5", comment: C.CONTRE_C5 },
      { san: "bxc5" },
      { san: "Bxc5" },
      { san: "Nf3" },
      { san: "Nc6" },
      { san: "d4", comment: C.CONTRE_C5_D4 },
    ]
  },
  {
    name: "2...d5 : transposition (e6 a3 d5 e3 Bd6 c4...)",
    category: "Contre 1...Cf6",
    chapter: "nf6",
    subchapter: "transpositions",
    priority: "bonus",
    description: "Variante avec …Fd6 actif.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "Nf6", comment: C.NF6, circles: [{"square":"e4","color":"yellow"}] },
      { san: "Bb2", comment: C.BB2 },
      { san: "e6" },
      { san: "a3", comment: C.A3_MANDATORY },
      { san: "d5" },
      { san: "e3", comment: C.E3 },
      { san: "Bd6" },
      { san: "c4", comment: C.C4_ANTI_D6 },
    ]
  },
  {
    name: "2...d5 : transposition (e6 a3 d5 e3 Be7 Nf3 O-O c4...)",
    category: "Contre 1...Cf6",
    chapter: "nf6",
    subchapter: "transpositions",
    priority: "bonus",
    description: "Ordre e6-a3-d5-e3-Be7.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "Nf6", comment: C.NF6, circles: [{"square":"e4","color":"yellow"}] },
      { san: "Bb2", comment: C.BB2 },
      { san: "e6" },
      { san: "a3", comment: C.A3_MANDATORY },
      { san: "d5" },
      { san: "e3", comment: C.E3 },
      { san: "Be7", comment: C.BE7 },
      { san: "Nf3" },
      { san: "O-O", comment: C.OO },
      { san: "c4", comment: C.C4_ANTI_D6 },
    ]
  },
  {
    name: "2...d5 : transposition (Bf5 Nf3 c6 c4...)",
    category: "Contre 1...Cf6",
    chapter: "nf6",
    subchapter: "transpositions",
    priority: "bonus",
    description: "Transpose vers la variante Ff5 + c6.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "Nf6", comment: C.NF6, circles: [{"square":"e4","color":"yellow"}] },
      { san: "Bb2", comment: C.BB2 },
      { san: "d5" },
      { san: "e3", comment: C.E3 },
      { san: "Bf5" },
      { san: "Nf3" },
      { san: "c6" },
      { san: "c4", comment: C.C4_ANTI_D6 },
    ]
  },
  {
    name: "2...d5 : transposition (Bf5 Nf3 e6 a3...)",
    category: "Contre 1...Cf6",
    chapter: "nf6",
    subchapter: "transpositions",
    priority: "bonus",
    description: "Transpose vers Ff5 + e6.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "Nf6", comment: C.NF6, circles: [{"square":"e4","color":"yellow"}] },
      { san: "Bb2", comment: C.BB2 },
      { san: "d5" },
      { san: "e3", comment: C.E3 },
      { san: "Bf5" },
      { san: "Nf3" },
      { san: "e6" },
      { san: "a3", comment: C.A3_MANDATORY },
    ]
  },
  {
    name: "2...d5 : transposition (c6 Nf3 Bf5 c4...)",
    category: "Contre 1...Cf6",
    chapter: "nf6",
    subchapter: "transpositions",
    priority: "bonus",
    description: "Slave + Ff5 via Cf6.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "Nf6", comment: C.NF6, circles: [{"square":"e4","color":"yellow"}] },
      { san: "Bb2", comment: C.BB2 },
      { san: "d5" },
      { san: "e3", comment: C.E3 },
      { san: "c6" },
      { san: "Nf3" },
      { san: "Bf5" },
      { san: "c4", comment: C.C4_ANTI_D6 },
    ]
  },
  {
    name: "2...d5 : transposition (c6 Nf3 Bg4 c4...)",
    category: "Contre 1...Cf6",
    chapter: "nf6",
    subchapter: "transpositions",
    priority: "bonus",
    description: "Slave + Fg4 via Cf6.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "Nf6", comment: C.NF6, circles: [{"square":"e4","color":"yellow"}] },
      { san: "Bb2", comment: C.BB2 },
      { san: "d5" },
      { san: "e3", comment: C.E3 },
      { san: "c6" },
      { san: "Nf3" },
      { san: "Bg4" },
      { san: "c4", comment: C.C4_ANTI_D6 },
    ]
  },
  {
    name: "2...d5 : transposition (Nc6 b5...)",
    category: "Contre 1...Cf6",
    chapter: "nf6",
    subchapter: "transpositions",
    priority: "bonus",
    description: "…Cc6 après d5 : b5 chasse.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "Nf6", comment: C.NF6, circles: [{"square":"e4","color":"yellow"}] },
      { san: "Bb2", comment: C.BB2 },
      { san: "d5" },
      { san: "e3", comment: C.E3 },
      { san: "Nc6" },
      { san: "b5" },
    ]
  },
  {
    name: "2...d5 : transposition (c5 bxc5 Bxc5 Nf3 O-O c4...)",
    category: "Contre 1...Cf6",
    chapter: "nf6",
    subchapter: "transpositions",
    priority: "bonus",
    description: "Transpose vers 3…c5.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "Nf6", comment: C.NF6, circles: [{"square":"e4","color":"yellow"}] },
      { san: "Bb2", comment: C.BB2 },
      { san: "d5" },
      { san: "e3", comment: C.E3 },
      { san: "e6" },
      { san: "a3", comment: C.A3_MANDATORY, arrows: [{"from":"a2","to":"a3","color":"green"}] },
      { san: "c5", comment: C.CONTRE_C5 },
      { san: "bxc5" },
      { san: "Bxc5" },
      { san: "Nf3" },
      { san: "O-O", comment: C.OO },
      { san: "c4", comment: C.C4_ANTI_D6 },
    ]
  },
  {
    name: "2...d5 : transposition (c5 bxc5 Bxc5 Nf3 Nc6 d4...)",
    category: "Contre 1...Cf6",
    chapter: "nf6",
    subchapter: "transpositions",
    priority: "bonus",
    description: "Variante …c5 avec …Cc6 et d4.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "Nf6", comment: C.NF6, circles: [{"square":"e4","color":"yellow"}] },
      { san: "Bb2", comment: C.BB2 },
      { san: "d5" },
      { san: "e3", comment: C.E3 },
      { san: "e6" },
      { san: "a3", comment: C.A3_MANDATORY, arrows: [{"from":"a2","to":"a3","color":"green"}] },
      { san: "c5", comment: C.CONTRE_C5 },
      { san: "bxc5" },
      { san: "Bxc5" },
      { san: "Nf3" },
      { san: "Nc6" },
      { san: "d4", comment: C.CONTRE_C5_D4 },
    ]
  },
  {
    name: "2...d5 : transposition (Bd6 c4...)",
    category: "Contre 1...Cf6",
    chapter: "nf6",
    subchapter: "transpositions",
    priority: "bonus",
    description: "Transpose vers la variante …Fd6.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "Nf6", comment: C.NF6, circles: [{"square":"e4","color":"yellow"}] },
      { san: "Bb2", comment: C.BB2 },
      { san: "d5" },
      { san: "e3", comment: C.E3 },
      { san: "e6" },
      { san: "a3", comment: C.A3_MANDATORY, arrows: [{"from":"a2","to":"a3","color":"green"}] },
      { san: "Bd6" },
      { san: "c4", comment: C.C4_ANTI_D6 },
    ]
  },

  // --- 3.2 Le fianchetto (main) ---
  {
    name: "2...g6 : fianchetto (pas de a3 !)",
    category: "Contre 1...Cf6",
    chapter: "nf6",
    subchapter: "main",
    priority: "must-know",
    description: "⚠️ Setup SPÉCIFIQUE au fianchetto. On oublie a3 et on développe vite : c4, Fe2, O-O.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "Nf6", comment: C.NF6 },
      { san: "Bb2", comment: C.BB2 },
      { san: "g6", arrows: [{"from":"f8","to":"g7","color":"red"}] },
      { san: "e3", comment: C.E3 },
      { san: "Bg7", arrows: [{"from":"g7","to":"b2","color":"yellow"},{"from":"b2","to":"g7","color":"yellow"}] },
      { san: "Nf3" },
      { san: "O-O", comment: C.OO },
      { san: "c4", comment: C.FIANCHETTO_NO_A3, arrows: [{"from":"c2","to":"c4","color":"green"}] },
      { san: "d6" },
      { san: "Be2", comment: C.BE2, arrows: [{"from":"d2","to":"d4","color":"yellow"}], circles: [{"square":"d4","color":"yellow"}] },
    ]
  },
  {
    name: "2...g6 : fianchetto (pas de a3 !) (d6 Nf3 Bg7 c4 O-O Be2...)",
    category: "Contre 1...Cf6",
    chapter: "nf6",
    subchapter: "main",
    priority: "bonus",
    description: "Ordre d6 avant Fg7.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "Nf6", comment: C.NF6 },
      { san: "Bb2", comment: C.BB2 },
      { san: "g6", arrows: [{"from":"f8","to":"g7","color":"red"}] },
      { san: "e3", comment: C.E3 },
      { san: "d6" },
      { san: "Nf3" },
      { san: "Bg7" },
      { san: "c4", comment: C.FIANCHETTO_NO_A3 },
      { san: "O-O", comment: C.OO },
      { san: "Be2", comment: C.BE2 },
    ]
  },
  {
    name: "2...g6 : fianchetto (pas de a3 !) (d6 c4 O-O Be2...)",
    category: "Contre 1...Cf6",
    chapter: "nf6",
    subchapter: "main",
    priority: "bonus",
    description: "Variante avec c4 avant le roque.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "Nf6", comment: C.NF6 },
      { san: "Bb2", comment: C.BB2 },
      { san: "g6", arrows: [{"from":"f8","to":"g7","color":"red"}] },
      { san: "e3", comment: C.E3 },
      { san: "Bg7", arrows: [{"from":"g7","to":"b2","color":"yellow"},{"from":"b2","to":"g7","color":"yellow"}] },
      { san: "Nf3" },
      { san: "d6" },
      { san: "c4", comment: C.FIANCHETTO_NO_A3 },
      { san: "O-O", comment: C.OO },
      { san: "Be2", comment: C.BE2 },
    ]
  },

  // --- 3.3 La provocation 2...e5 (traps) ---
  {
    name: "2...e5 !? : la provocation",
    category: "Contre 1...Cf6",
    chapter: "nf6",
    subchapter: "traps",
    priority: "important",
    description: "Noir offre e5 pour provoquer Fxe5. Après …Fxb4 ?? même piège classique.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "Nf6", comment: C.NF6 },
      { san: "Bb2", comment: C.BB2 },
      { san: "e5", circles: [{"square":"e5","color":"yellow"}] },
      { san: "Bxe5", arrows: [{"from":"b2","to":"e5","color":"green"}] },
      { san: "Bxb4", comment: C.PIEGE_BXB4_ERROR },
      { san: "Nf3", arrows: [{"from":"g1","to":"f3","color":"green"}] },
      { san: "d6" },
      { san: "Bb2", arrows: [{"from":"e5","to":"b2","color":"yellow"}] },
    ]
  },
  {
    name: "2...e5 !? : la provocation (Nc6 Bb2...)",
    category: "Contre 1...Cf6",
    chapter: "nf6",
    subchapter: "traps",
    priority: "bonus",
    description: "Sous-variante avec …Cc6.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "Nf6", comment: C.NF6 },
      { san: "Bb2", comment: C.BB2 },
      { san: "e5", circles: [{"square":"e5","color":"yellow"}] },
      { san: "Bxe5", arrows: [{"from":"b2","to":"e5","color":"green"}] },
      { san: "Bxb4", comment: C.PIEGE_BXB4_ERROR },
      { san: "Nf3", arrows: [{"from":"g1","to":"f3","color":"green"}] },
      { san: "Nc6" },
      { san: "Bb2" },
    ]
  },
  {
    name: "2...e5 !? : la provocation (O-O e3 d5 c4...)",
    category: "Contre 1...Cf6",
    chapter: "nf6",
    subchapter: "traps",
    priority: "bonus",
    description: "Noir roque plutôt que prendre b4.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "Nf6", comment: C.NF6 },
      { san: "Bb2", comment: C.BB2 },
      { san: "e5", circles: [{"square":"e5","color":"yellow"}] },
      { san: "Bxe5", arrows: [{"from":"b2","to":"e5","color":"green"}] },
      { san: "Bxb4", comment: C.PIEGE_BXB4_ERROR },
      { san: "Nf3", arrows: [{"from":"g1","to":"f3","color":"green"}] },
      { san: "O-O", comment: C.OO },
      { san: "e3", comment: C.E3 },
      { san: "d5" },
      { san: "c4", comment: C.C4_ANTI_D6 },
    ]
  },

  // --- 3.4 Système hybride 2...d6 (sidelines) ---
  {
    name: "2...d6 : système hybride",
    category: "Contre 1...Cf6",
    chapter: "nf6",
    subchapter: "sidelines",
    priority: "important",
    description: "Structure Philidor. On revient au plan anti-…d6 : c4, Fe2, O-O, Cc3.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "Nf6", comment: C.NF6 },
      { san: "Bb2", comment: C.BB2 },
      { san: "d6", comment: C.D6 },
      { san: "e3", comment: C.E3 },
      { san: "e5", circles: [{"square":"e5","color":"yellow"}] },
      { san: "c4", comment: C.C4_ANTI_D6, arrows: [{"from":"c2","to":"c4","color":"green"}] },
      { san: "Be7", comment: C.BE7 },
      { san: "Be2", comment: C.BE2 },
      { san: "O-O", comment: C.OO },
      { san: "Nc3", comment: C.NC3_TARGET, arrows: [{"from":"b1","to":"c3","color":"green"},{"from":"d2","to":"d4","color":"yellow"}], circles: [{"square":"d4","color":"yellow"}] },
    ]
  },
  {
    name: "2...d6 : système hybride (g6 Nf3 Bg7 c4 O-O Be2...)",
    category: "Contre 1...Cf6",
    chapter: "nf6",
    subchapter: "sidelines",
    priority: "bonus",
    description: "Après …d6, Noir passe au fianchetto. Même plan : c4, Fe2.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "Nf6", comment: C.NF6 },
      { san: "Bb2", comment: C.BB2 },
      { san: "d6", comment: C.D6 },
      { san: "e3", comment: C.E3 },
      { san: "g6" },
      { san: "Nf3" },
      { san: "Bg7" },
      { san: "c4", comment: C.FIANCHETTO_NO_A3 },
      { san: "O-O", comment: C.OO },
      { san: "Be2", comment: C.BE2 },
    ]
  },
  {
    name: "2...d6 : système hybride (Be6 Nc3...)",
    category: "Contre 1...Cf6",
    chapter: "nf6",
    subchapter: "sidelines",
    priority: "bonus",
    description: "Variante avec …Fe6 actif.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "Nf6", comment: C.NF6 },
      { san: "Bb2", comment: C.BB2 },
      { san: "d6", comment: C.D6 },
      { san: "e3", comment: C.E3 },
      { san: "e5", circles: [{"square":"e5","color":"yellow"}] },
      { san: "c4", comment: C.C4_ANTI_D6, arrows: [{"from":"c2","to":"c4","color":"green"}] },
      { san: "Be6" },
      { san: "Nc3", comment: C.NC3_TARGET },
    ]
  },

  // ==========================================================================
  // CHAPITRE 4 — AUTRES RÉPONSES
  // ==========================================================================

  // --- 4.1 Transpositions 1...e6 ---
  {
    name: "1...e6 : transposition vers d5",
    category: "Autres réponses",
    chapter: "other",
    subchapter: "transpositions",
    priority: "must-know",
    description: "Très fréquent. …e6 transpose souvent vers le Chapitre 2 après …d5. À connaître.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "e6" },
      { san: "Bb2", comment: C.BB2 },
      { san: "d5", circles: [{"square":"d5","color":"yellow"}] },
      { san: "e3", comment: C.E3 },
      { san: "Nf6", comment: C.NF6 },
      { san: "a3", comment: C.A3_MANDATORY, arrows: [{"from":"a2","to":"a3","color":"green"}] },
      { san: "Be7", comment: C.BE7 },
      { san: "Nf3" },
      { san: "O-O", comment: C.OO },
      { san: "c4", comment: C.C4_ANTI_D6, arrows: [{"from":"c2","to":"c4","color":"green"}] },
    ]
  },
  {
    name: "1...e6 : transposition vers d5 (Nf6 a3 Be7 e3 d5 Nf3 O-O c4...)",
    category: "Autres réponses",
    chapter: "other",
    subchapter: "transpositions",
    priority: "bonus",
    description: "Ordre alternatif Cf6-a3-Fe7-d5.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "e6" },
      { san: "Bb2", comment: C.BB2 },
      { san: "Nf6", comment: C.NF6 },
      { san: "a3", comment: C.A3_MANDATORY },
      { san: "Be7", comment: C.BE7 },
      { san: "e3", comment: C.E3 },
      { san: "d5" },
      { san: "Nf3" },
      { san: "O-O", comment: C.OO },
      { san: "c4", comment: C.C4_ANTI_D6 },
    ]
  },
  {
    name: "1...e6 : transposition vers d5 (Nf6 a3 a5 b5...)",
    category: "Autres réponses",
    chapter: "other",
    subchapter: "transpositions",
    priority: "bonus",
    description: "…a5 malgré a3 : b5 avance.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "e6" },
      { san: "Bb2", comment: C.BB2 },
      { san: "Nf6", comment: C.NF6 },
      { san: "a3", comment: C.A3_MANDATORY },
      { san: "a5" },
      { san: "b5" },
    ]
  },
  {
    name: "1...e6 : transposition vers d5 (Nf6 a3 d5 e3 c5 bxc5 Bxc5 Nf3 O-O c4...)",
    category: "Autres réponses",
    chapter: "other",
    subchapter: "transpositions",
    priority: "bonus",
    description: "Transpose vers 3…c5.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "e6" },
      { san: "Bb2", comment: C.BB2 },
      { san: "Nf6", comment: C.NF6 },
      { san: "a3", comment: C.A3_MANDATORY },
      { san: "d5" },
      { san: "e3", comment: C.E3 },
      { san: "c5", comment: C.CONTRE_C5 },
      { san: "bxc5" },
      { san: "Bxc5" },
      { san: "Nf3" },
      { san: "O-O", comment: C.OO },
      { san: "c4", comment: C.C4_ANTI_D6 },
    ]
  },
  {
    name: "1...e6 : transposition vers d5 (Nf6 a3 d5 e3 c5 bxc5 Bxc5 Nf3 Nc6 d4...)",
    category: "Autres réponses",
    chapter: "other",
    subchapter: "transpositions",
    priority: "bonus",
    description: "3…c5 avec …Cc6 et d4.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "e6" },
      { san: "Bb2", comment: C.BB2 },
      { san: "Nf6", comment: C.NF6 },
      { san: "a3", comment: C.A3_MANDATORY },
      { san: "d5" },
      { san: "e3", comment: C.E3 },
      { san: "c5", comment: C.CONTRE_C5 },
      { san: "bxc5" },
      { san: "Bxc5" },
      { san: "Nf3" },
      { san: "Nc6" },
      { san: "d4", comment: C.CONTRE_C5_D4 },
    ]
  },
  {
    name: "1...e6 : transposition vers d5 (Nf6 a3 d5 e3 Bd6 c4...)",
    category: "Autres réponses",
    chapter: "other",
    subchapter: "transpositions",
    priority: "bonus",
    description: "Variante …Fd6.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "e6" },
      { san: "Bb2", comment: C.BB2 },
      { san: "Nf6", comment: C.NF6 },
      { san: "a3", comment: C.A3_MANDATORY },
      { san: "d5" },
      { san: "e3", comment: C.E3 },
      { san: "Bd6" },
      { san: "c4", comment: C.C4_ANTI_D6 },
    ]
  },
  {
    name: "1...e6 : transposition vers d5 (Nf6 a3 d5 e3 Be7 Nf3 O-O c4...)",
    category: "Autres réponses",
    chapter: "other",
    subchapter: "transpositions",
    priority: "bonus",
    description: "Ordre avec Fe7 avant O-O.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "e6" },
      { san: "Bb2", comment: C.BB2 },
      { san: "Nf6", comment: C.NF6 },
      { san: "a3", comment: C.A3_MANDATORY },
      { san: "d5" },
      { san: "e3", comment: C.E3 },
      { san: "Be7", comment: C.BE7 },
      { san: "Nf3" },
      { san: "O-O", comment: C.OO },
      { san: "c4", comment: C.C4_ANTI_D6 },
    ]
  },
  {
    name: "1...e6 : transposition vers d5 (Bxb4 Bxg7...)",
    category: "Autres réponses",
    chapter: "other",
    subchapter: "traps",
    priority: "must-know",
    description: "⚠️ Même piège Fxg7 qu'au Chapitre 2 !",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "e6" },
      { san: "Bb2", comment: C.BB2 },
      { san: "d5", circles: [{"square":"d5","color":"yellow"}] },
      { san: "e3", comment: C.E3 },
      { san: "Bxb4", comment: C.PIEGE_BXB4_ERROR },
      { san: "Bxg7", comment: C.PIEGE_BXG7 },
    ]
  },
  {
    name: "1...e6 : transposition vers d5 (c5 bxc5 Bxc5 Nf3 O-O c4...)",
    category: "Autres réponses",
    chapter: "other",
    subchapter: "transpositions",
    priority: "bonus",
    description: "Transpose vers …c5.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "e6" },
      { san: "Bb2", comment: C.BB2 },
      { san: "d5", circles: [{"square":"d5","color":"yellow"}] },
      { san: "e3", comment: C.E3 },
      { san: "Nf6", comment: C.NF6 },
      { san: "a3", comment: C.A3_MANDATORY, arrows: [{"from":"a2","to":"a3","color":"green"}] },
      { san: "c5", comment: C.CONTRE_C5 },
      { san: "bxc5" },
      { san: "Bxc5" },
      { san: "Nf3" },
      { san: "O-O", comment: C.OO },
      { san: "c4", comment: C.C4_ANTI_D6 },
    ]
  },
  {
    name: "1...e6 : transposition vers d5 (c5 bxc5 Bxc5 Nf3 Nc6 d4...)",
    category: "Autres réponses",
    chapter: "other",
    subchapter: "transpositions",
    priority: "bonus",
    description: "Version d4 de …c5.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "e6" },
      { san: "Bb2", comment: C.BB2 },
      { san: "d5", circles: [{"square":"d5","color":"yellow"}] },
      { san: "e3", comment: C.E3 },
      { san: "Nf6", comment: C.NF6 },
      { san: "a3", comment: C.A3_MANDATORY, arrows: [{"from":"a2","to":"a3","color":"green"}] },
      { san: "c5", comment: C.CONTRE_C5 },
      { san: "bxc5" },
      { san: "Bxc5" },
      { san: "Nf3" },
      { san: "Nc6" },
      { san: "d4", comment: C.CONTRE_C5_D4 },
    ]
  },
  {
    name: "1...e6 : transposition vers d5 (Bd6 c4...)",
    category: "Autres réponses",
    chapter: "other",
    subchapter: "transpositions",
    priority: "bonus",
    description: "Variante …Fd6 après e6.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "e6" },
      { san: "Bb2", comment: C.BB2 },
      { san: "d5", circles: [{"square":"d5","color":"yellow"}] },
      { san: "e3", comment: C.E3 },
      { san: "Nf6", comment: C.NF6 },
      { san: "a3", comment: C.A3_MANDATORY, arrows: [{"from":"a2","to":"a3","color":"green"}] },
      { san: "Bd6" },
      { san: "c4", comment: C.C4_ANTI_D6 },
    ]
  },

  // --- 4.2 Fianchetto direct 1...g6 (main) ---
  {
    name: "1...g6 : fianchetto direct",
    category: "Autres réponses",
    chapter: "other",
    subchapter: "main",
    priority: "must-know",
    description: "Comme 1…Cf6 2…g6. ⚠️ Pas de a3 : développement rapide avec c4, Fe2.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "g6" },
      { san: "Bb2", comment: C.BB2 },
      { san: "Nf6", comment: C.NF6 },
      { san: "e3", comment: C.E3 },
      { san: "Bg7", arrows: [{"from":"b2","to":"g7","color":"yellow"},{"from":"g7","to":"b2","color":"yellow"}] },
      { san: "Nf3" },
      { san: "O-O", comment: C.OO },
      { san: "c4", comment: C.FIANCHETTO_NO_A3, arrows: [{"from":"c2","to":"c4","color":"green"}] },
      { san: "d6" },
      { san: "Be2", comment: C.BE2, arrows: [{"from":"d2","to":"d4","color":"yellow"}] },
    ]
  },
  {
    name: "1...g6 : fianchetto direct (d6 Nf3 Bg7 c4 O-O Be2...)",
    category: "Autres réponses",
    chapter: "other",
    subchapter: "main",
    priority: "bonus",
    description: "Ordre avec …d6 avant Fg7.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "g6" },
      { san: "Bb2", comment: C.BB2 },
      { san: "Nf6", comment: C.NF6 },
      { san: "e3", comment: C.E3 },
      { san: "d6" },
      { san: "Nf3" },
      { san: "Bg7" },
      { san: "c4", comment: C.FIANCHETTO_NO_A3 },
      { san: "O-O", comment: C.OO },
      { san: "Be2", comment: C.BE2 },
    ]
  },
  {
    name: "1...g6 : fianchetto direct (d6 c4 O-O Be2...)",
    category: "Autres réponses",
    chapter: "other",
    subchapter: "main",
    priority: "bonus",
    description: "Ordre avec c4 plus tôt.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "g6" },
      { san: "Bb2", comment: C.BB2 },
      { san: "Nf6", comment: C.NF6 },
      { san: "e3", comment: C.E3 },
      { san: "Bg7", arrows: [{"from":"b2","to":"g7","color":"yellow"},{"from":"g7","to":"b2","color":"yellow"}] },
      { san: "Nf3" },
      { san: "d6" },
      { san: "c4", comment: C.FIANCHETTO_NO_A3 },
      { san: "O-O", comment: C.OO },
      { san: "Be2", comment: C.BE2 },
    ]
  },

  // --- 4.3 Caro-Kann et Philidor renversés (sidelines) ---
  {
    name: "1...c6 : Caro-Kann inversé",
    category: "Autres réponses",
    chapter: "other",
    subchapter: "sidelines",
    priority: "important",
    description: "Structure Caro-Kann inversée. Plan standard avec c4.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "c6" },
      { san: "Bb2", comment: C.BB2 },
      { san: "d5" },
      { san: "e3", comment: C.E3 },
      { san: "Nf6", comment: C.NF6 },
      { san: "Nf3" },
      { san: "Bg4" },
      { san: "c4", comment: C.C4_ANTI_D6, arrows: [{"from":"c2","to":"c4","color":"green"},{"from":"c4","to":"d5","color":"yellow"}] },
    ]
  },
  {
    name: "1...c6 : Caro-Kann inversé (Bf5 Nf3 Nf6 c4...)",
    category: "Autres réponses",
    chapter: "other",
    subchapter: "sidelines",
    priority: "bonus",
    description: "Variante avec …Ff5 plus tôt.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "c6" },
      { san: "Bb2", comment: C.BB2 },
      { san: "d5" },
      { san: "e3", comment: C.E3 },
      { san: "Bf5" },
      { san: "Nf3" },
      { san: "Nf6", comment: C.NF6 },
      { san: "c4", comment: C.C4_ANTI_D6 },
    ]
  },
  {
    name: "1...c6 : Caro-Kann inversé (Bf5 Nf3 e6 c4...)",
    category: "Autres réponses",
    chapter: "other",
    subchapter: "sidelines",
    priority: "bonus",
    description: "Variante Ff5 + e6.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "c6" },
      { san: "Bb2", comment: C.BB2 },
      { san: "d5" },
      { san: "e3", comment: C.E3 },
      { san: "Bf5" },
      { san: "Nf3" },
      { san: "e6" },
      { san: "c4", comment: C.C4_ANTI_D6 },
    ]
  },
  {
    name: "1...c6 : Caro-Kann inversé (Bf5 c4...)",
    category: "Autres réponses",
    chapter: "other",
    subchapter: "sidelines",
    priority: "bonus",
    description: "Ordre avec Cf6 avant Ff5.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "c6" },
      { san: "Bb2", comment: C.BB2 },
      { san: "d5" },
      { san: "e3", comment: C.E3 },
      { san: "Nf6", comment: C.NF6 },
      { san: "Nf3" },
      { san: "Bf5" },
      { san: "c4", comment: C.C4_ANTI_D6 },
    ]
  },
  {
    name: "1...d6 + e5 : Philidor renversé",
    category: "Autres réponses",
    chapter: "other",
    subchapter: "sidelines",
    priority: "important",
    description: "Philidor renversé. Plan standard anti-…d6 : c4, Fe2, Cc3.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "d6" },
      { san: "Bb2", comment: C.BB2 },
      { san: "e5", circles: [{"square":"e5","color":"yellow"}] },
      { san: "e3", comment: C.E3 },
      { san: "Nf6", comment: C.NF6 },
      { san: "c4", comment: C.C4_ANTI_D6, arrows: [{"from":"c2","to":"c4","color":"green"}] },
      { san: "Be7", comment: C.BE7 },
      { san: "Be2", comment: C.BE2 },
      { san: "O-O", comment: C.OO },
      { san: "Nc3", comment: C.NC3_TARGET, arrows: [{"from":"b1","to":"c3","color":"green"},{"from":"d2","to":"d4","color":"yellow"}], circles: [{"square":"d5","color":"yellow"}] },
    ]
  },
  {
    name: "1...d6 + e5 : Philidor renversé (Nf6 e3 g6 Nf3 Bg7 c4 O-O Be2...)",
    category: "Autres réponses",
    chapter: "other",
    subchapter: "sidelines",
    priority: "bonus",
    description: "Philidor + fianchetto.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "d6" },
      { san: "Bb2", comment: C.BB2 },
      { san: "Nf6", comment: C.NF6 },
      { san: "e3", comment: C.E3 },
      { san: "g6" },
      { san: "Nf3" },
      { san: "Bg7" },
      { san: "c4", comment: C.FIANCHETTO_NO_A3 },
      { san: "O-O", comment: C.OO },
      { san: "Be2", comment: C.BE2 },
    ]
  },
  {
    name: "1...d6 + e5 : Philidor renversé (Nf6 e3 e5 c4 Be6 Nc3...)",
    category: "Autres réponses",
    chapter: "other",
    subchapter: "sidelines",
    priority: "bonus",
    description: "Ordre Cf6 avant e5, puis …Fe6.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "d6" },
      { san: "Bb2", comment: C.BB2 },
      { san: "Nf6", comment: C.NF6 },
      { san: "e3", comment: C.E3 },
      { san: "e5" },
      { san: "c4", comment: C.C4_ANTI_D6 },
      { san: "Be6" },
      { san: "Nc3", comment: C.NC3_TARGET },
    ]
  },
  {
    name: "1...d6 + e5 : Philidor renversé (Nf6 e3 e5 c4 Be7 Be2 O-O Nc3...)",
    category: "Autres réponses",
    chapter: "other",
    subchapter: "sidelines",
    priority: "bonus",
    description: "Ordre Cf6 avant e5, variante …Fe7.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "d6" },
      { san: "Bb2", comment: C.BB2 },
      { san: "Nf6", comment: C.NF6 },
      { san: "e3", comment: C.E3 },
      { san: "e5" },
      { san: "c4", comment: C.C4_ANTI_D6 },
      { san: "Be7", comment: C.BE7 },
      { san: "Be2", comment: C.BE2 },
      { san: "O-O", comment: C.OO },
      { san: "Nc3", comment: C.NC3_TARGET },
    ]
  },
  {
    name: "1...d6 + e5 : Philidor renversé (Be6 Nf3...)",
    category: "Autres réponses",
    chapter: "other",
    subchapter: "sidelines",
    priority: "bonus",
    description: "…Fe6 au 3e coup.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "d6" },
      { san: "Bb2", comment: C.BB2 },
      { san: "e5", circles: [{"square":"e5","color":"yellow"}] },
      { san: "e3", comment: C.E3 },
      { san: "Be6" },
      { san: "Nf3" },
    ]
  },
  {
    name: "1...d6 + e5 : Philidor renversé (Nc6 b5 Nce7 c4...)",
    category: "Autres réponses",
    chapter: "other",
    subchapter: "sidelines",
    priority: "bonus",
    description: "…Cc6 après e5 : b5 chasse comme d'habitude.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "d6" },
      { san: "Bb2", comment: C.BB2 },
      { san: "e5", circles: [{"square":"e5","color":"yellow"}] },
      { san: "e3", comment: C.E3 },
      { san: "Nc6" },
      { san: "b5" },
      { san: "Nce7" },
      { san: "c4", comment: C.C4_ANTI_D6 },
    ]
  },
  {
    name: "1...d6 + e5 : Philidor renversé (Bf5 Nf3...)",
    category: "Autres réponses",
    chapter: "other",
    subchapter: "sidelines",
    priority: "bonus",
    description: "…Ff5 au 3e coup.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "d6" },
      { san: "Bb2", comment: C.BB2 },
      { san: "e5", circles: [{"square":"e5","color":"yellow"}] },
      { san: "e3", comment: C.E3 },
      { san: "Bf5" },
      { san: "Nf3" },
    ]
  },
  {
    name: "1...d6 + e5 : Philidor renversé (a6 c4...)",
    category: "Autres réponses",
    chapter: "other",
    subchapter: "sidelines",
    priority: "bonus",
    description: "…a6 attend. On continue.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "d6" },
      { san: "Bb2", comment: C.BB2 },
      { san: "e5", circles: [{"square":"e5","color":"yellow"}] },
      { san: "e3", comment: C.E3 },
      { san: "a6" },
      { san: "c4", comment: C.C4_ANTI_D6 },
    ]
  },
  {
    name: "1...d6 + e5 : Philidor renversé (f5 c4 Nf6 Nc3 Be7 Nf3 O-O Be2...)",
    category: "Autres réponses",
    chapter: "other",
    subchapter: "sidelines",
    priority: "bonus",
    description: "…f5 avec le Philidor. Plan complet.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "d6" },
      { san: "Bb2", comment: C.BB2 },
      { san: "e5", circles: [{"square":"e5","color":"yellow"}] },
      { san: "e3", comment: C.E3 },
      { san: "f5" },
      { san: "c4", comment: C.C4_ANTI_D6 },
      { san: "Nf6", comment: C.NF6 },
      { san: "Nc3", comment: C.NC3_TARGET },
      { san: "Be7", comment: C.BE7 },
      { san: "Nf3" },
      { san: "O-O", comment: C.OO },
      { san: "Be2", comment: C.BE2 },
    ]
  },
  {
    name: "1...d6 + e5 : Philidor renversé (Be7 c4 Nf6 Be2 O-O Nc3...)",
    category: "Autres réponses",
    chapter: "other",
    subchapter: "sidelines",
    priority: "bonus",
    description: "Ordre Fe7 avant Cf6.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "d6" },
      { san: "Bb2", comment: C.BB2 },
      { san: "e5", circles: [{"square":"e5","color":"yellow"}] },
      { san: "e3", comment: C.E3 },
      { san: "Be7", comment: C.BE7 },
      { san: "c4", comment: C.C4_ANTI_D6 },
      { san: "Nf6", comment: C.NF6 },
      { san: "Be2", comment: C.BE2 },
      { san: "O-O", comment: C.OO },
      { san: "Nc3", comment: C.NC3_TARGET },
    ]
  },
  {
    name: "1...d6 + e5 : Philidor renversé (Be6 Nc3...)",
    category: "Autres réponses",
    chapter: "other",
    subchapter: "sidelines",
    priority: "bonus",
    description: "…Fe6 après c4.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "d6" },
      { san: "Bb2", comment: C.BB2 },
      { san: "e5", circles: [{"square":"e5","color":"yellow"}] },
      { san: "e3", comment: C.E3 },
      { san: "Nf6", comment: C.NF6 },
      { san: "c4", comment: C.C4_ANTI_D6, arrows: [{"from":"c2","to":"c4","color":"green"}] },
      { san: "Be6" },
      { san: "Nc3", comment: C.NC3_TARGET },
    ]
  },

  // --- 4.4 Réponses rares et agressives (rare) ---
  {
    name: "1...c5 : on prend !",
    category: "Autres réponses",
    chapter: "other",
    subchapter: "rare",
    priority: "must-know",
    description: "Court mais essentiel : on prend en c5 et on ouvre avec d4.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "c5", comment: C.CONTRE_C5, arrows: [{"from":"c5","to":"b4","color":"red"}] },
      { san: "bxc5", arrows: [{"from":"b4","to":"c5","color":"green"}] },
      { san: "e6" },
      { san: "d4", comment: C.CONTRE_C5_D4, arrows: [{"from":"d2","to":"d4","color":"green"},{"from":"d4","to":"c5","color":"yellow"}], circles: [{"square":"c5","color":"green"}] },
    ]
  },
  {
    name: "1...a5 : on avance !",
    category: "Autres réponses",
    chapter: "other",
    subchapter: "rare",
    priority: "must-know",
    description: "Court et simple : on avance en b5 pour garder l'espace.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "a5", arrows: [{"from":"a5","to":"b4","color":"red"}] },
      { san: "b5", arrows: [{"from":"b4","to":"b5","color":"green"}], circles: [{"square":"b5","color":"green"}] },
    ]
  },
  {
    name: "1...b6 : double fianchetto",
    category: "Autres réponses",
    chapter: "other",
    subchapter: "rare",
    priority: "bonus",
    description: "Double fianchetto. Développement symétrique.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "b6" },
      { san: "Bb2", comment: C.BB2 },
      { san: "Bb7", arrows: [{"from":"b2","to":"h8","color":"yellow"},{"from":"b7","to":"h1","color":"yellow"}] },
      { san: "e3", comment: C.E3 },
      { san: "e6" },
      { san: "Nf3" },
    ]
  },
  {
    name: "1...f5 : la Hollandaise",
    category: "Autres réponses",
    chapter: "other",
    subchapter: "rare",
    priority: "bonus",
    description: "Hollandaise. Le Fb2 vise directement h8 sur la diagonale affaiblie.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "f5", circles: [{"square":"e5","color":"red"},{"square":"g7","color":"red"}] },
      { san: "Bb2", comment: C.BB2, arrows: [{"from":"b2","to":"h8","color":"red"}], circles: [{"square":"h8","color":"red"}] },
      { san: "Nf6", comment: C.NF6 },
      { san: "e3", comment: C.E3, arrows: [{"from":"c2","to":"c4","color":"yellow"},{"from":"d2","to":"d4","color":"yellow"}] },
    ]
  },
  {
    name: "1...b5 : contre radical",
    category: "Autres réponses",
    chapter: "other",
    subchapter: "rare",
    priority: "bonus",
    description: "Noir défie b4 directement. On développe avec Fb2 et Fb7 en retour.",
    moves: [
      { san: "b4", comment: C.B4, arrows: [{"from":"b2","to":"b4","color":"green"},{"from":"c1","to":"b2","color":"yellow"}], circles: [{"square":"b4","color":"green"},{"square":"h8","color":"yellow"}] },
      { san: "b5" },
      { san: "Bb2", comment: C.BB2 },
      { san: "Bb7" },
      { san: "e3", comment: C.E3 },
    ]
  }
];

// ============================================================================
// HELPERS
// ============================================================================

/** Récupère toutes les lignes d'un chapitre. */
export function getLinesByChapter(chapterId: ChapterId): RepertoireLine[] {
  return REPERTOIRE.filter(line => line.chapter === chapterId);
}

/** Récupère toutes les lignes d'un sous-chapitre. */
export function getLinesBySubchapter(chapterId: ChapterId, subchapterId: SubchapterId): RepertoireLine[] {
  return REPERTOIRE.filter(line => line.chapter === chapterId && line.subchapter === subchapterId);
}

/** Récupère toutes les lignes must-know (pour l'apprentissage prioritaire). */
export function getMustKnowLines(): RepertoireLine[] {
  return REPERTOIRE.filter(line => line.priority === "must-know");
}

/** Récupère les lignes d'une priorité donnée. */
export function getLinesByPriority(priority: Priority): RepertoireLine[] {
  return REPERTOIRE.filter(line => line.priority === priority);
}

/** Groupe les lignes du répertoire par chapitre puis sous-chapitre. */
export function getStructuredRepertoire() {
  return CHAPTERS.map(chapter => ({
    ...chapter,
    subchapters: chapter.subchapters.map(sub => ({
      ...sub,
      lines: getLinesBySubchapter(chapter.id, sub.id)
    }))
  }));
}