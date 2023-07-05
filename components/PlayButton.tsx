import { twMerge } from "tailwind-merge";
import { FaPlay } from "react-icons/fa";

const PlayButton = () => {
  return (
    <button
      className={twMerge(
        "flex items-center",
        "p-4",
        "rounded-full",
        "bg-green-500",
        "drop-shadow-md",
        "opacity-0 group-hover:opacity-100", // group hover effect from parent components
        "translate-y-1/4 grou-hover:translate-y-0",
        "hover:scale-110"
      )}
    >
      <FaPlay className="text-black" />
    </button>
  );
};

export default PlayButton;
