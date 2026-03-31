export default function Cell({ value, onClick }) {
  return (
    <div
      onClick={onClick}
      className="
        w-16 h-16 flex items-center justify-center
        bg-white border rounded-md
        text-2xl font-bold
        cursor-pointer
        hover:bg-blue-100
        transition-all duration-200
      "
    >
      {value}
    </div>
  );
}