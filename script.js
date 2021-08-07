const player = (player, symbol) => {
    
    const getPlayer = () => player;
    const getSymbol = () => symbol;

    return {
        getPlayer,
        getSymbol
    }
}


const board = (() => {
    let _localArray = ['','','','','','','','',''];
    let _gameWinStatus = false;
    let _gameMove = 0;
    let _winner;
    const _cellArray = document.querySelectorAll('.cell');
    const _gameEntry = document.getElementById('gameEntry');
    const _playerMatch = document.getElementById('playerMatchBtn');
    const resetBtn = document.getElementById('resetBtn');

    const playerOne = player("Player One", "X");
    const playerTwo = player("Player Two", "O");

    _gameEntry.textContent = "Select";
    
    const resetAll = () => {
        // Resetting local variables and game board
        _localArray = ['','','','','','','','',''];
        _cellArray.forEach( (cell,index) => {
            cell.textContent = "";
        }); 
        _gameWinStatus = false;
        _gameMove = 0;
        _gameEntry.style.color = "black";
        _gameEntry.textContent = playerOne.getPlayer()+"'s Move";

    }

    const startGame = () => {

            _gameEntry.textContent = playerOne.getPlayer()+"'s Move";

            // Game Board Event Listener
            _cellArray.forEach( (cell,index) => {
                cell.addEventListener('click',(e) => fillCellandArray(e,index,playerOne, playerTwo));
            }); 

            
        }
    resetBtn.addEventListener('click', resetAll);

    const fillCellandArray = (e,index,playerOne, playerTwo) => {

        if((_gameMove < 9) && !_gameWinStatus){
            
            if(_gameMove%2 == 0){
            // Player 1 Turn
                if( _localArray[index] === ""){

                    _gameMove++;
                    e.target.textContent = playerOne.getSymbol();
                    _localArray[index] = playerOne.getSymbol();
                    _gameWinStatus = _checkWinCondition();

                    if(_gameWinStatus){
                        _gameEntry.style.color = "var(--victory)"
                        _gameEntry.textContent = playerOne.getPlayer() + " Wins";
                    } else {               
                        _gameEntry.textContent = playerTwo.getPlayer()+"'s Move";
                    }

                } else {
                    _gameEntry.textContent = "Try another cell";
                } 
            } else {
            // Player 2 Turn
                if( _localArray[index] === ""){
                    _gameMove++;
                    e.target.textContent = playerTwo.getSymbol();
                    _localArray[index] = playerTwo.getSymbol();
                    _gameWinStatus = _checkWinCondition();

                    if(_gameWinStatus){
                        _gameEntry.style.color = "var(--victory)"
                        _gameEntry.textContent = playerTwo.getPlayer() + " Wins";
                    } else {               
                        _gameEntry.textContent = playerOne.getPlayer()+"'s Move";
                    }
                } else {
                    _gameEntry.textContent = "Try another cell";
                }
            }
        } else if(_gameWinStatus){
            // Game already won
            _gameEntry.style.color = "black";
            _gameEntry.textContent = "Press Reset to Play Again";
        } else {
            // No more turns and no victory. Hence draw
            _gameEntry.textContent = "Draw. Press Reset to Play Again";
        }
    }

    const _checkWinCondition = () => {
        // Game Matrix
        let gameArray = [
                            [0,1,2],
                            [3,4,5],
                            [6,7,8],
                            [0,3,6],
                            [1,4,7],
                            [2,5,8],
                            [0,4,8],
                            [2,4,6]
                        ]

        for(let i =0 ; i<gameArray.length ; i++){
            let flag = 0;
            for(let j=0 ; j<gameArray[i].length-1 ; j++){

                if(_localArray[gameArray[i][j]] == ""){
                    break;
                } else if(_localArray[gameArray[i][j]] != _localArray[gameArray[i][j+1]]){
                    break;
                } else {
                    // Flag for counting if the row|column|diagonal are the same
                    flag++
                }
                
            }
            if(flag == 2){
                return true;
            }
        }
        return false;
    }

    return {
        startGame
    }
})();


board.startGame();