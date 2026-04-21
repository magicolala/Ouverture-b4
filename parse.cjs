const fs = require('fs');

const pgn = `1. b4 (1. f4) e5 (1... d5 2. Bb2 e6 (2... Nf6 3. e3 e6 (3... Bf5 4. Nf3 e6 (4... c6 5. c4) 5. a3) (3... c6 4. Nf3 Bg4 (4... Bf5 5. c4) 5. c4) (3... Nc6 4. b5) 4. a3 Be7 (4... c5 5. bxc5 Bxc5 6. Nf3 Nc6 (6... O-O 7. c4) 7. d4) (4... Bd6 5. c4) 5. Nf3 O-O 6. c4) (2... c6 3. e3 Nf6 (3... Bf5 4. Nf3 e6 (4... Nf6 5. c4) 5. c4) 4. Nf3 Bg4 (4... Bf5 5. c4) 5. c4) (2... Bf5 3. e3 Nf6 (3... c6 4. Nf3 e6 (4... Nf6 5. c4) 5. c4) (3... e6 4. Nf3 Nf6 (4... c6 5. c4) 5. a3) 4. Nf3 e6 (4... c6 5. c4) 5. a3) (2... e5 3. Bxe5 Nc6 4. Bb2) (2... Nc6 3. b5 Nb8 (3... Na5 4. e3) 4. e3) (2... d4 3. Nf3 Nc6 4. b5) (2... f6 3. e3 e5 4. a3) (2... a6 3. e3 Nc6 4. a3) 3. e3 Nf6 (3... Bxb4 4. Bxg7) 4. a3 Be7 (4... c5 5. bxc5 Bxc5 6. Nf3 Nc6 (6... O-O 7. c4) 7. d4) (4... Bd6 5. c4) 5. Nf3 O-O 6. c4) (1... Nf6 2. Bb2 d5 (2... e6 3. a3 d5 (3... Be7 4. e3 d5 5. Nf3 O-O 6. c4) (3... a5 4. b5) 4. e3 Be7 (4... c5 5. bxc5 Bxc5 6. Nf3 Nc6 (6... O-O 7. c4) 7. d4) (4... Bd6 5. c4) 5. Nf3 O-O 6. c4) (2... g6 3. e3 Bg7 (3... d6 4. Nf3 Bg7 5. c4 O-O 6. Be2) 4. Nf3 O-O (4... d6 5. c4 O-O 6. Be2) 5. c4 d6 6. Be2) (2... d6 3. e3 e5 (3... g6 4. Nf3 Bg7 5. c4 O-O 6. Be2) 4. c4 Be7 (4... Be6 5. Nc3) 5. Be2 O-O 6. Nc3) (2... e5 3. Bxe5 Bxb4 4. Nf3 d6 (4... Nc6 5. Bb2) (4... O-O 5. e3 d5 6. c4) 5. Bb2) 3. e3 e6 (3... Bf5 4. Nf3 e6 (4... c6 5. c4) 5. a3) (3... c6 4. Nf3 Bg4 (4... Bf5 5. c4) 5. c4) (3... Nc6 4. b5) 4. a3 Be7 (4... c5 5. bxc5 Bxc5 6. Nf3 Nc6 (6... O-O 7. c4) 7. d4) (4... Bd6 5. c4) 5. Nf3 O-O 6. c4) (1... e6 2. Bb2 d5 (2... Nf6 3. a3 d5 (3... Be7 4. e3 d5 5. Nf3 O-O 6. c4) (3... a5 4. b5) 4. e3 Be7 (4... c5 5. bxc5 Bxc5 6. Nf3 Nc6 (6... O-O 7. c4) 7. d4) (4... Bd6 5. c4) 5. Nf3 O-O 6. c4) 3. e3 Nf6 (3... Bxb4 4. Bxg7) 4. a3 Be7 (4... c5 5. bxc5 Bxc5 6. Nf3 Nc6 (6... O-O 7. c4) 7. d4) (4... Bd6 5. c4) 5. Nf3 O-O 6. c4) (1... g6 2. Bb2 Nf6 3. e3 Bg7 (3... d6 4. Nf3 Bg7 5. c4 O-O 6. Be2) 4. Nf3 O-O (4... d6 5. c4 O-O 6. Be2) 5. c4 d6 6. Be2) (1... c6 2. Bb2 d5 3. e3 Nf6 (3... Bf5 4. Nf3 e6 (4... Nf6 5. c4) 5. c4) 4. Nf3 Bg4 (4... Bf5 5. c4) 5. c4) (1... d6 2. Bb2 e5 (2... Nf6 3. e3 e5 (3... g6 4. Nf3 Bg7 5. c4 O-O 6. Be2) 4. c4 Be7 (4... Be6 5. Nc3) 5. Be2 O-O 6. Nc3) 3. e3 Nf6 (3... Be6 4. Nf3) (3... Nc6 4. b5 Nce7 5. c4) (3... Bf5 4. Nf3) (3... a6 4. c4) (3... f5 4. c4 Nf6 5. Nc3 Be7 6. Nf3 O-O 7. Be2) (3... Be7 4. c4 Nf6 5. Be2 O-O 6. Nc3) 4. c4 Be7 (4... Be6 5. Nc3) 5. Be2 O-O 6. Nc3) (1... b6 2. Bb2 Bb7 3. e3 e6 4. Nf3) (1... c5 2. bxc5 e6 3. d4) (1... a5 2. b5) (1... f5 2. Bb2 Nf6 3. e3) (1... b5 2. Bb2 Bb7 3. e3) 2. Bb2 d6 (2... Bxb4 3. Bxe5 Nf6 (3... f6 4. Bb2) (3... Nc6 4. Bxg7) 4. Nf3 d6 (4... Nc6 5. Bb2) (4... O-O 5. e3 d5 6. c4) 5. Bb2) (2... Nc6 3. b5 Nd4 4. e3 Nf5 (4... Nxb5 5. Bxb5 c6 6. Be2) (4... Ne6 5. Bxe5 d6 6. Bb2) 5. Bxe5 d6 6. Bb2) (2... f6 3. a3 d5 4. e3) (2... d5 3. Bxe5 Nc6 4. Bb2) (2... e4 3. e3 d5 4. c4 c6 5. Qb3) (2... Nf6 3. Bxe5 Bxb4 4. Nf3 d6 (4... Nc6 5. Bb2) (4... O-O 5. e3 d5 6. c4) 5. Bb2) (2... Qf6 3. a3) 3. e3 Nf6 (3... Be6 4. Nf3) (3... Nc6 4. b5 Nce7 5. c4) (3... Bf5 4. Nf3) (3... a6 4. c4) (3... f5 4. c4 Nf6 5. Nc3 Be7 6. Nf3 O-O 7. Be2) (3... Be7 4. c4 Nf6 5. Be2 O-O 6. Nc3) 4. c4 Be7 (4... Be6 5. Nc3) 5. Be2 O-O 6. Nc3 *`;

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
        leafLines.push(unq[j]);
    }
}

let contents = `import { Chess } from "chess.js";\n\nexport interface MoveAnnotation {
  san: string;
  comment?: string;
  arrows?: { from: string; to: string; color?: string }[];
  circles?: { square: string; color?: string }[];
}

export interface RepertoireLine {
  id: string;
  name: string;
  category: string;
  moves: MoveAnnotation[];
}

// Function to validate moves via chess.js
function createValidLines(linesRaw: string[][]): RepertoireLine[] {
    const validLines: RepertoireLine[] = [];
    let idCounter = 1;
    
    for (const line of linesRaw) {
        const game = new Chess();
        const validMoves: MoveAnnotation[] = [];
        let isValid = true;
        
        for (const san of line) {
            try {
                const move = game.move(san);
                if (move) {
                    validMoves.push({ san: move.san });
                } else {
                    isValid = false;
                    break;
                }
            } catch (e) {
                isValid = false;
                break;
            }
        }
        
        if (validMoves.length > 0) {
           let cat = "Sokolsky";
           if(validMoves.length > 1) {
              cat += " : " + validMoves[0].san + " " + validMoves[1].san;
           }
           let name = validMoves.slice(0, 3).map(m => m.san).join(' ') + '...';
           
           validLines.push({
               id: 'line-' + idCounter,
               name: name,
               category: cat,
               moves: validMoves
           });
           idCounter++;
        }
    }
    
    return validLines;
}

const rawLines = [\n`;

leafLines.forEach(line => {
    let moveArray = line.split(' ').map(s => `"${s}"`).join(', ');
    contents += `  [${moveArray}],\n`;
});

contents += `];\n\nexport const REPERTOIRE: RepertoireLine[] = createValidLines(rawLines);\n`;

fs.writeFileSync('src/data/repertoire.ts', contents);
console.log("Written " + leafLines.length + " lines");
