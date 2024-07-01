document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const restartButton = document.getElementById('restartButton');
    const cardImages = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']; // Use letters or URLs to images
    let cards = [];
    let flippedCards = [];
    let matchedCards = 0;

    function initializeGame() {
        cards = [];
        flippedCards = [];
        matchedCards = 0;
        gameBoard.innerHTML = '';

        const doubledImages = [...cardImages, ...cardImages];
        const shuffledImages = doubledImages.sort(() => 0.5 - Math.random());

        shuffledImages.forEach(image => {
            const card = createCardElement(image);
            gameBoard.appendChild(card);
            cards.push(card);
        });
    }

    function createCardElement(image) {
        const card = document.createElement('div');
        card.classList.add('card');

        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');
        card.appendChild(cardInner);

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        cardFront.innerText = image; // Replace with image element if using actual images

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        cardBack.innerText = '?';

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);

        card.addEventListener('click', () => {
            if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
                flipCard(card);
            }
        });

        return card;
    }

    function flipCard(card) {
        card.classList.add('flipped');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;
        const isMatch = card1.querySelector('.card-front').innerText === card2.querySelector('.card-front').innerText;

        if (isMatch) {
            matchedCards += 2;
            flippedCards = [];

            if (matchedCards === cards.length) {
                setTimeout(() => alert('You won!'), 500);
            }
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                flippedCards = [];
            }, 1000);
        }
    }

    restartButton.addEventListener('click', initializeGame);

    initializeGame();
});
