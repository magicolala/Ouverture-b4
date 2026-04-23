import { Chess } from "chess.js";

export const C = {
  B4: "<em>Ouverture Sokolsky (1.b4).</em> Aussi appelée <strong>Ouverture Polonaise</strong> ou <strong>Orang-outan</strong> (Code A00). Jouée par des légendes comme Tartakower et Magnus Carlsen, c'est un coup surprenant qui vise à lutter pour un <strong>avantage spatial à l'aile dame</strong> plutôt que de contrôler immédiatement le centre.<br><strong>Plan principal :</strong> fianchetto en <strong>Fb2</strong> pour dominer la puissante diagonale <strong>a1–h8</strong>. On réclame ensuite sa part du centre via une poussée de pions ou en échangeant le pion b contre le pion c adverse pour obtenir une force centrale.<br><strong>Idées clés :</strong> Une poussée rapide <strong>b4-b5</strong> peut déloger un cavalier en c6 ou esquiver une attaque (offrant un net avantage d'espace, même si le pion b5 peut devenir surextendu). On préfère un développement fluide et maintenir la pression plutôt que de s'accrocher à tout prix au pion b4.",

  E5: "<em>1...e5 — la réponse la plus fréquente.</em> Noir prend directement le centre, obtenant une part d'espace central légèrement supérieure à celle des ouvertures classiques. Ce coup libère également le fou f8 qui <strong>met immédiatement le pion b4 sous pression</strong>.<br>Face à cela, <strong>2.a3</strong> et <strong>2.Fb2</strong> sont toutes deux de bonnes réponses. En jouant 2.Fb2, on accepte souvent de \"sacrifier\" le pion b4 : notre compensation est une grande <strong>activité</strong>, un développement fluide et une forte pression sur <strong>e5</strong> via la diagonale a1–h8.",

  BB2_E5: "<em>2.Fb2 — Coup pivot et fianchetto immédiat.</em> Le fou s’installe sur la grande diagonale et attaque <strong>e5</strong> (et l'aile roi), tout en laissant le pion b4 sans protection. L'idée est que le pion central noir a plus de valeur que notre pion de flanc. C'est une position relativement peu explorée.<br><strong>Réponses noires typiques :</strong><br>• <strong>2...Fxb4</strong> force pratiquement 3.Fxe5 (position incertaine, léger avantage Blanc selon les machines).<br>• <strong>2...d6</strong> défend e5 mais annule la pression sur b4.<br>• <strong>2...d5</strong> prend le centre, mais gare au piège après 3.Fxe5 Fxb4?? 4.Fxg7! (Blanc gagne la tour).<br>• <strong>2...Cc6?</strong> est une erreur : sur 3.b5!, le cavalier doit fuir et Blanc gagne le pion avec 4.Fxe5.",

  BB2: "<em>2.Fb2 — Le fianchetto classique.</em> Le fou s’installe sur la grande diagonale a1-h8 pour contrôler le centre à distance et préparer la suite du développement. C'est le coup emblématique de la Sokolsky.",

  D6: "Défense solide de <strong>e5</strong> (structure <strong>type Philidor</strong>). En échange, Noir limite un peu son jeu : le fou f8 manque d’air. Profite du tempo pour jouer <strong>c4</strong>, finir ton développement et préparer une poussée centrale (<strong>d4</strong>) au bon moment.",

  E3: "Petit coup, gros impact : ouvre le fou f1 et prépare <strong>Cf3</strong> sans se découvrir. <strong>Plan standard :</strong> <strong>c4</strong>, <strong>Cf3</strong>, <strong>Fe2</strong>, roque, puis <strong>Cc3</strong> et <strong>d4</strong> selon la structure.",

  NF6: "Développement naturel : contrôle <strong>e4</strong> et <strong>d5</strong>, prépare le roque. Pas de panique : on continue notre plan (mise en place + pression durable sur le centre).",

  C4_ANTI_D6: "<em>Setup anti-…d6.</em> <strong>c4</strong> conteste immédiatement l'espace noir et prépare <strong>Cc3</strong>. <strong>⚠️ Règle importante :</strong> on joue <strong>toujours c4 AVANT Cc3</strong> — si tu développes le cavalier en c3 d'abord, tu bloques le pion c et tu ne pourras plus jouer c4 ! C'est un réflexe à avoir dans toute la Sokolsky.",

  BE7: "Noir prépare le roque. Position solide mais un peu passive : à toi de conserver l’initiative via le développement, puis une rupture centrale au bon timing (<strong>d4</strong> ou parfois <strong>cxd5</strong>).",

  BE2: "Développement propre et flexible. On évite souvent de se précipiter avec <strong>Fd3</strong> (qui peut gêner d4). <strong>Suite logique :</strong> roque, puis <strong>Cc3</strong> et décision centrale (<strong>d4</strong> / échanges) selon la réponse noire.",

  OO: "Roque noir : roi en sécurité. <strong>Question stratégique :</strong> quand ouvrir le centre ? Si tes pièces sont mieux placées, <strong>d4</strong> (ou une capture centrale) devient très fort pour transformer ton avance de développement en initiative.",

  NC3_TARGET: "<em>Position-type.</em> Tu as une mise en place fluide sans concessions. <strong>Plans :</strong><br>• <span style='color:#81b64c'>finir le développement</span> (Cf3, roque)<br>• <span style='color:#e8a33d'>d4</span> pour défier le centre (quand tout est prêt)<br>• <span style='color:#e8a33d'>a4–a5</span> si Noir reste passif : gagner de l’espace et fixer des faiblesses à l’aile dame.",

  A3_MANDATORY: "<em>⚠️ Coup clé : quand jouer a3 ?</em><br>• <strong>a3 est nécessaire</strong> quand le fou f8 menace de capturer b4 (par ex. après …e6 ou …Fe7). On sécurise b4 et on coupe …a5.<br>• <strong>a3 est INUTILE</strong> si le fou est déjà fianchetté en g7 (pas de menace sur b4 → on développe plus vite avec c4, Cf3, Fe2).<br>• <strong>a3 est INUTILE</strong> si …Fxb4 lâcherait la défense du pion g7 : on VEUT que Noir prenne b4 pour jouer <strong>Fxg7 !</strong> et capturer la tour h8. C'est le piège classique.<br>• <strong>a3 est INUTILE</strong> si <strong>e5 est en prise</strong> : si Noir joue …Fxb4, on répond <strong>Fxe5</strong> — on échange un pion de l'aile (b4) contre un pion du centre (e5), c'est un excellent deal pour nous !<br><strong>Résumé :</strong> a3 seulement si le fou f8 menace b4, que g7 est défendu, et que e5 n'est pas en prise.",

  C4_VS_D5: "<em>Setup complet.</em> <strong>c4</strong> est toujours fort contre d5 quand on a joué <strong>e3</strong> et que le <strong>fou f1 n'a pas encore bougé</strong> : si Noir prend <strong>…dxc4</strong>, le fou reprend en un coup (<strong>Fxc4</strong>) et on a échangé un pion de l'aile contre un pion du centre — excellent deal ! Si Noir ne prend pas, le duo <strong>b4–c4</strong> met d5 sous pression permanente.<br><strong>Plans :</strong><br>• <strong>cxd5</strong> au bon moment pour ouvrir des lignes<br>• <strong>d4</strong> si la position le permet<br>• <strong>Cc3 + roque</strong> : convertir l'espace en initiative.",

  FIANCHETTO_NO_A3: "<em>⚠️ Pas de a3 ici !</em> Le fou noir est en g7 (fianchetto) : il ne menace PAS b4. Jouer a3 serait un <strong>tempo perdu</strong>. On développe vite : <strong>Cf3</strong>, <strong>c4</strong>, <strong>Fe2</strong>, roque, puis <strong>d4</strong> au bon moment pour ouvrir le jeu avant que le fou g7 ne devienne trop puissant.",

  PIEGE_BXB4_ERROR: "<em>⚠️ Erreur de Noir !</em> En prenant b4, Noir <strong>abandonne la défense de g7</strong>. C'est exactement ce qu'on veut : la diagonale a1–h8 est grande ouverte et le pion g7 n'est plus protégé. <strong>Conséquence :</strong> on joue Fxg7 et on gagne la tour h8. C'est pour ça qu'on ne joue PAS a3 dans cette position : on laisse le piège ouvert !",

  PIEGE_BXG7: "<em>🎯 Thème tactique.</em> <strong>Fxg7 !</strong> profite de la diagonale ouverte : la tour <strong>h8</strong> devient une cible directe. <strong>Idée :</strong> on force un gain matériel (souvent la tour) ou une énorme désorganisation du roque noir. À connaître “réflexe”.",

  CONTRE_C5: "Contre-attaque immédiate : Noir veut casser ton espace en attaquant le socle <strong>b4</strong> et ouvrir des lignes. Il faut réagir de façon énergique (souvent en capturant) pour ne pas se faire liquider “gratuitement”.",

  CONTRE_C5_D4: "<em>🎯 Coup de rupture.</em> <strong>d4</strong> ouvre le centre <strong>et</strong> attaque le fou (souvent en c5). Très bon quand tu es mieux développé : tu gagnes de l’espace, des tempos, et tu transformes l’ouverture en initiative.",

  BXB4_IMMEDIATE: "<em>2…Fxb4 — prise immédiate du pion b.</em> Noir capture le pion non défendu, ce qui aboutit le plus souvent à <strong>3.Fxe5</strong>. Non seulement Noir a cédé à Blanc une <strong>majorité de pions au centre</strong> (pion b contre pion e), mais Blanc menace aussi <strong>g7</strong> sur la diagonale ouverte.<br><strong>Alternative tranchante :</strong> 3.f4?! est risqué mais jouable. Noir peut refuser avec 3…d6 (avantage noir, aile roi blanche affaiblie), accepter avec 3…exf4?! (jeu sauvage, léger avantage Blanc selon les machines après 4.Fxg7 Dh4+ 5.g3 fxg3 6.Fg2! gxh2+ 7.Rf1 hxg1=D+ 8.Rxg1 Dg3 9.Fxh8), ou jouer <strong>3…Ch6!</strong> qui donne un gros avantage à Noir d’après les machines.",

  BXE5_RECAPTURE: "<em>3.Fxe5 — la réponse naturelle.</em> Blanc récupère un pion <strong>central</strong> en échange du pion b4. Résultat : Blanc a une <strong>majorité de pions au centre</strong> et le fou reste actif sur la grande diagonale, visant <strong>g7</strong>. Noir doit faire attention à cette pression.",


  D5: "Réponse classique et solide : Noir occupe le centre sans attaquer b4 tout de suite. Ton plan est très stable : <strong>Fb2</strong>, <strong>e3</strong>, <strong>a3</strong> (souvent indispensable), puis <strong>c4</strong> pour mettre <strong>d5</strong> sous pression.",

  // ── Commentaires de transposition ──────────────────────────────────────

  TRANSPOSE_D5_SETUP: "<em>🔄 Transposition !</em> On rejoint la <strong>position-type du Chapitre 2</strong> (contre 1…d5). Même plan : <strong>a3</strong>, <strong>Cf3</strong>, <strong>Fe2</strong>, <strong>O-O</strong>, <strong>c4</strong>. Si tu connais la ligne principale contre d5, tu es en terrain connu.",

  TRANSPOSE_PHILIDOR: "<em>🔄 Transposition !</em> On rejoint la <strong>position Philidor du Chapitre 1</strong> (1.b4 e5 2.Fb2 d6). Même plan : <strong>c4</strong>, <strong>Fe2</strong>, <strong>Cc3</strong>, puis <strong>d4</strong> au bon moment. Peu importe l'ordre de coups, la position cible est identique.",

  TRANSPOSE_FIANCHETTO: "<em>🔄 Transposition !</em> On rejoint la <strong>position fianchetto du Chapitre 3</strong> (1.b4 Cf6 2.Fb2 g6). Même plan : <strong>c4</strong>, <strong>Cf3</strong>, <strong>Fe2</strong>, <strong>d4</strong>. ⚠️ Rappel : <strong>pas de a3</strong> contre le fianchetto !",

  TRANSPOSE_PIEGE_BXE5: "<em>🔄 Transposition !</em> On rejoint le <strong>piège Fxe5 + Fxb4</strong> du Chapitre 1 (2…Cf6 : échange simplifiant). Même position, même refus de Noir : on garde notre avance.",

  TRANSPOSE_PIEGE_BXG7: "<em>🔄 Transposition !</em> On rejoint le <strong>piège Fxg7 du Chapitre 2</strong>. Noir a capturé en b4 trop tôt : la diagonale s'ouvre et la tour h8 est en danger.",

  TRANSPOSE_C5_CONTRE: "<em>🔄 Transposition !</em> On rejoint la <strong>variante …c5 du Chapitre 2</strong> (le contre central). Plan : <strong>bxc5</strong>, <strong>Cf3</strong>, puis <strong>d4</strong> ou <strong>c4</strong> selon la réponse noire.",

  TRANSPOSE_SLAVE: "<em>🔄 Transposition !</em> On rejoint la <strong>structure Slave inversée</strong> (Chapitre 2, transpositions). Plan identique : <strong>c4</strong> pour presser d5."
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
      { san: "b4", comment: C.B4, circles: [{"square":"b4","color":"green"},{"square":"h8","color":"yellow"}] },
      { san: "e5", comment: C.E5, circles: [{"square":"e5","color":"red"}] },
      { san: "Bb2", comment: C.BB2_E5, circles: [{"square":"b2","color":"green"},{"square":"e5","color":"red"}] },
      { san: "d6", comment: C.D6 },
      { san: "e3", comment: C.E3 },
      { san: "Nf6", comment: C.NF6, circles: [{"square":"e4","color":"yellow"}] },
      { san: "c4", comment: C.C4_ANTI_D6, circles: [{"square":"d5","color":"yellow"}] },
      { san: "Be7", comment: C.BE7 },
      { san: "Be2", comment: C.BE2 },
      { san: "O-O", comment: C.OO },
      { san: "Nc3", comment: C.NC3_TARGET, circles: [{"square":"d4","color":"green"}] },
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
      { san: "Bb2", comment: C.BB2_E5 },
      { san: "d5", circles: [{"square":"e5","color":"red"}] },
      { san: "Bxe5", circles: [{"square":"e5","color":"green"}] },
      { san: "Nc6" },
      { san: "Bb2" },
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
      { san: "Bb2", comment: C.BB2_E5 },
      { san: "Nf6", comment: C.NF6 },
      { san: "Bxe5" },
      { san: "Bxb4", comment: C.PIEGE_BXB4_ERROR },
      { san: "Nf3" },
      { san: "d6" },
      { san: "Bb2" },
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
      { san: "Bb2", comment: C.BB2_E5 },
      { san: "Nf6", comment: C.NF6 },
      { san: "Bxe5" },
      { san: "Bxb4", comment: C.PIEGE_BXB4_ERROR },
      { san: "Nf3" },
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
      { san: "Bb2", comment: C.BB2_E5 },
      { san: "Nf6", comment: C.NF6 },
      { san: "Bxe5" },
      { san: "Bxb4", comment: C.PIEGE_BXB4_ERROR },
      { san: "Nf3" },
      { san: "O-O", comment: C.OO },
      { san: "e3", comment: C.E3 },
      { san: "d5" },
      { san: "c4", comment: C.C4_ANTI_D6 },
    ]
  },

  // --- 1.3 Variantes secondaires (sidelines) ---
  {
    name: "2...Fxb4 : prise immédiate (Bxe5)",
    category: "Contre 1...e5",
    chapter: "e5",
    subchapter: "sidelines",
    priority: "important",
    description: "Noir prend le pion b4 immédiatement. On récupère avec Fxe5 et on obtient une majorité centrale + menace sur g7.",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "e5", comment: C.E5 },
      { san: "Bb2", comment: C.BB2_E5 },
      { san: "Bxb4", comment: C.BXB4_IMMEDIATE, circles: [{"square":"e5","color":"red"},{"square":"g7","color":"yellow"}] },
      { san: "Bxe5", comment: C.BXE5_RECAPTURE, circles: [{"square":"e5","color":"green"},{"square":"g7","color":"red"}] },
    ]
  },

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
      { san: "Bb2", comment: C.BB2_E5 },
      { san: "Nc6", circles: [{"square":"c6","color":"red"}] },
      { san: "b5", circles: [{"square":"c6","color":"red"}] },
      { san: "Nd4" },
      { san: "e3", comment: C.E3 },
      { san: "Nf5" },
      { san: "Bxe5", circles: [{"square":"e5","color":"green"}] },
      { san: "d6" },
      { san: "Bb2" },
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
      { san: "Bb2", comment: C.BB2_E5 },
      { san: "Nc6", circles: [{"square":"c6","color":"red"}] },
      { san: "b5", circles: [{"square":"c6","color":"red"}] },
      { san: "Nd4" },
      { san: "e3", comment: C.E3 },
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
      { san: "Bb2", comment: C.BB2_E5 },
      { san: "Nc6", circles: [{"square":"c6","color":"red"}] },
      { san: "b5", circles: [{"square":"c6","color":"red"}] },
      { san: "Nd4" },
      { san: "e3", comment: C.E3 },
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
      { san: "b4", comment: C.B4, circles: [{"square":"b4","color":"green"},{"square":"h8","color":"yellow"}] },
      { san: "e5", comment: C.E5, circles: [{"square":"e5","color":"red"}] },
      { san: "Bb2", comment: C.BB2_E5, circles: [{"square":"b2","color":"green"},{"square":"e5","color":"red"}] },
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
      { san: "b4", comment: C.B4, circles: [{"square":"b4","color":"green"},{"square":"h8","color":"yellow"}] },
      { san: "e5", comment: C.E5, circles: [{"square":"e5","color":"red"}] },
      { san: "Bb2", comment: C.BB2_E5, circles: [{"square":"b2","color":"green"},{"square":"e5","color":"red"}] },
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
      { san: "b4", comment: C.B4, circles: [{"square":"b4","color":"green"},{"square":"h8","color":"yellow"}] },
      { san: "e5", comment: C.E5, circles: [{"square":"e5","color":"red"}] },
      { san: "Bb2", comment: C.BB2_E5, circles: [{"square":"b2","color":"green"},{"square":"e5","color":"red"}] },
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
      { san: "b4", comment: C.B4, circles: [{"square":"b4","color":"green"},{"square":"h8","color":"yellow"}] },
      { san: "e5", comment: C.E5, circles: [{"square":"e5","color":"red"}] },
      { san: "Bb2", comment: C.BB2_E5, circles: [{"square":"b2","color":"green"},{"square":"e5","color":"red"}] },
      { san: "d6", comment: C.D6 },
      { san: "e3", comment: C.E3 },
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
      { san: "b4", comment: C.B4, circles: [{"square":"b4","color":"green"},{"square":"h8","color":"yellow"}] },
      { san: "e5", comment: C.E5, circles: [{"square":"e5","color":"red"}] },
      { san: "Bb2", comment: C.BB2_E5, circles: [{"square":"b2","color":"green"},{"square":"e5","color":"red"}] },
      { san: "d6", comment: C.D6 },
      { san: "e3", comment: C.E3 },
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
      { san: "b4", comment: C.B4, circles: [{"square":"b4","color":"green"},{"square":"h8","color":"yellow"}] },
      { san: "e5", comment: C.E5, circles: [{"square":"e5","color":"red"}] },
      { san: "Bb2", comment: C.BB2_E5, circles: [{"square":"b2","color":"green"},{"square":"e5","color":"red"}] },
      { san: "d6", comment: C.D6 },
      { san: "e3", comment: C.E3 },
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
      { san: "b4", comment: C.B4, circles: [{"square":"b4","color":"green"},{"square":"h8","color":"yellow"}] },
      { san: "e5", comment: C.E5, circles: [{"square":"e5","color":"red"}] },
      { san: "Bb2", comment: C.BB2_E5, circles: [{"square":"b2","color":"green"},{"square":"e5","color":"red"}] },
      { san: "d6", comment: C.D6 },
      { san: "e3", comment: C.E3 },
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
      { san: "b4", comment: C.B4, circles: [{"square":"b4","color":"green"},{"square":"h8","color":"yellow"}] },
      { san: "e5", comment: C.E5, circles: [{"square":"e5","color":"red"}] },
      { san: "Bb2", comment: C.BB2_E5, circles: [{"square":"b2","color":"green"},{"square":"e5","color":"red"}] },
      { san: "d6", comment: C.D6 },
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
    name: "Ligne principale ...e5 ...d6 (Be7 c4 Nf6 Be2 O-O Nc3...)",
    category: "Contre 1...e5",
    chapter: "e5",
    subchapter: "rare",
    priority: "bonus",
    description: "…Fe7 au 3e coup : inversion classique. Même plan.",
    moves: [
      { san: "b4", comment: C.B4, circles: [{"square":"b4","color":"green"},{"square":"h8","color":"yellow"}] },
      { san: "e5", comment: C.E5, circles: [{"square":"e5","color":"red"}] },
      { san: "Bb2", comment: C.BB2_E5, circles: [{"square":"b2","color":"green"},{"square":"e5","color":"red"}] },
      { san: "d6", comment: C.D6 },
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
    name: "Ligne principale ...e5 ...d6 (Be6 Nc3...)",
    category: "Contre 1...e5",
    chapter: "e5",
    subchapter: "rare",
    priority: "bonus",
    description: "…Fe6 après …Cf6. On continue avec c4 puis Cc3.",
    moves: [
      { san: "b4", comment: C.B4, circles: [{"square":"b4","color":"green"},{"square":"h8","color":"yellow"}] },
      { san: "e5", comment: C.E5, circles: [{"square":"e5","color":"red"}] },
      { san: "Bb2", comment: C.BB2_E5, circles: [{"square":"b2","color":"green"},{"square":"e5","color":"red"}] },
      { san: "d6", comment: C.D6 },
      { san: "e3", comment: C.E3 },
      { san: "Nf6", comment: C.NF6, circles: [{"square":"e4","color":"yellow"}] },
      { san: "c4", comment: C.C4_ANTI_D6, circles: [{"square":"d5","color":"yellow"}] },
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
      { san: "b4", comment: C.B4 },
      { san: "d5", comment: C.D5, circles: [{"square":"d5","color":"red"}] },
      { san: "Bb2", comment: C.BB2 },
      { san: "Nf6", comment: C.NF6 },
      { san: "e3", comment: C.E3 },
      { san: "e6" },
      { san: "a3", comment: C.A3_MANDATORY, circles: [{"square":"b4","color":"green"}] },
      { san: "Be7", comment: C.BE7 },
      { san: "Nf3" },
      { san: "O-O", comment: C.OO },
      { san: "c4", comment: C.C4_VS_D5, circles: [{"square":"d5","color":"yellow"}] },
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
      { san: "b4", comment: C.B4 },
      { san: "d5", comment: C.D5, circles: [{"square":"d5","color":"red"}] },
      { san: "Bb2", comment: C.BB2 },
      { san: "Nf6", comment: C.NF6 },
      { san: "e3", comment: C.E3 },
      { san: "e6" },
      { san: "a3", comment: C.A3_MANDATORY, circles: [{"square":"b4","color":"green"}] },
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
      { san: "Bxg7", comment: C.PIEGE_BXG7, circles: [{"square":"g7","color":"green"},{"square":"h8","color":"red"}] },
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
      { san: "a3", comment: C.A3_MANDATORY },
      { san: "c5", comment: C.CONTRE_C5 },
      { san: "bxc5" },
      { san: "Bxc5" },
      { san: "Nf3" },
      { san: "Nc6" },
      { san: "d4", comment: C.CONTRE_C5_D4, circles: [{"square":"c5","color":"red"}] },
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
      { san: "a3", comment: C.A3_MANDATORY },
      { san: "c5", comment: C.CONTRE_C5 },
      { san: "bxc5" },
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
      { san: "Bf5" },
      { san: "e3", comment: C.E3 },
      { san: "Nf6", comment: C.NF6 },
      { san: "Nf3" },
      { san: "e6" },
      { san: "a3", comment: C.A3_MANDATORY },
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
      { san: "c4", comment: C.C4_VS_D5 },
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
      { san: "b4", comment: C.B4 },
      { san: "d5", comment: C.D5, circles: [{"square":"d5","color":"red"}] },
      { san: "Bb2", comment: C.BB2 },
      { san: "Nf6", comment: C.NF6 },
      { san: "e3", comment: C.E3 },
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
      { san: "b4", comment: C.B4 },
      { san: "d5", comment: C.D5, circles: [{"square":"d5","color":"red"}] },
      { san: "Bb2", comment: C.BB2 },
      { san: "Nf6", comment: C.NF6 },
      { san: "e3", comment: C.E3 },
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
      { san: "b4", comment: C.B4 },
      { san: "d5", comment: C.D5, circles: [{"square":"d5","color":"red"}] },
      { san: "Bb2", comment: C.BB2 },
      { san: "Nf6", comment: C.NF6 },
      { san: "e3", comment: C.E3 },
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
      { san: "b4", comment: C.B4 },
      { san: "d5", comment: C.D5, circles: [{"square":"d5","color":"red"}] },
      { san: "Bb2", comment: C.BB2 },
      { san: "Nf6", comment: C.NF6 },
      { san: "e3", comment: C.E3 },
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
      { san: "Bf5" },
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
      { san: "Bf5" },
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
      { san: "Bf5" },
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
      { san: "Bf5" },
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
      { san: "Bf5" },
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
      { san: "b5", circles: [{"square":"c6","color":"red"}] },
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
      { san: "b5", circles: [{"square":"c6","color":"red"}] },
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
      { san: "b5", circles: [{"square":"c6","color":"red"}] },
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
      { san: "b4", comment: C.B4 },
      { san: "d5", comment: C.D5, circles: [{"square":"d5","color":"red"}] },
      { san: "Bb2", comment: C.BB2 },
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
      { san: "b4", comment: C.B4 },
      { san: "d5", comment: C.D5, circles: [{"square":"d5","color":"red"}] },
      { san: "Bb2", comment: C.BB2 },
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
      { san: "b4", comment: C.B4 },
      { san: "d5", comment: C.D5, circles: [{"square":"d5","color":"red"}] },
      { san: "Bb2", comment: C.BB2 },
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
      { san: "b4", comment: C.B4 },
      { san: "d5", comment: C.D5, circles: [{"square":"d5","color":"red"}] },
      { san: "Bb2", comment: C.BB2 },
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
      { san: "d5", comment: C.TRANSPOSE_D5_SETUP },
      { san: "e3", comment: C.E3 },
      { san: "e6" },
      { san: "a3", comment: C.A3_MANDATORY },
      { san: "Be7", comment: C.BE7 },
      { san: "Nf3" },
      { san: "O-O", comment: C.OO },
      { san: "c4", comment: C.C4_ANTI_D6 },
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
      { san: "a3", comment: C.A3_MANDATORY },
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
      { san: "a3", comment: C.A3_MANDATORY },
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
      { san: "a3", comment: C.A3_MANDATORY },
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
      { san: "g6", comment: C.TRANSPOSE_FIANCHETTO },
      { san: "e3", comment: C.E3 },
      { san: "Bg7" },
      { san: "Nf3" },
      { san: "O-O", comment: C.OO },
      { san: "c4", comment: C.FIANCHETTO_NO_A3 },
      { san: "d6" },
      { san: "Be2", comment: C.BE2, circles: [{"square":"d4","color":"yellow"}] },
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
      { san: "g6" },
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
      { san: "g6" },
      { san: "e3", comment: C.E3 },
      { san: "Bg7" },
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
      { san: "Bxe5", comment: C.TRANSPOSE_PIEGE_BXE5 },
      { san: "Bxb4", comment: C.PIEGE_BXB4_ERROR },
      { san: "Nf3" },
      { san: "d6" },
      { san: "Bb2" },
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
      { san: "Bxe5", comment: C.TRANSPOSE_PIEGE_BXE5 },
      { san: "Bxb4", comment: C.PIEGE_BXB4_ERROR },
      { san: "Nf3" },
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
      { san: "Bxe5", comment: C.TRANSPOSE_PIEGE_BXE5 },
      { san: "Bxb4", comment: C.PIEGE_BXB4_ERROR },
      { san: "Nf3" },
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
      { san: "e5", comment: C.TRANSPOSE_PHILIDOR, circles: [{"square":"e5","color":"yellow"}] },
      { san: "c4", comment: C.C4_ANTI_D6 },
      { san: "Be7", comment: C.BE7 },
      { san: "Be2", comment: C.BE2 },
      { san: "O-O", comment: C.OO },
      { san: "Nc3", comment: C.NC3_TARGET, circles: [{"square":"d4","color":"yellow"}] },
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
      { san: "e5", comment: C.TRANSPOSE_PHILIDOR, circles: [{"square":"e5","color":"yellow"}] },
      { san: "c4", comment: C.C4_ANTI_D6 },
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
      { san: "d5", comment: C.TRANSPOSE_D5_SETUP, circles: [{"square":"d5","color":"yellow"}] },
      { san: "e3", comment: C.E3 },
      { san: "Nf6", comment: C.NF6 },
      { san: "a3", comment: C.A3_MANDATORY },
      { san: "Be7", comment: C.BE7 },
      { san: "Nf3" },
      { san: "O-O", comment: C.OO },
      { san: "c4", comment: C.C4_ANTI_D6 },
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
      { san: "Bxb4", comment: C.TRANSPOSE_PIEGE_BXG7 },
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
      { san: "a3", comment: C.A3_MANDATORY },
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
      { san: "a3", comment: C.A3_MANDATORY },
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
      { san: "a3", comment: C.A3_MANDATORY },
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
      { san: "g6", comment: C.TRANSPOSE_FIANCHETTO },
      { san: "Bb2", comment: C.BB2 },
      { san: "Nf6", comment: C.NF6 },
      { san: "e3", comment: C.E3 },
      { san: "Bg7" },
      { san: "Nf3" },
      { san: "O-O", comment: C.OO },
      { san: "c4", comment: C.FIANCHETTO_NO_A3 },
      { san: "d6" },
      { san: "Be2", comment: C.BE2 },
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
      { san: "Bg7" },
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
      { san: "c6", comment: C.TRANSPOSE_SLAVE },
      { san: "Bb2", comment: C.BB2 },
      { san: "d5" },
      { san: "e3", comment: C.E3 },
      { san: "Nf6", comment: C.NF6 },
      { san: "Nf3" },
      { san: "Bg4" },
      { san: "c4", comment: C.C4_ANTI_D6 },
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
      { san: "e5", comment: C.TRANSPOSE_PHILIDOR, circles: [{"square":"e5","color":"yellow"}] },
      { san: "e3", comment: C.E3 },
      { san: "Nf6", comment: C.NF6 },
      { san: "c4", comment: C.C4_ANTI_D6 },
      { san: "Be7", comment: C.BE7 },
      { san: "Be2", comment: C.BE2 },
      { san: "O-O", comment: C.OO },
      { san: "Nc3", comment: C.NC3_TARGET, circles: [{"square":"d5","color":"yellow"}] },
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
      { san: "c4", comment: C.C4_ANTI_D6 },
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
      { san: "c5", comment: C.CONTRE_C5 },
      { san: "bxc5" },
      { san: "e6" },
      { san: "d4", comment: C.CONTRE_C5_D4, circles: [{"square":"c5","color":"green"}] },
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
      { san: "a5" },
      { san: "b5", circles: [{"square":"b5","color":"green"}] },
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
      { san: "Bb7" },
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
      { san: "Bb2", comment: C.BB2, circles: [{"square":"h8","color":"red"}] },
      { san: "Nf6", comment: C.NF6 },
      { san: "e3", comment: C.E3 },
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
      { san: "b4", comment: C.B4, circles: [{"square":"b4","color":"green"},{"square":"h8","color":"yellow"}] },
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
