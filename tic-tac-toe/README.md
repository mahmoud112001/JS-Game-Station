# ♟️ Tic Tac Toe — Production-Level Game

> **Author:** Mahmoud Awad Saad
> **Program:** ITI — ICC Program | Full-Stack MEARN Track
> **Built With:** TypeScript · JavaScript · SCSS · HTML5 · Vite

---

## 🔗 Quick Start

```bash
npm install
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
```

---

## 🎮 Game Features

| Feature | Details |
|---|---|
| **Game Modes** | Player vs Player · Player vs CPU |
| **CPU Difficulty** | Easy · Medium · Hard (Minimax AI) |
| **Score System** | Real-time · Persists across rounds · localStorage |
| **Win Detection** | All 8 combinations · Winning line highlight |
| **Draw Detection** | Full board with no winner |
| **Result Modal** | Win/draw popup with score snapshot |
| **Keyboard Support** | Escape key closes modal |
| **Responsive** | Desktop + Mobile |
| **Dark Theme** | Premium dark UI with animations |

---

## 📁 Project Structure

```
tic-tac-toe/
│
├── index.html              ← App shell — semantic HTML, all sections
├── package.json            ← Dependencies: Vite + TypeScript + Sass
├── tsconfig.json           ← Strict TypeScript config (bundler mode)
├── vite.config.js          ← Vite build config
│
├── src/
│   ├── styles/             ← SCSS design system (11 partials)
│   ├── ts/                 ← TypeScript source (25 files)
│   │   ├── types.ts
│   │   ├── constants.ts
│   │   ├── state.ts
│   │   ├── main.ts
│   │   ├── game/           ← Core game logic (7 files)
│   │   ├── ai/             ← CPU AI engine (4 files)
│   │   ├── ui/             ← DOM + rendering layer (5 files)
│   │   └── utils/          ← Pure utilities (3 files)
│   └── js/                 ← JavaScript version (22 files — TS mapped to JS)
│       ├── constants.js
│       ├── state.js
│       ├── main.js
│       ├── game/           ← Core game logic (7 files)
│       ├── ai/             ← CPU AI engine (4 files)
│       ├── ui/             ← DOM + rendering layer (5 files)
│       └── utils/          ← Pure utilities (3 files)
```

---

## 🔄 TypeScript vs JavaScript

Both versions are identical in logic, structure, and file count. The JS version is a direct mapping — all type annotations, interfaces, and TypeScript-specific syntax removed.

| What changed | TypeScript | JavaScript |
|---|---|---|
| Type annotations | `: string`, `: number`, `: boolean` | ✅ Removed |
| Interfaces & types | `interface GameState {}`, `type PlayerSymbol` | ✅ Removed |
| `import type` | `import type { GameState }` | ✅ Removed |
| Type casts | `as CellValue[]`, `as T` | ✅ Removed |
| `readonly` | `readonly CellValue[]` | ✅ Removed |
| Generic functions | `randomChoice<T>(arr: T[])` | `randomChoice(arr)` |
| Exhaustive switch | `const _e: never = difficulty` | `default: throw new Error(...)` |
| File extensions | `.ts` imports | `.js` imports |
| Entry point in HTML | `src/ts/main.ts` | `src/js/main.js` |

**To use the JS version**, update `index.html`:
```html
<!-- TypeScript (Vite compiles) -->
<script type="module" src="src/ts/main.ts"></script>

<!-- JavaScript (runs directly in browser) -->
<script type="module" src="src/js/main.js"></script>
```

---

## 🎨 `/src/styles` — SCSS Design System

The SCSS is split into **11 partials** with a strict import order.
`main.scss` is the single entry point — it imports all partials in the correct cascade.

```
src/styles/
├── main.scss           ← Entry point — imports all partials in order
├── _variables.scss     ← Design tokens
├── _mixins.scss        ← Reusable patterns
├── _reset.scss         ← Browser normalization
├── _base.scss          ← Root defaults, fonts, utilities
├── _layout.scss        ← App shell, header, panels, grid
├── _components.scss    ← Buttons, mode cards, turn indicator
├── _board.scss         ← 3×3 grid, cell states, hover, winner
├── _score.scss         ← Scoreboard + score cards
├── _modal.scss         ← Result dialog overlay
├── _animations.scss    ← All @keyframes in one place
└── _responsive.scss    ← Mobile breakpoint overrides
```

### File Responsibilities

**`_variables.scss`**
Single source of truth for all design tokens. Never hardcode values anywhere else.
Colors (`$color-x`, `$color-o`, `$color-win`), spacing scale, typography, border radius, shadows, transitions, z-index, board dimensions, breakpoints.

**`_mixins.scss`**
Reusable SCSS patterns. Imported by every partial that needs layout or component logic.
Includes: `flex-center`, `flex-column`, `card`, `card-glass`, `btn-base`, `glow`, `mono-tag`, `respond-to`, `lift-on-hover`.

**`_reset.scss`**
Removes browser inconsistencies — box-sizing, margin, padding, font inheritance, button reset.

**`_base.scss`**
Loads Google Fonts (`DM Sans` + `DM Mono`), sets CSS custom properties on `:root`, body styles, scrollbar, selection highlight, and `.hidden` / `.sr-only` utilities.

**`_layout.scss`**
App wrapper with animated background grid and ambient glow blobs. Header, setup panel, game panel, controls row — all structural sections.

**`_components.scss`**
Mode buttons (1v1 / vs CPU), difficulty buttons (Easy/Medium/Hard), start button with shimmer effect, control buttons, turn indicator with dot pulse animation.

**`_board.scss`**
The 3×3 CSS grid. Cell base styles, X/O symbol reveal animation (`cellReveal`), winner highlight + glow (`winnerPulse`, `winnerGlow`), draw fade, locked board state, hover preview ghost symbol.

**`_score.scss`**
Scoreboard grid (3 columns). Score cards with colored top bar per player, value display, score bump animation on point scored.

**`_modal.scss`**
Fixed overlay dialog. Glassmorphism card with top accent gradient, icon drop animation, score snapshot grid, action buttons (primary/secondary/ghost).

**`_animations.scss`**
All `@keyframes` in one file — `fadeDown`, `fadeUp`, `modalIn`, `cardBounceIn`, `iconDrop`, `cellReveal`, `winnerPulse`, `winnerGlow`, `drawFade`, `scoreBump`, `dotPulse`, `dotBlink`, `gridDrift`, `blobPulse`, `shimmer`.

**`_responsive.scss`**
Mobile overrides for ≤480px and ≤768px — smaller board cells, adjusted padding, stacked layouts, smaller typography.

### BEM Naming Convention
```scss
.board {}               // Block
.board__cell {}         // Element
.board__cell--x {}      // Modifier (player X)
.board__cell--winner {} // Modifier (winning cell)
```

---

## 🧩 `/src/ts` — TypeScript Source

### Core Files

**`types.ts`**
Single source of truth for all type definitions. No imports, no side effects.
Exports: `PlayerSymbol`, `CellValue`, `BoardState`, `GameMode`, `DifficultyLevel`, `GameStatus`, `WinResult`, `ScoreState`, `GameState`, `CpuMoveResult`, `MinimaxResult`, `DomElements`.

**`constants.ts`**
All magic values in one place. No logic, no side effects.

**`state.ts`**
Central game state + controlled mutations. Private `_state` — never exported directly.
Mutations: `placeMove`, `switchTurn`, `setWinner`, `setDraw`, `incrementScore`, `resetScores`, `resetRound`, `setCpuThinking`, `resetGame`, `resetToMenu`.
Getters: `isCpuTurn`, `isPlaying`, `getPlayerName`, `getScores`.

**`main.ts`**
App bootstrap: `initDom()` → `hydrateScores()` → `bindControls()` → `renderAll()`.

---

## 🟨 `/src/js` — JavaScript Version

Direct mapping of the TypeScript source — same architecture, same file names, same logic.
No build tool required — runs natively in any modern browser via ES modules.

### Core Files

**`constants.js`**
Identical values to `constants.ts`. No type imports.

**`state.js`**
Same state shape and mutation functions. No type annotations.
```js
// TS version
export function placeMove(index: number, symbol: PlayerSymbol): void { ... }

// JS version
export function placeMove(index, symbol) { ... }
```

**`main.js`**
Same bootstrap order. Uses `.js` imports instead of `.ts`.

### JS File Map

```
js/
├── constants.js
├── state.js
├── main.js
├── game/
│   ├── board.js          ← createEmptyBoard, getEmptyCells, applyMove...
│   ├── player.js         ← getOpponent, symbolToClass, symbolToScoreKey...
│   ├── win-checker.js    ← checkWinner, evaluateBoard, hasWon...
│   ├── turn-manager.js   ← isLegalMove, executeMove, scheduleCpuMove...
│   ├── score-manager.js  ← recordWin, recordDraw, hydrateScores...
│   ├── round-manager.js  ← beginGame, restartRound, nextRound...
│   └── game-manager.js   ← handleCellClick, executeCpuTurn, handleStartGame...
├── ai/
│   ├── easy-ai.js        ← randomChoice(getEmptyCells(board))
│   ├── medium-ai.js      ← win → block → 70% strategic / 30% random
│   ├── hard-ai.js        ← Full Minimax with depth scoring
│   └── cpu-engine.js     ← Routes to correct AI by difficulty
├── ui/
│   ├── dom.js            ← buildDomElements, initDom, getDom
│   ├── renderer.js       ← renderAll, renderAfterCpuStart, animateScoreBump
│   ├── modal.js          ← showModal, hideModal
│   ├── controls.js       ← bindControls, all event handlers
│   └── notifications.js  ← notifyGameEvent
└── utils/
    ├── helpers.js        ← randomInt, randomChoice, withProbability, clamp
    ├── storage.js        ← saveScores, loadScores, clearStorage
    └── validators.js     ← isValidMode, isValidDifficulty, isValidCellIndex
```

---

## ⚙️ `/src/ts/game` & `/src/js/game` — Game Logic Layer

Zero DOM. Zero AI. Pure game rules and lifecycle.

**`board`** — Pure board inspection: `createEmptyBoard`, `getCellValue`, `getEmptyCells`, `isCellEmpty`, `isBoardFull`, `cloneBoard`, `applyMove`, `countSymbol`, `remainingMoves`.

**`player`** — Symbol utilities: `getOpponent` (X↔O), `isValidSymbol`, `symbolToClass`, `getDisplayName`, `symbolToScoreKey`, `isCpu`.

**`win-checker`** — Win/draw detection (called by Minimax hundreds of times per move): `checkWinner`, `checkAnyWinner`, `checkDraw`, `evaluateBoard`, `hasWon`.

**`turn-manager`** — Turn flow: `isLegalMove`, `executeMove`, `advanceTurn`, `shouldTriggerCpu`, `scheduleCpuMove`.

**`score-manager`** — Score tracking: `recordWin`, `recordDraw`, `clearScores`, `hydrateScores`.

**`round-manager`** — Round lifecycle: `beginGame`, `restartRound`, `nextRound`, `returnToMenu`, `fullReset`.

**`game-manager`** — Central orchestrator. `handleCellClick` → validate → place → evaluate → score → render → modal.

---

## 🤖 `/src/ts/ai` & `/src/js/ai` — CPU AI Engine

**`easy-ai`** — `randomChoice(getEmptyCells(board))`. Completely random.

**`medium-ai`** — Priority: Win → Block → 70% strategic (center → corners → edges) / 30% random.

**`hard-ai`** — Full Minimax with depth scoring.
- CPU = Maximising → wants `+10 - depth`
- Human = Minimising → wants `-10 + depth`
- Draw = `0`
- Result: CPU cannot lose — always wins or forces a draw

**`cpu-engine`** — Single entry point: `getCpuMove(board, symbol, difficulty)` → routes to correct AI.

---

## 🖥️ `/src/ts/ui` & `/src/js/ui` — UI Layer

**`dom`** — Queries all elements once at startup. Throws on missing elements.

**`renderer`** — State → DOM. `renderAll()` composes: `renderPanels` + `renderSetup` + `renderBoard` + `renderTurnIndicator` + `renderScore`. All functions are **idempotent**.

**`modal`** — `showModal()` / `hideModal()`.

**`controls`** — `bindControls()` attaches all event listeners. Pattern: read event → validate → call game-manager.

**`notifications`** — `notifyGameEvent(message)` — dev logging, ready for expansion.

---

## 🔧 `/src/ts/utils` & `/src/js/utils` — Pure Utilities

**`helpers`** — `randomInt`, `randomChoice`, `withProbability(0.7)` (medium AI split), `clamp`.

**`storage`** — `saveScores`, `loadScores` (type-guard validated), `clearStorage`. Silent fail on error.

**`validators`** — `isValidMode`, `isValidDifficulty`, `isValidCellIndex`.

---

## 🔄 Full Game Flow

```
Page loads
    ↓
main → initDom() → hydrateScores() → bindControls() → renderAll()
    ↓
User sees setup screen
    ↓
Selects mode + difficulty → clicks Start
    ↓
controls → game-manager.handleStartGame()
    ↓
state: setup → playing | board reset | turn = X
    ↓
renderAll() → game panel visible, board empty
    ↓
Player X clicks cell
    ↓
controls → game-manager.handleCellClick(index)
    ├── executeMove() validates + places move
    ├── evaluateBoard() checks win/draw
    │   ├── Won?  → setWinner() → recordWin() → renderAll() → showModal()
    │   ├── Draw? → setDraw()   → recordDraw() → renderAll() → showModal()
    │   └── None? → advanceTurn() → renderAll()
    │               └── CPU turn? → scheduleCpuMove(delay) → executeCpuTurn()
    └── (repeat)
```

---

## 🏗️ Architecture Principles

| Principle | Implementation |
|---|---|
| **Layered Architecture** | UI → Game → State → AI (one-way dependency) |
| **State-Driven Rendering** | State mutates → `renderAll()` → DOM updates |
| **Single Responsibility** | Every file does exactly one thing |
| **No Magic Numbers** | All values in `constants` |
| **Pure Functions** | `board`, `win-checker`, all AI files — no side effects |
| **Fail Fast** | `dom` throws descriptively on missing elements |
| **BEM CSS** | Consistent, collision-free, self-documenting class names |

---

## 🛠️ Tech Stack

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

---

## 🧠 TypeScript Concepts Used

| Concept | Where |
|---|---|
| Union types | `PlayerSymbol`, `CellValue`, `GameMode`, `GameStatus` |
| Interfaces | `GameState`, `WinResult`, `ScoreState`, `DomElements` |
| Readonly | `BoardState`, `WinningLine`, all AI inputs |
| Type guards | `isValidMode`, `isValidDifficulty`, `loadScores` |
| Generic functions | `randomChoice<T>`, `getEl<T>` in dom.ts |
| Exhaustive switch | `cpu-engine.ts` never case on difficulty |
| Strict null checks | Guard clauses throughout game logic |
| `as const` | `WINNING_COMBOS`, `DOM_IDS`, `CSS` maps |

---

*Tic Tac Toe — Production-Level Game · ITI ICC Program · Full-Stack MEARN Track · 2026*
*Built by Mahmoud Awad Saad*