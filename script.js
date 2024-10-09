document.addEventListener('DOMContentLoaded', function() {
    const mainMenu = document.getElementById('main-menu');
    const settingsContainer = document.getElementById('settings-container');
    const gameContainer = document.getElementById('game-container');
    const outputMessage = document.getElementById('output');
    const guessInput = document.getElementById('guess-input');
    const guessButton = document.getElementById('guess-button');
    const scoreboard = document.getElementById('scoreboard');
    const scoreList = document.getElementById('score-list');
    const maxNumberInput = document.getElementById('max-number-input');
    const numPlayersInput = document.getElementById('num-players-input');
    const multiplayerSettings = document.getElementById('multiplayer-settings');
    const playerNamesContainer = document.getElementById('player-names');
    const startGameButton = document.getElementById('start-game-button');
    let secretNumber;
    let maxNumber;
    let attempts;
    let players = [];
    let currentPlayerIndex = 0;
    let gameMode;

    // Comprehensive bad words list for filtering (partial sample, please expand accordingly)
    const badWords = [
        "badword1", "badword2", "badword3", "deez nuts", "william afton",
        "fuck", "shit", "bitch", "asshole", "dick", "bastard", "cunt", "nigger",
        "motherfucker", "slut", "whore"
    ];

    function clearOutput() {
        outputMessage.textContent = '';
        guessInput.value = '';
    }

    function showMainMenu() {
        mainMenu.style.display = 'block';
        settingsContainer.style.display = 'none';
        gameContainer.style.display = 'none';
        scoreboard.style.display = 'block';
        multiplayerSettings.style.display = 'none';
        playerNamesContainer.innerHTML = '';
        maxNumberInput.value = '';
        numPlayersInput.value = '';
        scoreList.innerHTML = '';
        clearOutput();
    }

    function showSettings(mode) {
        gameMode = mode;
        mainMenu.style.display = 'none';
        settingsContainer.style.display = 'block';
        if (gameMode === 'multiplayer') {
            multiplayerSettings.style.display = 'block';
        }
    }

    function startGame() {
        maxNumber = parseInt(maxNumberInput.value, 10);
        if (isNaN(maxNumber) || maxNumber <= 0) {
            displayErrorMessage('Please enter a valid maximum number.');
            return;
        }

        if (gameMode === 'multiplayer') {
            const numPlayers = parseInt(numPlayersInput.value, 10);
            if (isNaN(numPlayers) || numPlayers <= 0) {
                displayErrorMessage('Please enter a valid number of players.');
                return;
            }

            players = [];
            let validNames = true;
            playerNamesContainer.querySelectorAll('input').forEach((input, i) => {
                let playerName = input.value.trim().toLowerCase();

                // Bad word filter and specific name check
                if (badWords.some(badWord => playerName.includes(badWord))) {
                    displayErrorMessage(`The name "${input.value}" is not allowed. Please enter a different name.`);
                    validNames = false;
                } else if (playerName === "deez nuts" || playerName === "william afton") {
                    playerName = "Joel";
                }

                players.push({ name: playerName.charAt(0).toUpperCase() + playerName.slice(1), attempts: 0, bestScore: Infinity });
            });

            if (!validNames) {
                return;
            }
        }

        secretNumber = Math.floor(Math.random() * (maxNumber + 1));
        attempts = 0;
        currentPlayerIndex = 0;

        settingsContainer.style.display = 'none';
        gameContainer.style.display = 'block';
        clearOutput();
        if (gameMode === 'singleplayer') {
            outputMessage.textContent = `Guess a number from 0 to ${maxNumber}.`;
        } else {
            outputMessage.textContent = `${players[currentPlayerIndex].name}, it's your turn to guess a number from 0 to ${maxNumber}.`;
        }
        updateScoreboard();
    }

    function updateScoreboard() {
        scoreList.innerHTML = '';
        if (gameMode === 'singleplayer') {
            scoreList.innerHTML += `<li>Best Score: ${attempts > 0 ? attempts : 'N/A'}</li>`;
        } else if (gameMode === 'multiplayer') {
            players.forEach((player, index) => {
                let listItem = document.createElement('li');
                listItem.textContent = `${player.name}: Attempts - ${player.attempts}, Best Score - ${player.bestScore === Infinity ? 'N/A' : player.bestScore}`;
                if (index === currentPlayerIndex) {
                    listItem.classList.add('active');
                }
                scoreList.appendChild(listItem);
            });
        }
    }

    function createPlayerInputs() {
        const numPlayers = parseInt(numPlayersInput.value, 10);
        playerNamesContainer.innerHTML = '';
        if (!isNaN(numPlayers) && numPlayers > 0) {
            for (let i = 0; i < numPlayers; i++) {
                const input = document.createElement('input');
                input.type = 'text';
                input.placeholder = `Player ${i + 1} name`;
                input.id = `player-name-${i}`;
                playerNamesContainer.appendChild(input);
                playerNamesContainer.appendChild(document.createElement('br'));
            }
        }
    }

    function displayErrorMessage(message) {
        let errorMessage = document.getElementById('error-message');
        if (!errorMessage) {
            errorMessage = document.createElement('p');
            errorMessage.id = 'error-message';
            errorMessage.style.color = 'red';
            settingsContainer.appendChild(errorMessage);
        }
        errorMessage.textContent = message;
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
                if (players[currentPlayerIndex].attempts < players[currentPlayerIndex].bestScore) {
                    players[currentPlayerIndex].bestScore = players[currentPlayerIndex].attempts;
                }
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

        // Clear the input field after each guess
        guessInput.value = '';
    });

    document.getElementById('single-player-button').addEventListener('click', () => showSettings('singleplayer'));
    document.getElementById('multiplayer-button').addEventListener('click', () => showSettings('multiplayer'));
    startGameButton.addEventListener('click', startGame);
    numPlayersInput.addEventListener('input', createPlayerInputs);
    document.getElementById('main-menu-button').addEventListener('click', showMainMenu);

    // Show scoreboard from the beginning
    updateScoreboard();
});
