let gameBoard = (function () {
  let tiles = [];

  initializeBoard = () => {
    tiles = []
    for (let i = 0; i < 9; i++) {
      tiles.push(0)
    };
  }

  setTile = (tile, num) => {
    tiles[tile] = num;
  }

  checkWin = (num) => {
    if (tiles[0] == num && tiles[1] == num && tiles[2] == num)
      return true;
    if (tiles[3] == num && tiles[4] == num && tiles[5] == num)
      return true;
    if (tiles[6] == num && tiles[7] == num && tiles[8] == num)
      return true;
    if (tiles[1] == num && tiles[4] == num && tiles[7] == num)
      return true;
    if (tiles[0] == num && tiles[3] == num && tiles[6] == num)
      return true;
    if (tiles[2] == num && tiles[5] == num && tiles[8] == num)
      return true;
    if (tiles[0] == num && tiles[4] == num && tiles[8] == num)
      return true;
    if (tiles[2] == num && tiles[4] == num && tiles[6] == num)
      return true;
    return false;
  }

  return {
    initializeBoard, checkWin, setTile
  }
})();

let graphics = (function () {
  let board = document.querySelector('.game-board');

  updateTile = (num, playerNum) => {
    let tile = document.getElementById(num);
    tile.querySelector(`.icon${playerNum}`).style.display = 'block';
  };

  clearBoard = () => {
    document.querySelectorAll('.icon1').forEach(icon => { icon.style.display = 'none' })
    document.querySelectorAll('.icon2').forEach(icon => { icon.style.display = 'none' })
  }

  displayWinner = (winner) => {
    document.querySelector('.winner').innerHTML = 'The winner is player number ' + winner;
  }

  return { updateTile, clearBoard, displayWinner };
})();

let player = (first) => {
  first
  return { first }
}

let game = (function () {
  let player1 = player(true);
  let player2 = player(false);
  let currentPlayer;
  let active = false;
  let listeners = false;

  start = () => {
    graphics.clearBoard();
    gameBoard.initializeBoard();
    currentPlayer = player1;
    active = true;
  }

  round = (tile) => {
    if (currentPlayer.first == true) {
      gameBoard.setTile(tile, 1)
      graphics.updateTile(tile, 1)
    }
    else {
      gameBoard.setTile(tile, 2)
      graphics.updateTile(tile, 2)
    }

    if (currentPlayer == player1)
      currentPlayer = player2;
    else
      currentPlayer = player1;
  }

  victory = () => {
    if (gameBoard.checkWin(1))
      graphics.displayWinner(1)
    if (gameBoard.checkWin(2))
      graphics.displayWinner(2)
    if (gameBoard.checkWin(2) || gameBoard.checkWin(1)) {
      active = false;
    }
  }

  run = () => {
    start();
    if (listeners == false) {
      document.querySelectorAll('.tile').forEach(tile => {
        tile.addEventListener('click', (e) => {
          if (active) {
          round(e.target.id);
          victory()
          }
        })
      })
      listeners = true;
    }
    
  }

  return { run }
})();

let startBtn = document.querySelector('.start')
startBtn.addEventListener('click', () => {
  game.run()
})