import Cell from "./Cell";

export default function Board({ board, onMove, active }) {
  return (
    <div className={`grid grid-cols-3 gap-1 p-2 ${active ? "bg-yellow-200" : "bg-gray-200"}`}>
      {board.map((cell, i) => (
        <Cell key={i} value={cell} onClick={() => onMove(i)} />
      ))}
    </div>
  );
}