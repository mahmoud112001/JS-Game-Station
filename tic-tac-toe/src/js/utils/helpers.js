// ══════════════════════════════════════════════════
// HELPERS.JS — Pure utility functions
// ══════════════════════════════════════════════════

export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomChoice(arr) {
  if (arr.length === 0) throw new Error('Cannot pick from empty array');
  return arr[randomInt(0, arr.length - 1)];
}

export function withProbability(probability) {
  return Math.random() < probability;
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
