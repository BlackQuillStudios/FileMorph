document.addEventListener('DOMContentLoaded', function() {
    const mainMenu = document.getElementById('main-menu');
    const gameContainer = document.getElementById('game-container');
    const outputMessage = document.getElementById('output');
    const guessInput = document.getElementById('guess-input');
    const guessButton = document.getElementById('guess-button');
    const scoreboard = document.getElementById('scoreboard');
    const scoreList = document.getElementById('score-list');
    let secretNumber;
    let maxNumber;
    let attempts;
    let players = [];
    let currentPlayerIndex = 0;
    let gameMode;

    function clearOutput() {
        outputMessage.textContent = '';
        guessInput.value = '';
    }

    function showMainMenu() {
        mainMenu.style.display = 'block';
        gameContainer.style.display = 'none';
        scoreboard.style.display = 'block';
        clearOutput();
    }

    function startSinglePlayerGame() {
        gameMode = 'singleplayer';
        mainMenu.style.display = 'none';
        gameContainer.style.display = 'block';
        maxNumber = parseInt(prompt('Enter the maximum number for the guessing game:', '100'), 10);
        secretNumber = Math.floor(Math.random() * (maxNumber + 1));
        attempts = 0;
        clearOutput();
        outputMessage.textContent = `Guess a number from 0 to ${maxNumber}.`;
        updateScoreboard();
    }

    function startMultiplayerGame() {
        gameMode = 'multiplayer';
        maxNumber = parseInt(prompt('Enter the maximum number for the guessing game:', '100'), 10);
        secretNumber = Math.floor(Math.random() * (maxNumber + 1));
        attempts = 0;
        const numPlayers = parseInt(prompt('Enter the number of players:'), 10);

        players = [];
        for (let i = 0; i < numPlayers; i++) {
            const playerName = prompt(`Enter name for Player ${i + 1}:`);
            players.push({ name: playerName, attempts: 0 });
        }

        currentPlayerIndex = 0;
        mainMenu.style.display = 'none';
        gameContainer.style.display = 'block';
        clearOutput();
        outputMessage.textContent = `${players[currentPlayerIndex].name}, it's your turn to guess a number from 0 to ${maxNumber}.`;
        updateScoreboard();
    }

    function updateScoreboard() {
        scoreList.innerHTML = '';
        if (gameMode === 'singleplayer') {
            scoreList.innerHTML += `<li>Attempts: ${attempts}</li>`;
        } else if (gameMode === 'multiplayer') {
            players.forEach(player => {
                scoreList.innerHTML += `<li>${player.name}: ${player.attempts} attempts</li>`;
            });
        }
    }

    guessButton.addEventListener('click', function() {
        const userGuess = parseInt(guessInput.value, 10);

        if (isNaN(userGuess) || userGuess < 0 || userGuess > maxNumber) {
            outputMessage.textContent = `Please enter a number between 0 and ${maxNumber}.`;
            return;
        }

        attempts++;

        if (gameMode === 'singleplayer') {
            if (userGuess === secretNumber) {
                outputMessage.textContent = `Congratulations! You guessed the number in ${attempts} attempts. 🎉`;
            } else if (userGuess < secretNumber) {
                outputMessage.textContent = 'Too low. Try again. ⬇️';
            } else {
                outputMessage.textContent = 'Too high. Try again. ⬆️';
            }
            updateScoreboard();
        } else if (gameMode === 'multiplayer') {
            players[currentPlayerIndex].attempts++;

            if (userGuess === secretNumber) {
                outputMessage.textContent = `Congratulations, ${players[currentPlayerIndex].name}! You guessed the number in ${players[currentPlayerIndex].attempts} attempts. 🎉`;
            } else {
                if (userGuess < secretNumber) {
                    outputMessage.textContent = `Too low, ${players[currentPlayerIndex].name}. Try again. ⬇️`;
                } else {
                    outputMessage.textContent = `Too high, ${players[currentPlayerIndex].name}. Try again. ⬆️`;
                }
                currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
                outputMessage.textContent += ` It's now ${players[currentPlayerIndex].name}'s turn.`;
            }
            updateScoreboard();
        }
    });

    document.getElementById('single-player-button').addEventListener('click', startSinglePlayerGame);
    document.getElementById('multiplayer-button').addEventListener('click', startMultiplayerGame);
    document.getElementById('main-menu-button').addEventListener('click', showMainMenu);

    // Show scoreboard from the beginning
    updateScoreboard();
});
