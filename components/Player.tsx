"use client";

import { twMerge } from "tailwind-merge";

import PlayerContent from "./PlayerContent";
import useGetSongById from "@/hooks/useGetSongById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import usePlayer from "@/hooks/usePlayer";

const Player = () => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);
  const songUrl = useLoadSongUrl(song!);

  // If no song / no song url / no active id set then avoid playing song
  if (!song || !songUrl || !player.activeId) return null;

  return (
    <div
      className={twMerge(
        "fixed bottom-0",
        "w-full h-[80px]",
        "px-4 py-2",
        "bg-black"
      )}
    >
      <PlayerContent
        key={songUrl} // trick to reset entire hook (reset / destroy song url)
        song={song}
        songUrl={songUrl}
      />
    </div>
  );
};

export default Player;
