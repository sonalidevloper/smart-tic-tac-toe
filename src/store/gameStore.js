import { create } from "zustand";
import { checkWinner } from "../utils/winner";

export const useGameStore = create((set, get) => ({
  boards: Array(9).fill().map(() => Array(9).fill(null)),
  boardWinners: Array(9).fill(null),
  currentPlayer: "X",
  activeBoard: null,
  gameWinner: null,

  makeMove: (b, c) => {
    const { boards, currentPlayer, activeBoard, boardWinners } = get();

    if (activeBoard !== null && activeBoard !== b) return;
    if (boards[b][c]) return;

    const newBoards = boards.map((board, i) =>
      i === b ? board.map((cell, j) => (j === c ? currentPlayer : cell)) : board
    );

    const newBoardWinners = [...boardWinners];

    if (checkWinner(newBoards[b])) {
      newBoardWinners[b] = currentPlayer;
    }

    const globalWinner = checkWinner(newBoardWinners);

    set({
      boards: newBoards,
      boardWinners: newBoardWinners,
      currentPlayer: currentPlayer === "X" ? "O" : "X",
      activeBoard: newBoards[c].every(cell => cell !== null) ? null : c,
      gameWinner: globalWinner,
    });
  },
}));