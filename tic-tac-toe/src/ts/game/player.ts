// ══════════════════════════════════════════════════
// PLAYER.TS
// Player identity and symbol utilities.
// Pure functions — no state, no DOM.
//
// Responsibility:
//   - Symbol operations (opposite, validation)
//   - Player identity helpers
// ══════════════════════════════════════════════════

import type { PlayerSymbol, GameMode } from '../types';
import { PLAYER_X, PLAYER_O } from '../constants';

/**
 * Returns the opposite symbol.
 * X → O, O → X.
 * Used by Minimax and turn switching.
 */
export function getOpponent(symbol: PlayerSymbol): PlayerSymbol {
  return symbol === PLAYER_X ? PLAYER_O : PLAYER_X;
}

/**
 * Returns true if the given string is a valid PlayerSymbol.
 * Used in validators.ts for input guards.
 */
export function isValidSymbol(value: unknown): value is PlayerSymbol {
  return value === PLAYER_X || value === PLAYER_O;
}

/**
 * Returns the CSS class suffix for a symbol.
 * e.g. 'X' → 'x', 'O' → 'o'
 * Used by renderer to apply BEM modifier classes.
 */
export function symbolToClass(symbol: PlayerSymbol): 'x' | 'o' {
  return symbol.toLowerCase() as 'x' | 'o';
}

/**
 * Returns the human-readable display name for a player
 * based on the current game mode.
 *
 * pvp: "Player X" / "Player O"
 * pvc: "Player"   / "CPU"
 */
export function getDisplayName(symbol: PlayerSymbol, mode: GameMode): string {
  if (mode === 'pvc') {
    return symbol === PLAYER_X ? 'Player' : 'CPU';
  }
  return symbol === PLAYER_X ? 'Player X' : 'Player O';
}

/**
 * Returns the score key for a symbol.
 * 'X' → 'x', 'O' → 'o'
 * Used when incrementing scores in score-manager.
 */
export function symbolToScoreKey(symbol: PlayerSymbol): 'x' | 'o' {
  return symbol === PLAYER_X ? 'x' : 'o';
}

/**
 * Returns true if this symbol belongs to the CPU
 * in a player-vs-CPU game. CPU always plays as 'O'.
 */
export function isCpu(symbol: PlayerSymbol, mode: GameMode): boolean {
  return mode === 'pvc' && symbol === PLAYER_O;
}