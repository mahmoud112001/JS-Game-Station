# 🎮 Hangman Game

> **Author:** Mahmoud Awad Saad
> **GitHub:** [@mahmoud112001](https://github.com/mahmoud112001)

---

## 🔗 Live Demos

| Version | Live Demo | Description |
|---|---|---|
| **v2 — Dark Edition** | [Play v2](https://mahmoud112001.github.io/Hangman_web_project/) | Latest version |
| **v1 — Original** | [Play v1](https://mahmoud112001.github.io/Hangman_web_project/v1/) | Classic version |

---

## 📁 Repository Structure

```
Hangman_web_project/
├── index.html          ← v2 — Dark Edition
├── script.js
├── style.css
├── v1/                 ← v1 — Original
│   ├── index.html
│   ├── script.js
│   └── style.css
├── Oldscreenshots/     ← v1 screenshots
├── screenshots/        ← v2 screenshots
└── README.md
```

---

## ⚖️ v1 vs v2 — Full Comparison

### 🎨 Design

| Aspect | v1 — Original | v2 — Dark Edition |
|---|---|---|
| **Theme** | Light pastel gradient `#f4fbfa` | ✅ Dark noir `#0b0c10` |
| **Font** | `system-ui` | ✅ `Bebas Neue` + `DM Mono` + `DM Sans` |
| **Background** | Static gradient | ✅ Animated grid + glowing blobs + floating particles |
| **Hangman drawing** | 8 `<div>` CSS borders | ✅ SVG with animated part reveal |
| **Files** | Single `index.html` | ✅ Separated: `index.html` + `style.css` + `script.js` |

---

### 🎮 Gameplay

| Feature | v1 | v2 |
|---|---|---|
| **Categories** | 4 (programming, movies, animals, sports) | ✅ 6 (+ countries, technology) |
| **Words per category** | 4 words, no hints | ✅ 3 per difficulty × 3 levels + description hint |
| **Difficulty** | ❌ Fixed | ✅ Easy / Medium / Hard |
| **Lives** | Fixed 8 | ✅ 4 / 6 / 8 based on difficulty |
| **Lives display** | ❌ None | ✅ ❤️ heart icons that fade on wrong guess |
| **Score** | 600 − 25 per wrong | ✅ 600 + time decay + difficulty multiplier (×1 / ×1.5 / ×2) |
| **Timer** | ❌ Not shown | ✅ Live timer in top bar + shown in result |
| **Wrong letters** | ❌ Not shown | ✅ Listed below the word |
| **Word hint** | ❌ None | ✅ Description per word (costs 50 pts) |
| **Hint system** | Reveals one random letter | ✅ First = description, second = reveals letter |
| **Physical keyboard** | ❌ Not supported | ✅ Press any key to play |
| **Leaderboard** | ❌ None | ✅ Top 5 scores saved in `localStorage` |

---

### 🧠 Logic & Code

| Aspect | v1 | v2 |
|---|---|---|
| **Variables** | `var` | ✅ `const` / `let` with `'use strict'` |
| **Validation** | `charCodeAt()` loop | ✅ Regex `/^[a-zA-Z\s]+$/` |
| **Play Again** | `location.reload()` — resets everything | ✅ Restarts same category, keeps player name |
| **Hangman scale** | Always 8 parts = 8 wrong guesses | ✅ Parts scale dynamically to difficulty |
| **Score floor** | Could go negative | ✅ `Math.max(0, score - 25)` |
| **Game state** | Multiple loose `var` globals | ✅ Single `state` object |
| **Event listeners** | `onclick` inline attributes | ✅ `addEventListener` throughout |

---

### ✨ New in v2

```
✅ Difficulty system (Easy / Medium / Hard)
✅ Leaderboard — top 5 saved in localStorage
✅ Physical keyboard support
✅ SVG hangman with animated part reveal
✅ Floating particles background animation
✅ Score multiplier per difficulty
✅ Time decay scoring
✅ Word description hints
✅ Heart lives display
✅ Wrong letters list
✅ Corner decorations on result screen
✅ Scanline animation on game screen
✅ Shimmer on game title
✅ Glass morphism top bar
✅ 6 categories with 3 difficulty tiers each
```

---

## 🐛 Bugs Fixed in v2

| Bug | v1 | v2 Fix |
|---|---|---|
| Wrong validation | `charCode` loop — verbose and fragile | `regex` — clean one-liner |
| Play Again reloads page | `location.reload()` | `startGame(state.category)` |
| Hangman parts don't scale | Fixed 8 parts for any difficulty | Scale to `maxLives` dynamically |
| Score goes negative | No floor | `Math.max(0, score - 25)` |
| Name error no visual | Text only | Red border + auto-clear |

---

## 🛠️ Tech Stack

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

*Hangman Game — ITI ICC Program · Full-Stack MEARN Track · 2026*