/**
 * MEMORY CARD GAME - LOGIC ENGINE
 * @author Mahmoud Awad Saad
 * @year 2026
 */

const gameConfig = {
    icons: ['🚀', '💻', '🧪', '👾', '📡', '🔋', '💎', '🧠'],
    selectors: {
        board: '#gameBoard',
        moves: '#moves'
    }
};

let gameState = {
    flippedCards: [],
    matchedPairs: 0,
    moves: 0,
    isProcessing: false
};

/**
 * Initialize Game: Setup grid and event listeners
 */
function initGame() {
    const board = document.querySelector(gameConfig.selectors.board);
    const movesDisplay = document.querySelector(gameConfig.selectors.moves);
    
    // Reset State
    gameState = { flippedCards: [], matchedPairs: 0, moves: 0, isProcessing: false };
    movesDisplay.textContent = '0';
    board.innerHTML = '';

    // Create & Shuffle Cards
    const deck = [...gameConfig.icons, ...gameConfig.icons]
        .sort(() => Math.random() - 0.5);

    deck.forEach(icon => {
        const cardElement = createCardElement(icon);
        board.appendChild(cardElement);
    });
}

/**
 * Creates DOM structure for a single card
 */
function createCardElement(icon) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.icon = icon;
    
    card.innerHTML = `
        <div class="card-back">?</div>
        <div class="card-front">${icon}</div>
    `;

    card.addEventListener('click', () => onCardClick(card));
    return card;
}

/**
 * Handles the logic when a card is selected
 */
function onCardClick(card) {
    if (gameState.isProcessing || card.classList.contains('flipped')) return;

    card.classList.add('flipped');
    gameState.flippedCards.push(card);

    if (gameState.flippedCards.length === 2) {
        processTurn();
    }
}

/**
 * Compares two cards and updates game state
 */
function processTurn() {
    gameState.isProcessing = true;
    gameState.moves++;
    document.querySelector(gameConfig.selectors.moves).textContent = gameState.moves;

    const [card1, card2] = gameState.flippedCards;
    const isMatch = card1.dataset.icon === card2.dataset.icon;

    if (isMatch) {
        handleMatch();
    } else {
        handleMismatch(card1, card2);
    }
}

function handleMatch() {
    gameState.matchedPairs++;
    gameState.flippedCards = [];
    gameState.isProcessing = false;

    if (gameState.matchedPairs === gameConfig.icons.length) {
        setTimeout(() => alert(`System Override Complete. Moves: ${gameState.moves}`), 500);
    }
}

function handleMismatch(c1, c2) {
    setTimeout(() => {
        c1.classList.remove('flipped');
        c2.classList.remove('flipped');
        gameState.flippedCards = [];
        gameState.isProcessing = false;
    }, 1000);
}

// Bootstrap Game
document.addEventListener('DOMContentLoaded', initGame);