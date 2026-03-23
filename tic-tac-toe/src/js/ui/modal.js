// ══════════════════════════════════════════════════
// MODAL.JS — Result dialog show/hide
// ══════════════════════════════════════════════════

import { getState } from '../state.js';
import { getDom } from './dom.js';
import { CSS, MESSAGES, MODAL_ICONS, PLAYER_NAMES } from '../constants.js';

export function showModal() {
  const { status, winner, scores, gameMode } = getState();
  const dom = getDom();

  dom.modalIcon.textContent = status === 'won' ? MODAL_ICONS.win : MODAL_ICONS.draw;

  dom.modalTitle.classList.remove(CSS.MODAL_X, CSS.MODAL_O, CSS.MODAL_DRAW);

  if (status === 'won' && winner) {
    const name = PLAYER_NAMES[gameMode]?.[winner] ?? `Player ${winner}`;
    dom.modalTitle.textContent = MESSAGES.winX(name);
    dom.modalTitle.classList.add(winner === 'X' ? CSS.MODAL_X : CSS.MODAL_O);
  } else {
    dom.modalTitle.textContent = MESSAGES.draw;
    dom.modalTitle.classList.add(CSS.MODAL_DRAW);
  }

  dom.modalMessage.textContent   = status === 'won' ? MESSAGES.winSub : MESSAGES.drawSub;
  dom.modalScoreX.textContent    = String(scores.x);
  dom.modalScoreO.textContent    = String(scores.o);
  dom.modalScoreDraw.textContent = String(scores.draws);
  dom.modalLabelX.textContent    = PLAYER_NAMES[gameMode]?.X ?? 'X';
  dom.modalLabelO.textContent    = PLAYER_NAMES[gameMode]?.O ?? 'O';

  dom.resultModal.classList.remove(CSS.HIDDEN);
  dom.resultModal.style.display = '';

  setTimeout(() => dom.btnNextRound.focus(), 50);
}

export function hideModal() {
  getDom().resultModal.classList.add(CSS.HIDDEN);
}
