import { checkWinner } from './checkWinner';

export function minimax(board, isMaximizing) {
  const winner = checkWinner(board);
  if (winner === "X") return -10;
  if (winner === "O") return 10;
  if (board.every(cell => cell)) return 0;

  if (isMaximizing) {
    let best = -Infinity;
    board.forEach((cell, i) => {
      if (!cell) {
        board[i] = "O";
        best = Math.max(best, minimax(board, false));
        board[i] = null;
      }
    });
    return best;
  } else {
    let best = Infinity;
    board.forEach((cell, i) => {
      if (!cell) {
        board[i] = "X";
        best = Math.min(best, minimax(board, true));
        board[i] = null;
      }
    });
    return best;
  }
}