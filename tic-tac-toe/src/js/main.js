// ══════════════════════════════════════════════════
// MAIN.JS — App entry point
// Order: initDom → hydrateScores → bindControls → renderAll
// ══════════════════════════════════════════════════

import { initDom }       from './ui/dom.js';
import { bindControls }  from './ui/controls.js';
import { renderAll }     from './ui/renderer.js';
import { hydrateScores } from './game/score-manager.js';

function bootstrap() {
  try {
    initDom();
    hydrateScores();
    bindControls();
    renderAll();
  } catch (error) {
    console.error('[main] Bootstrap failed:', error);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
