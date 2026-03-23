// ══════════════════════════════════════════════════
// PLAYER.JS — Player identity and symbol utilities
// ══════════════════════════════════════════════════

import { PLAYER_X, PLAYER_O } from '../constants.js';

export function getOpponent(symbol) {
  return symbol === PLAYER_X ? PLAYER_O : PLAYER_X;
}

export function isValidSymbol(value) {
  return value === PLAYER_X || value === PLAYER_O;
}

export function symbolToClass(symbol) {
  return symbol.toLowerCase();
}

export function getDisplayName(symbol, mode) {
  if (mode === 'pvc') {
    return symbol === PLAYER_X ? 'Player' : 'CPU';
  }
  return symbol === PLAYER_X ? 'Player X' : 'Player O';
}

export function symbolToScoreKey(symbol) {
  return symbol === PLAYER_X ? 'x' : 'o';
}

export function isCpu(symbol, mode) {
  return mode === 'pvc' && symbol === PLAYER_O;
}
