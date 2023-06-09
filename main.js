const prompt = require('prompt-sync')();

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
// 4. Spin the slot machine
// 5. Check if the user won
// 6. Adjust money balance
// 7. Play again

const wallet = depositMoney();
const chosenLines = getSelectedLines();
