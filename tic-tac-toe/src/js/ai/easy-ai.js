// ══════════════════════════════════════════════════
// EASY-AI.JS — Random move selector
// ══════════════════════════════════════════════════

import { getEmptyCells } from '../game/board.js';
import { randomChoice } from '../utils/helpers.js';

export function getEasyMove(board) {
  const emptyCells = getEmptyCells(board);
  if (emptyCells.length === 0) throw new Error('[easy-ai] No empty cells');
  return { index: randomChoice(emptyCells) };
}
