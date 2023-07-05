"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { twMerge } from "tailwind-merge";
import { FaPlay } from "react-icons/fa";

interface ListItemProps {
  image: string;
  name: string;
  href: string;
}

const ListItem: React.FC<ListItemProps> = ({ image, name, href }) => {
  const router = useRouter();

  const onClick = () => {
    // Authenticate before push
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      className={twMerge(
        "overflow-hidden",
        "relative group",
        "flex items-center",
        "gap-x-4",
        "pr-4",
        "rounded-md",
        "bg-neutral-100/10",
        "hover:bg-neutral-100/20",
        "transition",
        "cursor-pointer"
      )}
    >
      {/* Item Image */}
      <div className={twMerge("relative", "min-h-[64px] min-w-[64px]")}>
        <Image className="object-cover" src={image} fill alt="Image" />
      </div>

      {/* Item Text */}
      <p className="py-5 font-medium truncate">{name}</p>

      {/* Item Play Icon */}
      <div
        className={twMerge(
          "absolute right-5",
          "flex justify-center items-center",
          "p-4",
          "rounded-full",
          "bg-green-500",
          "drop-shadow-md",
          "opacity-0",
          "group-hover:opacity-100",
          "hover:scale-110",
          "transition"
        )}
      >
        <FaPlay className="text-black" />
      </div>
    </button>
  );
};

export default ListItem;
