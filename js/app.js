import { cardData } from "./components/cardData.js";

//DOM elements

const step = document.querySelector(".step span");
const gameBoard = document.querySelector(".game-board");
let stepValue = 60;

//Counts steps (clicks) in the game
function setSteps() {
  stepValue--;
  if (stepValue < 0) {
    stepValue = 0;
    restartGame();
  }
  step.textContent = stepValue;
}

//Gives button to restart game after all cards are opened
function restartGame() {
  const restartBtn = document.querySelector(".restart-button");
  restartBtn.style.display = "block";
  restartBtn.onclick = () => location.reload();
}

//Sorts cards in random order
function getRandomData() {
  const randomData = cardData.sort(() => Math.random() - 0.5);
  return randomData;
}

//Creates HTML for each card with front and back side using image and name given in card data array
function createCards() {
  const data = getRandomData();

  data.forEach((item) => {
    const card = document.createElement("figure");
    const face = document.createElement("img");
    const back = document.createElement("img");
    card.classList = "card";
    card.setAttribute("title", item.name);
    face.classList = "face";
    back.classList = "back";

    gameBoard.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    face.src = item.src;
    back.src = "../../images/card-back.jpg";
    card.addEventListener("click", flipCard);
  });
}

//Flips card with class toogle -- Runs function to check if cards are matching -- Runs the function to restart game if all cards are matched
function flipCard() {
  setSteps();
  this.classList.toggle("flip-card");
  this.classList.add("opened");
  const openedCards = document.querySelectorAll(".opened");
  const flippedCards = document.querySelectorAll(".flip-card");
  checkIfMatch(openedCards);
  if (flippedCards.length === 16) {
    setTimeout(function () {
      restartGame();
    }, 1000);
  }
}

//Checks if 2 opened cards are matching -- if yes it leaves them opened and remove pointer event -- if not it flips them back
function checkIfMatch(cards) {
  if (cards.length === 2) {
    if (cards[0].getAttribute("title") === cards[1].getAttribute("title")) {
      cards.forEach((card) => {
        card.classList.remove("opened");
        card.style.pointerEvents = "none";
      });
    } else {
      cards.forEach((card) => {
        card.classList.remove("opened");
        setTimeout(function () {
          card.classList.remove("flip-card");
        }, 1500);
      });
    }
  }
}

createCards();
