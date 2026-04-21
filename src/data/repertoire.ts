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

export interface MoveAnnotation {
  san: string;
  comment?: string;
  arrows?: { from: string; to: string; color?: string }[];
  circles?: { square: string; color?: string }[];
}

export interface RepertoireLine {
  id?: string;
  name: string;
  category: string;
  moves: MoveAnnotation[];
}

export const REPERTOIRE: RepertoireLine[] = [
  {
    name: "Ligne principale ...e5 ...d6",
    category: "Contre 1...e5",
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
  {
    name: "2...Cc6 : chasser avec b5",
    category: "Contre 1...e5",
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
    name: "2...d5 : prise gratuite",
    category: "Contre 1...e5",
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
    name: "Ligne principale : setup avec a3",
    category: "Contre 1...d5",
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
    name: "Piège : 3...Fxb4 ?? 4.Fxg7 !",
    category: "Contre 1...d5",
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
    name: "3...c5 : le contre central",
    category: "Contre 1...d5",
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
    name: "2...Ff5 : le fou actif",
    category: "Contre 1...d5",
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
    name: "2...Cc6 : chasser avec b5",
    category: "Contre 1...d5",
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "d5", comment: C.D5 },
      { san: "Bb2", comment: C.BB2 },
      { san: "Nc6", circles: [{"square":"c6","color":"red"}] },
      { san: "b5", arrows: [{"from":"b4","to":"b5","color":"green"}], circles: [{"square":"c6","color":"red"}] },
    ]
  },
  {
    name: "2...d5 : transposition",
    category: "Contre 1...Cf6",
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
    name: "2...g6 : fianchetto (pas de a3 !)",
    category: "Contre 1...Cf6",
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
    name: "2...e5 !? : la provocation",
    category: "Contre 1...Cf6",
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
    name: "2...d6 : système hybride",
    category: "Contre 1...Cf6",
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
    name: "1...e6 : transposition vers d5",
    category: "Autres réponses",
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
    name: "1...c6 : Caro-Kann inversé",
    category: "Autres réponses",
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
    name: "1...c5 : on prend !",
    category: "Autres réponses",
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
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "a5", arrows: [{"from":"a5","to":"b4","color":"red"}] },
      { san: "b5", arrows: [{"from":"b4","to":"b5","color":"green"}], circles: [{"square":"b5","color":"green"}] },
    ]
  },
  {
    name: "1...d6 + e5 : Philidor renversé",
    category: "Autres réponses",
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
    name: "1...g6 : fianchetto direct",
    category: "Autres réponses",
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
    name: "1...b6 : double fianchetto",
    category: "Autres réponses",
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
    moves: [
      { san: "b4", comment: C.B4 },
      { san: "f5", circles: [{"square":"e5","color":"red"},{"square":"g7","color":"red"}] },
      { san: "Bb2", comment: C.BB2, arrows: [{"from":"b2","to":"h8","color":"red"}], circles: [{"square":"h8","color":"red"}] },
      { san: "Nf6", comment: C.NF6 },
      { san: "e3", comment: C.E3, arrows: [{"from":"c2","to":"c4","color":"yellow"},{"from":"d2","to":"d4","color":"yellow"}] },
    ]
  },
  {
    name: "f4...",
    category: "Autres variantes",
    moves: [
      { san: "f4" },
    ]
  },
  {
    name: "Ligne principale : setup avec a3 (Bf5 Nf3 c6 c4...)",
    category: "Contre 1...d5",
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
    name: "Ligne principale : setup avec a3 (Nc6 b5...)",
    category: "Contre 1...d5",
    moves: [
      { san: "b4", comment: C.B4, arrows: [{"from":"b2","to":"b4","color":"green"}] },
      { san: "d5", comment: C.D5, circles: [{"square":"d5","color":"red"}] },
      { san: "Bb2", comment: C.BB2, arrows: [{"from":"c1","to":"b2","color":"green"}] },
      { san: "Nf6", comment: C.NF6 },
      { san: "e3", comment: C.E3, arrows: [{"from":"f1","to":"e2","color":"yellow"}] },
      { san: "Nc6" },
      { san: "b5" },
    ]
  },
  {
    name: "3...c5 : le contre central (O-O c4...)",
    category: "Contre 1...d5",
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
  {
    name: "Ligne principale : setup avec a3 (Bd6 c4...)",
    category: "Contre 1...d5",
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
  {
    name: "2...c6 : Slave renversé (Bf5 Nf3 Nf6 c4...)",
    category: "Contre 1...d5",
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
  {
    name: "Ligne principale : setup avec a3 (e5 Bxe5 Nc6 Bb2...)",
    category: "Contre 1...d5",
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
    name: "2...Cc6 : chasser avec b5 (Na5 e3...)",
    category: "Contre 1...d5",
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
    name: "Ligne principale : setup avec a3 (d4 Nf3 Nc6 b5...)",
    category: "Contre 1...d5",
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
  {
    name: "Piège : 3...Fxb4 ?? 4.Fxg7 ! (Nf6 a3 Bd6 c4...)",
    category: "Contre 1...d5",
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
  {
    name: "Piège : 3...Fxb4 ?? 4.Fxg7 ! (Nf6 a3 Be7 Nf3 O-O c4...)",
    category: "Contre 1...d5",
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
    name: "2...d5 : transposition (e6 a3 Be7 e3 d5 Nf3 O-O c4...)",
    category: "Contre 1...Cf6",
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
    name: "2...g6 : fianchetto (pas de a3 !) (d6 Nf3 Bg7 c4 O-O Be2...)",
    category: "Contre 1...Cf6",
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
  {
    name: "2...d6 : système hybride (g6 Nf3 Bg7 c4 O-O Be2...)",
    category: "Contre 1...Cf6",
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
  {
    name: "2...e5 !? : la provocation (Nc6 Bb2...)",
    category: "Contre 1...Cf6",
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
  {
    name: "2...d5 : transposition (Bf5 Nf3 c6 c4...)",
    category: "Contre 1...Cf6",
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
  {
    name: "1...e6 : transposition vers d5 (Nf6 a3 Be7 e3 d5 Nf3 O-O c4...)",
    category: "Autres réponses",
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
  {
    name: "1...g6 : fianchetto direct (d6 Nf3 Bg7 c4 O-O Be2...)",
    category: "Autres réponses",
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
  {
    name: "1...c6 : Caro-Kann inversé (Bf5 Nf3 Nf6 c4...)",
    category: "Autres réponses",
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
    name: "1...d6 + e5 : Philidor renversé (Nf6 e3 g6 Nf3 Bg7 c4 O-O Be2...)",
    category: "Autres réponses",
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
  {
    name: "Ligne principale ...e5 ...d6 (b5 Bb2 Bb7 e3...)",
    category: "Autres variantes",
    moves: [
      { san: "b4", comment: C.B4, arrows: [{"from":"b2","to":"b4","color":"green"},{"from":"c1","to":"b2","color":"yellow"}], circles: [{"square":"b4","color":"green"},{"square":"h8","color":"yellow"}] },
      { san: "b5" },
      { san: "Bb2", comment: C.BB2 },
      { san: "Bb7" },
      { san: "e3", comment: C.E3 },
    ]
  },
  {
    name: "2...Cc6 : chasser avec b5 (Nxb5 Bxb5 c6 Be2...)",
    category: "Contre 1...e5",
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
  {
    name: "Ligne principale ...e5 ...d6 (f6 a3 d5 e3...)",
    category: "Contre 1...e5",
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
    name: "2...Cf6 : échange simplifiant (Nc6 Bb2...)",
    category: "Contre 1...e5",
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
  {
    name: "Ligne principale ...e5 ...d6 (Qf6 a3...)",
    category: "Contre 1...e5",
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
  }
];
