const gameBoard = document.getElementById("gameBoard");

// Simple icons for matching
const icons = ["🍎","🍌","🍇","🍒","🍑","🥝","🍉","🍍"];

// Duplicate + shuffle cards
let cards = [...icons, ...icons]
  .sort(() => Math.random() - 0.5);

let firstCard = null;
let lockBoard = false;

cards.forEach(icon => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.icon = icon;
  card.textContent = "?";

  card.addEventListener("click", () => flipCard(card));
  gameBoard.appendChild(card);
});

function flipCard(card) {
  if (lockBoard || card.classList.contains("flipped")) return;

  card.textContent = card.dataset.icon;
  card.classList.add("flipped");

  if (!firstCard) {
    firstCard = card;
    return;
  }

  checkMatch(card);
}

function checkMatch(secondCard) {
  if (firstCard.dataset.icon === secondCard.dataset.icon) {
    firstCard = null; // keep both flipped
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.textContent = "?";
      secondCard.textContent = "?";
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      firstCard = null;
      lockBoard = false;
    }, 800);
  }
}
