import { computeThreats } from "../src/lib/threats.ts";

interface Case {
  name: string;
  fen: string;
  expected: string[]; // "from->to"
}

const cases: Case[] = [
  {
    name: "position initiale (aucune menace)",
    fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    expected: [],
  },
  {
    name: "cavalier blanc pendu sur e5 (tour de move = blanc)",
    // Black to move would attack e5 with pawn d6; we want threats on side-to-move.
    // Let's build: white knight on e5, black pawn on d6 attacking it, no defenders.
    fen: "4k3/8/3p4/4N3/8/8/8/4K3 w - - 0 1",
    expected: ["d6->e5"],
  },
  {
    name: "pièce défendue à parité (pas de menace)",
    // White knight on e5 attacked by black pawn d6; defended by white pawn d4.
    // Pawn takes knight (3) → pawn takes pawn (1). Net for Black: 3 - 1 = 2. Wait!
    // Hmm — actually SEE here: knight captured (gain 3), then defender takes back
    // (defender pawn captures pawn on e5 = 1). SEE = 3 - 1 = 2 for Black → STILL a threat.
    // To make it NOT a threat: attacker = pawn, defender = pawn, victim = pawn.
    fen: "4k3/8/3p4/4P3/3P4/8/8/4K3 w - - 0 1",
    expected: [], // pawn defended by pawn, pawn attacker, all equal -> no gain
  },
  {
    name: "dame noire attaque tour blanche non défendue",
    fen: "4k3/8/8/8/3q4/8/3R4/K7 w - - 0 1",
    expected: ["d4->d2"],
  },
  {
    name: "tour défendue par le roi — queen capture perd la dame",
    // Même position que ci-dessus mais le roi blanc défend d2.
    fen: "4k3/8/8/8/3q4/8/3R4/4K3 w - - 0 1",
    expected: [],
  },
  {
    name: "piège fxg7 (motif Sokolsky) : fou blanc menace la tour h8",
    // Diagonale a1-h8 ouverte avec fou en b2 et tour noire en h8.
    // On met Noir au trait pour détecter la menace sur h8.
    fen: "rnbqkbnr/pppppp1p/8/8/8/8/PBP1PPPP/RN1QKBNR b KQkq - 0 1",
    expected: ["b2->h8"],
  },
];

let failures = 0;
for (const c of cases) {
  const res = computeThreats(c.fen).map((t) => `${t.from}->${t.to}`).sort();
  const exp = [...c.expected].sort();
  const ok =
    res.length === exp.length && res.every((v, i) => v === exp[i]);
  console.log(
    `${ok ? "✓" : "✗"} ${c.name}\n  expected: [${exp.join(", ")}]\n  got:      [${res.join(", ")}]`
  );
  if (!ok) failures++;
}

if (failures > 0) {
  console.error(`\n${failures} test(s) failed`);
  process.exit(1);
}
console.log("\nAll threat tests passed.");
