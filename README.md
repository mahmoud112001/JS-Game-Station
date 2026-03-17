# 🎮 Hangman Game — Dark Edition

> **Course:** Basic HTML, CSS & JavaScript
> **Author:** Mahmoud Awad Saad
> **Live:** [mahmoud112001.github.io/Hangman_web_project](https://mahmoud112001.github.io/Hangman_web_project/)

---

## 📁 File Structure

```
hangman/
├── index.html    ← Page structure
├── style.css     ← All styles
├── script.js     ← All game logic
└── README.md
```

---

## ⚖️ Old vs New — Full Comparison

| Aspect | Old Version | New Version |
|---|---|---|
| **Design** | Light pastel gradient `#f4fbfa` | ✅ Dark noir theme with grain texture |
| **Font** | `system-ui` | ✅ `Bebas Neue` + `DM Mono` + `DM Sans` |
| **Hangman drawing** | 8 `<div>` elements with CSS borders | ✅ SVG with animated part reveal |
| **Categories** | 4 (programming, movies, animals, sports) | ✅ 6 (+ countries, technology) |
| **Difficulty** | ❌ Not available | ✅ Easy / Medium / Hard (affects lives, hints, score multiplier) |
| **Lives** | Fixed 8 wrong = game over | ✅ Dynamic per difficulty (4 / 6 / 8) |
| **Lives display** | ❌ None | ✅ Heart icons that fade on each wrong guess |
| **Score** | Flat 600, −25 per wrong | ✅ 600 + time decay + difficulty multiplier (×1 / ×1.5 / ×2) |
| **Timer** | ❌ Not shown | ✅ Live timer shown in top bar + shown in result |
| **Wrong letters** | ❌ Not shown | ✅ Wrong letters listed below the word |
| **Word hint** | ❌ None | ✅ Description hint per word (costs 50pts) |
| **Hint system** | Single hint — reveals random letter | ✅ First hint shows description, second reveals letter |
| **Physical keyboard** | ❌ Not supported | ✅ Press keyboard keys to play |
| **Leaderboard** | ❌ None | ✅ Top 5 scores saved in `localStorage` |
| **Word data** | Flat array — no hints | ✅ Objects with `word` + `hint` per entry |
| **Validation** | Basic `charCodeAt` loop | ✅ Regex `/^[a-zA-Z\s]+$/` — cleaner |
| **Name error** | Injected text only | ✅ Red border + error message + auto-clear |
| **Shake animation** | ❌ None | ✅ Hangman card shakes on wrong guess |
| **Result screen** | Modal overlay with basic stats | ✅ Full screen with 4 stat boxes + emoji + word reveal |
| **Result stats** | Score + Mistakes | ✅ Score + Mistakes + Time + Hints Used |
| **Play Again** | `location.reload()` — resets everything | ✅ Same category, preserves player name |
| **`var`** | Used throughout | ✅ `const` / `let` with `'use strict'` |
| **Files** | Inline CSS + JS in HTML | ✅ 3 separate files |

---

## 🆕 New Features

### 1. Difficulty System
```js
const DIFFICULTY_CONFIG = {
  easy:   { lives: 8, hints: 3, multiplier: 1   },
  medium: { lives: 6, hints: 2, multiplier: 1.5 },
  hard:   { lives: 4, hints: 1, multiplier: 2   },
};
// Hard mode with no mistakes = score × 2!
```

### 2. Leaderboard (localStorage)
```js
// Saves top 5 scores across sessions
localStorage.setItem('hangman_scores', JSON.stringify(scores));

// Rendered on the start screen every visit
```

### 3. Physical Keyboard Support
```js
document.addEventListener('keydown', handlePhysicalKey);
function handlePhysicalKey(e) {
  if (state.screen !== 'game' || state.gameOver) return;
  if (/^[a-z]$/.test(e.key.toLowerCase())) guessLetter(e.key.toLowerCase());
}
```

### 4. SVG Hangman (animated)
```html
<!-- Parts hidden by default, shown with animation on wrong guess -->
<circle id="svg-head" class="hpart" .../>
<line   id="svg-body" class="hpart" .../>
```
```css
.hpart { display: none; }
.hpart.show { display: block; animation: popIn 0.3s ease; }
```

### 5. Score with Multiplier + Time Decay
```js
// Time decay every 5 seconds
if (state.elapsed % 5 === 0) state.score = Math.max(0, state.score - 1);

// Win bonus with difficulty multiplier
const finalScore = Math.round(state.score * multiplier);
```

---

## 🐛 Bugs Fixed

### 1. Wrong validation method
```js
// ❌ OLD — verbose charCode loop
for (var i = 0; i < name.length; i++) {
  var code = name.charCodeAt(i);
  var isUpper = code >= 65 && code <= 90;
  var isLower = code >= 97 && code <= 122;
  if (!isUpper && !isLower) return false;
}

// ✅ NEW — clean regex
return /^[a-zA-Z\s]+$/.test(name);
```

### 2. `location.reload()` on Play Again
```js
// ❌ OLD — refreshes entire page, loses player name and state
<button onclick="location.reload()">New Challenge</button>

// ✅ NEW — restarts same category cleanly
els.playAgainBtn.addEventListener('click', () => startGame(state.category));
```

### 3. Hangman parts never scale to difficulty
```js
// ❌ OLD — always 8 parts for 8 wrong guesses (breaks on other difficulty)

// ✅ NEW — scales part reveal to number of lives
const partIndex = Math.floor((wrongCount / state.maxLives) * SVG_PARTS.length);
```

### 4. Score never shown as 0 (could go negative)
```js
// ❌ OLD — score decrements without floor
score -= 25; // could become -25, -50...

// ✅ NEW — always floored at 0
state.score = Math.max(0, state.score - 25);
```

---

## 🧠 Concepts Used

| Concept | Where Used |
|---|---|
| `const` / `let` + `'use strict'` | Entire codebase |
| CSS Variables | Full theming system |
| SVG elements | Hangman drawing |
| `@keyframes` | Part reveal, result card, slot reveal |
| `Set` | Track guessed letters — O(1) lookup |
| `Object.entries()` | Iterate categories |
| `localStorage` | Leaderboard persistence |
| `JSON.parse/stringify` | Score save/load |
| `Math.max()` | Score floor |
| Regex `/^[a-zA-Z\s]+$/` | Name validation |
| `addEventListener('keydown')` | Physical keyboard |
| `clearInterval` | Timer cleanup on game end |
| `Math.floor(Math.random())` | Random word pick |
| Spread operator `[...state.word]` | Iterate word chars |

---

*Hangman Dark Edition — ITI ICC Program · Full-Stack MEARN Track · 2026*