export const XP_THRESHOLDS = [
  { level: 1, name: 'Novice', xpRequired: 0 },
  { level: 2, name: 'Apprenti', xpRequired: 100 },
  { level: 3, name: 'Amateur', xpRequired: 250 },
  { level: 4, name: 'Joueur de Club', xpRequired: 500 },
  { level: 5, name: 'Expert b4', xpRequired: 1000 },
  { level: 6, name: 'Maître Sokolsky', xpRequired: 2500 },
  { level: 7, name: 'Légende', xpRequired: 5000 },
];

export function getRankData(xp: number) {
  let currentRank = XP_THRESHOLDS[0];
  let nextRank = XP_THRESHOLDS[1];
  
  for (let i = 0; i < XP_THRESHOLDS.length; i++) {
    if (xp >= XP_THRESHOLDS[i].xpRequired) {
      currentRank = XP_THRESHOLDS[i];
      nextRank = XP_THRESHOLDS[i + 1] || null;
    } else {
      break;
    }
  }

  const xpIntoLevel = xp - currentRank.xpRequired;
  const xpNeededForNext = nextRank ? nextRank.xpRequired - currentRank.xpRequired : 1;
  const progressPercent = nextRank ? Math.min(100, Math.max(0, (xpIntoLevel / xpNeededForNext) * 100)) : 100;

  return {
    currentRank,
    nextRank,
    progressPercent,
    xpIntoLevel,
    xpNeededForNext
  };
}
