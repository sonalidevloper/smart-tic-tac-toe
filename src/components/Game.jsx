import { useGameStore } from "../store/gameStore";
import Board from "./Board";
import logo from "../assets/logo.png";

export default function Game() {
  const { boards, makeMove, activeBoard, gameWinner } = useGameStore();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100"
      style={{
    backgroundImage: "url('/images/bg.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
      <img src={logo} className="w-80 mb-4" />

      <h1 className="text-3xl font-bold mb-6 text-white">
        Smart Tic Tac Toe
      </h1>
      {gameWinner && (
        <h2 className="text-green-500 text-xl mb-4">
          Winner: {gameWinner}
        </h2>
      )}

      {/* MAIN GRID */}
      <div className="grid grid-cols-3 gap-6">
        {boards.map((board, i) => (
          <Board
            key={i}
            board={board}
            active={activeBoard === null || activeBoard === i}
            onMove={(cellIndex) => makeMove(i, cellIndex)}
          />
        ))}
      </div>
    </div>
  );
}