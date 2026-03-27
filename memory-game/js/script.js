/**
 * ══════════════════════════════════════════════════════
 * MEMORY MATRIX — Game Logic Engine
 * ══════════════════════════════════════════════════════
 *
 * Architecture:
 *   CONFIG      → static, never changes at runtime
 *   STATE       → single mutable source of truth
 *   AudioService→ Web Audio API sound generation (SRP)
 *   TimerService→ timer lifecycle (SRP)
 *   BoardService→ card creation, shuffle, rating calc (SRP)
 *   GameController → orchestrates all services (Façade)
 *
 * SOLID principles applied:
 *   S — each service has a single responsibility
 *   O — new difficulty levels added via CONFIG only
 *   L — services are interchangeable (same interface)
 *   I — no service depends on another service's internals
 *   D — GameController depends on abstractions (service objects)
 *
 * @author  Mahmoud Awad Saad
 * @year    2026
 * @program ITI — ICC | Full-Stack MEARN Track
 */

'use strict';

/* ════════════════════════════════════════════════════
   CONFIG  — open/closed: add levels here, nowhere else
════════════════════════════════════════════════════ */
const CONFIG = Object.freeze({

  /** Difficulty definitions.  pairs × 2 = total cards. */
  difficulties: {
    easy:   { pairs: 8,  cols: 4, label: 'Easy',   ratingThresholds: [20, 30] },
    medium: { pairs: 12, cols: 6, label: 'Medium',  ratingThresholds: [28, 42] },
    hard:   { pairs: 18, cols: 6, label: 'Hard',    ratingThresholds: [40, 60] },
    expert: { pairs: 24, cols: 8, label: 'Expert',  ratingThresholds: [55, 80] },
  },

  /** Default level on page load. */
  defaultDifficulty: 'medium',

  /** Delay (ms) before mismatched cards flip back. */
  mismatchDelay: 900,

  /**
   * Full emoji set — 30 distinct symbols.
   * Pool is sliced to the number of pairs needed.
   */
  emojiPool: [
    '🚀','💻','🧪','👾','📡','🔋','💎','🧠',
    '🎮','🌌','🛸','🔮','⚡','🎯','🏆','🔑',
    '🌀','🦾','🤖','💡','🎲','🔐','📱','🎴',
    '🧬','🌐','🔭','💫','🃏','🧩',
  ],

  selectors: {
    board:       '#gameBoard',
    moves:       '#moves',
    timer:       '#timer',
    pairs:       '#pairs',
    starRow:     '#starRow',
    soundToggle: '#soundToggle',
    resetBtn:    '#resetBtn',
    diffBtns:    '.diff-btn',
    modal:       '#victoryModal',
    modalTime:   '#modalTime',
    modalMoves:  '#modalMoves',
    modalStars:  '#modalStars',
    playAgain:   '#modalPlayAgain',
    closeModal:  '#modalClose',
  },
});


/* ════════════════════════════════════════════════════
   STATE  — single mutable source of truth
════════════════════════════════════════════════════ */
const State = (() => {
  /** Initial / reset shape. */
  const _create = () => ({
    difficulty:   CONFIG.defaultDifficulty,
    flipped:      [],   // max 2 card elements at a time
    matched:      0,    // number of matched pairs
    moves:        0,    // incremented each time 2 cards are compared
    seconds:      0,    // elapsed seconds
    timerRunning: false,
    soundEnabled: true,
    locked:       false, // prevent clicks during comparison delay
  });

  let _s = _create();

  return {
    get: () => _s,
    reset: () => { _s = _create(); },
    /** Partial update — merges provided keys into state. */
    set: (partial) => { Object.assign(_s, partial); },
  };
})();


/* ════════════════════════════════════════════════════
   AUDIO SERVICE  — SRP: sound only
   Uses Web Audio API to synthesise tones without files.
════════════════════════════════════════════════════ */
const AudioService = (() => {
  let _ctx = null;

  /** Lazy-initialise AudioContext on first use (browser policy). */
  const _getCtx = () => {
    if (!_ctx) _ctx = new (window.AudioContext || window.webkitAudioContext)();
    return _ctx;
  };

  /**
   * Play a synthesised tone.
   * @param {number}   freq      - Frequency in Hz
   * @param {string}   type      - Oscillator type: 'sine' | 'square' | 'sawtooth'
   * @param {number}   duration  - Note duration in seconds
   * @param {number}   gain      - Volume 0–1
   */
  const _play = (freq, type, duration, gain = 0.18) => {
    if (!State.get().soundEnabled) return;
    try {
      const ctx = _getCtx();
      const osc = ctx.createOscillator();
      const vol = ctx.createGain();
      osc.connect(vol);
      vol.connect(ctx.destination);
      osc.type      = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      vol.gain.setValueAtTime(gain, ctx.currentTime);
      // Fade out to avoid click artefact
      vol.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch { /* AudioContext blocked or unavailable */ }
  };

  return {
    /** Ascending two-note chime — card matched. */
    playMatch: () => {
      _play(520, 'sine', 0.18, 0.2);
      setTimeout(() => _play(780, 'sine', 0.25, 0.15), 80);
    },

    /**
     * Quick vibrating buzz — wrong pair.
     * Two rapid sawtooth pulses feel jarring without being harsh.
     */
    playMismatch: () => {
      _play(220, 'sawtooth', 0.12, 0.12);
      setTimeout(() => _play(180, 'sawtooth', 0.12, 0.12), 80);
    },

    /** Victory fanfare — ascending arpeggio. */
    playVictory: () => {
      [523, 659, 784, 1047].forEach((f, i) => {
        setTimeout(() => _play(f, 'sine', 0.3, 0.15), i * 100);
      });
    },
  };
})();


/* ════════════════════════════════════════════════════
   TIMER SERVICE  — SRP: timer lifecycle only
════════════════════════════════════════════════════ */
const TimerService = (() => {
  let _interval = null;
  let _onTick   = null; // callback injected by GameController

  return {
    /** Start the timer; calls onTick(seconds) every second. */
    start: (onTick) => {
      if (State.get().timerRunning) return;
      _onTick = onTick;
      State.set({ timerRunning: true });
      _interval = setInterval(() => {
        const s = State.get().seconds + 1;
        State.set({ seconds: s });
        if (_onTick) _onTick(s);
      }, 1000);
    },

    stop: () => {
      clearInterval(_interval);
      State.set({ timerRunning: false });
    },

    reset: () => {
      clearInterval(_interval);
      State.set({ seconds: 0, timerRunning: false });
    },
  };
})();


/* ════════════════════════════════════════════════════
   BOARD SERVICE  — SRP: card data + rating calculation
════════════════════════════════════════════════════ */
const BoardService = (() => {

  /**
   * Fisher-Yates shuffle — O(n), unbiased.
   * Returns a new array, does not mutate input.
   */
  const _shuffle = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  return {
    /**
     * Build a shuffled deck of card data for the given difficulty.
     * Each pair appears exactly twice.
     * @returns {Array<{emoji, pairId}>}
     */
    buildDeck: (difficulty) => {
      const { pairs } = CONFIG.difficulties[difficulty];
      const emojis    = CONFIG.emojiPool.slice(0, pairs);
      const deck      = emojis.flatMap((emoji, i) => [
        { emoji, pairId: i },
        { emoji, pairId: i },
      ]);
      return _shuffle(deck);
    },

    /**
     * Calculate star rating (1–3) based on move count.
     * Thresholds defined per difficulty in CONFIG.
     * @param {string}  difficulty
     * @param {number}  moves
     * @returns {number} 1 | 2 | 3
     */
    calcRating: (difficulty, moves) => {
      const [twoStar, oneStar] = CONFIG.difficulties[difficulty].ratingThresholds;
      if (moves <= twoStar) return 3;
      if (moves <= oneStar) return 2;
      return 1;
    },

    /**
     * Format seconds → "MM:SS" string.
     * @param {number} s - total seconds
     */
    formatTime: (s) => {
      const m = Math.floor(s / 60).toString().padStart(2, '0');
      const r = (s % 60).toString().padStart(2, '0');
      return `${m}:${r}`;
    },
  };
})();


/* ════════════════════════════════════════════════════
   GAME CONTROLLER  — Façade
   Orchestrates Config, State, Audio, Timer, Board.
   Owns all DOM references and event binding.
════════════════════════════════════════════════════ */
const GameController = (() => {

  // ── DOM references (cached once) ─────────────────
  const _el = {};

  /** Query and cache all DOM elements we need. */
  const _cacheElements = () => {
    const s = CONFIG.selectors;
    _el.board       = document.querySelector(s.board);
    _el.moves       = document.querySelector(s.moves);
    _el.timer       = document.querySelector(s.timer);
    _el.pairs       = document.querySelector(s.pairs);
    _el.starRow     = document.querySelector(s.starRow);
    _el.soundToggle = document.querySelector(s.soundToggle);
    _el.resetBtn    = document.querySelector(s.resetBtn);
    _el.diffBtns    = document.querySelectorAll(s.diffBtns);
    _el.modal       = document.querySelector(s.modal);
    _el.modalTime   = document.querySelector(s.modalTime);
    _el.modalMoves  = document.querySelector(s.modalMoves);
    _el.modalStars  = document.querySelector(s.modalStars);
    _el.playAgain   = document.querySelector(s.playAgain);
    _el.closeModal  = document.querySelector(s.closeModal);
  };

  // ── UI update helpers ─────────────────────────────

  /** Re-render the stats bar from current state. */
  const _updateStats = () => {
    const { moves, matched, seconds, difficulty } = State.get();
    const total = CONFIG.difficulties[difficulty].pairs;

    _el.moves.textContent = moves;
    _el.timer.textContent = BoardService.formatTime(seconds);
    _el.pairs.textContent = `${matched}/${total}`;

    // Animate the moves counter
    _el.moves.classList.remove('bump');
    void _el.moves.offsetWidth; // force reflow
    _el.moves.classList.add('bump');
  };

  /** Render stars from 1–3 rating. */
  const _renderStars = (rating, container) => {
    [...container.querySelectorAll('.star')].forEach((s, i) => {
      s.classList.toggle('star--on', i < rating);
    });
    container.setAttribute('aria-label', `${rating} star${rating !== 1 ? 's' : ''}`);
  };

  // ── Card DOM creation ─────────────────────────────

  /**
   * Build a single card element.
   * Uses data-pair-id to match pairs without global arrays.
   */
  const _createCardEl = ({ emoji, pairId }, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.pairId  = pairId;
    card.dataset.index   = index;
    card.setAttribute('role', 'gridcell');
    card.setAttribute('aria-label', 'Memory card — face down');
    card.setAttribute('tabindex', '0');

    card.innerHTML = `
      <div class="card__back" aria-hidden="true">?</div>
      <div class="card__front" aria-hidden="true">${emoji}</div>
    `;

    card.addEventListener('click', () => _onCardClick(card));
    // Keyboard: Enter / Space flip
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); _onCardClick(card); }
    });

    return card;
  };

  // ── Card interaction ──────────────────────────────

  /** Handle click on a card. Guards: locked, already flipped, already matched. */
  const _onCardClick = (card) => {
    const state = State.get();
    if (state.locked)                         return;
    if (card.classList.contains('is-flipped')) return;
    if (card.classList.contains('is-matched')) return;

    // Start timer on first flip
    if (!state.timerRunning && state.moves === 0 && state.flipped.length === 0) {
      TimerService.start(_updateStats);
    }

    card.classList.add('is-flipped');
    card.setAttribute('aria-label', `Card — ${card.querySelector('.card__front').textContent}`);

    State.set({ flipped: [...state.flipped, card] });

    if (State.get().flipped.length === 2) _evaluatePair();
  };

  /**
   * Compare the two flipped cards.
   * Match   → mark matched, play chime, check win.
   * No match → lock board, shake cards, flip back after delay.
   */
  const _evaluatePair = () => {
    State.set({ locked: true });
    const newMoves = State.get().moves + 1;
    State.set({ moves: newMoves });

    const [a, b] = State.get().flipped;
    const isMatch = a.dataset.pairId === b.dataset.pairId;

    if (isMatch) {
      _handleMatch(a, b, newMoves);
    } else {
      _handleMismatch(a, b);
    }

    _updateStats();
    _renderStars(BoardService.calcRating(State.get().difficulty, newMoves), _el.starRow);
  };

  /** Both cards share a pair — lock them in. */
  const _handleMatch = (a, b, currentMoves) => {
    a.classList.add('is-matched');
    b.classList.add('is-matched');
    a.setAttribute('aria-label', 'Matched card');
    b.setAttribute('aria-label', 'Matched card');

    AudioService.playMatch();

    const newMatched = State.get().matched + 1;
    State.set({ matched: newMatched, flipped: [], locked: false });

    const total = CONFIG.difficulties[State.get().difficulty].pairs;
    if (newMatched === total) _triggerVictory(currentMoves);
  };

  /** Cards differ — shake, then flip back. */
  const _handleMismatch = (a, b) => {
    a.classList.add('is-wrong');
    b.classList.add('is-wrong');
    AudioService.playMismatch();

    setTimeout(() => {
      a.classList.remove('is-flipped', 'is-wrong');
      b.classList.remove('is-flipped', 'is-wrong');
      a.setAttribute('aria-label', 'Memory card — face down');
      b.setAttribute('aria-label', 'Memory card — face down');
      State.set({ flipped: [], locked: false });
    }, CONFIG.mismatchDelay);
  };

  // ── Victory ───────────────────────────────────────

  const _triggerVictory = (moves) => {
    TimerService.stop();
    AudioService.playVictory();

    const { seconds, difficulty } = State.get();
    const rating = BoardService.calcRating(difficulty, moves);
    const stars  = '★'.repeat(rating) + '☆'.repeat(3 - rating);

    _el.modalTime.textContent  = BoardService.formatTime(seconds);
    _el.modalMoves.textContent = moves;
    _el.modalStars.textContent = stars;

    // Small delay so the last match animation completes first
    setTimeout(() => {
      _el.modal.classList.remove('hidden');
      _el.playAgain.focus();
    }, 500);
  };

  // ── Board initialisation ──────────────────────────

  /** Render the full card grid for the current difficulty. */
  const _renderBoard = () => {
    const { difficulty } = State.get();
    const { cols }       = CONFIG.difficulties[difficulty];
    const deck           = BoardService.buildDeck(difficulty);

    _el.board.innerHTML = '';
    _el.board.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    _el.board.dataset.cols = cols;

    deck.forEach((data, i) => _el.board.appendChild(_createCardEl(data, i)));
  };

  /** Full reset: stop timer, reset state, re-render board, update UI. */
  const _resetGame = () => {
    TimerService.reset();
    const currentDiff = State.get().difficulty;
    State.reset();
    State.set({ difficulty: currentDiff });

    _el.modal.classList.add('hidden');
    _renderBoard();
    _updateStats();
    _renderStars(3, _el.starRow);
  };

  // ── Event binding ─────────────────────────────────

  const _bindEvents = () => {

    // Difficulty selector
    _el.diffBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        _el.diffBtns.forEach(b => { b.classList.remove('diff-btn--active'); b.setAttribute('aria-pressed', 'false'); });
        btn.classList.add('diff-btn--active');
        btn.setAttribute('aria-pressed', 'true');
        State.set({ difficulty: btn.dataset.level });
        _resetGame();
      });
    });

    // Reset button
    _el.resetBtn.addEventListener('click', _resetGame);

    // Victory modal — play again
    _el.playAgain.addEventListener('click', _resetGame);

    // Victory modal — close
    _el.closeModal.addEventListener('click', () => {
      _el.modal.classList.add('hidden');
    });

    // Close modal on backdrop click
    _el.modal.addEventListener('click', (e) => {
      if (e.target === _el.modal) _el.modal.classList.add('hidden');
    });

    // Escape closes modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') _el.modal.classList.add('hidden');
    });

    // Sound toggle
    _el.soundToggle.addEventListener('click', () => {
      const enabled = !State.get().soundEnabled;
      State.set({ soundEnabled: enabled });
      _el.soundToggle.setAttribute('aria-pressed', String(enabled));
      _el.soundToggle.classList.toggle('muted', !enabled);
      _el.soundToggle.title = enabled ? 'Sound ON' : 'Sound OFF';

      // Swap icon visibility via CSS class on body
      document.body.classList.toggle('sound-off', !enabled);
    });
  };

  // ── Public API ────────────────────────────────────

  return {
    /**
     * Bootstrap the game.
     * Called once on DOMContentLoaded.
     */
    init: () => {
      _cacheElements();
      _bindEvents();
      _renderBoard();
      _updateStats();
      _renderStars(3, _el.starRow);
    },
  };
})();


/* ════════════════════════════════════════════════════
   BOOTSTRAP
════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => GameController.init());