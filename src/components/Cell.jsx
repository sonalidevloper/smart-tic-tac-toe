export default function Cell({ value, onClick }) {
  return (
    <div
      onClick={onClick}
      className="w-12 h-12 flex items-center justify-center border text-xl font-bold cursor-pointer hover:bg-blue-200 transition"
    >
      {value}
    </div>
  );
}