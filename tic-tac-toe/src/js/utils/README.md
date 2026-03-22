# 🔧 utils/ — Pure Utilities

> Zero state. Zero DOM. Zero imports from the game system.
> Every function here is a pure, self-contained utility
> that can be tested, reused, or moved without any changes elsewhere.

---

## 📁 Files

```
utils/
├── helpers.js      ← Random numbers, probability, clamp
├── storage.js      ← localStorage with safe error handling
└── validators.js   ← Input validation functions
```

---

## `helpers.js` — Random & Math

| Function | Signature | Description |
|---|---|---|
| `randomInt` | `(min, max) → number` | Random integer in range (inclusive) |
| `randomChoice` | `(arr) → any` | Random element from any array |
| `withProbability` | `(p) → boolean` | Returns `true` with probability `p` (0–1) |
| `clamp` | `(value, min, max) → number` | Clamps number between min and max |

### Usage in the game

`randomChoice` is used by **Easy AI** to pick a random empty cell.
`withProbability(0.7)` is used by **Medium AI** to split strategic vs random moves.

```js
// Easy AI
return { index: randomChoice(getEmptyCells(board)) };

// Medium AI
if (withProbability(MEDIUM_STRATEGIC_CHANCE)) {
  return { index: findStrategicCell(board) };
}
return { index: randomChoice(empties) };
```

---

## `storage.js` — localStorage

Safe read/write for score persistence. All operations wrapped in `try/catch`.
If localStorage is unavailable (private browsing, storage full) — the game still works normally. Scores just won't persist across page refreshes.

| Function | Description |
|---|---|
| `saveScores(scores)` | Serialise to JSON and write to localStorage |
| `loadScores()` | Read + parse + validate shape → `object \| null` |
| `clearStorage()` | Remove the scores key silently |

### Safe Parsing

`loadScores` validates the parsed object before returning it:

```js
if (
  typeof parsed === 'object' && parsed !== null &&
  'x' in parsed && 'o' in parsed && 'draws' in parsed &&
  typeof parsed.x === 'number' &&
  typeof parsed.o === 'number' &&
  typeof parsed.draws === 'number'
) {
  return parsed;
}
return null; // Invalid shape — start fresh
```

This prevents crashes if localStorage data was corrupted or written by an older version.

---

## `validators.js` — Input Guards

Input validation functions that check values before passing to game logic.
Used in `controls.js` to safely read `dataset` attributes.

| Function | Validates |
|---|---|
| `isValidMode(value)` | `'pvp'` or `'pvc'` |
| `isValidDifficulty(value)` | `'easy'`, `'medium'`, or `'hard'` |
| `isValidCellIndex(index)` | `0 ≤ index ≤ 8` |

### Usage in controls.js

```js
// dataset['mode'] returns string | undefined
const mode = btn.dataset['mode'];
if (!isValidMode(mode)) return;   // guard — bail out if invalid
setGameConfig(mode, difficulty);  // safe to call now
```

Without these guards, invalid dataset values could silently corrupt game state.

---

*Tic Tac Toe — Utilities (JS) · ITI ICC Program · MEARN Track · 2026*
