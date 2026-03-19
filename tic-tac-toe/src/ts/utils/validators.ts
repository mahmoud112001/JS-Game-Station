// ══════════════════════════════════════════════════
// VALIDATORS.TS — Input validation guards
// ══════════════════════════════════════════════════

import type { GameMode, DifficultyLevel } from '../types';

export function isValidMode(value: unknown): value is GameMode {
  return value === 'pvp' || value === 'pvc';
}

export function isValidDifficulty(value: unknown): value is DifficultyLevel {
  return value === 'easy' || value === 'medium' || value === 'hard';
}

export function isValidCellIndex(index: unknown): index is number {
  return typeof index === 'number' && index >= 0 && index <= 8;
}