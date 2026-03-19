// ══════════════════════════════════════════════════
// HELPERS.TS — Pure utility functions
// ══════════════════════════════════════════════════

export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomChoice<T>(arr: readonly T[]): T {
  if (arr.length === 0) throw new Error('Cannot pick from empty array');
  return arr[randomInt(0, arr.length - 1)] as T;
}

export function withProbability(probability: number): boolean {
  return Math.random() < probability;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}