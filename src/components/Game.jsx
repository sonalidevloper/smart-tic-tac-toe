import { useGameStore } from "../store/gameStore";
import Board from "./Board";
import logo from "../assets/logo.png";
import PlayerForm from "./PlayerForm";

export default function Game() {
  const {
    boards,
    makeMove,
    activeBoard,
    gameWinner,
    players,
    currentPlayer,
  } = useGameStore();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-gray-100"
      style={{
        backgroundImage: "url('/images/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* LOGO */}
      <img src={logo} className="w-80 mb-4" />

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-4 text-white">
        Smart Tic Tac Toe
      </h1>

      {/* PLAYER INPUT FORM */}
      <PlayerForm />

      {/* TURN DISPLAY */}
      {!gameWinner && (
        <h2 className="text-white text-lg mb-4">
          Turn: {players[currentPlayer]} ({currentPlayer})
        </h2>
      )}

      {/* WINNER */}
      {gameWinner && (
        <h2 className="text-green-400 text-xl mb-4 font-bold">
          Winner: {players[gameWinner]}
        </h2>
      )}

      {/* GAME + SIDE PANEL */}
      <div className="flex gap-8">
        
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

        {/* PLAYER PANEL (LIKE YOUR IMAGE) */}
        <div className="flex flex-col gap-4 justify-start">
          <div className="bg-purple-600 text-white px-6 py-2 rounded-lg shadow">
            {players.X} (X)
          </div>

          <div className="bg-purple-300 text-black px-6 py-2 rounded-lg shadow">
            {players.O} (O)
          </div>
        </div>

      </div>
    </div>
  );
}