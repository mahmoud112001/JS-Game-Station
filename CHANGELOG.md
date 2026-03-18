# 🎮 Hangman Game — Choose Your Edition

> **Course:** Basic HTML, CSS & JavaScript — Final Lab
> **Instructor:** Eng. Omar Mosleh
> **Program:** ITI — ICC Program | Full-Stack MEARN Track
> **Author:** Mahmoud Awad Saad
> **Live:** [mahmoud112001.github.io/Hangman_web_project](https://mahmoud112001.github.io/Hangman_web_project/)

---

## 🔗 Play Now

| Edition | Name | Live Demo |
|---|---|---|
| **Version 01** | ⚙️ The Scaffold — Classic | [Play](https://mahmoud112001.github.io/Hangman_web_project/v1/) |
| **Version 02** | ⭐ Gallows Noir — Dark Edition | [Play](https://mahmoud112001.github.io/Hangman_web_project/v2/) |

---

## 📁 Project Structure

```
Hangman_web_project/
├── index.html              ← Redirect to landing page
├── CHANGLOG.md
├── links.txt
├── .gitignore
│
├── LandingPage/
│   ├── index.html          ← Choose your edition page
│   ├── script.js
│   ├── style.css
│   ├── README.md
│   └── screenshots/
│
├── v1/                     ← The Scaffold (Classic)
│   ├── index.html
│   ├── script.js
│   ├── style.css
│   ├── README.md
│   └── screenshots/
│
└── v2/                     ← Gallows Noir (Dark Edition)
    ├── index.html
    ├── script.js
    ├── style.css
    ├── README.md
    ├── thumbnail.png
    └── screenshots/
```

---

## 🎨 The Two Editions

### ⚙️ v1 — The Scaffold *(Classic)*

> *"Where it all began. Raw, minimal, and pure."*

The original Hangman experience built as part of the BasicJs course fundamentals. Simple, clean, and focused on core JavaScript logic.

| | Details |
|---|---|
| **Theme** | Light gradient — `#f4fbfa` |
| **Categories** | 4 (Programming, Movies, Animals, Sports) |
| **Lives** | Fixed 8 |
| **Hints** | 1 reveal per game |
| **Difficulty** | Single level |
| **Files** | Single HTML file |

---

### ⭐ v2 — Gallows Noir *(Dark Edition)*

> *"Reborn in darkness. Harder, smarter, and alive with animation."*

The enhanced version — rebuilt from scratch with a professional dark aesthetic, more features, better logic, and a polished UX.

| | Details |
|---|---|
| **Theme** | Dark noir — `#0b0c10` with animated background |
| **Categories** | 6 (+ Countries, Technology) |
| **Lives** | Dynamic: 4 / 6 / 8 per difficulty |
| **Hints** | Description hint + letter reveal |
| **Difficulty** | Easy / Medium / Hard with score multiplier |
| **Leaderboard** | Top 5 scores via `localStorage` |
| **Physical keyboard** | ✅ Press any key to play |
| **Files** | Separated: `index.html` + `style.css` + `script.js` |

---

## ⚖️ v1 vs v2 — Quick Comparison

| Feature | v1 The Scaffold | v2 Gallows Noir |
|---|---|---|
| Theme | Light pastel | ✅ Dark noir + animations |
| Hangman drawing | `<div>` CSS borders | ✅ SVG with animated reveal |
| Categories | 4 | ✅ 6 |
| Difficulty | ❌ | ✅ Easy / Medium / Hard |
| Leaderboard | ❌ | ✅ localStorage top 5 |
| Physical keyboard | ❌ | ✅ |
| Timer | ❌ | ✅ Live + score decay |
| Wrong letters display | ❌ | ✅ |
| Word hints | ❌ | ✅ Description per word |
| Score multiplier | ❌ | ✅ ×1 / ×1.5 / ×2 |
| `var` | ✅ | → `const` / `let` |

---

## 🛠️ Tech Stack

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## 🧠 Concepts Used

| Concept | Used In |
|---|---|
| DOM Manipulation | Both versions |
| `localStorage` | v2 leaderboard |
| `Math.random()` + `Math.floor()` | Random word selection |
| `addEventListener` | Keyboard + button events |
| CSS Variables | v2 theming |
| `@keyframes` animations | v2 background, title, SVG parts |
| SVG elements | v2 hangman drawing |
| Regex validation | v2 name input |
| `Set` | v2 guessed letters tracking |
| `const` / `let` | v2 throughout |

---

## 📋 Changelog

### ⭐ v2.0 — Gallows Noir *(2026)*

**New Features:**
- Added difficulty system — Easy / Medium / Hard
- Added leaderboard — top 5 scores via `localStorage`
- Added physical keyboard support
- Added live timer with score decay
- Added wrong letters display
- Added word description hints
- Added 2 new categories — Countries + Technology
- Added SVG hangman with animated part reveal
- Added floating particles background animation
- Added shimmer effect on title
- Added glass morphism top bar
- Added corner bracket decorations on result screen
- Added score multiplier per difficulty (×1 / ×1.5 / ×2)

**Improvements:**
- `var` → `const` / `let` with `'use strict'`
- Validation: `charCodeAt()` loop → regex `/^[a-zA-Z\s]+$/`
- Hangman parts now scale dynamically to difficulty level
- Score floored at 0 — can no longer go negative
- Play Again no longer reloads page — restarts same category cleanly
- Files separated: `index.html` + `style.css` + `script.js`
- Words upgraded to objects with `word` + `hint` description

**Bug Fixes:**
- Fixed score going negative on multiple wrong guesses
- Fixed Play Again resetting player name and state
- Fixed hangman parts not scaling to difficulty
- Fixed validation accepting numbers as player name

---

### ⚙️ v1.0 — The Scaffold *(2026)*

**Initial Release:**
- 4 categories — Programming, Movies, Animals, Sports
- Player name validation
- Interactive letter keyboard
- Visual hangman drawing — 8 stages
- Real-time score tracking (600 pts, −25 per wrong)
- Hint system — reveals one random letter
- Win / lose result screen


---

*Hangman Game — Final Lab · BasicJs Course · ITI ICC Program · Full-Stack MEARN Track · 2026*