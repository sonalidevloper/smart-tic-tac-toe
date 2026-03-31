import { create } from "zustand";
import { checkWinner } from "../utils/winner";

// 🔊 Load sound once (global instance)
const clickSound = new Audio("/sounds/click.mp3");
clickSound.volume = 0.3;

export const useGameStore = create((set, get) => ({
  // 🧠 GAME STATE
  boards: Array(9).fill().map(() => Array(9).fill(null)),
  boardWinners: Array(9).fill(null),
  currentPlayer: "X",
  activeBoard: null,
  gameWinner: null,

  // 🎮 MAKE MOVE
  makeMove: (boardIndex, cellIndex) => {
    const { boards, currentPlayer, activeBoard, boardWinners, gameWinner } = get();

    // ❌ Stop if game already finished
    if (gameWinner) return;

    // ❌ Enforce active board rule
    if (activeBoard !== null && activeBoard !== boardIndex) return;

    // ❌ Cell already filled
    if (boards[boardIndex][cellIndex]) return;

    // 🔊 PLAY SOUND (only on valid move)
    try {
      clickSound.currentTime = 0;
      clickSound.play().catch((err) => {
      console.log("Audio play blocked or failed:", err);
      });

    } catch (err) {
      console.log("Sound blocked:", err);
    }

    // 🧩 Create new board state (immutable update)
    const newBoards = boards.map((board, i) =>
      i === boardIndex
        ? board.map((cell, j) =>
            j === cellIndex ? currentPlayer : cell
          )
        : board
    );

    // 🏆 Check small board winner
    const newBoardWinners = [...boardWinners];
    if (checkWinner(newBoards[boardIndex])) {
      newBoardWinners[boardIndex] = currentPlayer;
    }

    // 🌍 Check global winner
    const globalWinner = checkWinner(newBoardWinners);

    // 🎯 Decide next active board
    let nextActiveBoard = cellIndex;

    // If next board is full → free move anywhere
    if (newBoards[nextActiveBoard].every(cell => cell !== null)) {
      nextActiveBoard = null;
    }

    // 🔄 Update state
    set({
      boards: newBoards,
      boardWinners: newBoardWinners,
      currentPlayer: currentPlayer === "X" ? "O" : "X",
      activeBoard: nextActiveBoard,
      gameWinner: globalWinner,
    });
  },

  // 🔁 RESET GAME
  resetGame: () => {
    set({
      boards: Array(9).fill().map(() => Array(9).fill(null)),
      boardWinners: Array(9).fill(null),
      currentPlayer: "X",
      activeBoard: null,
      gameWinner: null,
    });
  },
}));