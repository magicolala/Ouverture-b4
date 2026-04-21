const fs = require('fs');

const code = fs.readFileSync('src/data/repertoire.ts', 'utf-8');

// The new user provided code snippet inside <USER_REQUEST> indicates they want to KEEP the detailed categories
// across all lines. 
// They provided a snippet of valid code but it might be just an example, or their intended full version.
// However, the provided text ends abruptly: "];" was missing from the supplied piece, wait, it's just the start.
// I will rewrite the names and categories so they match what the user wants.

let repObj = require('./annotated.cjs').REPERTOIRE;
// Wait, the currently active `repertoire.ts` already has 113 lines generated from previous steps.
// Do the 113 lines already have the original categories copied correctly over from annotated? 
// Let's inspect the `annotated.cjs` vs the output of `parse.js`.

const repertoireOrig = require('./annotated.cjs').REPERTOIRE;

// Read actual repertoire from current file using naive regex or executing
const tsco = code.match(/export const REPERTOIRE: RepertoireLine\[\] = (\[[\s\S]+\]);/);
if (!tsco) {
    console.log("Could not find array");
    process.exit(1);
}
let rep = eval(tsco[1]); // Evaluate string array

for (let r of rep) {
    // If category is "Autres variantes" but it shares a prefix with something else, let's fix it.
    // The user previously noticed that the categories were dropped for some lines.
    // Actually, looking at the previous merge_repertoire.cjs logic:
    // let category = "Autres variantes";
    // if (bestAnn && bestMatchLen >= 2) { category = bestAnn.category; }

    // Let's refine category assignment:
    if (r.moves[0].san === 'b4') {
        const m2 = r.moves[1] ? r.moves[1].san : null;
        if (m2 === 'e5') r.category = "Contre 1...e5";
        else if (m2 === 'd5') r.category = "Contre 1...d5";
        else if (m2 === 'Nf6') r.category = "Contre 1...Cf6";
        else if (m2 === 'e6' || m2 === 'c6' || m2 === 'c5' || m2 === 'a5' || m2 === 'd6' || m2 === 'g6' || m2 === 'b6' || m2 === 'f5') {
            r.category = "Autres réponses";
        }
    }
}

let contents = `import { Chess } from "chess.js";

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

export const REPERTOIRE: RepertoireLine[] = [\n`;

rep.forEach((line, i) => {
    contents += `  {\n    name: ${JSON.stringify(line.name)},\n    category: ${JSON.stringify(line.category)},\n    moves: [\n`;
    line.moves.forEach((m) => {
        contents += `      { san: ${JSON.stringify(m.san)}`;
        if (m.comment) contents += `, comment: ${JSON.stringify(m.comment)}`;
        if (m.arrows && m.arrows.length > 0) contents += `, arrows: ${JSON.stringify(m.arrows)}`;
        if (m.circles && m.circles.length > 0) contents += `, circles: ${JSON.stringify(m.circles)}`;
        contents += ` },\n`;
    });
    contents += `    ]\n  }${i < rep.length - 1 ? ',' : ''}\n`;
});
contents += `];\n`;

fs.writeFileSync('src/data/repertoire.ts', contents);
console.log("Categories fixed!");
