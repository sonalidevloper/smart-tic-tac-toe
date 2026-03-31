import Cell from "./Cell";

export default function Board({ board, onMove, active }) {
  return (
    <div
      className={`
        grid grid-cols-3 gap-2 p-3 rounded-lg shadow-md
        ${active ? "bg-white border-2 border-blue-500" : "bg-gray-200 opacity-60"}
      `}
    >
      {board.map((cell, i) => (
        <Cell key={i} value={cell} onClick={() => onMove(i)} />
      ))}
    </div>
  );
}