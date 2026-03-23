// ══════════════════════════════════════════════════
// TURN-MANAGER.JS — Move validation and turn flow
// ══════════════════════════════════════════════════

import {
  getState, placeMove, switchTurn,
  setCpuThinking, isCpuTurn, isPlaying,
} from '../state.js';
import { isCellEmpty } from './board.js';
import { CPU_DELAY } from '../constants.js';

export function isLegalMove(index) {
  const state = getState();
  if (!isPlaying())                     return false;
  if (state.isCpuThinking)              return false;
  if (!isCellEmpty(state.board, index)) return false;
  return true;
}

export function executeMove(index, symbol) {
  if (!isLegalMove(index)) return false;
  placeMove(index, symbol);
  return true;
}

export function advanceTurn() {
  switchTurn();
}

export function shouldTriggerCpu() {
  return isCpuTurn() && isPlaying();
}

export function scheduleCpuMove(onCpuReady) {
  const { difficulty } = getState();
  const delay = CPU_DELAY[difficulty] ?? CPU_DELAY.medium;

  setCpuThinking(true);

  window.setTimeout(() => {
    setCpuThinking(false);
    onCpuReady();
  }, delay);
}
