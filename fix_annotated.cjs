const { REPERTOIRE } = require('./annotated.cjs');

// Fix Line 7: Piège Fxb4
const p1 = REPERTOIRE.find(r => r.name.includes('Piège : 3...Fxb4'));
if (p1) {
    p1.moves = [
        { san: "b4", comment: "" },
        { san: "d5", comment: "" },
        { san: "Bb2", comment: "Attention : le fou b2 regarde g7 ! Noir doit bloquer la diagonale avec ...Cf6, ou protéger avec le fou f8." },
        { san: "e6", comment: "Noir ouvre la diagonale pour son fou. Mais attention, g7 est exposé si le fou s'en va !" },
        { san: "e3", comment: "Coup neutre qui prépare le piège à venir." },
        { san: "Bxb4", comment: "<em>⚠️ GROSSE ERREUR !</em> Noir prend le pion au lieu de jouer le prudent ...Cf6. Le fou f8 abandonne la défense de g7 et la diagonale est grande ouverte.", circles: [{square:'g7',color:'red'},{square:'b4',color:'red'}] },
        { san: "Bxg7", comment: "<em>🎯 LE PIÈGE CLASSIQUE DU SOKOLSKY !</em> On va <strong>manger la tour h8</strong> au coup suivant, pour un gain matériel énorme ! À savoir par cœur.", arrows: [{from:'b2',to:'g7',color:'green'},{from:'g7',to:'h8',color:'green'}], circles: [{square:'g7',color:'green'},{square:'h8',color:'red'}] }
    ];
}

// Fix Line 8: 3...c5 : le contre central
const p2 = REPERTOIRE.find(r => r.name.includes('3...c5 : le contre central'));
if (p2) {
    p2.moves = [
        { san: "b4", comment: "" },
        { san: "d5", comment: "" },
        { san: "Bb2", comment: "" },
        { san: "Nf6", comment: "" },
        { san: "e3", comment: "" },
        { san: "e6", comment: "Noir prépare le développement de son fou." },
        { san: "a3", comment: "<em>Toujours a3</em> face à ...d5.", arrows: [{from:'a2',to:'a3',color:'green'}] },
        { san: "c5", comment: "Contre-attaque sur l'aile dame. Noir veut liquider b4.", arrows: [{from:'c5',to:'b4',color:'red'}] },
        { san: "bxc5", comment: "On prend simplement.", arrows: [{from:'b4',to:'c5',color:'green'}] },
        { san: "Bxc5", comment: "Noir récupère le pion." },
        { san: "Nf3", comment: "" },
        { san: "Nc6", comment: "" },
        { san: "d4", comment: "<em>🎯 Coup clé !</em> On ouvre le jeu au centre ET on attaque le fou c5. Gain d'espace et initiative.", arrows: [{from:'d2',to:'d4',color:'green'},{from:'d4',to:'c5',color:'red'}], circles: [{square:'c5',color:'red'}] }
    ];
}

// Let's also verify all the moves before writing it back
const { Chess } = require('chess.js');

let errs = [];
for (let r of REPERTOIRE) {
    let g = new Chess();
    for (let m of r.moves) {
        try { if (!g.move(m.san)) errs.push(`Invalid move ${m.san} in ${r.name}`); }
        catch (e) { errs.push(`Exception in ${r.name}: ${e.message}`); break; }
    }
}
if (errs.length > 0) {
    console.log(errs);
}

const fs = require('fs');
fs.writeFileSync('annotated.cjs', `module.exports = { REPERTOIRE: ${JSON.stringify(REPERTOIRE, null, 2)} };`);
console.log("Fixed annotated.cjs !");
