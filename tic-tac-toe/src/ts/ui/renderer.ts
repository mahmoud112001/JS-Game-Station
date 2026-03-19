// ══════════════════════════════════════════════════
// RENDERER.TS
// State → DOM. The ONLY place that writes to the DOM
// based on game state.
//
// Rules:
//   - Pure rendering: given the same state, always
//     produces the same DOM output
//   - Never reads event targets
//   - Never mutates game state
//   - Composes small focused render functions
//     into renderAll()
// ══════════════════════════════════════════════════

import { getState } from '../state';
import { getPlayerName } from '../state';
import { getDom } from './dom';
import { CSS, MESSAGES, PLAYER_NAMES } from '../constants';
import { symbolToClass } from '../game/player';

// ── Helper: toggle hidden class ───────────────────

function show(el: HTMLElement): void { el.classList.remove(CSS.HIDDEN); }
function hide(el: HTMLElement): void { el.classList.add(CSS.HIDDEN); }

// ── Panel visibility ──────────────────────────────

function renderPanels(): void {
  const { status } = getState();
  const dom = getDom();

  if (status === 'setup') {
    show(dom.setupPanel);
    hide(dom.gamePanel);
  } else {
    hide(dom.setupPanel);
    show(dom.gamePanel);
  }
}

// ── Board cells ───────────────────────────────────

function renderBoard(): void {
  const { board, winningLine, status, isCpuThinking } = getState();
  const dom = getDom();

  dom.cells.forEach((cell, index) => {
    const value = board[index];

    // Clear all state classes
    cell.classList.remove(CSS.CELL_X, CSS.CELL_O, CSS.CELL_WINNER, CSS.CELL_DRAW, CSS.CELL_DISABLED);
    cell.removeAttribute('data-hover');

    // Apply symbol class
    if (value === 'X') cell.classList.add(CSS.CELL_X);
    if (value === 'O') cell.classList.add(CSS.CELL_O);

    // Apply winner highlight
    if (winningLine?.includes(index)) {
      cell.classList.add(CSS.CELL_WINNER);
    }

    // Apply draw fade
    if (status === 'draw' && value !== null) {
      cell.classList.add(CSS.CELL_DRAW);
    }

    // Disable filled cells and cells when game is over
    const isDisabled = value !== null || status === 'won' || status === 'draw' || isCpuThinking;
    cell.disabled = isDisabled;
    if (isDisabled && value === null) cell.classList.add(CSS.CELL_DISABLED);
  });

  // Lock board during CPU thinking or game over
  const shouldLock = isCpuThinking || status === 'won' || status === 'draw';
  dom.board.classList.toggle(CSS.BOARD_LOCKED, shouldLock);

  // Set hover preview symbol for empty cells
  if (status === 'playing' && !isCpuThinking) {
    const { currentTurn } = getState();
    dom.cells.forEach((cell) => {
      if (!cell.disabled) {
        cell.setAttribute('data-hover', currentTurn);
      }
    });
  }
}

// ── Turn indicator ────────────────────────────────

function renderTurnIndicator(): void {
  const { status, currentTurn, isCpuThinking, gameMode } = getState();
  const dom = getDom();

  // Clear all modifier classes
  dom.turnIndicator.classList.remove(CSS.TURN_X, CSS.TURN_O, CSS.TURN_THINKING);
  dom.turnDot.classList.remove(CSS.DOT_O, CSS.DOT_THINKING);

  if (status !== 'playing') {
    dom.turnText.textContent = '';
    return;
  }

  if (isCpuThinking) {
    dom.turnIndicator.classList.add(CSS.TURN_THINKING);
    dom.turnDot.classList.add(CSS.DOT_THINKING);
    dom.turnText.textContent = MESSAGES.thinking;
    return;
  }

  const playerName = PLAYER_NAMES[gameMode]?.[currentTurn] ?? `Player ${currentTurn}`;

  if (currentTurn === 'X') {
    dom.turnIndicator.classList.add(CSS.TURN_X);
    dom.turnText.textContent = MESSAGES.turnX(playerName);
  } else {
    dom.turnIndicator.classList.add(CSS.TURN_O);
    dom.turnDot.classList.add(CSS.DOT_O);
    dom.turnText.textContent = MESSAGES.turnO(playerName);
  }
}

// ── Scoreboard ────────────────────────────────────

function renderScore(): void {
  const { scores, currentTurn, status, gameMode } = getState();
  const dom = getDom();

  dom.scoreX.textContent    = String(scores.x);
  dom.scoreO.textContent    = String(scores.o);
  dom.scoreDraw.textContent = String(scores.draws);

  // Update player labels
  dom.scoreLabelX.textContent = PLAYER_NAMES[gameMode]?.X ?? 'Player X';
  dom.scoreLabelO.textContent = PLAYER_NAMES[gameMode]?.O ?? 'Player O';

  // Highlight active score card
  const xCard = dom.scoreX.closest('.score-card');
  const oCard = dom.scoreO.closest('.score-card');

  xCard?.classList.toggle(CSS.SCORE_ACTIVE, status === 'playing' && currentTurn === 'X');
  oCard?.classList.toggle(CSS.SCORE_ACTIVE, status === 'playing' && currentTurn === 'O');
}

// ── Score bump animation ──────────────────────────

export function animateScoreBump(symbol: 'X' | 'O' | 'draw'): void {
  const dom = getDom();
  const el  = symbol === 'X' ? dom.scoreX
            : symbol === 'O' ? dom.scoreO
            : dom.scoreDraw;

  el.classList.remove(CSS.SCORE_BUMP);
  void el.offsetWidth;  // Force reflow to restart animation
  el.classList.add(CSS.SCORE_BUMP);

  el.addEventListener('animationend', () => {
    el.classList.remove(CSS.SCORE_BUMP);
  }, { once: true });
}

// ── Setup panel state ─────────────────────────────

function renderSetup(): void {
  const { gameMode, difficulty } = getState();
  const dom = getDom();

  // Mode button active states
  dom.btnPvp.classList.toggle(CSS.MODE_ACTIVE, gameMode === 'pvp');
  dom.btnPvc.classList.toggle(CSS.MODE_ACTIVE, gameMode === 'pvc');
  dom.btnPvp.setAttribute('aria-pressed', String(gameMode === 'pvp'));
  dom.btnPvc.setAttribute('aria-pressed', String(gameMode === 'pvc'));

  // Show/hide difficulty group
  dom.difficultyGroup.classList.toggle(CSS.HIDDEN, gameMode !== 'pvc');

  // Difficulty button active states
  dom.btnEasy.classList.toggle(CSS.DIFF_ACTIVE,   difficulty === 'easy');
  dom.btnMedium.classList.toggle(CSS.DIFF_ACTIVE, difficulty === 'medium');
  dom.btnHard.classList.toggle(CSS.DIFF_ACTIVE,   difficulty === 'hard');
  dom.btnEasy.setAttribute('aria-pressed',   String(difficulty === 'easy'));
  dom.btnMedium.setAttribute('aria-pressed', String(difficulty === 'medium'));
  dom.btnHard.setAttribute('aria-pressed',   String(difficulty === 'hard'));
}

// ══════════════════════════════════════════════════
// PUBLIC API
// ══════════════════════════════════════════════════

/**
 * Full render — call after every state change.
 * Composes all sub-renderers in the correct order.
 */
export function renderAll(): void {
  renderPanels();
  renderSetup();
  renderBoard();
  renderTurnIndicator();
  renderScore();
}

/**
 * Partial render after CPU thinking starts.
 * Only updates the turn indicator to show "thinking".
 * Board render not needed — no move placed yet.
 */
export function renderAfterCpuStart(): void {
  renderTurnIndicator();
  renderBoard();  // Lock the board immediately
}