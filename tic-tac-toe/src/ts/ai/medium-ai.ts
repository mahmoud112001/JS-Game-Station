// ══════════════════════════════════════════════════
// MEDIUM-AI.TS
// Strategic but intentionally imperfect AI.
//
// Behaviour (priority order):
//   1. If CPU can win this move → take it (100%)
//   2. If player can win next move → block it (100%)
//   3. Otherwise → strategic OR random split:
//      - 70% chance: pick best cell (center → corners → edges)
//      - 30% chance: pick random empty cell
//
// Why intentionally imperfect?
//   Medium should feel smarter than Easy but still
//   beatable by a thinking player. Pure strategy
//   without Minimax still misses multi-step traps.
// ══════════════════════════════════════════════════

import type { BoardState, CpuMoveResult, PlayerSymbol } from '../types';
import { getEmptyCells, applyMove } from '../game/board';
import { getOpponent } from '../game/player';
import { hasWon } from '../game/win-checker';
import { PREFERRED_CELLS, MEDIUM_STRATEGIC_CHANCE } from '../constants';
import { randomChoice, withProbability } from '../utils/helpers';

/**
 * Checks if placing `symbol` at `index` on `board`
 * results in a win for that symbol.
 * Used to find both winning moves and blocking moves.
 */
function wouldWin(
  board: BoardState,
  index: number,
  symbol: PlayerSymbol
): boolean {
  const simulated = applyMove(board, index, symbol);
  return hasWon(simulated, symbol);
}

/**
 * Finds a winning move for `symbol` if one exists.
 * Returns the index or null.
 */
function findWinningMove(
  board: BoardState,
  symbol: PlayerSymbol
): number | null {
  const empties = getEmptyCells(board);

  for (const index of empties) {
    if (wouldWin(board, index, symbol)) return index;
  }

  return null;
}

/**
 * Picks the best strategic cell from PREFERRED_CELLS
 * that is still empty. Order: center → corners → edges.
 * Returns null if all preferred cells are taken.
 */
function findStrategicCell(board: BoardState): number | null {
  const empties = new Set(getEmptyCells(board));

  for (const cell of PREFERRED_CELLS) {
    if (empties.has(cell)) return cell;
  }

  return null;
}

/**
 * Returns the medium difficulty move.
 *
 * Decision tree:
 *   1. Winning move available → take it
 *   2. Opponent winning next → block it
 *   3. Coin flip (70/30):
 *      → strategic: center/corner/edge preference
 *      → random: any empty cell
 */
export function getMediumMove(
  board: BoardState,
  cpuSymbol: PlayerSymbol
): CpuMoveResult {
  const opponent = getOpponent(cpuSymbol);
  const empties  = getEmptyCells(board);

  if (empties.length === 0) {
    throw new Error('[medium-ai] No empty cells');
  }

  // Priority 1 — Win immediately if possible
  const winMove = findWinningMove(board, cpuSymbol);
  if (winMove !== null) return { index: winMove };

  // Priority 2 — Block opponent's winning move
  const blockMove = findWinningMove(board, opponent);
  if (blockMove !== null) return { index: blockMove };

  // Priority 3 — Strategic vs random split
  if (withProbability(MEDIUM_STRATEGIC_CHANCE)) {
    const strategic = findStrategicCell(board);
    if (strategic !== null) return { index: strategic };
  }

  // Fallback — random valid move
  return { index: randomChoice(empties) };
}