// ══════════════════════════════════════════════════
// MAIN.TS
// App entry point. Runs once on page load.
//
// Responsibility (in order):
//   1. Initialise the DOM reference map
//   2. Hydrate scores from localStorage
//   3. Bind all event listeners
//   4. Render the initial state to the DOM
//
// Nothing else belongs here. All logic lives in
// its dedicated module. This file just wires it up.
// ══════════════════════════════════════════════════

import { initDom } from './ui/dom';
import { bindControls } from './ui/controls';
import { renderAll } from './ui/renderer';
import { hydrateScores } from './game/score-manager';

/**
 * Bootstrap the application.
 * Called when the DOM is fully loaded.
 */
function bootstrap(): void {
  try {
    // 1. Build typed DOM reference map
    //    Throws if any expected element is missing
    initDom();

    // 2. Restore scores from previous session
    //    Safe no-op if localStorage is empty
    hydrateScores();

    // 3. Attach all event listeners
    bindControls();

    // 4. Render initial state (setup screen)
    renderAll();

  } catch (error) {
    console.error('[main] Bootstrap failed:', error);
  }
}

// ── Entry ─────────────────────────────────────────
// DOMContentLoaded ensures HTML is parsed before
// we query any elements.

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  // Already loaded (e.g. script is deferred)
  bootstrap();
}