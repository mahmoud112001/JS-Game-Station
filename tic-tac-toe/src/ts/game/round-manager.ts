// ══════════════════════════════════════════════════
// ROUND-MANAGER.TS
// Round lifecycle — start, reset, next, full reset.
//
// Responsibility:
//   - Starting a new game from the setup screen
//   - Restarting the current round
//   - Advancing to the next round after a result
//   - Returning to the main menu
// ══════════════════════════════════════════════════

import type { GameMode, DifficultyLevel } from '../types';
import {
  setGameConfig,
  startGame,
  resetRound,
  resetGame,
  resetToMenu,
} from '../state';

/**
 * Configures and starts a brand-new game.
 * Called when the player clicks "Start Game".
 *
 * Steps:
 *   1. Save mode and difficulty to state
 *   2. Transition state to 'playing'
 *   3. Clear any previous board/winner/winningLine
 */
export function beginGame(mode: GameMode, difficulty: DifficultyLevel): void {
  setGameConfig(mode, difficulty);
  startGame();
}

/**
 * Resets the current round from scratch.
 * Scores are preserved. Board and turn reset.
 * Called by "Restart Round" button.
 */
export function restartRound(): void {
  resetRound();
}

/**
 * Starts a new round after the previous one ended.
 * Equivalent to restartRound — same state transition.
 * Separated for semantic clarity in game-manager.
 * Called by "Next Round" button in the modal.
 */
export function nextRound(): void {
  resetRound();
}

/**
 * Returns to the setup screen.
 * Preserves the scores in state — they stay visible
 * if the player starts another game session.
 * Called by "Main Menu" button.
 */
export function returnToMenu(): void {
  resetToMenu();
}

/**
 * Full game reset — scores AND board cleared.
 * Called by "Reset Score" button.
 * Returns to playing state (not setup).
 */
export function fullReset(): void {
  resetGame();
}