import { useGameStore } from "../store/gameStore";
import Board from "./Board";

export default function Game() {
  const { boards, makeMove, activeBoard, gameWinner } = useGameStore();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Master Tic Tac Toe</h1>

      {gameWinner && <h2 className="text-green-600">Winner: {gameWinner}</h2>}

      <div className="grid grid-cols-3 gap-3">
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