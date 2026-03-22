# 🤖 ai/ — CPU Decision Engine

> Isolated from all UI and state. Pure decision logic only.
> `game-manager.js` imports only `cpu-engine.js` — never the AI files directly.

---

## 📁 Files

```
ai/
├── cpu-engine.js   ← Orchestrator — routes by difficulty
├── easy-ai.js      ← Random move
├── medium-ai.js    ← Strategic + random split
└── hard-ai.js      ← Full Minimax algorithm
```

---

## `cpu-engine.js` — Orchestrator

Single entry point for all AI decisions.

```js
getCpuMove(board, symbol, difficulty) → { index: number }
```

Routes to the correct AI based on `difficulty`.
Uses a `switch` with a `default: throw` — any unknown difficulty value crashes immediately with a clear error.

---

## `easy-ai.js` — Random

```js
getEasyMove(board) → { index: number }
```

`randomChoice(getEmptyCells(board))` — picks any valid cell at random.
No lookahead. No blocking. Fully unpredictable and easily beatable.

---

## `medium-ai.js` — Strategic + Imperfect

```js
getMediumMove(board, cpuSymbol) → { index: number }
```

**Priority decision tree:**

```
1. Can CPU win right now?     → take the win  (100%)
2. Can human win next move?   → block it      (100%)
3. Otherwise:
     withProbability(0.7):    → strategic cell
     else:                    → random cell
```

**Strategic cell order** (`PREFERRED_CELLS`):
Center (4) → Corners (0,2,6,8) → Edges (1,3,5,7)

**Why intentionally imperfect?**
70/30 split means a thinking player can still find and exploit patterns.
Without Minimax, medium AI still misses multi-step trap setups.

---

## `hard-ai.js` — Minimax (Unbeatable)

```js
getHardMove(board, cpuSymbol) → { index: number }
```

### What is Minimax?

A recursive decision algorithm for two-player zero-sum games.
Simulates **every possible future game state** for both players.

```
CPU   = Maximising player  → wants score as HIGH as possible
Human = Minimising player  → wants score as LOW as possible
```

### Scoring Terminal States

| Outcome | Score |
|---|---|
| CPU wins | `+10 - depth` |
| Human wins | `-10 + depth` |
| Draw | `0` |

**Why subtract/add depth?**
Without depth, the AI wins but may delay unnecessarily.
A 3-move win scores `+10`, a 5-move win scores `+8` → AI always prefers the fastest path.

### Minimax Recursion

```
getHardMove(board, CPU):
    for each empty cell:
        simulate: board[cell] = CPU
        score = minimax(simBoard, depth=0, isMaximising=false)
        track highest score
    return cell with highest score

minimax(board, depth, isMaximising):
    if terminal (win/draw) → return score
    if isMaximising (CPU turn):
        bestScore = -Infinity
        for each empty cell:
            simulate CPU move
            score = minimax(board, depth+1, false)
            bestScore = max(bestScore, score)
        return bestScore
    else (human turn):
        bestScore = +Infinity
        for each empty cell:
            simulate human move
            score = minimax(board, depth+1, true)
            bestScore = min(bestScore, score)
        return bestScore
```

### Why No Alpha-Beta Pruning?

Tic Tac Toe has at most 9! = 362,880 possible states.
Terminal states are hit early — full Minimax runs in < 1ms.
Alpha-Beta would be premature optimisation here.

### Result

The Hard AI **cannot lose**. Every move is mathematically optimal.
Against a perfect human player → always a draw.
Against any imperfect play → CPU wins.

---

## Data Flow

```
game-manager.js
    ↓
getCpuMove(board, 'O', difficulty)   ← cpu-engine.js
    ↓
getEasyMove(board)                   ← easy-ai.js
getMediumMove(board, 'O')            ← medium-ai.js
getHardMove(board, 'O')              ← hard-ai.js
    ↓
{ index: number }                    → game-manager places the move
```

---

*Tic Tac Toe — AI Engine (JS) · ITI ICC Program · MEARN Track · 2026*
