let players = [];
let currentPlayerIndex = 0;

function initializeMultiplayerGame() {
    players = [];
    currentPlayerIndex = 0;
    const numPlayers = parseInt(numPlayersInput.value, 10);
    playerNamesContainer.querySelectorAll('input').forEach((input, i) => {
        let playerName = input.value.trim().toLowerCase();
        if (badWords.some(badWord => playerName.includes(badWord))) {
            displayErrorMessage(`The name "${input.value}" is not allowed. Please enter a different name.`);
            return;
        }
        if (playerName === "deez nuts" || playerName === "william afton") {
            playerName = "Joel";
        }
        players.push({ name: playerName.charAt(0).toUpperCase() + playerName.slice(1), attempts: 0, bestScore: Infinity });
    });

    secretNumber = Math.floor(Math.random() * (maxNumber + 1));
    gameContainer.style.display = 'block';
    outputMessage.textContent = `${players[currentPlayerIndex].name}, it's your turn to guess a number from 0 to ${maxNumber}.`;
    guessButton.addEventListener('click', handleMultiplayerGuess);
}

function handleMultiplayerGuess() {
    const userGuess = parseInt(guessInput.value, 10);
    if (isNaN(userGuess) || userGuess < 0 || userGuess > maxNumber) {
        outputMessage.textContent = `Please enter a number between 0 and ${maxNumber}.`;
        return;
    }
    players[currentPlayerIndex].attempts++;

    if (userGuess === secretNumber) {
        outputMessage.textContent = `Congratulations, ${players[currentPlayerIndex].name}! You guessed the number in ${players[currentPlayerIndex].attempts} attempts. 🎉`;
        if (players[currentPlayerIndex].attempts < players[currentPlayerIndex].bestScore) {
            players[currentPlayerIndex].bestScore = players[currentPlayerIndex].attempts;
        }
    } else {
        outputMessage.textContent = userGuess < secretNumber
            ? `Too low, ${players[currentPlayerIndex].name}. ⬆️`
            : `Too high, ${players[currentPlayerIndex].name}. ⬇️`;
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
        outputMessage.textContent += ` It's now ${players[currentPlayerIndex].name}'s turn.`;
    }
    guessInput.value = '';
}
