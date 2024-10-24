// Define an array of cards with pairs (in this case, 4 pairs)
const cardValues = ['🍎', '🍌', '🍇', '🍒', '🍎', '🍌', '🍇', '🍒'];

// Shuffle the cards
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Shuffle cards and prepare for the game
let shuffledCards = shuffle([...cardValues]);

// Variables to track game state
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchesFound = 0;

// Create the game board dynamically
const gameBoard = document.getElementById('gameBoard');
shuffledCards.forEach(value => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
});

// Flip the card
function flipCard() {
    if (lockBoard || this === firstCard) return; // Prevent double-clicking or clicking during processing

    this.classList.add('flipped'); // Add the "flipped" class to show the card's value
    this.innerText = this.dataset.value; // Display the emoji

    if (!firstCard) {
        // If this is the first card clicked, store it and return
        firstCard = this;
        return;
    }

    // If it's the second card clicked, compare it with the first
    secondCard = this;
    lockBoard = true; // Lock the board to prevent further clicks

    checkForMatch();
}

// Check if the two flipped cards match
function checkForMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        // If cards match, disable further flipping for these cards
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchesFound++;

        if (matchesFound === cardValues.length / 2) {
            setTimeout(() => alert('Congratulations, you found all matches!'), 500);
        }

        resetBoard();
    } else {
        // If cards don't match, flip them back after a short delay
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.innerText = '';
            secondCard.innerText = '';
            resetBoard();
        }, 1000);
    }
}

// Reset the game state after a match or non-match
function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}
