'use strict';

/* ══════════════════════════════════════════════════
   GAME DATA
══════════════════════════════════════════════════ */
const CATEGORIES = {
  programming: {
    icon: '💻',
    words: {
      easy:   [{ w: 'loop',      h: 'Repeats a block of code'             },
               { w: 'array',     h: 'A list of items in order'            },
               { w: 'class',     h: 'Blueprint for objects in OOP'        }],
      medium: [{ w: 'algorithm', h: 'Step-by-step problem solving method' },
               { w: 'recursion', h: 'Function that calls itself'          },
               { w: 'callback',  h: 'Function passed as an argument'      }],
      hard:   [{ w: 'polymorphism', h: 'One interface, many implementations' },
               { w: 'asynchronous', h: 'Not happening at the same time'      },
               { w: 'encapsulation',h: 'Bundling data with methods'           }],
    }
  },
  movies: {
    icon: '🎬',
    words: {
      easy:   [{ w: 'jaws',         h: 'Famous Spielberg shark movie'      },
               { w: 'alien',        h: 'Sci-fi horror in space'            },
               { w: 'rocky',        h: 'Iconic boxing underdog movie'      }],
      medium: [{ w: 'inception',    h: 'Dreams within dreams'              },
               { w: 'gladiator',    h: 'Roman arena epic'                  },
               { w: 'parasite',     h: 'Oscar-winning Korean film'         }],
      hard:   [{ w: 'interstellar', h: 'Space and time bending sci-fi'     },
               { w: 'shawshank',    h: 'Hope in a prison redemption story' },
               { w: 'apocalypse',   h: 'Conrad novella adaptation'         }],
    }
  },
  animals: {
    icon: '🦁',
    words: {
      easy:   [{ w: 'bear',       h: 'Large mammal that hibernates'        },
               { w: 'wolf',       h: 'Ancestor of domestic dogs'           },
               { w: 'frog',       h: 'Amphibian that jumps and croaks'     }],
      medium: [{ w: 'elephant',   h: 'Largest land animal with a trunk'    },
               { w: 'kangaroo',   h: 'Australian marsupial that hops'      },
               { w: 'chameleon',  h: 'Lizard that changes colour'          }],
      hard:   [{ w: 'platypus',   h: 'Egg-laying mammal from Australia'    },
               { w: 'axolotl',    h: 'Salamander that never metamorphoses' },
               { w: 'narwhal',    h: 'Arctic whale with a long tusk'       }],
    }
  },
  sports: {
    icon: '⚽',
    words: {
      easy:   [{ w: 'golf',        h: 'Get the ball in the hole'          },
               { w: 'swim',        h: 'Move through water with your body' },
               { w: 'race',        h: 'Compete for the fastest time'      }],
      medium: [{ w: 'football',    h: 'Most popular sport in the world'   },
               { w: 'badminton',   h: 'Racket sport with a shuttlecock'   },
               { w: 'olympics',    h: 'Global multi-sport event'          }],
      hard:   [{ w: 'basketball',  h: 'Score by putting ball in a hoop'   },
               { w: 'skateboard',  h: 'Four-wheeled board for tricks'     },
               { w: 'gymnastics',  h: 'Athletic discipline using apparatus'}],
    }
  },
  countries: {
    icon: '🌍',
    words: {
      easy:   [{ w: 'egypt',     h: 'Land of the pharaohs'               },
               { w: 'japan',     h: 'Land of the rising sun'              },
               { w: 'france',    h: 'Home of the Eiffel Tower'            }],
      medium: [{ w: 'brazil',    h: 'Largest country in South America'    },
               { w: 'germany',   h: 'Central European powerhouse'         },
               { w: 'nigeria',   h: 'Most populous African country'       }],
      hard:   [{ w: 'uzbekistan',h: 'Landlocked Central Asian country'    },
               { w: 'venezuela', h: 'Country with Angel Falls'            },
               { w: 'mozambique',h: 'East African coastal nation'         }],
    }
  },
  technology: {
    icon: '🚀',
    words: {
      easy:   [{ w: 'wifi',      h: 'Wireless internet connection'        },
               { w: 'app',       h: 'Software on your phone'              },
               { w: 'chip',      h: 'Tiny processor inside devices'       }],
      medium: [{ w: 'browser',   h: 'Software for visiting websites'      },
               { w: 'database',  h: 'Organised collection of data'        },
               { w: 'network',   h: 'Connected group of computers'        }],
      hard:   [{ w: 'blockchain', h: 'Decentralised ledger technology'    },
               { w: 'kubernetes', h: 'Container orchestration platform'   },
               { w: 'microservice',h: 'Architecture of small services'    }],
    }
  },
};

const DIFFICULTY_CONFIG = {
  easy:   { lives: 8, hints: 3, multiplier: 1,   desc: '8 lives · 3 hints · score ×1'   },
  medium: { lives: 6, hints: 2, multiplier: 1.5, desc: '6 lives · 2 hints · score ×1.5' },
  hard:   { lives: 4, hints: 1, multiplier: 2,   desc: '4 lives · 1 hint  · score ×2'   },
};

const SVG_PARTS = ['svg-head','svg-body','svg-larm','svg-rarm','svg-lleg','svg-rleg'];

/* ══════════════════════════════════════════════════
   STATE
══════════════════════════════════════════════════ */
let state = {
  screen:     'start',
  playerName: '',
  category:   '',
  difficulty: 'easy',
  word:       '',
  hint:       '',
  guessed:    new Set(),
  wrong:      [],
  score:      600,
  lives:      8,
  maxLives:   8,
  hints:      2,
  hintsUsed:  0,
  timer:      null,
  elapsed:    0,
  gameOver:   false,
};

/* ══════════════════════════════════════════════════
   DOM ELEMENTS
══════════════════════════════════════════════════ */
const $ = id => document.getElementById(id);
const els = {
  startScreen:    $('startScreen'),
  gameScreen:     $('gameScreen'),
  resultScreen:   $('resultScreen'),
  playerName:     $('playerName'),
  nameError:      $('nameError'),
  categoryList:   $('categoryList'),
  lbList:         $('lbList'),
  diffDesc:       $('diffDesc'),
  diffBadge:      $('diffBadge'),
  playerDisplay:  $('playerDisplay'),
  categoryDisplay:$('categoryDisplay'),
  scoreDisplay:   $('scoreDisplay'),
  timerDisplay:   $('timerDisplay'),
  guessSlots:     $('guessSlots'),
  keyboard:       $('keyboard'),
  heartsDisplay:  $('heartsDisplay'),
  hintBtn:        $('hintBtn'),
  hintCount:      $('hintCount'),
  wordHint:       $('wordHint'),
  wrongLetters:   $('wrongLetters'),
  quitBtn:        $('quitBtn'),
  resultEmoji:    $('resultEmoji'),
  resultTitle:    $('resultTitle'),
  resultPlayer:   $('resultPlayer'),
  resultWord:     $('resultWord'),
  finalScore:     $('finalScore'),
  finalMistakes:  $('finalMistakes'),
  finalTime:      $('finalTime'),
  finalHints:     $('finalHints'),
  playAgainBtn:   $('playAgainBtn'),
  backMenuBtn:    $('backMenuBtn'),
};

/* ══════════════════════════════════════════════════
   INIT
══════════════════════════════════════════════════ */

/* ══════════════════════════════════════════════════
   FLOATING PARTICLES
══════════════════════════════════════════════════ */
function spawnParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const colors = ['rgba(247,223,30,0.5)','rgba(230,57,70,0.4)','rgba(6,214,160,0.35)','rgba(247,223,30,0.2)'];
  for (let i = 0; i < 18; i++) {
    const p    = document.createElement('div');
    p.className = 'particle';
    const size  = Math.random() * 4 + 2;
    const color = colors[Math.floor(Math.random() * colors.length)];
    p.style.cssText = `width:${size}px;height:${size}px;left:${Math.random()*100}%;bottom:-10px;background:${color};animation-duration:${Math.random()*10+8}s;animation-delay:${Math.random()*12}s;box-shadow:0 0 ${size*2}px ${color};`;
    container.appendChild(p);
  }
}

function init() {
  spawnParticles();
  buildCategories();
  setupDiffButtons();
  renderLeaderboard();

  els.quitBtn.addEventListener('click', () => {
    if (confirm('Quit this game?')) goToScreen('start');
  });

  els.hintBtn.addEventListener('click', useHint);
  els.playAgainBtn.addEventListener('click', () => startGame(state.category));
  els.backMenuBtn.addEventListener('click', () => goToScreen('start'));

  document.addEventListener('keydown', handlePhysicalKey);

  els.playerName.addEventListener('keydown', e => {
    if (e.key === 'Enter') els.nameError.textContent = '';
  });
}

/* ══════════════════════════════════════════════════
   SCREENS
══════════════════════════════════════════════════ */
function goToScreen(name) {
  clearInterval(state.timer);
  [els.startScreen, els.gameScreen, els.resultScreen].forEach(s => s.classList.remove('active'));
  if (name === 'start')  { els.startScreen.classList.add('active');  renderLeaderboard(); }
  if (name === 'game')   { els.gameScreen.classList.add('active');   }
  if (name === 'result') { els.resultScreen.style.display = 'flex'; els.resultScreen.classList.add('active'); }
  state.screen = name;
}

/* ══════════════════════════════════════════════════
   CATEGORY BUTTONS
══════════════════════════════════════════════════ */
function buildCategories() {
  els.categoryList.innerHTML = '';
  for (const [key, val] of Object.entries(CATEGORIES)) {
    const btn = document.createElement('button');
    btn.className = 'cat-btn';
    btn.innerHTML = `<span class="cat-icon">${val.icon}</span>${key.toUpperCase()}`;
    btn.addEventListener('click', () => {
      const name = els.playerName.value.trim();
      if (!isValidName(name)) {
        showNameError('Name must be 2+ letters only.');
        els.playerName.focus();
        return;
      }
      startGame(key);
    });
    els.categoryList.appendChild(btn);
  }
}

/* ══════════════════════════════════════════════════
   DIFFICULTY
══════════════════════════════════════════════════ */
function setupDiffButtons() {
  document.querySelectorAll('.diff-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.difficulty = btn.dataset.diff;
      els.diffDesc.textContent = DIFFICULTY_CONFIG[state.difficulty].desc;
    });
  });
}

/* ══════════════════════════════════════════════════
   VALIDATION
══════════════════════════════════════════════════ */
function isValidName(name) {
  if (name.length < 2) return false;
  return /^[a-zA-Z\s]+$/.test(name);
}

function showNameError(msg) {
  els.nameError.textContent = msg;
  els.playerName.classList.add('error');
  setTimeout(() => { els.playerName.classList.remove('error'); }, 1500);
}

/* ══════════════════════════════════════════════════
   START GAME
══════════════════════════════════════════════════ */
function startGame(category) {
  const cfg = DIFFICULTY_CONFIG[state.difficulty];
  const words = CATEGORIES[category].words[state.difficulty];
  const entry = words[Math.floor(Math.random() * words.length)];

  state = {
    ...state,
    screen:    'game',
    playerName: els.playerName.value.trim(),
    category,
    word:      entry.w.toLowerCase(),
    hint:      entry.h,
    guessed:   new Set(),
    wrong:     [],
    score:     600,
    lives:     cfg.lives,
    maxLives:  cfg.lives,
    hints:     cfg.hints,
    hintsUsed: 0,
    elapsed:   0,
    gameOver:  false,
  };

  // UI setup
  els.playerDisplay.textContent  = state.playerName;
  els.categoryDisplay.textContent = category.toUpperCase();
  els.scoreDisplay.textContent   = state.score;
  els.timerDisplay.textContent   = '0s';
  els.wordHint.textContent       = '';
  els.diffBadge.textContent      = state.difficulty.toUpperCase();
  els.wrongLetters.textContent   = '—';

  // Reset hangman SVG parts
  SVG_PARTS.forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.classList.remove('show'); }
  });

  buildHearts();
  buildKeyboard();
  buildWordSlots();
  updateHintBtn();

  goToScreen('game');
  startTimer();
}

/* ══════════════════════════════════════════════════
   HEARTS
══════════════════════════════════════════════════ */
function buildHearts() {
  els.heartsDisplay.innerHTML = '';
  for (let i = 0; i < state.maxLives; i++) {
    const h = document.createElement('span');
    h.className = 'heart';
    h.textContent = '❤️';
    els.heartsDisplay.appendChild(h);
  }
}

function updateHearts() {
  const hearts = els.heartsDisplay.querySelectorAll('.heart');
  const lost = state.maxLives - state.lives;
  hearts.forEach((h, i) => {
    h.classList.toggle('lost', i >= state.maxLives - lost);
  });
}

/* ══════════════════════════════════════════════════
   KEYBOARD
══════════════════════════════════════════════════ */
function buildKeyboard() {
  els.keyboard.innerHTML = '';
  'abcdefghijklmnopqrstuvwxyz'.split('').forEach(letter => {
    const key = document.createElement('div');
    key.className = 'key';
    key.textContent = letter;
    key.dataset.letter = letter;
    key.addEventListener('click', () => guessLetter(letter));
    els.keyboard.appendChild(key);
  });
}

function handlePhysicalKey(e) {
  if (state.screen !== 'game' || state.gameOver) return;
  const letter = e.key.toLowerCase();
  if (/^[a-z]$/.test(letter)) guessLetter(letter);
}

/* ══════════════════════════════════════════════════
   WORD SLOTS
══════════════════════════════════════════════════ */
function buildWordSlots() {
  els.guessSlots.innerHTML = '';
  [...state.word].forEach(() => {
    const slot = document.createElement('div');
    slot.className = 'slot';
    els.guessSlots.appendChild(slot);
  });
}

function updateWordSlots(hintMode = false) {
  const slots = els.guessSlots.querySelectorAll('.slot');
  [...state.word].forEach((ch, i) => {
    if (state.guessed.has(ch)) {
      slots[i].textContent = ch.toUpperCase();
      if (!slots[i].classList.contains('revealed')) {
        slots[i].classList.add(hintMode ? 'hint-reveal' : 'revealed');
      }
    }
  });
}

/* ══════════════════════════════════════════════════
   GUESS LETTER
══════════════════════════════════════════════════ */
function guessLetter(letter) {
  if (state.gameOver || state.guessed.has(letter)) return;
  state.guessed.add(letter);

  const keyEl = els.keyboard.querySelector(`[data-letter="${letter}"]`);

  if (state.word.includes(letter)) {
    keyEl?.classList.add('correct', 'clicked');
    updateWordSlots();
    checkWin();
  } else {
    keyEl?.classList.add('wrong', 'clicked');
    // shake the hangman card
    document.querySelector('.hangman-card')?.classList.remove('shake');
    void document.querySelector('.hangman-card')?.offsetWidth;
    document.querySelector('.hangman-card')?.classList.add('shake');

    state.wrong.push(letter);
    state.lives--;
    state.score = Math.max(0, state.score - 25);
    els.scoreDisplay.textContent = state.score;
    els.wrongLetters.textContent = state.wrong.join(' · ') || '—';

    updateHearts();
    showHangmanPart();
    if (state.lives <= 0) endGame(false);
  }
}

/* ══════════════════════════════════════════════════
   HANGMAN PARTS
══════════════════════════════════════════════════ */
function showHangmanPart() {
  const wrongCount = state.maxLives - state.lives;
  // Map wrong count to parts (scale to 6 parts regardless of max lives)
  const partIndex = Math.floor((wrongCount / state.maxLives) * SVG_PARTS.length);
  const clampedIndex = Math.min(partIndex, SVG_PARTS.length - 1);
  const el = document.getElementById(SVG_PARTS[clampedIndex]);
  if (el) el.classList.add('show');
}

/* ══════════════════════════════════════════════════
   HINT
══════════════════════════════════════════════════ */
function useHint() {
  if (state.hints <= 0 || state.score < 50 || state.gameOver) return;

  // Reveal word hint text first use
  if (!els.wordHint.textContent) {
    els.wordHint.textContent = `Hint: ${state.hint}`;
    state.hints--;
    state.hintsUsed++;
    state.score = Math.max(0, state.score - 50);
    els.scoreDisplay.textContent = state.score;
    updateHintBtn();
    return;
  }

  // Reveal a random unguessed letter
  const unguessed = [...state.word].filter(ch => !state.guessed.has(ch));
  if (unguessed.length === 0) return;

  const letter = unguessed[Math.floor(Math.random() * unguessed.length)];
  state.guessed.add(letter);
  state.hints--;
  state.hintsUsed++;
  state.score = Math.max(0, state.score - 50);

  const keyEl = els.keyboard.querySelector(`[data-letter="${letter}"]`);
  keyEl?.classList.add('correct', 'clicked');
  updateWordSlots(true);
  updateHintBtn();
  els.scoreDisplay.textContent = state.score;
  checkWin();
}

function updateHintBtn() {
  els.hintCount.textContent = `(${state.hints} left)`;
  els.hintBtn.disabled = state.hints <= 0 || state.score < 50;
}

/* ══════════════════════════════════════════════════
   WIN / LOSE CHECK
══════════════════════════════════════════════════ */
function checkWin() {
  const allRevealed = [...state.word].every(ch => state.guessed.has(ch));
  if (allRevealed) endGame(true);
}

/* ══════════════════════════════════════════════════
   TIMER
══════════════════════════════════════════════════ */
function startTimer() {
  clearInterval(state.timer);
  state.timer = setInterval(() => {
    state.elapsed++;
    els.timerDisplay.textContent = `${state.elapsed}s`;
    // score decay
    if (state.score > 0 && state.elapsed % 5 === 0) {
      state.score = Math.max(0, state.score - 1);
      els.scoreDisplay.textContent = state.score;
    }
  }, 1000);
}

/* ══════════════════════════════════════════════════
   END GAME
══════════════════════════════════════════════════ */
function endGame(won) {
  state.gameOver = true;
  clearInterval(state.timer);

  // Apply difficulty multiplier
  const multiplier = DIFFICULTY_CONFIG[state.difficulty].multiplier;
  const finalScore = won ? Math.round(state.score * multiplier) : 0;

  // Reveal all letters if lost
  if (!won) {
    [...state.word].forEach(ch => state.guessed.add(ch));
    updateWordSlots();
  }

  // Update result screen
  els.resultEmoji.textContent   = won ? '🏆' : '💀';
  els.resultTitle.textContent   = won ? 'WINNER!' : 'GAME OVER';
  els.resultTitle.className     = `result-title ${won ? 'win' : 'lose'}`;
  els.resultPlayer.textContent  = `Well played, ${state.playerName}`;
  els.resultWord.textContent    = state.word.toUpperCase();
  els.finalScore.textContent    = finalScore;
  els.finalMistakes.textContent = state.wrong.length;
  els.finalTime.textContent     = `${state.elapsed}s`;
  els.finalHints.textContent    = state.hintsUsed;

  // Save to leaderboard
  if (won) saveScore(state.playerName, finalScore, state.category, state.difficulty);

  setTimeout(() => goToScreen('result'), 800);
}

/* ══════════════════════════════════════════════════
   LEADERBOARD (localStorage)
══════════════════════════════════════════════════ */

function saveScore(name, score, category, difficulty) {
  let scores = JSON.parse(localStorage.getItem('hangman_scores') || '[]');
  scores.push({ name, score, category, difficulty, date: new Date().toLocaleDateString() });
  scores.sort((a, b) => b.score - a.score);
  scores = scores.slice(0, 5);
  localStorage.setItem('hangman_scores', JSON.stringify(scores));
}

function renderLeaderboard() {
  const scores = JSON.parse(localStorage.getItem('hangman_scores') || '[]');
  if (!scores.length) {
    els.lbList.innerHTML = '<span class="lb-empty">No scores yet — be the first!</span>';
    return;
  }
  els.lbList.innerHTML = scores.map((s, i) => `
    <div class="lb-entry" data-index="${i}">
      <span class="lb-rank">${i + 1}</span>
      <span class="lb-name">${s.name} <small style="color:var(--muted)">${s.category} · ${s.difficulty}</small></span>
      <span class="lb-score">${s.score}</span>
      <button class="lb-del-btn" onclick="handleDeleteScore(${i})" title="Delete">✕</button>
    </div>
  `).join('');
}

function handleDeleteScore(index) {
  let scores = JSON.parse(localStorage.getItem('hangman_scores') || '[]');
  scores.splice(index, 1);
  localStorage.setItem('hangman_scores', JSON.stringify(scores));
  renderLeaderboard();
}

/* ══════════════════════════════════════════════════
   FLOATING PARTICLES
══════════════════════════════════════════════════ */
function spawnParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const colors = ['rgba(247,223,30,0.5)','rgba(230,57,70,0.4)','rgba(6,214,160,0.35)','rgba(247,223,30,0.2)'];
  for (let i = 0; i < 18; i++) {
    const p    = document.createElement('div');
    p.className = 'particle';
    const size  = Math.random() * 4 + 2;
    const color = colors[Math.floor(Math.random() * colors.length)];
    p.style.cssText = `width:${size}px;height:${size}px;left:${Math.random()*100}%;bottom:-10px;background:${color};animation-duration:${Math.random()*10+8}s;animation-delay:${Math.random()*12}s;box-shadow:0 0 ${size*2}px ${color};`;
    container.appendChild(p);
  }
}

function init() {
  spawnParticles();
  buildCategories();
  setupDiffButtons();
  renderLeaderboard();

  els.quitBtn.addEventListener('click', () => {
    if (confirm('Quit this game?')) goToScreen('start');
  });

  els.hintBtn.addEventListener('click', useHint);
  els.playAgainBtn.addEventListener('click', () => startGame(state.category));
  els.backMenuBtn.addEventListener('click', () => goToScreen('start'));

  document.addEventListener('keydown', handlePhysicalKey);

  els.playerName.addEventListener('keydown', e => {
    if (e.key === 'Enter') els.nameError.textContent = '';
  });
}

/* ══════════════════════════════════════════════════
   SCREENS
══════════════════════════════════════════════════ */
function goToScreen(name) {
  clearInterval(state.timer);
  [els.startScreen, els.gameScreen, els.resultScreen].forEach(s => s.classList.remove('active'));
  if (name === 'start')  { els.startScreen.classList.add('active');  renderLeaderboard(); }
  if (name === 'game')   { els.gameScreen.classList.add('active');   }
  if (name === 'result') { els.resultScreen.style.display = 'flex'; els.resultScreen.classList.add('active'); }
  state.screen = name;
}

/* ══════════════════════════════════════════════════
   CATEGORY BUTTONS
══════════════════════════════════════════════════ */
function buildCategories() {
  els.categoryList.innerHTML = '';
  for (const [key, val] of Object.entries(CATEGORIES)) {
    const btn = document.createElement('button');
    btn.className = 'cat-btn';
    btn.innerHTML = `<span class="cat-icon">${val.icon}</span>${key.toUpperCase()}`;
    btn.addEventListener('click', () => {
      const name = els.playerName.value.trim();
      if (!isValidName(name)) {
        showNameError('Name must be 2+ letters only.');
        els.playerName.focus();
        return;
      }
      startGame(key);
    });
    els.categoryList.appendChild(btn);
  }
}

/* ══════════════════════════════════════════════════
   DIFFICULTY
══════════════════════════════════════════════════ */
function setupDiffButtons() {
  document.querySelectorAll('.diff-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.difficulty = btn.dataset.diff;
      els.diffDesc.textContent = DIFFICULTY_CONFIG[state.difficulty].desc;
    });
  });
}

/* ══════════════════════════════════════════════════
   VALIDATION
══════════════════════════════════════════════════ */
function isValidName(name) {
  if (name.length < 2) return false;
  return /^[a-zA-Z\s]+$/.test(name);
}

function showNameError(msg) {
  els.nameError.textContent = msg;
  els.playerName.classList.add('error');
  setTimeout(() => { els.playerName.classList.remove('error'); }, 1500);
}

/* ══════════════════════════════════════════════════
   START GAME
══════════════════════════════════════════════════ */
function startGame(category) {
  const cfg = DIFFICULTY_CONFIG[state.difficulty];
  const words = CATEGORIES[category].words[state.difficulty];
  const entry = words[Math.floor(Math.random() * words.length)];

  state = {
    ...state,
    screen:    'game',
    playerName: els.playerName.value.trim(),
    category,
    word:      entry.w.toLowerCase(),
    hint:      entry.h,
    guessed:   new Set(),
    wrong:     [],
    score:     600,
    lives:     cfg.lives,
    maxLives:  cfg.lives,
    hints:     cfg.hints,
    hintsUsed: 0,
    elapsed:   0,
    gameOver:  false,
  };

  // UI setup
  els.playerDisplay.textContent  = state.playerName;
  els.categoryDisplay.textContent = category.toUpperCase();
  els.scoreDisplay.textContent   = state.score;
  els.timerDisplay.textContent   = '0s';
  els.wordHint.textContent       = '';
  els.diffBadge.textContent      = state.difficulty.toUpperCase();
  els.wrongLetters.textContent   = '—';

  // Reset hangman SVG parts
  SVG_PARTS.forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.classList.remove('show'); }
  });

  buildHearts();
  buildKeyboard();
  buildWordSlots();
  updateHintBtn();

  goToScreen('game');
  startTimer();
}

/* ══════════════════════════════════════════════════
   HEARTS
══════════════════════════════════════════════════ */
function buildHearts() {
  els.heartsDisplay.innerHTML = '';
  for (let i = 0; i < state.maxLives; i++) {
    const h = document.createElement('span');
    h.className = 'heart';
    h.textContent = '❤️';
    els.heartsDisplay.appendChild(h);
  }
}

function updateHearts() {
  const hearts = els.heartsDisplay.querySelectorAll('.heart');
  const lost = state.maxLives - state.lives;
  hearts.forEach((h, i) => {
    h.classList.toggle('lost', i >= state.maxLives - lost);
  });
}

/* ══════════════════════════════════════════════════
   KEYBOARD
══════════════════════════════════════════════════ */
function buildKeyboard() {
  els.keyboard.innerHTML = '';
  'abcdefghijklmnopqrstuvwxyz'.split('').forEach(letter => {
    const key = document.createElement('div');
    key.className = 'key';
    key.textContent = letter;
    key.dataset.letter = letter;
    key.addEventListener('click', () => guessLetter(letter));
    els.keyboard.appendChild(key);
  });
}

function handlePhysicalKey(e) {
  if (state.screen !== 'game' || state.gameOver) return;
  const letter = e.key.toLowerCase();
  if (/^[a-z]$/.test(letter)) guessLetter(letter);
}

/* ══════════════════════════════════════════════════
   WORD SLOTS
══════════════════════════════════════════════════ */
function buildWordSlots() {
  els.guessSlots.innerHTML = '';
  [...state.word].forEach(() => {
    const slot = document.createElement('div');
    slot.className = 'slot';
    els.guessSlots.appendChild(slot);
  });
}

function updateWordSlots(hintMode = false) {
  const slots = els.guessSlots.querySelectorAll('.slot');
  [...state.word].forEach((ch, i) => {
    if (state.guessed.has(ch)) {
      slots[i].textContent = ch.toUpperCase();
      if (!slots[i].classList.contains('revealed')) {
        slots[i].classList.add(hintMode ? 'hint-reveal' : 'revealed');
      }
    }
  });
}

/* ══════════════════════════════════════════════════
   GUESS LETTER
══════════════════════════════════════════════════ */
function guessLetter(letter) {
  if (state.gameOver || state.guessed.has(letter)) return;
  state.guessed.add(letter);

  const keyEl = els.keyboard.querySelector(`[data-letter="${letter}"]`);

  if (state.word.includes(letter)) {
    keyEl?.classList.add('correct', 'clicked');
    updateWordSlots();
    checkWin();
  } else {
    keyEl?.classList.add('wrong', 'clicked');
    // shake the hangman card
    document.querySelector('.hangman-card')?.classList.remove('shake');
    void document.querySelector('.hangman-card')?.offsetWidth;
    document.querySelector('.hangman-card')?.classList.add('shake');

    state.wrong.push(letter);
    state.lives--;
    state.score = Math.max(0, state.score - 25);
    els.scoreDisplay.textContent = state.score;
    els.wrongLetters.textContent = state.wrong.join(' · ') || '—';

    updateHearts();
    showHangmanPart();
    if (state.lives <= 0) endGame(false);
  }
}

/* ══════════════════════════════════════════════════
   HANGMAN PARTS
══════════════════════════════════════════════════ */
function showHangmanPart() {
  const wrongCount = state.maxLives - state.lives;
  // Map wrong count to parts (scale to 6 parts regardless of max lives)
  const partIndex = Math.floor((wrongCount / state.maxLives) * SVG_PARTS.length);
  const clampedIndex = Math.min(partIndex, SVG_PARTS.length - 1);
  const el = document.getElementById(SVG_PARTS[clampedIndex]);
  if (el) el.classList.add('show');
}

/* ══════════════════════════════════════════════════
   HINT
══════════════════════════════════════════════════ */
function useHint() {
  if (state.hints <= 0 || state.score < 50 || state.gameOver) return;

  // Reveal word hint text first use
  if (!els.wordHint.textContent) {
    els.wordHint.textContent = `Hint: ${state.hint}`;
    state.hints--;
    state.hintsUsed++;
    state.score = Math.max(0, state.score - 50);
    els.scoreDisplay.textContent = state.score;
    updateHintBtn();
    return;
  }

  // Reveal a random unguessed letter
  const unguessed = [...state.word].filter(ch => !state.guessed.has(ch));
  if (unguessed.length === 0) return;

  const letter = unguessed[Math.floor(Math.random() * unguessed.length)];
  state.guessed.add(letter);
  state.hints--;
  state.hintsUsed++;
  state.score = Math.max(0, state.score - 50);

  const keyEl = els.keyboard.querySelector(`[data-letter="${letter}"]`);
  keyEl?.classList.add('correct', 'clicked');
  updateWordSlots(true);
  updateHintBtn();
  els.scoreDisplay.textContent = state.score;
  checkWin();
}

function updateHintBtn() {
  els.hintCount.textContent = `(${state.hints} left)`;
  els.hintBtn.disabled = state.hints <= 0 || state.score < 50;
}

/* ══════════════════════════════════════════════════
   WIN / LOSE CHECK
══════════════════════════════════════════════════ */
function checkWin() {
  const allRevealed = [...state.word].every(ch => state.guessed.has(ch));
  if (allRevealed) endGame(true);
}

/* ══════════════════════════════════════════════════
   TIMER
══════════════════════════════════════════════════ */
function startTimer() {
  clearInterval(state.timer);
  state.timer = setInterval(() => {
    state.elapsed++;
    els.timerDisplay.textContent = `${state.elapsed}s`;
    // score decay
    if (state.score > 0 && state.elapsed % 5 === 0) {
      state.score = Math.max(0, state.score - 1);
      els.scoreDisplay.textContent = state.score;
    }
  }, 1000);
}

/* ══════════════════════════════════════════════════
   END GAME
══════════════════════════════════════════════════ */
function endGame(won) {
  state.gameOver = true;
  clearInterval(state.timer);

  // Apply difficulty multiplier
  const multiplier = DIFFICULTY_CONFIG[state.difficulty].multiplier;
  const finalScore = won ? Math.round(state.score * multiplier) : 0;

  // Reveal all letters if lost
  if (!won) {
    [...state.word].forEach(ch => state.guessed.add(ch));
    updateWordSlots();
  }

  // Update result screen
  els.resultEmoji.textContent   = won ? '🏆' : '💀';
  els.resultTitle.textContent   = won ? 'WINNER!' : 'GAME OVER';
  els.resultTitle.className     = `result-title ${won ? 'win' : 'lose'}`;
  els.resultPlayer.textContent  = `Well played, ${state.playerName}`;
  els.resultWord.textContent    = state.word.toUpperCase();
  els.finalScore.textContent    = finalScore;
  els.finalMistakes.textContent = state.wrong.length;
  els.finalTime.textContent     = `${state.elapsed}s`;
  els.finalHints.textContent    = state.hintsUsed;

  // Save to leaderboard
  if (won) saveScore(state.playerName, finalScore, state.category, state.difficulty);

  setTimeout(() => goToScreen('result'), 800);
}

/* ══════════════════════════════════════════════════
   LEADERBOARD — Fetch API CRUD
   File: scores.json
   ⚠️  GET works in browser directly.
       POST / PUT / DELETE require a backend server
       (e.g. json-server: npx json-server scores.json)
══════════════════════════════════════════════════ */

/* ══════════════════════════════════════════════════
   FLOATING PARTICLES
══════════════════════════════════════════════════ */
function spawnParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const colors = ['rgba(247,223,30,0.5)','rgba(230,57,70,0.4)','rgba(6,214,160,0.35)','rgba(247,223,30,0.2)'];
  for (let i = 0; i < 18; i++) {
    const p    = document.createElement('div');
    p.className = 'particle';
    const size  = Math.random() * 4 + 2;
    const color = colors[Math.floor(Math.random() * colors.length)];
    p.style.cssText = `width:${size}px;height:${size}px;left:${Math.random()*100}%;bottom:-10px;background:${color};animation-duration:${Math.random()*10+8}s;animation-delay:${Math.random()*12}s;box-shadow:0 0 ${size*2}px ${color};`;
    container.appendChild(p);
  }
}

function init() {
  spawnParticles();
  buildCategories();
  setupDiffButtons();
  renderLeaderboard();

  els.quitBtn.addEventListener('click', () => {
    if (confirm('Quit this game?')) goToScreen('start');
  });

  els.hintBtn.addEventListener('click', useHint);
  els.playAgainBtn.addEventListener('click', () => startGame(state.category));
  els.backMenuBtn.addEventListener('click', () => goToScreen('start'));

  document.addEventListener('keydown', handlePhysicalKey);

  els.playerName.addEventListener('keydown', e => {
    if (e.key === 'Enter') els.nameError.textContent = '';
  });
}

/* ══════════════════════════════════════════════════
   SCREENS
══════════════════════════════════════════════════ */
function goToScreen(name) {
  clearInterval(state.timer);
  [els.startScreen, els.gameScreen, els.resultScreen].forEach(s => s.classList.remove('active'));
  if (name === 'start')  { els.startScreen.classList.add('active');  renderLeaderboard(); }
  if (name === 'game')   { els.gameScreen.classList.add('active');   }
  if (name === 'result') { els.resultScreen.style.display = 'flex'; els.resultScreen.classList.add('active'); }
  state.screen = name;
}

/* ══════════════════════════════════════════════════
   CATEGORY BUTTONS
══════════════════════════════════════════════════ */
function buildCategories() {
  els.categoryList.innerHTML = '';
  for (const [key, val] of Object.entries(CATEGORIES)) {
    const btn = document.createElement('button');
    btn.className = 'cat-btn';
    btn.innerHTML = `<span class="cat-icon">${val.icon}</span>${key.toUpperCase()}`;
    btn.addEventListener('click', () => {
      const name = els.playerName.value.trim();
      if (!isValidName(name)) {
        showNameError('Name must be 2+ letters only.');
        els.playerName.focus();
        return;
      }
      startGame(key);
    });
    els.categoryList.appendChild(btn);
  }
}

/* ══════════════════════════════════════════════════
   DIFFICULTY
══════════════════════════════════════════════════ */
function setupDiffButtons() {
  document.querySelectorAll('.diff-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.difficulty = btn.dataset.diff;
      els.diffDesc.textContent = DIFFICULTY_CONFIG[state.difficulty].desc;
    });
  });
}

/* ══════════════════════════════════════════════════
   VALIDATION
══════════════════════════════════════════════════ */
function isValidName(name) {
  if (name.length < 2) return false;
  return /^[a-zA-Z\s]+$/.test(name);
}

function showNameError(msg) {
  els.nameError.textContent = msg;
  els.playerName.classList.add('error');
  setTimeout(() => { els.playerName.classList.remove('error'); }, 1500);
}

/* ══════════════════════════════════════════════════
   START GAME
══════════════════════════════════════════════════ */
function startGame(category) {
  const cfg = DIFFICULTY_CONFIG[state.difficulty];
  const words = CATEGORIES[category].words[state.difficulty];
  const entry = words[Math.floor(Math.random() * words.length)];

  state = {
    ...state,
    screen:    'game',
    playerName: els.playerName.value.trim(),
    category,
    word:      entry.w.toLowerCase(),
    hint:      entry.h,
    guessed:   new Set(),
    wrong:     [],
    score:     600,
    lives:     cfg.lives,
    maxLives:  cfg.lives,
    hints:     cfg.hints,
    hintsUsed: 0,
    elapsed:   0,
    gameOver:  false,
  };

  // UI setup
  els.playerDisplay.textContent  = state.playerName;
  els.categoryDisplay.textContent = category.toUpperCase();
  els.scoreDisplay.textContent   = state.score;
  els.timerDisplay.textContent   = '0s';
  els.wordHint.textContent       = '';
  els.diffBadge.textContent      = state.difficulty.toUpperCase();
  els.wrongLetters.textContent   = '—';

  // Reset hangman SVG parts
  SVG_PARTS.forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.classList.remove('show'); }
  });

  buildHearts();
  buildKeyboard();
  buildWordSlots();
  updateHintBtn();

  goToScreen('game');
  startTimer();
}

/* ══════════════════════════════════════════════════
   HEARTS
══════════════════════════════════════════════════ */
function buildHearts() {
  els.heartsDisplay.innerHTML = '';
  for (let i = 0; i < state.maxLives; i++) {
    const h = document.createElement('span');
    h.className = 'heart';
    h.textContent = '❤️';
    els.heartsDisplay.appendChild(h);
  }
}

function updateHearts() {
  const hearts = els.heartsDisplay.querySelectorAll('.heart');
  const lost = state.maxLives - state.lives;
  hearts.forEach((h, i) => {
    h.classList.toggle('lost', i >= state.maxLives - lost);
  });
}

/* ══════════════════════════════════════════════════
   KEYBOARD
══════════════════════════════════════════════════ */
function buildKeyboard() {
  els.keyboard.innerHTML = '';
  'abcdefghijklmnopqrstuvwxyz'.split('').forEach(letter => {
    const key = document.createElement('div');
    key.className = 'key';
    key.textContent = letter;
    key.dataset.letter = letter;
    key.addEventListener('click', () => guessLetter(letter));
    els.keyboard.appendChild(key);
  });
}

function handlePhysicalKey(e) {
  if (state.screen !== 'game' || state.gameOver) return;
  const letter = e.key.toLowerCase();
  if (/^[a-z]$/.test(letter)) guessLetter(letter);
}

/* ══════════════════════════════════════════════════
   WORD SLOTS
══════════════════════════════════════════════════ */
function buildWordSlots() {
  els.guessSlots.innerHTML = '';
  [...state.word].forEach(() => {
    const slot = document.createElement('div');
    slot.className = 'slot';
    els.guessSlots.appendChild(slot);
  });
}

function updateWordSlots(hintMode = false) {
  const slots = els.guessSlots.querySelectorAll('.slot');
  [...state.word].forEach((ch, i) => {
    if (state.guessed.has(ch)) {
      slots[i].textContent = ch.toUpperCase();
      if (!slots[i].classList.contains('revealed')) {
        slots[i].classList.add(hintMode ? 'hint-reveal' : 'revealed');
      }
    }
  });
}

/* ══════════════════════════════════════════════════
   GUESS LETTER
══════════════════════════════════════════════════ */
function guessLetter(letter) {
  if (state.gameOver || state.guessed.has(letter)) return;
  state.guessed.add(letter);

  const keyEl = els.keyboard.querySelector(`[data-letter="${letter}"]`);

  if (state.word.includes(letter)) {
    keyEl?.classList.add('correct', 'clicked');
    updateWordSlots();
    checkWin();
  } else {
    keyEl?.classList.add('wrong', 'clicked');
    // shake the hangman card
    document.querySelector('.hangman-card')?.classList.remove('shake');
    void document.querySelector('.hangman-card')?.offsetWidth;
    document.querySelector('.hangman-card')?.classList.add('shake');

    state.wrong.push(letter);
    state.lives--;
    state.score = Math.max(0, state.score - 25);
    els.scoreDisplay.textContent = state.score;
    els.wrongLetters.textContent = state.wrong.join(' · ') || '—';

    updateHearts();
    showHangmanPart();
    if (state.lives <= 0) endGame(false);
  }
}

/* ══════════════════════════════════════════════════
   HANGMAN PARTS
══════════════════════════════════════════════════ */
function showHangmanPart() {
  const wrongCount = state.maxLives - state.lives;
  // Map wrong count to parts (scale to 6 parts regardless of max lives)
  const partIndex = Math.floor((wrongCount / state.maxLives) * SVG_PARTS.length);
  const clampedIndex = Math.min(partIndex, SVG_PARTS.length - 1);
  const el = document.getElementById(SVG_PARTS[clampedIndex]);
  if (el) el.classList.add('show');
}

/* ══════════════════════════════════════════════════
   HINT
══════════════════════════════════════════════════ */
function useHint() {
  if (state.hints <= 0 || state.score < 50 || state.gameOver) return;

  // Reveal word hint text first use
  if (!els.wordHint.textContent) {
    els.wordHint.textContent = `Hint: ${state.hint}`;
    state.hints--;
    state.hintsUsed++;
    state.score = Math.max(0, state.score - 50);
    els.scoreDisplay.textContent = state.score;
    updateHintBtn();
    return;
  }

  // Reveal a random unguessed letter
  const unguessed = [...state.word].filter(ch => !state.guessed.has(ch));
  if (unguessed.length === 0) return;

  const letter = unguessed[Math.floor(Math.random() * unguessed.length)];
  state.guessed.add(letter);
  state.hints--;
  state.hintsUsed++;
  state.score = Math.max(0, state.score - 50);

  const keyEl = els.keyboard.querySelector(`[data-letter="${letter}"]`);
  keyEl?.classList.add('correct', 'clicked');
  updateWordSlots(true);
  updateHintBtn();
  els.scoreDisplay.textContent = state.score;
  checkWin();
}

function updateHintBtn() {
  els.hintCount.textContent = `(${state.hints} left)`;
  els.hintBtn.disabled = state.hints <= 0 || state.score < 50;
}

/* ══════════════════════════════════════════════════
   WIN / LOSE CHECK
══════════════════════════════════════════════════ */
function checkWin() {
  const allRevealed = [...state.word].every(ch => state.guessed.has(ch));
  if (allRevealed) endGame(true);
}

/* ══════════════════════════════════════════════════
   TIMER
══════════════════════════════════════════════════ */
function startTimer() {
  clearInterval(state.timer);
  state.timer = setInterval(() => {
    state.elapsed++;
    els.timerDisplay.textContent = `${state.elapsed}s`;
    // score decay
    if (state.score > 0 && state.elapsed % 5 === 0) {
      state.score = Math.max(0, state.score - 1);
      els.scoreDisplay.textContent = state.score;
    }
  }, 1000);
}

/* ══════════════════════════════════════════════════
   END GAME
══════════════════════════════════════════════════ */
function endGame(won) {
  state.gameOver = true;
  clearInterval(state.timer);

  // Apply difficulty multiplier
  const multiplier = DIFFICULTY_CONFIG[state.difficulty].multiplier;
  const finalScore = won ? Math.round(state.score * multiplier) : 0;

  // Reveal all letters if lost
  if (!won) {
    [...state.word].forEach(ch => state.guessed.add(ch));
    updateWordSlots();
  }

  // Update result screen
  els.resultEmoji.textContent   = won ? '🏆' : '💀';
  els.resultTitle.textContent   = won ? 'WINNER!' : 'GAME OVER';
  els.resultTitle.className     = `result-title ${won ? 'win' : 'lose'}`;
  els.resultPlayer.textContent  = `Well played, ${state.playerName}`;
  els.resultWord.textContent    = state.word.toUpperCase();
  els.finalScore.textContent    = finalScore;
  els.finalMistakes.textContent = state.wrong.length;
  els.finalTime.textContent     = `${state.elapsed}s`;
  els.finalHints.textContent    = state.hintsUsed;

  // Save to leaderboard
  if (won) saveScore(state.playerName, finalScore, state.category, state.difficulty);

  setTimeout(() => goToScreen('result'), 800);
}

/* ══════════════════════════════════════════════════
   LEADERBOARD (localStorage)
══════════════════════════════════════════════════ */

function saveScore(name, score, category, difficulty) {
  let scores = JSON.parse(localStorage.getItem('hangman_scores') || '[]');
  scores.push({ name, score, category, difficulty, date: new Date().toLocaleDateString() });
  scores.sort((a, b) => b.score - a.score);
  scores = scores.slice(0, 5);
  localStorage.setItem('hangman_scores', JSON.stringify(scores));
}

function renderLeaderboard() {
  const scores = JSON.parse(localStorage.getItem('hangman_scores') || '[]');
  if (!scores.length) {
    els.lbList.innerHTML = '<span class="lb-empty">No scores yet — be the first!</span>';
    return;
  }
  els.lbList.innerHTML = scores.map((s, i) => `
    <div class="lb-entry" data-index="${i}">
      <span class="lb-rank">${i + 1}</span>
      <span class="lb-name">${s.name} <small style="color:var(--muted)">${s.category} · ${s.difficulty}</small></span>
      <span class="lb-score">${s.score}</span>
      <button class="lb-del-btn" onclick="handleDeleteScore(${i})" title="Delete">✕</button>
    </div>
  `).join('');
}

function handleDeleteScore(index) {
  let scores = JSON.parse(localStorage.getItem('hangman_scores') || '[]');
  scores.splice(index, 1);
  localStorage.setItem('hangman_scores', JSON.stringify(scores));
  renderLeaderboard();
}

/* ══════════════════════════════════════════════════
   FLOATING PARTICLES
══════════════════════════════════════════════════ */
function spawnParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const colors = ['rgba(247,223,30,0.5)','rgba(230,57,70,0.4)','rgba(6,214,160,0.35)','rgba(247,223,30,0.2)'];
  for (let i = 0; i < 18; i++) {
    const p    = document.createElement('div');
    p.className = 'particle';
    const size  = Math.random() * 4 + 2;
    const color = colors[Math.floor(Math.random() * colors.length)];
    p.style.cssText = `width:${size}px;height:${size}px;left:${Math.random()*100}%;bottom:-10px;background:${color};animation-duration:${Math.random()*10+8}s;animation-delay:${Math.random()*12}s;box-shadow:0 0 ${size*2}px ${color};`;
    container.appendChild(p);
  }
}

function init() {
  spawnParticles();
  buildCategories();
  setupDiffButtons();
  renderLeaderboard();

  els.quitBtn.addEventListener('click', () => {
    if (confirm('Quit this game?')) goToScreen('start');
  });

  els.hintBtn.addEventListener('click', useHint);
  els.playAgainBtn.addEventListener('click', () => startGame(state.category));
  els.backMenuBtn.addEventListener('click', () => goToScreen('start'));

  document.addEventListener('keydown', handlePhysicalKey);

  els.playerName.addEventListener('keydown', e => {
    if (e.key === 'Enter') els.nameError.textContent = '';
  });
}

/* ══════════════════════════════════════════════════
   SCREENS
══════════════════════════════════════════════════ */
function goToScreen(name) {
  clearInterval(state.timer);
  [els.startScreen, els.gameScreen, els.resultScreen].forEach(s => s.classList.remove('active'));
  if (name === 'start')  { els.startScreen.classList.add('active');  renderLeaderboard(); }
  if (name === 'game')   { els.gameScreen.classList.add('active');   }
  if (name === 'result') { els.resultScreen.style.display = 'flex'; els.resultScreen.classList.add('active'); }
  state.screen = name;
}

/* ══════════════════════════════════════════════════
   CATEGORY BUTTONS
══════════════════════════════════════════════════ */
function buildCategories() {
  els.categoryList.innerHTML = '';
  for (const [key, val] of Object.entries(CATEGORIES)) {
    const btn = document.createElement('button');
    btn.className = 'cat-btn';
    btn.innerHTML = `<span class="cat-icon">${val.icon}</span>${key.toUpperCase()}`;
    btn.addEventListener('click', () => {
      const name = els.playerName.value.trim();
      if (!isValidName(name)) {
        showNameError('Name must be 2+ letters only.');
        els.playerName.focus();
        return;
      }
      startGame(key);
    });
    els.categoryList.appendChild(btn);
  }
}

/* ══════════════════════════════════════════════════
   DIFFICULTY
══════════════════════════════════════════════════ */
function setupDiffButtons() {
  document.querySelectorAll('.diff-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.difficulty = btn.dataset.diff;
      els.diffDesc.textContent = DIFFICULTY_CONFIG[state.difficulty].desc;
    });
  });
}

/* ══════════════════════════════════════════════════
   VALIDATION
══════════════════════════════════════════════════ */
function isValidName(name) {
  if (name.length < 2) return false;
  return /^[a-zA-Z\s]+$/.test(name);
}

function showNameError(msg) {
  els.nameError.textContent = msg;
  els.playerName.classList.add('error');
  setTimeout(() => { els.playerName.classList.remove('error'); }, 1500);
}

/* ══════════════════════════════════════════════════
   START GAME
══════════════════════════════════════════════════ */
function startGame(category) {
  const cfg = DIFFICULTY_CONFIG[state.difficulty];
  const words = CATEGORIES[category].words[state.difficulty];
  const entry = words[Math.floor(Math.random() * words.length)];

  state = {
    ...state,
    screen:    'game',
    playerName: els.playerName.value.trim(),
    category,
    word:      entry.w.toLowerCase(),
    hint:      entry.h,
    guessed:   new Set(),
    wrong:     [],
    score:     600,
    lives:     cfg.lives,
    maxLives:  cfg.lives,
    hints:     cfg.hints,
    hintsUsed: 0,
    elapsed:   0,
    gameOver:  false,
  };

  // UI setup
  els.playerDisplay.textContent  = state.playerName;
  els.categoryDisplay.textContent = category.toUpperCase();
  els.scoreDisplay.textContent   = state.score;
  els.timerDisplay.textContent   = '0s';
  els.wordHint.textContent       = '';
  els.diffBadge.textContent      = state.difficulty.toUpperCase();
  els.wrongLetters.textContent   = '—';

  // Reset hangman SVG parts
  SVG_PARTS.forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.classList.remove('show'); }
  });

  buildHearts();
  buildKeyboard();
  buildWordSlots();
  updateHintBtn();

  goToScreen('game');
  startTimer();
}

/* ══════════════════════════════════════════════════
   HEARTS
══════════════════════════════════════════════════ */
function buildHearts() {
  els.heartsDisplay.innerHTML = '';
  for (let i = 0; i < state.maxLives; i++) {
    const h = document.createElement('span');
    h.className = 'heart';
    h.textContent = '❤️';
    els.heartsDisplay.appendChild(h);
  }
}

function updateHearts() {
  const hearts = els.heartsDisplay.querySelectorAll('.heart');
  const lost = state.maxLives - state.lives;
  hearts.forEach((h, i) => {
    h.classList.toggle('lost', i >= state.maxLives - lost);
  });
}

/* ══════════════════════════════════════════════════
   KEYBOARD
══════════════════════════════════════════════════ */
function buildKeyboard() {
  els.keyboard.innerHTML = '';
  'abcdefghijklmnopqrstuvwxyz'.split('').forEach(letter => {
    const key = document.createElement('div');
    key.className = 'key';
    key.textContent = letter;
    key.dataset.letter = letter;
    key.addEventListener('click', () => guessLetter(letter));
    els.keyboard.appendChild(key);
  });
}

function handlePhysicalKey(e) {
  if (state.screen !== 'game' || state.gameOver) return;
  const letter = e.key.toLowerCase();
  if (/^[a-z]$/.test(letter)) guessLetter(letter);
}

/* ══════════════════════════════════════════════════
   WORD SLOTS
══════════════════════════════════════════════════ */
function buildWordSlots() {
  els.guessSlots.innerHTML = '';
  [...state.word].forEach(() => {
    const slot = document.createElement('div');
    slot.className = 'slot';
    els.guessSlots.appendChild(slot);
  });
}

function updateWordSlots(hintMode = false) {
  const slots = els.guessSlots.querySelectorAll('.slot');
  [...state.word].forEach((ch, i) => {
    if (state.guessed.has(ch)) {
      slots[i].textContent = ch.toUpperCase();
      if (!slots[i].classList.contains('revealed')) {
        slots[i].classList.add(hintMode ? 'hint-reveal' : 'revealed');
      }
    }
  });
}

/* ══════════════════════════════════════════════════
   GUESS LETTER
══════════════════════════════════════════════════ */
function guessLetter(letter) {
  if (state.gameOver || state.guessed.has(letter)) return;
  state.guessed.add(letter);

  const keyEl = els.keyboard.querySelector(`[data-letter="${letter}"]`);

  if (state.word.includes(letter)) {
    keyEl?.classList.add('correct', 'clicked');
    updateWordSlots();
    checkWin();
  } else {
    keyEl?.classList.add('wrong', 'clicked');
    // shake the hangman card
    document.querySelector('.hangman-card')?.classList.remove('shake');
    void document.querySelector('.hangman-card')?.offsetWidth;
    document.querySelector('.hangman-card')?.classList.add('shake');

    state.wrong.push(letter);
    state.lives--;
    state.score = Math.max(0, state.score - 25);
    els.scoreDisplay.textContent = state.score;
    els.wrongLetters.textContent = state.wrong.join(' · ') || '—';

    updateHearts();
    showHangmanPart();
    if (state.lives <= 0) endGame(false);
  }
}

/* ══════════════════════════════════════════════════
   HANGMAN PARTS
══════════════════════════════════════════════════ */
function showHangmanPart() {
  const wrongCount = state.maxLives - state.lives;
  // Map wrong count to parts (scale to 6 parts regardless of max lives)
  const partIndex = Math.floor((wrongCount / state.maxLives) * SVG_PARTS.length);
  const clampedIndex = Math.min(partIndex, SVG_PARTS.length - 1);
  const el = document.getElementById(SVG_PARTS[clampedIndex]);
  if (el) el.classList.add('show');
}

/* ══════════════════════════════════════════════════
   HINT
══════════════════════════════════════════════════ */
function useHint() {
  if (state.hints <= 0 || state.score < 50 || state.gameOver) return;

  // Reveal word hint text first use
  if (!els.wordHint.textContent) {
    els.wordHint.textContent = `Hint: ${state.hint}`;
    state.hints--;
    state.hintsUsed++;
    state.score = Math.max(0, state.score - 50);
    els.scoreDisplay.textContent = state.score;
    updateHintBtn();
    return;
  }

  // Reveal a random unguessed letter
  const unguessed = [...state.word].filter(ch => !state.guessed.has(ch));
  if (unguessed.length === 0) return;

  const letter = unguessed[Math.floor(Math.random() * unguessed.length)];
  state.guessed.add(letter);
  state.hints--;
  state.hintsUsed++;
  state.score = Math.max(0, state.score - 50);

  const keyEl = els.keyboard.querySelector(`[data-letter="${letter}"]`);
  keyEl?.classList.add('correct', 'clicked');
  updateWordSlots(true);
  updateHintBtn();
  els.scoreDisplay.textContent = state.score;
  checkWin();
}

function updateHintBtn() {
  els.hintCount.textContent = `(${state.hints} left)`;
  els.hintBtn.disabled = state.hints <= 0 || state.score < 50;
}

/* ══════════════════════════════════════════════════
   WIN / LOSE CHECK
══════════════════════════════════════════════════ */
function checkWin() {
  const allRevealed = [...state.word].every(ch => state.guessed.has(ch));
  if (allRevealed) endGame(true);
}

/* ══════════════════════════════════════════════════
   TIMER
══════════════════════════════════════════════════ */
function startTimer() {
  clearInterval(state.timer);
  state.timer = setInterval(() => {
    state.elapsed++;
    els.timerDisplay.textContent = `${state.elapsed}s`;
    // score decay
    if (state.score > 0 && state.elapsed % 5 === 0) {
      state.score = Math.max(0, state.score - 1);
      els.scoreDisplay.textContent = state.score;
    }
  }, 1000);
}

/* ══════════════════════════════════════════════════
   END GAME
══════════════════════════════════════════════════ */
function endGame(won) {
  state.gameOver = true;
  clearInterval(state.timer);

  // Apply difficulty multiplier
  const multiplier = DIFFICULTY_CONFIG[state.difficulty].multiplier;
  const finalScore = won ? Math.round(state.score * multiplier) : 0;

  // Reveal all letters if lost
  if (!won) {
    [...state.word].forEach(ch => state.guessed.add(ch));
    updateWordSlots();
  }

  // Update result screen
  els.resultEmoji.textContent   = won ? '🏆' : '💀';
  els.resultTitle.textContent   = won ? 'WINNER!' : 'GAME OVER';
  els.resultTitle.className     = `result-title ${won ? 'win' : 'lose'}`;
  els.resultPlayer.textContent  = `Well played, ${state.playerName}`;
  els.resultWord.textContent    = state.word.toUpperCase();
  els.finalScore.textContent    = finalScore;
  els.finalMistakes.textContent = state.wrong.length;
  els.finalTime.textContent     = `${state.elapsed}s`;
  els.finalHints.textContent    = state.hintsUsed;

  // Save to leaderboard
  if (won) saveScore(state.playerName, finalScore, state.category, state.difficulty);

  setTimeout(() => goToScreen('result'), 800);
}

/* ══════════════════════════════════════════════════
   LEADERBOARD — Fetch API CRUD
   File: scores.json
   ⚠️  GET works in browser directly.
       POST / PUT / DELETE require a backend server
       (e.g. json-server: npx json-server scores.json)
══════════════════════════════════════════════════ */


// ── GET — fetch all scores ────────────────────────
init();