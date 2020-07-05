export function getDaysAgoString(date: Date): string {
  const today = new Date().getTime();
  const then = new Date(date).getTime();
  const AMOUNT_MS_IN_DAY = 1000 * 60 * 60 * 24;
  const daysElapsed = (today - then) / AMOUNT_MS_IN_DAY;

  const dayCount = Math.floor(daysElapsed);
  return dayCount > 1 ? `${dayCount} days ago` : "today";
}
