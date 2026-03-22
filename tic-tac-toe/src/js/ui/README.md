# 🖥️ ui/ — UI Layer

> The only layer that reads game state and writes to the DOM.
> No game logic. No AI logic. No direct state mutation.
> Pattern: Event → controls.js → game-manager → state mutates → renderer reads → DOM updates.

---

## 📁 Files

```
ui/
├── dom.js              ← DOM reference map (query once, reuse everywhere)
├── renderer.js         ← State → DOM  (renderAll is the only DOM writer)
├── modal.js            ← Result dialog show/hide
├── controls.js         ← All event listeners → game-manager
└── notifications.js    ← Game event logging utility
```

---

## `dom.js` — DOM References

Queries all DOM elements **once** at startup and stores them in a plain object.

```js
initDom()     // Called once in main.js — builds the map
getDom()      // Returns the singleton object
```

**Why centralise?**
- If an ID changes in HTML → fix it in one place (`constants.js → DOM_IDS`)
- Every module gets references without calling `getElementById` themselves
- `buildDomElements()` throws a descriptive error if any element is missing

---

## `renderer.js` — State → DOM

**The ONLY file that writes to the DOM based on game state.**

### `renderAll()`
Called after every state change. Composes 5 sub-renderers:

| Sub-renderer | What it updates |
|---|---|
| `renderPanels()` | Which screen is visible (setup vs game) |
| `renderSetup()` | Active mode/difficulty button highlights |
| `renderBoard()` | Cell classes (X/O/winner/draw), disabled states, hover attrs |
| `renderTurnIndicator()` | Whose turn, thinking state, text |
| `renderScore()` | Score numbers, player labels, active card highlight |

### `renderAfterCpuStart()`
Partial render — updates turn indicator to "CPU is thinking..." and locks the board immediately when CPU turn starts.

### `animateScoreBump(symbol)`
Triggers the `score-bump` CSS animation on the correct score element.
Uses `offsetWidth` reflow trick to restart animation if called twice quickly.

**Key rule:** All render functions are **idempotent** — calling them twice with the same state produces identical DOM output.

---

## `modal.js` — Result Dialog

```js
showModal()   // Populate + show the result modal
hideModal()   // Hide the modal
```

`showModal()` reads current game state and sets:
- Icon (`🏆` for win, `🤝` for draw)
- Title text + color class (`--x`, `--o`, `--draw`)
- Message text
- Score snapshot (X / Draws / O)
- Player labels per game mode
- Auto-focuses "Next Round" button for keyboard accessibility

---

## `controls.js` — Event Listeners

Attaches all event listeners in `bindControls()` — called once from `main.js`.

**Rule: No game logic here.** Only: read event → validate → call game-manager.

| Event | Handler | Calls |
|---|---|---|
| Mode button click | `onModeClick` | `setGameConfig` + `renderAll` |
| Difficulty click | `onDifficultyClick` | `setGameConfig` + `renderAll` |
| Start game | `onStartGame` | `handleStartGame` |
| Cell click | `onCellClick` | `handleCellClick(index)` |
| Restart | `onRestartRound` | `hideModal` + `handleRestartRound` |
| Next Round | `onNextRound` | `hideModal` + `handleNextRound` |
| Menu | `onReturnToMenu` | `hideModal` + `handleReturnToMenu` |
| Reset Score | `onResetScores` | `handleResetScores` |
| Modal backdrop | click | `onNextRound` |
| `Escape` key | `onKeyDown` | `hideModal` + `handleNextRound` |

**Safe dataset reading:**
```js
const raw = cell.dataset['index'];
if (raw === undefined) return;     // guard against missing attribute
const index = Number(raw);
if (isNaN(index)) return;          // guard against non-numeric value
handleCellClick(index);
```

---

## `notifications.js` — Logging Utility

Lightweight game event logger. Currently outputs to `console.info`.
Designed to be expanded into a toast notification, sound effect, or haptic system.

```js
notifyGameEvent('Player X wins!') // → [Game] Player X wins!
```

---

*Tic Tac Toe — UI Layer (JS) · ITI ICC Program · MEARN Track · 2026*
