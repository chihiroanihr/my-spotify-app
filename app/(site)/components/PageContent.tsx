"use client";

import React from "react";
import { twMerge } from "tailwind-merge";

import SongItem from "@/components/SongItem";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types";

interface PageContentProps {
  songs: Song[];
}

const PageContent: React.FC<PageContentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs);

  // If no songs
  if (songs.length === 0) {
    return <div className="mt-4 text-neutral-400">No songs available</div>;
  }

  // If songs exist then display all
  return (
    <div
      className={twMerge(
        "grid",
        "2xl:grid-cols-8 xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 grid-cols-2",
        "gap-4",
        "mt-4"
      )}
    >
      {songs.map((item) => (
        <SongItem
          key={item.id}
          data={item}
          onClick={(id: string) => onPlay(id)}
        />
      ))}
    </div>
  );
};

export default PageContent;
