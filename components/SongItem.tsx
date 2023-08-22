"use client";

import Image from "next/image";

import { twMerge } from "tailwind-merge";

import PlayButton from "./PlayButton";
import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";

interface SongItemProps {
  data: Song;
  onClick: (id: string) => void;
}

const SongItem: React.FC<SongItemProps> = ({ data, onClick }) => {
  const imagePath = useLoadImage(data); // Pass the song (data) as argument

  return (
    <div
      onClick={() => onClick(data.id)}
      className={twMerge(
        "relative group",
        "flex flex-col justify-center items-center",
        "gap-x-4",
        "overflow-hidden",
        "rounded-md",
        "p-3",
        "bg-neutral-400/5 hover:bg-neutral-400/10",
        "transition",
        "cursor-pointer"
      )}
    >
      <div
        className={twMerge(
          "relative",
          "aspect-square",
          "w-full h-full",
          "overflow-hidden",
          "rounded-md"
        )}
      >
        {/* Song Image */}
        <Image
          className="object-cover"
          src={imagePath || "/images/liked.png"}
          fill
          alt="Song Item Image"
        />

        {/* Title and Author */}
        <div
          className={twMerge(
            "flex flex-col items-start",
            "gap-y-1",
            "w-full",
            "pt-4"
          )}
        >
          <p className={twMerge("w-full", "font-semibold truncate")}>
            {data.title}
          </p>
          <p
            className={twMerge(
              "w-full",
              "pb-4",
              "text-sm text-neutral-400 truncate"
            )}
          >
            By {data.author}
          </p>
        </div>

        {/* Song Play Button */}
        <div className="absolute bottom-24 right-5">
          <PlayButton />
        </div>
      </div>
    </div>
  );
};

export default SongItem;
