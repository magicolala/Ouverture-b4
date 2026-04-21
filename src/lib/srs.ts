export interface SRSItem {
  nextReview: number; // UNIX timestamp in ms
  interval: number; // Interval in days (conceptual)
  reps: number;
  eFactor: number;
}

export function calculateSRS(item: SRSItem | undefined, isSuccess: boolean, hadHintsOrErrors: boolean): SRSItem {
  let { interval = 0, reps = 0, eFactor = 2.5 } = item || {};
  
  // Grade: 5 (perfect), 3 (correct but hard/hints), 1 (failed)
  const grade = isSuccess ? (hadHintsOrErrors ? 3 : 5) : 1;
  
  if (grade >= 3) {
    if (reps === 0) {
      interval = 1;
    } else if (reps === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * eFactor);
    }
    reps++;
  } else {
    reps = 0;
    // When failing, we drop interval to 0 so we see it again very soon
    interval = 0;
  }
  
  // Adjust ease factor
  eFactor = eFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
  if (eFactor < 1.3) eFactor = 1.3;
  
  // Calculate next review (if interval is 0, restudy in 2 minutes)
  const nextReview = Date.now() + (interval === 0 ? 120000 : interval * 24 * 60 * 60 * 1000);
  
  return { nextReview, interval, reps, eFactor };
}
