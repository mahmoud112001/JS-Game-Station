# ⚙️ game/ — Core Game Logic

> Zero DOM. Zero AI. Pure game rules and lifecycle management.
> All functions are focused, testable, and side-effect free except
> `game-manager.js` which orchestrates the full flow.

---

## 📁 Files

```
game/
├── board.js          ← Board inspection utilities
├── player.js         ← Symbol and identity utilities
├── win-checker.js    ← Win and draw detection
├── turn-manager.js   ← Move validation and turn flow
├── score-manager.js  ← Score tracking + localStorage sync
├── round-manager.js  ← Round lifecycle
└── game-manager.js   ← Central orchestrator
```

---

## `board.js` — Board Utilities

Pure functions for reading and copying the board. No mutations to real state.

| Function | Description |
|---|---|
| `createEmptyBoard()` | Returns `[null × 9]` |
| `getCellValue(board, index)` | Safe cell read with bounds check |
| `getEmptyCells(board)` | Array of empty cell indices |
| `isCellEmpty(board, index)` | Boolean check |
| `isBoardFull(board)` | True if no nulls remain |
| `cloneBoard(board)` | Shallow copy for AI simulation |
| `applyMove(board, index, symbol)` | Returns new board with move applied (immutable) |
| `countSymbol(board, symbol)` | Count cells for a symbol |
| `remainingMoves(board)` | Count of empty cells |

`applyMove` is the key function used by the AI — creates a simulation copy without touching real state.

---

## `player.js` — Player Identity

Pure symbol utilities. No state access.

| Function | Description |
|---|---|
| `getOpponent(symbol)` | `'X' → 'O'`, `'O' → 'X'` |
| `isValidSymbol(value)` | Checks value is `'X'` or `'O'` |
| `symbolToClass(symbol)` | `'X' → 'x'` for BEM CSS classes |
| `getDisplayName(symbol, mode)` | `'Player X'` or `'CPU'` based on mode |
| `symbolToScoreKey(symbol)` | `'X' → 'x'` for score object key |
| `isCpu(symbol, mode)` | True if `mode === 'pvc' && symbol === 'O'` |

---

## `win-checker.js` — Win & Draw Detection

The most-called module — invoked by Minimax hundreds of times per move.
All functions are pure with no side effects.

| Function | Description |
|---|---|
| `checkWinner(board, symbol)` | Checks all 8 combos for one symbol |
| `checkAnyWinner(board, lastPlayed)` | Checks last-played symbol first |
| `checkDraw(board)` | True if board full with no winner |
| `evaluateBoard(board, lastPlayed)` | Combined: returns `{type:'won'}` / `{type:'draw'}` / `null` |
| `hasWon(board, symbol)` | Fast boolean — used inside Minimax recursion |

`evaluateBoard` is the main entry point called by `game-manager` after every move.
`hasWon` is the lightweight version for Minimax — no object allocation.

---

## `turn-manager.js` — Turn Flow

Controls who moves and when the CPU fires.

| Function | Description |
|---|---|
| `isLegalMove(index)` | Validates: status=playing, not thinking, cell empty |
| `executeMove(index, symbol)` | Validate + `state.placeMove()` → returns `boolean` |
| `advanceTurn()` | Calls `state.switchTurn()` |
| `shouldTriggerCpu()` | True if `mode=pvc && turn=O && playing` |
| `scheduleCpuMove(callback)` | `setCpuThinking(true)` → `setTimeout(callback, delay)` |

`scheduleCpuMove` takes a callback because `setTimeout` is async.
`game-manager` passes `executeCpuTurn` as the callback to maintain control of the flow.

---

## `score-manager.js` — Scores

Tracks and persists scores across rounds.

| Function | Description |
|---|---|
| `recordWin(winner)` | Increment winner's score + persist to localStorage |
| `recordDraw()` | Increment draws + persist |
| `clearScores()` | Zero all scores + persist |
| `hydrateScores()` | Load saved scores from localStorage into state at startup |

---

## `round-manager.js` — Round Lifecycle

Semantic wrappers around state transitions.

| Function | Trigger | Effect |
|---|---|---|
| `beginGame(mode, difficulty)` | Start button | `setup → playing`, board reset |
| `restartRound()` | Restart button | board reset, scores preserved |
| `nextRound()` | Next Round in modal | same as restart (semantic alias) |
| `returnToMenu()` | Menu button | `playing → setup`, scores preserved |
| `fullReset()` | Reset Score button | everything cleared |

---

## `game-manager.js` — Orchestrator

The central coordinator. The ONLY module that connects game logic + AI + UI.

### `handleCellClick(index)`
Main flow for human moves:
```
validate move → place symbol → evaluate board
    ├── won  → setWinner → recordWin → animateScore → renderAll → showModal
    ├── draw → setDraw   → recordDraw → animateScore → renderAll → showModal
    └── none → advanceTurn → renderAll
                └── CPU turn? → renderAfterCpuStart → scheduleCpuMove
```

### `executeCpuTurn()` (private)
Called after the CPU delay:
```
getCpuMove(board, 'O', difficulty) → placeMove → evaluate → score → render
```

### Lifecycle handlers (called by controls.js)
`handleStartGame`, `handleRestartRound`, `handleNextRound`, `handleReturnToMenu`, `handleResetScores`.

---

*Tic Tac Toe — Game Logic (JS) · ITI ICC Program · MEARN Track · 2026*
