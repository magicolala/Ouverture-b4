export interface BadgeDef {
  id: string;
  icon: string;
  name: string;
  description: string;
  bgColor: string;
}

export const BADGES: BadgeDef[] = [
  { id: 'first_blood', icon: '🩸', name: 'Premier Sang', description: 'Une ligne parfaitement retenue.', bgColor: 'bg-red-100 border-red-500' },
  { id: 'streak_10', icon: '🔥', name: 'Régulier', description: 'Série de 10 coups sans faute.', bgColor: 'bg-orange-100 border-orange-500' },
  { id: 'streak_50', icon: '🌋', name: 'Inarrêtable', description: 'Série de 50 coups sans faute.', bgColor: 'bg-rose-100 border-rose-500' },
  { id: 'xp_500', icon: '⚔️', name: 'Chevalier', description: 'Atteindre 500 XP global.', bgColor: 'bg-blue-100 border-blue-500' },
  { id: 'xp_2000', icon: '👑', name: 'Maître Sokolsky', description: 'Atteindre 2000 XP global.', bgColor: 'bg-yellow-100 border-yellow-500' },
  { id: 'xp_5000', icon: '💎', name: 'Légende', description: 'Atteindre 5000 XP global.', bgColor: 'bg-purple-100 border-purple-500' },
];

export function evaluateBadges(
  stats: { good: number, bad: number, streak: number, xp: number },
  currentBadges: string[]
): string[] {
  const newUnlocked: string[] = [];
  const has = (id: string) => currentBadges.includes(id);

  if (!has('first_blood') && stats.good >= 1) newUnlocked.push('first_blood');
  if (!has('streak_10') && stats.streak >= 10) newUnlocked.push('streak_10');
  if (!has('streak_50') && stats.streak >= 50) newUnlocked.push('streak_50');
  if (!has('xp_500') && stats.xp >= 500) newUnlocked.push('xp_500');
  if (!has('xp_2000') && stats.xp >= 2000) newUnlocked.push('xp_2000');
  if (!has('xp_5000') && stats.xp >= 5000) newUnlocked.push('xp_5000');

  return newUnlocked;
}
