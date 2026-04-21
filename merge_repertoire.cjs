// Run the parse.cjs using require instead of regexing it
const { execSync } = require('child_process');

try {
  execSync('npx -y tsx parse.cjs');
} catch(e) {
  console.log(e.toString());
}

const fs = require('fs');
const { REPERTOIRE: annotated } = require('./annotated.cjs');

// Instead of regexing parse.js, we can just require the raw output data from repertoire.ts
// Wait, repertoire.ts exports REPERTOIRE directly now.
// Let's modify parse.cjs to output rawLines.json so we can read it easily:
const parseJsCode = fs.readFileSync('parse.cjs', 'utf-8');
const pgnMatch = parseJsCode.match(/const pgn = \`([\s\S]+?)\`;/);
if (!pgnMatch) throw new Error();

const pgn = pgnMatch[1];
let tokens = pgn.replace(/\*/g, '').match(/\(|\)|[^\s()]+/g)
    .map(t => {
        if(t === '(' || t === ')') return t;
        return t.replace(/^\d+\.+/, '');
    })
    .filter(t => t);

let lines = [];

function parseNode(tokenIndex, currentLine) {
    let i = tokenIndex;
    let mainline = [...currentLine];
    
    while(i < tokens.length) {
        if (tokens[i] === '(') {
            i = parseNode(i + 1, [...mainline.slice(0, -1)]); 
        } else if (tokens[i] === ')') {
            if (mainline.length > 0) {
               lines.push(mainline);
            }
            return i + 1;
        } else {
            mainline.push(tokens[i]);
            i++;
        }
    }
    
    if (mainline.length > 0) {
        lines.push(mainline);
    }
    return i;
}

parseNode(0, []);

let strLines = lines.map(arr => arr.join(' '));
let unq = [...new Set(strLines)];

let leafLines = [];
for (let j = 0; j < unq.length; j++) {
    let isSub = false;
    for (let k = 0; k < unq.length; k++) {
        if (j !== k && unq[k].startsWith(unq[j] + ' ')) {
            isSub = true;
            break;
        }
    }
    if (!isSub) {
        leafLines.push(unq[j].split(' '));
    }
}

const rawLines = leafLines;

// We want to combine `annotated` (which are exactly 24 or 21 lines of high-quality edited PGN)
// with the remaining `rawLines` that are NOT in `annotated`.

let finalRepertoire = [...annotated];

// Next, we find all rawLines that are NOT already covered by an annotated line.
for (const rawLine of rawLines) {
    let isCovered = false;
    
    // Check if rawLine is a prefix or exact match of an annotated line
    for (const ann of annotated) {
        let matchLength = 0;
        for (let i = 0; i < Math.min(rawLine.length, ann.moves.length); i++) {
            if (rawLine[i] === ann.moves[i].san) {
                matchLength++;
            } else {
                break;
            }
        }
        if (matchLength === rawLine.length && rawLine.length <= ann.moves.length) {
            isCovered = true; // Fully contained inside an annotated line
            break;
        }
    }
    
    if (!isCovered) {
        // It's a new line or extension. 
        let bestAnn = null;
        let bestMatchLen = 0;
        
        for (const ann of annotated) {
            let matchLength = 0;
            for (let i = 0; i < Math.min(rawLine.length, ann.moves.length); i++) {
                if (rawLine[i] === ann.moves[i].san) {
                    matchLength++;
                } else {
                    break;
                }
            }
            if (matchLength > bestMatchLen) {
                bestMatchLen = matchLength;
                bestAnn = ann;
            }
        }
        
        const moves = [];
        for (let i = 0; i < rawLine.length; i++) {
            if (bestAnn && i < bestMatchLen) {
                moves.push({ ...bestAnn.moves[i] });
            } else {
                moves.push({ san: rawLine[i] });
            }
        }
        
        let category = "Autres variantes";
        if (bestAnn && bestMatchLen >= 2) {
            category = bestAnn.category;
        }
        
        let name = "Variante";
        if (bestAnn) {
            name = bestAnn.name + " (" + rawLine.slice(bestMatchLen).join(' ') + "...)";
        } else {
            name = rawLine.slice(0, 3).join(' ') + "...";
        }
        
        finalRepertoire.push({
            category,
            name,
            moves
        });
    }
}

let contents = `import { Chess } from "chess.js";\n\nexport interface MoveAnnotation {
  san: string;
  comment?: string;
  arrows?: { from: string; to: string; color?: string }[];
  circles?: { square: string; color?: string }[];
}\n\nexport interface RepertoireLine {\n  id?: string;\n  name: string;\n  category: string;\n  moves: MoveAnnotation[];\n}\n\n`;
contents += `export const REPERTOIRE: RepertoireLine[] = [\n`;

finalRepertoire.forEach((line, i) => {
    contents += `  {\n    name: ${JSON.stringify(line.name)},\n    category: ${JSON.stringify(line.category)},\n    moves: [\n`;
    line.moves.forEach((m) => {
        contents += `      { san: ${JSON.stringify(m.san)}`;
        if (m.comment) contents += `, comment: ${JSON.stringify(m.comment)}`;
        if (m.arrows && m.arrows.length > 0) contents += `, arrows: ${JSON.stringify(m.arrows)}`;
        if (m.circles && m.circles.length > 0) contents += `, circles: ${JSON.stringify(m.circles)}`;
        contents += ` },\n`;
    });
    contents += `    ]\n  }${i < finalRepertoire.length - 1 ? ',' : ''}\n`;
});

contents += `];\n`;

fs.writeFileSync('src/data/repertoire.ts', contents);
console.log("Merged repertoires! Total lines: " + finalRepertoire.length);
