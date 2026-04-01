import { create } from "zustand";
import { checkWinner } from "../utils/winner";

// 🔊 Load sound once
const clickSound = new Audio("/sounds/click.mp3");
clickSound.volume = 0.3;

export const useGameStore = create((set, get) => ({
  // 🧠 GAME STATE
  boards: Array(9).fill().map(() => Array(9).fill(null)),
  boardWinners: Array(9).fill(null),
  currentPlayer: "X",
  activeBoard: null,
  gameWinner: null,

  // 👥 PLAYER DATA (NEW)
  players: {
    X: "Player 1",
    O: "Player 2",
  },

  // 🎯 SET PLAYER NAMES (NEW)
  setPlayers: (playerX, playerO) => {
    set({
      players: {
        X: playerX || "Player 1",
        O: playerO || "Player 2",
      },
    });
  },

  // 🎮 MAKE MOVE
  makeMove: (boardIndex, cellIndex) => {
    const {
      boards,
      currentPlayer,
      activeBoard,
      boardWinners,
      gameWinner,
    } = get();

    // ❌ Stop if game finished
    if (gameWinner) return;

    // ❌ Enforce active board rule
    if (activeBoard !== null && activeBoard !== boardIndex) return;

    // ❌ Prevent overwrite
    if (boards[boardIndex][cellIndex]) return;

    // 🔊 SOUND
    try {
      clickSound.currentTime = 0;
      clickSound.play().catch((err) => {
        console.log("Audio play failed:", err);
      });
    } catch (err) {
      console.log("Sound error:", err);
    }

    // 🧩 UPDATE BOARD
    const newBoards = boards.map((board, i) =>
      i === boardIndex
        ? board.map((cell, j) =>
            j === cellIndex ? currentPlayer : cell
          )
        : board
    );

    // 🏆 SMALL BOARD WIN
    const newBoardWinners = [...boardWinners];
    if (checkWinner(newBoards[boardIndex])) {
      newBoardWinners[boardIndex] = currentPlayer;
    }

    // 🌍 GLOBAL WIN
    const globalWinner = checkWinner(newBoardWinners);

    // 🎯 NEXT BOARD LOGIC
    let nextActiveBoard = cellIndex;

    if (newBoards[nextActiveBoard].every(cell => cell !== null)) {
      nextActiveBoard = null;
    }

    // 🔄 UPDATE STATE
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

      // OPTIONAL: keep names OR reset
      // Uncomment below if you want reset names also
      /*
      players: {
        X: "Player 1",
        O: "Player 2",
      }
      */
    });
  },
}));