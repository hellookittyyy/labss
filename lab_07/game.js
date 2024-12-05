const startBalance = 100;
const triesPerRound = 3;
const lowNumber = 1;
const highNumber = 5;
const gameCost = 40;
const winGameAwards = [60, 40, 20];

function startGame() {
  alert("Game started");

  let balance = startBalance;

  while (balance > 0) {
    alert("Balance: " + balance);
    balance -= gameCost;

    const winTry = startRound();
    balance += winTry;

    if (balance <= 0) {
      alert("Game Over! You're out of money!");
      break;
    }

    isContinue = confirm("Do you want to continue?");

    if (!isContinue) {
      alert("Your final balance: " + balance);
      alert("Thanks for playing! Return to us ЩЕ!");
      break;
    }
  }
}

function startRound() {
  const number = Math.floor(Math.random() * highNumber) + lowNumber;
  for (let i = 0; i < triesPerRound; i++) {
    console.log(number);

    answer = askGuess();

    if (answer == number) {
      alert("You won " + winGameAwards[i] + " points!");
      return winGameAwards[i];
    } else {
      alert("You lost! Next round.");
    }
  }

  alert("You are not guess the number!");
  return 0;
}

function askGuess() {
  const answer = prompt(
    "Guess a number between " + lowNumber + " and " + highNumber
  );

  if (answer < lowNumber || answer > highNumber) {
    alert("Please enter a number between " + lowNumber + " and " + highNumber);
    return askGuess();
  }

  return parseInt(answer);
}

startGame();
