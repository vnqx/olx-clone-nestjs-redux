export function getDaysElapsed(date: Date): number {
  const today = new Date().getTime();
  const then = new Date(date).getTime();
  const AMOUNT_MS_IN_DAY = 1000 * 60 * 60 * 24;
  const daysElapsed = (today - then) / AMOUNT_MS_IN_DAY;

  return Math.floor(daysElapsed);
}
