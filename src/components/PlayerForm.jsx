import { useState } from "react";
import { useGameStore } from "../store/gameStore";

export default function PlayerForm() {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  const setPlayers = useGameStore((state) => state.setPlayers);
  const [start, setStart] = useState(false);

  const handleStart = () => {
    setPlayers(player1, player2);
    setStart(true);
  };

  if (start) return null;

  return (
    <div className="flex flex-col items-center gap-3 mb-6">
      <input
        type="text"
        placeholder="Player X Name"
        className="p-2 border rounded"
        value={player1}
        onChange={(e) => setPlayer1(e.target.value)}
      />
      <input
        type="text"
        placeholder="Player O Name"
        className="p-2 border rounded"
        value={player2}
        onChange={(e) => setPlayer2(e.target.value)}
      />
      <button
        onClick={handleStart}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Start Game
      </button>
    </div>
  );
}