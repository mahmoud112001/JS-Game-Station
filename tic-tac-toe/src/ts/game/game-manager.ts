// ══════════════════════════════════════════════════
// GAME-MANAGER.TS
// The central orchestrator of the game.
// Connects all game modules into a coherent flow.
//
// Responsibility:
//   - Processing a human cell click
//   - Evaluating the board after every move
//   - Triggering the CPU when appropriate
//   - Delegating to score-manager and round-manager
//   - Calling the renderer after every state change
//
// Rule: This is the ONLY module that directly
//       coordinates between game logic + AI + UI.
//       Controls and renderer.ts call into here.
//       Nothing calls game-manager internally
//       except main.ts (at bootstrap).
// ══════════════════════════════════════════════════

import type { GameMode, DifficultyLevel } from '../types';
import {
  getState,
  getBoard,
  resetScores,
  setWinner,
  setDraw,
  placeMove
} from '../state';

// Game logic
import {
  executeMove,
  advanceTurn,
  shouldTriggerCpu,
  scheduleCpuMove
} from './turn-manager';
import { evaluateBoard } from './win-checker';
import { recordWin, recordDraw } from './score-manager';
import {
  beginGame,
  restartRound,
  nextRound,
  returnToMenu
} from './round-manager';

// AI
import { getCpuMove } from '../ai/cpu-engine';

// UI (renderer is the only UI import here)
import { renderAll, renderAfterCpuStart } from '../ui/renderer';
import { showModal } from '../ui/modal';

// ══════════════════════════════════════════════════
// CORE FLOW — Handle a cell click
// ══════════════════════════════════════════════════

/**
 * Main entry point for all cell interactions.
 * Called by controls.ts when a cell is clicked.
 *
 * Full flow:
 *   1. Try to execute the move (validates legality)
 *   2. If illegal → bail out silently
 *   3. Evaluate board after move
 *   4. If round ended → handle result
 *   5. If not ended → switch turn, check for CPU
 *   6. Render the updated state
 */
export function handleCellClick(index: number): void {
  const state = getState();

  if (state.status !== 'playing') return;
  if (state.isCpuThinking) return;

  const symbol = state.currentTurn;
  const moved = executeMove(index, symbol);

  if (!moved) return;

  // Evaluate the board after the move
  const evaluation = evaluateBoard(getBoard(), symbol);

  if (evaluation?.type === 'won') {
    // Round won — record score, update winner state, show result
    recordWin(evaluation.result.winner);
    setWinner(evaluation.result.winner, evaluation.result.line);

    renderAll();
    showModal();
    return;
  }

  if (evaluation?.type === 'draw') {
    // Round draw — record draw, update state, show result
    recordDraw();
    setDraw();

    renderAll();
    showModal();
    return;
  }

  // Game continues — switch turn
  advanceTurn();
  renderAll();

  // Check if it's now the CPU's turn
  if (shouldTriggerCpu()) {
    renderAfterCpuStart(); // Show "CPU is thinking..." immediately
    scheduleCpuMove(executeCpuTurn);
  }
}

// ══════════════════════════════════════════════════
// CPU TURN
// ══════════════════════════════════════════════════

/**
 * Executes the CPU's move after the scheduled delay.
 * Called by turn-manager.scheduleCpuMove as a callback.
 *
 * Flow mirrors handleCellClick but without validation
 * (CPU always plays a valid move).
 */
function executeCpuTurn(): void {
  const state = getState();
  const board = getBoard();
  const symbol = state.currentTurn; // Usually 'O' in CPU mode

  // Get AI decision
  const cpuMove = getCpuMove(board, symbol, state.difficulty);

  // Place the move directly
  placeMove(cpuMove.index, symbol);

  // Evaluate
  const evaluation = evaluateBoard(getBoard(), symbol);

  if (evaluation?.type === 'won') {
    recordWin(evaluation.result.winner);
    setWinner(evaluation.result.winner, evaluation.result.line);

    renderAll();
    showModal();
    return;
  }

  if (evaluation?.type === 'draw') {
    recordDraw();
    setDraw();

    renderAll();
    showModal();
    return;
  }

  // Continue — switch to human's turn
  advanceTurn();
  renderAll();
}

// ══════════════════════════════════════════════════
// LIFECYCLE HANDLERS
// Called by controls.ts button handlers
// ══════════════════════════════════════════════════

/**
 * Starts a new game from the setup screen.
 * Called when "Start Game" is clicked.
 */
export function handleStartGame(mode: GameMode, difficulty: DifficultyLevel): void {
  beginGame(mode, difficulty);
  renderAll();
}

/**
 * Restarts the current round.
 * Called by "Restart Round" button.
 */
export function handleRestartRound(): void {
  restartRound();
  renderAll();
}

/**
 * Advances to the next round after a result.
 * Called by "Next Round" in the modal.
 */
export function handleNextRound(): void {
  nextRound();
  renderAll();
}

/**
 * Returns to the setup/menu screen.
 * Called by "Main Menu" buttons.
 */
export function handleReturnToMenu(): void {
  returnToMenu();
  renderAll();
}

/**
 * Resets all scores and starts a fresh round.
 * Called by "Reset Score" button.
 */
export function handleResetScores(): void {
  resetScores();
  restartRound();
  renderAll();
}