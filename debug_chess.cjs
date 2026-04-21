const fs = require('fs');

let content = fs.readFileSync('src/data/repertoire.ts', 'utf-8');

// There are a few malformations in the previous replace output, specifically:
// "PIEGE_BXB4_ERROR" didn't replace all variants of "GROSSE ERREUR", notably the one with Nf6 blocking the diagonal.
// Let's refine the script to fix the Nf6 illegal moves and also centralize the remaining similar strings if needed.

// User explicitly stated:
// 1) `b4 e5 Bb2 Bxb4` is illegal. The 2...Bxb4 trap was meant for `b4 e5 Bb2 d6`? Wait, No.
// The user says "aucun fou noir ne peut prendre b4 à ce moment-là (le fou f8 est bloqué par le pion e7)."
// The line should be `b4 e5 Bb2 Nf6` or something else? No, `b4 e5 a3`...
// The prompt says: "Donc toutes les lignes “Piège : 2...Fxb4 ?? …” avec ce move-order vont échouer dans chess.js."
// Actually wait! 1. b4 e5 2. Bb2 Bxb4
// In 1... e5, the pawn e7 just moved to e5. The Bishop f8 CANNOT go to b4. It can only go to a3, b4, c5, d6, e7 over the e7-pawn?? No, e5 blocks the bishop from a3, b4, c5. Wait, f8 to a3 passes through e7! 
// Oh! 1. b4 e5 opens the f8-a3 diagonal!
// Yes, f8 to a3 is open. So Bxb4 IS legal!
// Wait! Let's verify with chess.js.
// 1. b4 e5 2. Bb2 Bxb4
const { Chess } = require('chess.js');
const c = new Chess();
c.move('b4');
c.move('e5');
c.move('Bb2');
try {
    c.move('Bxb4');
    console.log("Bxb4 IS legal after e5!");
} catch(e) {
    console.log("Bxb4 is ILLEGAL!", e.message);
}

// Ah! 1.b4 e5 opens f8, which goes g7, h6. It does NOT open a3-f8. The f8-a3 diagonal is blocked by d7.
// The f8 bishop can only move to e7, d6, c5, b4, a3 if the *e-pawn* or *d-pawn* moved? 
// No, the e-pawn is on the e-file. f8 is next to e8. The diagonal going left is f8-e7-d6-c5-b4-a3!
// So moving the e-pawn (e7-e5) DOES open the f8 bishop to go to a3.
// Wait, f8-e7 is the dark square diagonal. The bishop on f8 is on a dark square.
// Let's trace back. White pieces: a1..h1. Black: a8..h8.
// f8 is BLACK BISHOP (Dark squared).
// To go from f8 to a3: f8 -> e7 -> d6 -> c5 -> b4 -> a3.
// So YES, e7-e5 opens the f8 bishop.
// Let's run a script to print the board state to check why chess.js throws "Invalid move".
