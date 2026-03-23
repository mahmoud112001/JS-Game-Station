// ══════════════════════════════════════════════════
// CONSTANTS.JS — All magic values in one place
// ══════════════════════════════════════════════════

export const BOARD_SIZE = 9;

export const WINNING_COMBOS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6],             // diagonals
];

export const PLAYER_X = 'X';
export const PLAYER_O = 'O';
export const FIRST_PLAYER = PLAYER_X;

export const CPU_DELAY = {
  easy:   400,
  medium: 650,
  hard:   900,
};

export const MINIMAX_WIN_SCORE  =  10;
export const MINIMAX_LOSS_SCORE = -10;
export const MINIMAX_DRAW_SCORE =   0;

export const MEDIUM_STRATEGIC_CHANCE = 0.7;

export const PREFERRED_CELLS = [4, 0, 2, 6, 8, 1, 3, 5, 7];

export const DOM_IDS = {
  APP:               'app',
  SETUP_PANEL:       'setup-panel',
  GAME_PANEL:        'game-panel',
  BTN_PVP:           'btn-pvp',
  BTN_PVC:           'btn-pvc',
  DIFFICULTY_GROUP:  'difficulty-group',
  BTN_EASY:          'btn-easy',
  BTN_MEDIUM:        'btn-medium',
  BTN_HARD:          'btn-hard',
  BTN_START:         'btn-start',
  SCORE_X:           'score-x',
  SCORE_O:           'score-o',
  SCORE_DRAW:        'score-draw',
  SCORE_LABEL_X:     'score-label-x',
  SCORE_LABEL_O:     'score-label-o',
  TURN_INDICATOR:    'turn-indicator',
  TURN_DOT:          'turn-dot',
  TURN_TEXT:         'turn-text',
  BOARD:             'board',
  BTN_RESTART:       'btn-restart',
  BTN_MENU:          'btn-menu',
  BTN_RESET_SCORE:   'btn-reset-score',
  RESULT_MODAL:      'result-modal',
  MODAL_BACKDROP:    'modal-backdrop',
  MODAL_ICON:        'modal-icon',
  MODAL_TITLE:       'modal-title',
  MODAL_MESSAGE:     'modal-message',
  MODAL_SCORE_X:     'modal-score-x',
  MODAL_SCORE_O:     'modal-score-o',
  MODAL_SCORE_DRAW:  'modal-score-draw',
  MODAL_LABEL_X:     'modal-label-x',
  MODAL_LABEL_O:     'modal-label-o',
  BTN_NEXT_ROUND:    'btn-next-round',
  BTN_MODAL_RESTART: 'btn-modal-restart',
  BTN_MODAL_MENU:    'btn-modal-menu',
};

export const CSS = {
  HIDDEN:        'hidden',
  CELL_X:        'board__cell--x',
  CELL_O:        'board__cell--o',
  CELL_WINNER:   'board__cell--winner',
  CELL_DRAW:     'board__cell--draw',
  CELL_DISABLED: 'board__cell--disabled',
  BOARD_LOCKED:  'board--locked',
  TURN_X:        'turn-indicator--x',
  TURN_O:        'turn-indicator--o',
  TURN_THINKING: 'turn-indicator--thinking',
  DOT_O:         'turn-indicator__dot--o',
  DOT_THINKING:  'turn-indicator__dot--thinking',
  SCORE_BUMP:    'score-bump',
  SCORE_ACTIVE:  'score-card--active',
  MODE_ACTIVE:   'mode-btn--active',
  DIFF_ACTIVE:   'diff-btn--active',
  MODAL_X:       'modal__title--x',
  MODAL_O:       'modal__title--o',
  MODAL_DRAW:    'modal__title--draw',
};

export const MESSAGES = {
  turnX:    (name) => `${name}'s turn`,
  turnO:    (name) => `${name}'s turn`,
  thinking: 'CPU is thinking...',
  winX:     (name) => `${name} Wins!`,
  winO:     (name) => `${name} Wins!`,
  draw:     "It's a Draw!",
  winSub:   'Well played. Ready for the next round?',
  drawSub:  'No winner this time. Try again!',
};

export const PLAYER_NAMES = {
  pvp: { X: 'Player X', O: 'Player O' },
  pvc: { X: 'Player',   O: 'CPU' },
};

export const MODAL_ICONS = {
  win:  '🏆',
  draw: '🤝',
};

export const STORAGE_KEY = 'ttt_scores';
