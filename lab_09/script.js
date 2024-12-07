function startGame(rows, columns) {
  toggleVisibility();
  const rowsText = document.getElementById("rows");
  rowsText.innerHTML = rows;

  const columnsText = document.getElementById("columns");
  columnsText.innerHTML = columns;

  const scoreText = document.getElementById("score");
  scoreText.innerHTML = 0;

  generateField(rows, columns);
}

function finishGame() {
  toggleVisibility();
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateField(rows, columns) {
  const win = document.getElementById("win");
  win.classList.add("hidden");

  openedCards = [];
  const gameField = document.getElementById("game-field");
  const classes = gameField.classList.value.split(" ");

  classes.forEach((className) => {
    if (className !== "game-field") {
      gameField.classList.remove(className);
    }
  });
  gameField.classList.add("r-" + rows);
  gameField.classList.add("c-" + columns);
  gameField.innerHTML = "";

  let cardList = [];
  let usedCards = [];
  let usedCards2 = [];
  const imagesNumber = 16;
  const maxCards = (rows * columns) / 2;
  for (let i = 0; i < maxCards; i++) {
    let cardNumber = getRandomInt(1, imagesNumber);
    while (cardList.includes(cardNumber)) {
      cardNumber = getRandomInt(1, imagesNumber);
    }
    cardList.push(cardNumber);
  }
  console.log(cardList);

  for (let i = 0; i < maxCards; i++) {
    let cardNumber = cardList[getRandomInt(0, maxCards - 1)];
    while (usedCards.includes(cardNumber)) {
      cardNumber = cardList[getRandomInt(0, maxCards - 1)];
    }
    usedCards.push(cardNumber);

    let cardNumber2 = cardList[getRandomInt(0, maxCards - 1)];
    while (
      usedCards2.includes(cardNumber2) ||
      (cardNumber2 === cardNumber && i !== maxCards - 1)
    ) {
      cardNumber2 = cardList[getRandomInt(0, maxCards - 1)];
    }
    usedCards2.push(cardNumber2);

    addCard(cardNumber);
    addCard(cardNumber2);
  }
}

function addCard(cardNumber) {
  const gameField = document.getElementById("game-field");
  const card = document.createElement("div");
  card.classList.add("card");
  card.id = "card";
  card.dataset.card = cardNumber;
  const imageContainer = document.createElement("div");
  const img1 = document.createElement("img");
  const img2 = document.createElement("img");
  img1.src = "images/cat.png";
  img2.src = "images/cat-" + cardNumber + ".png";
  imageContainer.appendChild(img1);
  imageContainer.appendChild(img2);
  card.appendChild(imageContainer);
  gameField.appendChild(card);

  card.onclick = () => flipCard(card);
}

let openedCards = [];
let flipped = false;

function flipCard(elem) {
  if (flipped) {
    return;
  }
  elem.classList.toggle("flipped");
  elem.onclick = null;

  if (openedCards.length < 2) {
    openedCards.push(elem);
  }

  console.log(openedCards);
  if (openedCards.length === 2) {
    flipped = true;
    const scoreText = document.getElementById("score");
    scoreText.innerHTML = parseInt(scoreText.innerHTML) + 1;
    if (openedCards[0].dataset.card === openedCards[1].dataset.card) {
      openedCards[0].classList.add("match");
      openedCards[1].classList.add("match");
      openedCards = [];
      console.log("Meow!");

      flipped = false;
      if (checkWin()) {
        const win = document.getElementById("win");
        win.classList.remove("hidden");
      }
    } else {
      setTimeout(() => {
        const elem1 = openedCards[0];
        const elem2 = openedCards[1];
        elem1.classList.remove("flipped");
        elem2.classList.remove("flipped");
        elem1.onclick = () => flipCard(elem1);
        elem2.onclick = () => flipCard(elem2);
        openedCards = [];
        console.log("Not meow!");

        flipped = false;
      }, 1000);
    }
  }
}

function checkWin() {
  const cards = document.getElementsByClassName("card");
  for (let i = 0; i < cards.length; i++) {
    if (!cards[i].classList.contains("match")) {
      return false;
    }
  }

  return true;
}

function toggleVisibility() {
  const game = document.getElementById("game");
  game.classList.toggle("hidden");

  const level = document.getElementById("level");
  level.classList.toggle("hidden");
}

function restartGame() {
  const rows = parseInt(document.getElementById("rows").innerHTML);
  const columns = parseInt(document.getElementById("columns").innerHTML);

  generateField(rows, columns);
}

function solution() {
  const cards = document.getElementsByClassName("card");
  for (let i = 0; i < cards.length; i++) {
    cards[i].classList.add("match");
    cards[i].onclick = null;
  }
}
