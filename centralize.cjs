const fs = require('fs');

const C = {
  B4: "<em>Ouverture Sokolsky (1.b4).</em> Coup surprise qui gagne de l'espace à l'aile dame. <strong>Idée centrale :</strong> fianchetto du fou en b2 pour peser sur la grande diagonale <strong>a1–h8</strong> et mettre la pression sur <strong>e5</strong>.",
  
  E5: "Réponse la plus ambitieuse. Noir prend le centre et <strong>attaque immédiatement b4</strong>. Notre compensation : développement rapide et pression durable sur la diagonale a1–h8 (souvent on privilégie l'activité plutôt que 'défendre le pion').",
  
  D5: "Réponse classique. Noir occupe le centre sans défier directement b4.",
  
  NF6_FLEX: "Développement flexible. Noir attend notre plan avant de se décider.",
  
  BB2: "<em>Coup clé.</em> Le fou se place sur la grande diagonale et vise <strong>e5</strong>. <strong>Motif fréquent :</strong> si Noir 'ramasse' b4 trop tôt, le pion e5 devient souvent vulnérable tactiquement.",
  
  D6: "Défense solide de <strong>e5</strong> : structure type <strong>Philidor</strong>. En contrepartie, Noir se développe un peu plus lentement, ce qui nous laisse le temps d'installer <strong>c4</strong>.",
  
  E3: "Coup sobre mais important : ouvre le fou f1 et prépare <strong>Cf3</strong>. <strong>Plan standard :</strong> c4, Fe2, roque, puis Cc3 et/ou d4.",
  
  NF6: "Développement naturel : contrôle <strong>e4</strong> et <strong>d5</strong>, et accélère le roque.",
  
  C4_ANTI_D6: "<em>Setup anti-...d6.</em> On fixe de l'espace à l'aile dame et on prépare <strong>Cc3</strong>. <strong>Note pratique :</strong> ici, <strong>a3 n'est pas prioritaire</strong>, on développe vite (c4 + Cc3).",
  
  BE7: "Noir prépare le roque. Position solide mais passive : à nous de garder l'initiative.",
  
  BE2: "Développement harmonieux. On réserve <strong>Fd3</strong> et on sécurise le roque. <strong>Suite logique :</strong> 0-0 puis Cc3 / d4.",
  
  OO: "Roque : Noir met son roi en sécurité. La question devient : quand jouer <strong>d4</strong> (ou cxd5) pour ouvrir le jeu ?",
  
  NC3_TARGET: "<em>Position cible atteinte.</em> Nos pièces sortent harmonieusement. <strong>Plans :</strong><br>• <span style='color:#81b64c'>Cf3 + 0-0</span><br>• <span style='color:#e8a33d'>d4</span> pour dominer le centre<br>• <span style='color:#e8a33d'>a4–a5</span> à l'aile dame",
  
  A3_MANDATORY: "<em>⚠️ Coup essentiel.</em> <strong>a3</strong> stabilise b4 et coupe l'idée ...a5 qui fissurerait notre aile dame. <strong>Règle :</strong> contre les structures avec ...d5, on joue presque toujours a3.",
  
  C4_VS_D5: "<em>Setup complet.</em> Le bloc <strong>b4–c4</strong> met la pression sur d5. <strong>Plans :</strong><br>• <span style='color:#81b64c'>cxd5</span> au bon moment<br>• <span style='color:#e8a33d'>d4</span> si possible<br>• <span style='color:#81b64c'>Cc3 + roque</span>",
  
  FIANCHETTO_NO_A3: "<em>⚠️ Setup différent.</em> Face au fianchetto, on développe vite sans perdre de temps avec a3. Plan : <strong>Nf3, c4, Be2, 0-0</strong> puis <strong>d4</strong>.",
  
  PIEGE_BXB4_ERROR: "<em>⚠️ GROSSE ERREUR !</em> Noir croit gagner un pion, mais le fou f8 abandonne la défense de g7. La diagonale est grande ouverte.",
  
  PIEGE_BXG7: "<em>🎯 LE PIÈGE CLASSIQUE !</em> On va <strong>manger la tour h8</strong> au coup suivant pour un gain matériel énorme. À retenir par cœur.",

  PIEGE_E5_BXB4: "<em>Erreur typique !</em> Noir prend le pion b4 par gourmandise, mais oublie que son pion e5 reste sans défense.",

  PIEGE_E5_BXE5: "<em>🎯 GAIN DE PION !</em> C'est le pincement caractéristique du Sokolsky. Le fou noir b4 est exposé, on le chassera avec Cf3, a3 ou c3.",

  CONTRE_C5: "Contre-attaque sur l'aile dame. Noir veut liquider b4.",
  
  CONTRE_C5_D4: "<em>🎯 Coup clé !</em> On ouvre le jeu au centre ET on attaque le fou c5. Gain d'espace et initiative."
};

let content = fs.readFileSync('src/data/repertoire.ts', 'utf-8');

// The file repertoire.ts is currently just an array of objects. 
// We will inject the C object inside repertoire.ts, and then string replace the exact comments with C.COMMENT

content = content.replace(/import { Chess } from "chess\.js";/g, 'import { Chess } from "chess.js";\n\n' + 
`export const C = {
  B4: "<em>Ouverture Sokolsky (1.b4).</em> Coup surprise qui gagne de l'espace à l'aile dame. <strong>Idée centrale :</strong> fianchetto du fou en b2 pour peser sur la grande diagonale <strong>a1–h8</strong> et mettre la pression sur <strong>e5</strong>.",
  E5: "Réponse la plus ambitieuse. Noir prend le centre et <strong>attaque immédiatement b4</strong>. Notre compensation : développement rapide et pression durable sur la diagonale a1–h8 (souvent on privilégie l'activité plutôt que 'défendre le pion').",
  D5: "Réponse classique. Noir occupe le centre sans défier directement b4.",
  NF6_FLEX: "Développement flexible. Noir attend notre plan avant de se décider.",
  BB2: "<em>Coup clé.</em> Le fou se place sur la grande diagonale et vise <strong>e5</strong>. <strong>Motif fréquent :</strong> si Noir 'ramasse' b4 trop tôt, le pion e5 devient souvent vulnérable tactiquement.",
  D6: "Défense solide de <strong>e5</strong> : structure type <strong>Philidor</strong>. En contrepartie, Noir se développe un peu plus lentement, ce qui nous laisse le temps d'installer <strong>c4</strong>.",
  E3: "Coup sobre mais important : ouvre le fou f1 et prépare <strong>Cf3</strong>. <strong>Plan standard :</strong> c4, Fe2, roque, puis Cc3 et/ou d4.",
  NF6: "Développement naturel : contrôle <strong>e4</strong> et <strong>d5</strong>, et accélère le roque.",
  C4_ANTI_D6: "<em>Setup anti-...d6.</em> On fixe de l'espace à l'aile dame et on prépare <strong>Cc3</strong>. <strong>Note pratique :</strong> ici, <strong>a3 n'est pas prioritaire</strong>, on développe vite (c4 + Cc3).",
  BE7: "Noir prépare le roque. Position solide mais passive : à nous de garder l'initiative.",
  BE2: "Développement harmonieux. On réserve <strong>Fd3</strong> et on sécurise le roque. <strong>Suite logique :</strong> 0-0 puis Cc3 / d4.",
  OO: "Roque : Noir met son roi en sécurité. La question devient : quand jouer <strong>d4</strong> (ou cxd5) pour ouvrir le jeu ?",
  NC3_TARGET: "<em>Position cible atteinte.</em> Nos pièces sortent harmonieusement. <strong>Plans :</strong><br>• <span style='color:#81b64c'>Cf3 + 0-0</span><br>• <span style='color:#e8a33d'>d4</span> pour dominer le centre<br>• <span style='color:#e8a33d'>a4–a5</span> à l'aile dame",
  A3_MANDATORY: "<em>⚠️ Coup essentiel.</em> <strong>a3</strong> stabilise b4 et coupe l'idée ...a5 qui fissurerait notre aile dame. <strong>Règle :</strong> contre les structures avec ...d5, on joue presque toujours a3.",
  C4_VS_D5: "<em>Setup complet.</em> Le bloc <strong>b4–c4</strong> met la pression sur d5. <strong>Plans :</strong><br>• <span style='color:#81b64c'>cxd5</span> au bon moment<br>• <span style='color:#e8a33d'>d4</span> si possible<br>• <span style='color:#81b64c'>Cc3 + roque</span>",
  FIANCHETTO_NO_A3: "<em>⚠️ Setup différent.</em> Face au fianchetto, on développe vite sans perdre de temps avec a3. Plan : <strong>Nf3, c4, Be2, 0-0</strong> puis <strong>d4</strong>.",
  PIEGE_BXB4_ERROR: "<em>⚠️ GROSSE ERREUR !</em> Noir prend le pion au lieu de jouer le prudent ...Cf6. Le fou f8 abandonne la défense de g7 et la diagonale est grande ouverte.",
  PIEGE_BXG7: "<em>🎯 LE PIÈGE CLASSIQUE DU SOKOLSKY !</em> On va <strong>manger la tour h8</strong> au coup suivant, pour un gain matériel énorme ! À savoir par cœur.",
  PIEGE_E5_BXB4: "<em>Erreur typique des débutants !</em> Noir prend le pion b4, gourmand, mais oublie que son pion e5 reste sans défense.",
  PIEGE_E5_BXE5: "<em>🎯 GAIN DE PION !</em> Voici le <strong>pincement caractéristique du Sokolsky</strong>. Le fou noir b4 est aussi exposé — on va le chasser avec Cf3, a3, ou c3.",
  CONTRE_C5: "Contre-attaque sur l'aile dame. Noir veut liquider b4.",
  CONTRE_C5_D4: "<em>🎯 Coup clé !</em> On ouvre le jeu au centre ET on attaque le fou c5. Gain d'espace et initiative."
};
`);

// Replacement mapping
const replacers = [
  { p: /"<em>L'Ouverture Polonaise \(Sokolsky\).<\/em> Coup surprise qui gagne de l'espace à l'aile dame. <strong>Idée :<\/strong> déployer Fb2 pour viser la grande diagonale a1-h8."/g, r: 'C.B4' },
  { p: /"La réponse la plus combative. Noir <strong>défie b4<\/strong> \(le pion est attaqué\) et revendique le centre. La diagonale a1-h8 est maintenant bouchée par \.\.\.e5, il faudra la dégager."/g, r: 'C.E5' },
  { p: /"Réponse classique. Noir occupe le centre sans défier b4."/g, r: 'C.D5' },
  { p: /"Coup flexible : Noir attend notre plan avant de se décider."/g, r: 'C.NF6_FLEX' },
  { p: /"<em>Coup clé du système.<\/em> Le fou attaque le pion e5 et défend indirectement b4 \(si \.\.\.Fxb4, on joue Fxe5\). <strong>Attention :<\/strong> le pion e5 est cloué tactiquement !"/g, r: 'C.BB2' },
  { p: /"Noir défend e5 solidement. Structure <strong>Philidor renversée<\/strong>. Le pion d6 bloque le fou noir f8, ce qui nous donne le temps de développer calmement."/g, r: 'C.D6' },
  { p: /"Modeste mais essentiel. Ouvre la diagonale du fou f1 \(vers e2\/c4\/b5\) et prépare Cf3. <strong>Plan :<\/strong> c4, Fe2, roque, Cc3."/g, r: 'C.E3' },
  { p: /"Développement naturel. Le cavalier contrôle e4 et d5."/g, r: 'C.NF6' },
  { p: /"<em>Setup anti-d6.<\/em> On prend l'espace à l'aile dame. <strong>Important :<\/strong> dans cette ligne avec \.\.\.d6, on ne joue PAS a3 — on développe directement c4 \+ Cc3."/g, r: 'C.C4_ANTI_D6' },
  { p: /"Noir prépare le roque. Coup passif mais solide."/g, r: 'C.BE7' },
  { p: /"Développement calme. On évite Fd3 car le fou serait mal placé \(bloque d-pion\). <strong>Prochain coup :<\/strong> 0-0 puis Cc3."/g, r: 'C.BE2' },
  { p: /"Noir roque. Position symétrique mais nous avons plus d'espace à l'aile dame."/g, r: 'C.OO' },
  { p: /"<em>Position cible atteinte !<\/em> <strong>Plans futurs :<\/strong><br>• <span style='color:#81b64c'>Cf3 puis 0-0<\/span> \(développement\)<br>• <span style='color:#e8a33d'>d4<\/span> pour dominer le centre<br>• <span style='color:#e8a33d'>a4-a5<\/span> pour grignoter à l'aile dame"/g, r: 'C.NC3_TARGET' },
  { p: /"<em>⚠️ COUP ESSENTIEL !<\/em> On soutient b4 pour empêcher <strong>\.\.\.a5<\/strong> qui déstabiliserait notre aile dame. <strong>Ne jamais sauter a3<\/strong> dans les lignes avec \.\.\.d5 !"/g, r: 'C.A3_MANDATORY' },
  { p: /"<em>Setup complet !<\/em> Le duo <strong>b4-c4<\/strong> forme un bloc puissant à l'aile dame. <strong>Plans :<\/strong><br>• <span style='color:' \+ '#81b64c' \+ '>cxd5<\/span> au bon moment pour ouvrir la diagonale<br>• <span style='color:' \+ '#e8a33d' \+ '>d4<\/span> pour prendre le centre<br>• <span style='color:' \+ '#e8a33d' \+ '>Cc3 \+ roque<\/span> pour terminer le développement"/g, r: 'C.C4_VS_D5' },
  { p: /"<em>⚠️ PAS de a3 ici !<\/em> Face au fianchetto, on développe vite. Noir ne menace pas \.\.\.a5 car il doit d'abord consolider son roque."/g, r: 'C.FIANCHETTO_NO_A3' },
  { p: /"<em>⚠️ GROSSE ERREUR !<\/em> Noir prend le pion au lieu de jouer le prudent \.\.\.Cf6. Le fou f8 abandonne la défense de g7 et la diagonale est grande ouverte."/g, r: 'C.PIEGE_BXB4_ERROR' },
  { p: /"<em>🎯 LE PIÈGE CLASSIQUE DU SOKOLSKY !<\/em> On va <strong>manger la tour h8<\/strong> au coup suivant, pour un gain matériel énorme ! À savoir par cœur."/g, r: 'C.PIEGE_BXG7' },
  { p: /"<em>Erreur typique des débutants !<\/em> Noir prend le pion b4, gourmand, mais oublie que son pion e5 reste sans défense."/g, r: 'C.PIEGE_E5_BXB4' },
  { p: /"<em>🎯 GAIN DE PION !<\/em> Voici le <strong>pincement caractéristique du Sokolsky<\/strong>. Le fou noir b4 est aussi exposé — on va le chasser avec Cf3, a3, ou c3."/g, r: 'C.PIEGE_E5_BXE5' },
  { p: /"Contre-attaque sur l'aile dame. Noir veut liquider b4."/g, r: 'C.CONTRE_C5' },
  { p: /"<em>🎯 Coup clé !<\/em> On ouvre le jeu au centre ET on attaque le fou c5. Gain d'espace et initiative."/g, r: 'C.CONTRE_C5_D4' }
];

for (let r of replacers) {
    content = content.replace(r.p, r.r);
}

fs.writeFileSync('src/data/repertoire.ts', content);
console.log("Centralization complete");
