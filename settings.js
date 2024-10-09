document.addEventListener('DOMContentLoaded', function() {
    const mainMenu = document.getElementById('main-menu');
    const settingsContainer = document.getElementById('settings-container');
    const gameContainer = document.getElementById('game-container');
    const maxNumberInput = document.getElementById('max-number-input');
    const numPlayersInput = document.getElementById('num-players-input');
    const multiplayerSettings = document.getElementById('multiplayer-settings');
    const playerNamesContainer = document.getElementById('player-names');
    const startGameButton = document.getElementById('start-game-button');
    let maxNumber;
    let gameMode;

    // List of inappropriate names
    const badWords = ["badword1", "fuck", "shit", "bitch", "deez nuts", "william afton"];

    function showSettings(mode) {
        gameMode = mode;
        mainMenu.style.display = 'none';
        settingsContainer.style.display = 'block';
        multiplayerSettings.style.display = gameMode === 'multiplayer' ? 'block' : 'none';
    }

    function startGame() {
        maxNumber = parseInt(maxNumberInput.value, 10);
        if (isNaN(maxNumber) || maxNumber <= 0) {
            displayErrorMessage('Please enter a valid maximum number.');
            return;
        }
        if (gameMode === 'multiplayer') {
            initializeMultiplayerGame();
        } else if (gameMode === 'singleplayer') {
            initializeSinglePlayerGame();
        }
    }

    function createPlayerInputs() {
        playerNamesContainer.innerHTML = '';
        const numPlayers = parseInt(numPlayersInput.value, 10);
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

    document.getElementById('single-player-button').addEventListener('click', () => showSettings('singleplayer'));
    document.getElementById('multiplayer-button').addEventListener('click', () => showSettings('multiplayer'));
    startGameButton.addEventListener('click', startGame);
    numPlayersInput.addEventListener('input', createPlayerInputs);
});
