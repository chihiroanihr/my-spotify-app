"use client";

import Image from "next/image";
import { twMerge } from "tailwind-merge";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";

interface MediaItemProps {
  data: Song;
  onClick?: (id: string) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({ data, onClick }) => {
  // Load song image
  const imageUrl = useLoadImage(data);

  const handleClick = () => {
    if (onClick) return onClick(data.id);

    // TODO: Default turn on player
  };

  return (
    <div
      onClick={handleClick}
      className={twMerge(
        "flex items-center gap-x-3",
        "w-ful",
        "p-2",
        "rounded-md",
        "hover:bg-neutral-800/50",
        "cursor-pointer"
      )}
    >
      {/* Song Image */}
      <div
        className={twMerge(
          "relative",
          "overflow-hidden",
          "min-w-[48px] min-h-[48px]",
          "rounded-md"
        )}
      >
        <Image
          className="object-cover"
          src={imageUrl || "/images/liked.png"}
          fill
          alt="Media Item"
        />
      </div>

      {/* Song Title & Author */}
      <div className={twMerge("flex flex-col gap-y-1", "overflow-hidden")}>
        <p className="text-white truncate">{data.title}</p>
        <p className="text-sm text-neutral-400 truncate">{data.author}</p>
      </div>
    </div>
  );
};

export default MediaItem;
