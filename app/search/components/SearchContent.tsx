"use client";

import { twMerge } from "tailwind-merge";

import MediaItem from "@/components/MediaItem";
import LikeButton from "@/components/LikeButton";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types";

interface SearchContentProps {
  songs: Song[];
}

const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs);

  // If no song is found
  if (songs.length === 0)
    return (
      <div
        className={twMerge(
          "flex flex-col gap-y-2",
          "w-full",
          "px-6",
          "text-neutral-400"
        )}
      >
        No songs found
      </div>
    );

  // If songs are found
  return (
    <div className={twMerge("flex flex-col gap-y-2", "w-full", "px-6")}>
      {songs.map((song) => (
        <div
          key={song.id}
          className={twMerge("flex items-center gap-x-4", "w-full")}
        >
          {/* Song Info (image and title) */}
          <div className="flex-1">
            <MediaItem
              data={song}
              onClick={(id: string) => {
                onPlay(id);
              }}
            />
          </div>

          {/* Like Button */}
          <LikeButton songId={song.id} />
        </div>
      ))}
      SearchContent
    </div>
  );
};

export default SearchContent;
