const dinosaurs = [
    { name: "Iguanodon", img: "dino/iguanodon.JPG" },
    { name: "Albertosaure", img: "dino/albertosaure.JPG" },
    { name: "Edmontonia", img: "dino/edmontonia.JPG" },
    { name: "Carnotaure", img: "dino/carnotaure.JPG" },
    { name: "Stégosaure", img: "dino/stegosaure.JPG" },
    { name: "Acrocanthosaure", img: "dino/acrocanthosaure.JPG" },
    { name: "Brachiosaure", img: "dino/brachiosaure.JPG" },
    { name: "Ptéranodon", img: "dino/pteranodon.JPG" },
    { name: "Brontosaure", img: "dino/brontosaure.JPG" },
    { name: "Panoplosaurus", img: "dino/panoplosaure.JPG" },
    { name: "Talarurus", img: "dino/talarurus.JPG" },
    { name: "Elasmosaurus", img: "dino/elasmosaure.JPG" },
    { name: "Titanosaure", img: "dino/titanosaure.JPG" },
    { name: "Allosaure", img: "dino/allosaure.JPG" },
    { name: "Parasaurolophus", img: "dino/parasaurolophus.JPG" },
    { name: "Galliminus", img: "dino/galliminus.JPG" },
    { name: "Tricératops", img: "dino/triceratops.JPG" },
    { name: "Oviraptor", img: "dino/oviraptor.JPG" },
    { name: "Ankylosaure", img: "dino/ankylosaure.JPG" },
    { name: "Centrosaure", img: "dino/centrosaure.JPG" },
    { name: "Kentrosaure", img: "dino/kentrosaure.JPG" },
    { name: "Vélociraptor", img: "dino/velociraptor.JPG" },
    { name: "Styracosaure", img: "dino/styracosaure.JPG" },
    { name: "Tyrannosaure", img: "dino/tyrannosaure.JPG" },
];

let cardArray = [...dinosaurs, ...dinosaurs.map(dinosaur => ({ name: dinosaur.name, img: dinosaur.img }))]; // Dupliquer le tableau pour créer des paires
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let startTime, timerInterval;

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function createCard(dinosaur) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.innerHTML = `
        <div class="card-inner">
            <div class="card-front">${dinosaur.name}</div>
            <div class="card-back"><img src="${dinosaur.img}" alt="${dinosaur.name}"></div>
        </div>
    `;
    cardElement.addEventListener('click', flipCard);
    return cardElement;
}

function setupBoard() {
    shuffle(cardArray);
    const gameContainer = document.getElementById('gameContainer');
    cardArray.forEach(card => {
        const cardElement = createCard(card);
        gameContainer.appendChild(cardElement);
    });
    startTimer();
}

function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const timerElement = document.getElementById('timer');
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    timerElement.textContent = `Temps écoulé : ${elapsed} secondes`;
}

function stopTimer() {
    clearInterval(timerInterval);
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.querySelector('.card-back img').alt === 
                  secondCard.querySelector('.card-back img').alt;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();

    // Check if all cards are matched
    if (document.querySelectorAll('.card:not(.flipped)').length === 0) {
        stopTimer();
        alert("Bravo! Vous avez terminé le jeu!");
    }
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

document.addEventListener('DOMContentLoaded', setupBoard);
