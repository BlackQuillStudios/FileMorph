let secretNumber;
let attempts = 0;

function initializeSinglePlayerGame() {
    secretNumber = Math.floor(Math.random() * (maxNumber + 1));
    gameContainer.style.display = 'block';
    outputMessage.textContent = `Guess a number from 0 to ${maxNumber}.`;
    guessButton.addEventListener('click', handleSinglePlayerGuess);
}

function handleSinglePlayerGuess() {
    const userGuess = parseInt(guessInput.value, 10);
    if (isNaN(userGuess) || userGuess < 0 || userGuess > maxNumber) {
        outputMessage.textContent = `Please enter a number between 0 and ${maxNumber}.`;
        return;
    }
    attempts++;

    if (userGuess === secretNumber) {
        outputMessage.textContent = `Congratulations! You guessed the number in ${attempts} attempts. 🎉`;
    } else {
        outputMessage.textContent = userGuess < secretNumber ? 'Too low. ⬆️' : 'Too high. ⬇️';
    }
    guessInput.value = '';
}
