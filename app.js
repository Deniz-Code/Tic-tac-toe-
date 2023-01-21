/*
1.define the required variables used to track the state of the game

2.store cached element references

3.upon loading the game state should be initialized and a function should be called to render this game state

4.the state of the game should be rendeered to the user

5.defione the required constants

6.handle a player clicking a square with a `handle click`function

7 built the getWinner function

8.create reset functionality

*/

//==================constants==================
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
//===========================Variables====================================
let board;
let turn;
let winner;
let tie;
//===========================cached element references==================
const squareEls = document.querySelectorAll(".square");

const message = document.getElementById("message");
//==================event listeners====================================
let playSquare = document.querySelectorAll(".square");
playSquare.forEach((square) => {
  square.addEventListener("click", handleClick);
});
const buttons = document.querySelector("button");

buttons.addEventListener("click", init);
//==================functions=============================================

init();

function init() {
  board = [null, null, null, null, null, null, null, null, null];
  turn = 1;
  winner = false;
  tie = false;
  render();
}

function render() {
  board.forEach(function (element, index) {
    if (board[index] === 1) {
      squareEls[index].textContent = "X";
    } else if (board[index] === -1) {
      squareEls[index].textContent = "O";
    } else if (board[index] === null) {
      squareEls[index].textContent = "";
    }
  });
  if (!winner && !tie) {
    message.textContent = `its ${turn === 1 ? "x" : "o"} turn`;
  } else if (tie) {
    message.textContent = `Its a tie`;
  } else {
    message.textContent = `${turn === -1 ? "x" : "o"} won !`;
  }
}
function ifTie() {
  if (board.includes(null)) {
    return;
  } else {
    tie = true;
  }
}
function handleClick(evt) {
  console.dir(evt);
  let sqIdx = evt.target.id;
  console.dir(sqIdx);
  if (board[sqIdx] !== null || winner !== false) {
    return;
  } else {
    board[sqIdx] = turn;
    turn *= -1;
  }
  ifTie();
  getWinner();
  render();
}

console.log(turn);

function getWinner() {
  winningCombos.forEach((combo) => {
    if (Math.abs(board[combo[0]] + board[combo[1]] + board[combo[2]]) === 3) {
      winner = true;
    }
  });
}

