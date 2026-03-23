// ══════════════════════════════════════════════════
// VALIDATORS.JS — Input validation guards
// ══════════════════════════════════════════════════

export function isValidMode(value) {
  return value === 'pvp' || value === 'pvc';
}

export function isValidDifficulty(value) {
  return value === 'easy' || value === 'medium' || value === 'hard';
}

export function isValidCellIndex(index) {
  return typeof index === 'number' && index >= 0 && index <= 8;
}
