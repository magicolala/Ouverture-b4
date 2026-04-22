/**
 * Script to add transposition comments to the repertoire.
 * Run with: npx tsx src/scripts/add-transposition-comments.ts
 * 
 * This outputs the sed-like replacements to make.
 */

// Key transpositions to annotate:
//
// 1. Ch.3 nf6/transpositions - "2...d5 : transposition" lines
//    → at the move "d5", add TRANSPOSE_D5_SETUP
//
// 2. Ch.3 nf6/sidelines - "2...d6 : système hybride"
//    → at the move "e5" (after d6), add TRANSPOSE_PHILIDOR
//
// 3. Ch.4 other/transpositions - "1...e6 : transposition vers d5"
//    → at the move "d5", add TRANSPOSE_D5_SETUP
//
// 4. Ch.4 other/main - "1...g6 : fianchetto direct"
//    → at the move "g6", add TRANSPOSE_FIANCHETTO
//
// 5. Ch.3 nf6/traps - "2...e5 !? : la provocation"
//    → at "Bxe5", add TRANSPOSE_PIEGE_BXE5
//
// 6. Ch.4 other/traps - "1...e6 : transposition vers d5 (Bxb4 Bxg7...)"
//    → at "Bxb4", add TRANSPOSE_PIEGE_BXG7
//
// 7. Ch.4 other/sidelines - "1...d6 + e5 : Philidor renversé"
//    → at "e5" (after d6), add TRANSPOSE_PHILIDOR
//
// 8. Ch.3 nf6/transpositions - lines with "c5" move
//    → at "c5", add TRANSPOSE_C5_CONTRE
//
// 9. Ch.4 other/sidelines - "1...c6 : Caro-Kann inversé"
//    → at "c6" (first move), add TRANSPOSE_SLAVE
//
// 10. Ch.3 nf6/sidelines - "2...d6 : système hybride (g6...)"
//     → at "g6", add TRANSPOSE_FIANCHETTO

console.log("This script just documents the transposition comments to add.");
console.log("Use the editor to add them manually to repertoire.ts");
console.log("\nKey moves to annotate:");
console.log("- Ch.3 '2...d5 : transposition' lines → comment on 'd5' move: C.TRANSPOSE_D5_SETUP");
console.log("- Ch.3 '2...d6 : système hybride' → comment on 'e5' move: C.TRANSPOSE_PHILIDOR");
console.log("- Ch.4 '1...e6 : transposition vers d5' → comment on 'd5' move: C.TRANSPOSE_D5_SETUP");
console.log("- Ch.4 '1...g6 : fianchetto direct' → comment on 'g6' move: C.TRANSPOSE_FIANCHETTO");
console.log("- Ch.3 '2...e5 !? : la provocation' → comment on 'Bxe5': C.TRANSPOSE_PIEGE_BXE5");
console.log("- Ch.4 '1...e6 (Bxb4 Bxg7)' → comment on 'Bxb4': C.TRANSPOSE_PIEGE_BXG7");
console.log("- Ch.4 '1...d6 + e5 : Philidor renversé' → comment on 'e5': C.TRANSPOSE_PHILIDOR");
console.log("- Ch.3/4 lines with '...c5' after d5 setup → comment on 'c5': C.TRANSPOSE_C5_CONTRE");
console.log("- Ch.4 '1...c6 : Caro-Kann inversé' → comment on 'c6': C.TRANSPOSE_SLAVE");
