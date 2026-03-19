// ══════════════════════════════════════════════════
// CONSTANTS.TS
// All magic values in one place.
// No logic. No side effects. Pure data declarations.
// If a number or string appears more than once
// in this codebase, it belongs here.
// ══════════════════════════════════════════════════

import type { PlayerSymbol, WinningLine } from './types';

// ── Board ─────────────────────────────────────────

/** Total number of cells on the board. */
export const BOARD_SIZE = 9 as const;

/** All 8 winning combinations as cell index tuples. */
export const WINNING_COMBOS: readonly WinningLine[] = [
  // Rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // Diagonals
  [0, 4, 8],
  [2, 4, 6],
] as const;

// ── Players ───────────────────────────────────────

/** The two player symbols. */
export const PLAYER_X: PlayerSymbol = 'X';
export const PLAYER_O: PlayerSymbol = 'O';

/** First player always starts as X. */
export const FIRST_PLAYER: PlayerSymbol = PLAYER_X;

// ── CPU timing ────────────────────────────────────

/**
 * Delay before CPU places its move (ms).
 * Makes the "CPU is thinking" feel natural.
 * Different delays per difficulty add personality.
 */
export const CPU_DELAY: Record<string, number> = {
  easy:   400,
  medium: 650,
  hard:   900,
} as const;

// ── AI weights ────────────────────────────────────

/**
 * Scores used by Minimax to evaluate board states.
 * Higher depth = faster win = better score.
 */
export const MINIMAX_WIN_SCORE  =  10 as const;
export const MINIMAX_LOSS_SCORE = -10 as const;
export const MINIMAX_DRAW_SCORE =   0 as const;

/**
 * Medium AI strategic probability (0–1).
 * At 0.7, the CPU plays smart 70% of the time.
 */
export const MEDIUM_STRATEGIC_CHANCE = 0.7 as const;

/**
 * Preferred cell indices for medium AI.
 * Center first, then corners, then edges.
 */
export const PREFERRED_CELLS: readonly number[] = [4, 0, 2, 6, 8, 1, 3, 5, 7] as const;

// ── DOM IDs ───────────────────────────────────────
// Centralising IDs prevents typo bugs across
// multiple querySelector calls.

export const DOM_IDS = {
  APP:              'app',
  SETUP_PANEL:      'setup-panel',
  GAME_PANEL:       'game-panel',
  BTN_PVP:          'btn-pvp',
  BTN_PVC:          'btn-pvc',
  DIFFICULTY_GROUP: 'difficulty-group',
  BTN_EASY:         'btn-easy',
  BTN_MEDIUM:       'btn-medium',
  BTN_HARD:         'btn-hard',
  BTN_START:        'btn-start',
  SCORE_X:          'score-x',
  SCORE_O:          'score-o',
  SCORE_DRAW:       'score-draw',
  SCORE_LABEL_X:    'score-label-x',
  SCORE_LABEL_O:    'score-label-o',
  TURN_INDICATOR:   'turn-indicator',
  TURN_DOT:         'turn-dot',
  TURN_TEXT:        'turn-text',
  BOARD:            'board',
  BTN_RESTART:      'btn-restart',
  BTN_MENU:         'btn-menu',
  BTN_RESET_SCORE:  'btn-reset-score',
  RESULT_MODAL:     'result-modal',
  MODAL_BACKDROP:   'modal-backdrop',
  MODAL_ICON:       'modal-icon',
  MODAL_TITLE:      'modal-title',
  MODAL_MESSAGE:    'modal-message',
  MODAL_SCORE_X:    'modal-score-x',
  MODAL_SCORE_O:    'modal-score-o',
  MODAL_SCORE_DRAW: 'modal-score-draw',
  MODAL_LABEL_X:    'modal-label-x',
  MODAL_LABEL_O:    'modal-label-o',
  BTN_NEXT_ROUND:   'btn-next-round',
  BTN_MODAL_RESTART:'btn-modal-restart',
  BTN_MODAL_MENU:   'btn-modal-menu',
} as const;

// ── CSS Classes ───────────────────────────────────

export const CSS = {
  HIDDEN:           'hidden',
  // Board
  CELL_X:           'board__cell--x',
  CELL_O:           'board__cell--o',
  CELL_WINNER:      'board__cell--winner',
  CELL_DRAW:        'board__cell--draw',
  CELL_DISABLED:    'board__cell--disabled',
  BOARD_LOCKED:     'board--locked',
  // Turn indicator
  TURN_X:           'turn-indicator--x',
  TURN_O:           'turn-indicator--o',
  TURN_THINKING:    'turn-indicator--thinking',
  DOT_O:            'turn-indicator__dot--o',
  DOT_THINKING:     'turn-indicator__dot--thinking',
  // Score
  SCORE_BUMP:       'score-bump',
  SCORE_ACTIVE:     'score-card--active',
  // Mode / diff buttons
  MODE_ACTIVE:      'mode-btn--active',
  DIFF_ACTIVE:      'diff-btn--active',
  // Modal title
  MODAL_X:          'modal__title--x',
  MODAL_O:          'modal__title--o',
  MODAL_DRAW:       'modal__title--draw',
} as const;

// ── Messages ──────────────────────────────────────

export const MESSAGES = {
  turnX:     (name: string) => `${name}'s turn`,
  turnO:     (name: string) => `${name}'s turn`,
  thinking:  'CPU is thinking...',
  winX:      (name: string) => `${name} Wins!`,
  winO:      (name: string) => `${name} Wins!`,
  draw:      "It's a Draw!",
  winSub:    'Well played. Ready for the next round?',
  drawSub:   'No winner this time. Try again!',
} as const;

// ── Player display names ──────────────────────────

export const PLAYER_NAMES: Record<string, Record<string, string>> = {
  pvp: { X: 'Player X', O: 'Player O' },
  pvc: { X: 'Player',   O: 'CPU' },
} as const;

// ── Modal icons ───────────────────────────────────

export const MODAL_ICONS = {
  win:  '🏆',
  draw: '🤝',
} as const;

// ── localStorage key ──────────────────────────────

export const STORAGE_KEY = 'ttt_scores' as const;