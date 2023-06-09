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
const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOL_COUNTS)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }
  const reels = [];
  for (let i = 0; i < COLUMNS; i++) {
    reels.push([]);
    const reelSymbols = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelSymbols.length);
      const selectedSymbol = reelSymbols[randomIndex];
      reels[i].push(selectedSymbol);
      reelSymbols.splice(randomIndex, 1);
    }
  }
  return reels;
};

// 5. Check if the user won
const transpose = (reels) => {
  const rows = [];

  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLUMNS; j++) {
      rows[i].push(reels[j][i]);
    }
  }
  return rows;
};

const printRows = (rows) => {
  for (const row of rows) {
    let rowString = '';
    for (const [i, symbol] of row.entries()) {
      rowString += symbol;
      if (i != rows.length - 1) {
        rowString += ' | ';
      }
    }
    console.log(rowString);
  }
};

// 6. Adjust money balance
const getWinnings = (rows, bet, lines) => {
  let winnings = 0;
  // traverse rows and check for identical symbols
  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true;

    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        allSame = false;
        break;
      }
    }

    if (allSame) {
      winnings += bet * SYMBOLS_VALUES[symbols[0]];
    }
  }
  return winnings;
};

// run game
const game = () => {
  let balance = depositMoney();
  while (true) {
    console.log('You have a balance of $' + balance);
    const lines = getSelectedLines();
    const bet = placeBet(balance, lines);
    balance -= bet * lines;
    const reels = spin();
    const rows = transpose(reels);
    printRows(rows);
    const winnings = getWinnings(rows, bet, lines);
    balance += winnings;
    console.log('You won, $' + winnings.toString());

    // 7. Play again
    if (balance <= 0) {
      console.log('You run out of virtual bucks!');
      break;
    }

    const playAgain = prompt('Do you want to play again? (y/n)');
    if (playAgain != 'y') break;
  }
};

game();
