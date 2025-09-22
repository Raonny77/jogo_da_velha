var readlinesync = require('readline-sync');

let board = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
let currentPlayer = "X";
let moves = 0;

function printBoard() {
  console.clear();
  console.log(`
 ${board[0]} | ${board[1]} | ${board[2]}
---+---+---
 ${board[3]} | ${board[4]} | ${board[5]}
---+---+---
 ${board[6]} | ${board[7]} | ${board[8]}
`);
}

function checkWin() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], // linhas
    [0,3,6], [1,4,7], [2,5,8], // colunas
    [0,4,8], [2,4,6]           // diagonais
  ];

  return winPatterns.some(pattern =>
    pattern.every(index => board[index] === currentPlayer)
  );
}

function isValidMove(pos) {
  return board[pos] !== "X" && board[pos] !== "O";
}

function playGame() {
  while (true) {
    printBoard();
    let input = readlinesync.question(`Jogador ${currentPlayer}, escolha uma posição (1-9): `);
    let pos = parseInt(input) - 1;

    if (isNaN(pos) || pos < 0 || pos > 8 || !isValidMove(pos)) {
      console.log("Jogada inválida! Fim de jogo.");
      break;
    }

    board[pos] = currentPlayer;
    moves++;

    if (checkWin()) {
      printBoard();
      console.log(`Jogador ${currentPlayer} venceu!`);
      break;
    }

    if (moves === 9) {
      printBoard();
      console.log("Empate! Tabuleiro cheio.");
      break;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

playGame();
