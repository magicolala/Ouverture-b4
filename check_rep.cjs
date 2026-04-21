const fs = require('fs');
const { Chess } = require('chess.js');

const code = fs.readFileSync('src/data/repertoire.ts', 'utf-8');

// Rough regex to extract all moves arrays
const movesRegex = /moves:\s*\[([\s\S]+?)\](?=\n\s*(?:}|,))/g;

let match;
let lineCount = 0;
let errors = [];

while ((match = movesRegex.exec(code)) !== null) {
    lineCount++;
    const movesText = match[1];
    
    // Extrahierte SANs
    const sanRegex = /san:\s*"([^"]+)"/g;
    let sanMatch;
    let sans = [];
    while ((sanMatch = sanRegex.exec(movesText)) !== null) {
        sans.push(sanMatch[1]);
    }
    
    // Validate with chess.js
    const chess = new Chess();
    for (let i = 0; i < sans.length; i++) {
        try {
            const m = chess.move(sans[i]);
            if (!m) {
                errors.push(`Error in line ${lineCount}: move ${i+1} (${sans[i]}), previous moves: ${sans.slice(0,i).join(' ')}`);
                break;
            }
        } catch(e) {
            errors.push(`Exception in line ${lineCount}: turn ${Math.floor(i/2)+1} move ${sans[i]} for ${chess.turn()} - ${e.message}\nPrevious: ${sans.slice(0,i).join(' ')}`);
            break;
        }
    }
}

console.log(`Checked ${lineCount} lines.`);
if (errors.length > 0) {
    console.log("Errors found:");
    console.log(errors.join("\n"));
} else {
    console.log("No errors found in repertoire.");
}
