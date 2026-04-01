import Cell from "./Cell";

export default function Board({ board, onMove, active }) {
  return (
    <div
      className={`
        grid grid-cols-3 gap-2 p-3 rounded-lg shadow-md
        ${active ? "bg-purple-200 border-2 border-red-500" : "bg-blue-300 opacity-60"}
      `}
    >
      {board.map((cell, i) => (
        <Cell key={i} value={cell} onClick={() => onMove(i)} />
      ))}
    </div>
  );
}