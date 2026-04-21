const fs = require('fs');

let repStr = fs.readFileSync('src/data/repertoire.ts', 'utf-8');
let { Chess } = require('chess.js');

let jsonMatch = repStr.match(/export const REPERTOIRE: RepertoireLine\[\] = (\[[\s\S]*\]);/);
let jsonStr = jsonMatch[1];
jsonStr = jsonStr.replace(/C\.[A-Z_0-9]+/g, '""'); // Strip out C constants for evaluating structure
let currentRep = eval(`(${jsonStr})`);

let finalRep = [];
for (let line of currentRep) {
    let ch = new Chess();
    let valid = true;
    for (let m of line.moves) {
        try {
            if (!ch.move(m.san)) { valid = false; break; }
        } catch(e) {
            valid = false; break;
        }
    }
    
    let sequence = line.moves.map(m => m.san).join(' ');
    
    if (sequence.includes('b4 d5 Bb2 Bxb4')) valid = false;
    if (sequence.includes('b4 e5 Bb2 Bxb4')) valid = false;
    if (sequence.includes('Nf6') && sequence.includes('Bxg7')) valid = false;
    
    if (valid) {
        for (let m of line.moves) {
            delete m.comment;
        }
        finalRep.push(line);
    }
}

// Now we rebuild the string with C. constants.
let contents = `import { Chess } from "chess.js";

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
`;

finalRep.forEach((line, i) => {
    contents += `  {\n    name: ${JSON.stringify(line.name)},\n    category: ${JSON.stringify(line.category)},\n    moves: [\n`;
    
    // Track context to apply comments smartly
    let isD5 = false;
    let isFianchetto = false;
    let turnCount = 0;
    
    line.moves.forEach((m) => {
        let isWhite = (turnCount % 2 === 0);
        let mComment = "undefined";
        
        // Smart match for constants based on SAN and context
        if (m.san === 'b4' && turnCount === 0) mComment = "C.B4";
        if (m.san === 'e5' && turnCount === 1) mComment = "C.E5";
        if (m.san === 'd5' && turnCount === 1) { mComment = "C.D5"; isD5 = true; }
        if (m.san === 'Bb2' && turnCount === 2) mComment = "C.BB2";
        if (m.san === 'g6') isFianchetto = true;
        if (m.san === 'd6' && turnCount === 3) mComment = "C.D6";
        if (m.san === 'e3') mComment = "C.E3";
        if (m.san === 'Nf6') mComment = "C.NF6";
        if (m.san === 'Be7') mComment = "C.BE7";
        if (m.san === 'Be2') mComment = "C.BE2";
        if (m.san === 'O-O') mComment = "C.OO";
        if (m.san === 'c4' && isWhite) {
            if (isD5 && turnCount > 5) mComment = "C.C4_VS_D5";
            else if (isFianchetto) mComment = "C.FIANCHETTO_NO_A3";
            else mComment = "C.C4_ANTI_D6";
        }
        if (m.san === 'a3') mComment = "C.A3_MANDATORY";
        if (m.san === 'Bxb4' && turnCount > 2) mComment = "C.PIEGE_BXB4_ERROR";
        if (m.san === 'Bxg7') mComment = "C.PIEGE_BXG7";
        if (m.san === 'c5' && !isWhite) mComment = "C.CONTRE_C5";
        if (m.san === 'd4' && isWhite && line.moves.some(x=>x.san==='c5')) mComment = "C.CONTRE_C5_D4";
        if (m.san === 'Nc3' && isWhite && line.moves.some(x=>x.san==='c4')) mComment = "C.NC3_TARGET";

        let movesStr = `      { san: ${JSON.stringify(m.san)}`;
        if (mComment !== "undefined") movesStr += `, comment: ${mComment}`;
        if (m.arrows && m.arrows.length > 0) movesStr += `, arrows: ${JSON.stringify(m.arrows)}`;
        if (m.circles && m.circles.length > 0) movesStr += `, circles: ${JSON.stringify(m.circles)}`;
        movesStr += ` },\n`;
        contents += movesStr;
        
        turnCount++;
    });
    contents += `    ]\n  }${i < finalRep.length - 1 ? ',' : ''}\n`;
});
contents += `];\n`;

fs.writeFileSync('src/data/repertoire.ts', contents);
console.log("Rebuilt successfully with " + finalRep.length + " lines");
