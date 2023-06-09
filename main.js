// imports
const prompt = require('prompt-sync')();

// GLOBAL
const ROWS = 3;
const COLUMNS = 3;
const SYMBOL_COUNTS = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};
const SYMBOLS_VALUES = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

// 1. Deposit Money
const depositMoney = () => {
  while (true) {
    const depositAmount = prompt('Enter any amount of Virtual Bucks: ');
    const convertedDeposit = parseFloat(depositAmount);

    if (isNaN(convertedDeposit) || convertedDeposit <= 0) {
      console.log('Invalid amount of virtual bucks... Please try again.');
    } else {
      return convertedDeposit;
    }
  }
};

// 2. Determine the number of lines to bet on
const getSelectedLines = () => {
  while (true) {
    const lines = prompt(
      'Enter the number of lines (1-3) you wish to bet on: '
    );
    const convertedLines = parseFloat(lines);

    if (isNaN(convertedLines) || convertedLines < 1 || convertedLines > 3) {
      console.log('Invalid lines chosen... Please try again.');
    } else {
      return convertedLines;
    }
  }
};
// 3. Collect the correct bet amount
const placeBet = (balance, lines) => {
  while (true) {
    const bet = prompt(
      'Enter the amount of virtual bucks per line you would like to bet: '
    );
    const convertedBet = parseFloat(bet);

    // Confirm there is enough money to cover the bet and then update balance
    if (isNaN(convertedBet) || convertedBet <= 0) {
      console.log('You need to bet a valid amount of virtual bucks!');
    } else if (convertedBet > balance) {
      console.log(
        "You don't have enough virtual bucks... enter what you can afford."
      );
    } else {
      return convertedBet;
    }
  }
};

// 4. Spin the slot machine
// 5. Check if the user won
// 6. Adjust money balance
// 7. Play again

let balance = depositMoney();
const lines = getSelectedLines();
const bet = placeBet(balance, lines);
