// ══════════════════════════════════════════════════
// CPU-ENGINE.JS — Routes to correct AI by difficulty
// ══════════════════════════════════════════════════

import { getEasyMove }   from './easy-ai.js';
import { getMediumMove } from './medium-ai.js';
import { getHardMove }   from './hard-ai.js';

export function getCpuMove(board, symbol, difficulty) {
  switch (difficulty) {
    case 'easy':   return getEasyMove(board);
    case 'medium': return getMediumMove(board, symbol);
    case 'hard':   return getHardMove(board, symbol);
    default:       throw new Error(`[cpu-engine] Unknown difficulty: ${difficulty}`);
  }
}
