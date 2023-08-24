"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

import MediaItem from "@/components/MediaItem";
import LikeButton from "@/components/LikeButton";
import { useUser } from "@/hooks/useUser";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types";

interface LikedContentProps {
  songs: Song[];
}

const LikedContent: React.FC<LikedContentProps> = ({ songs }) => {
  const router = useRouter();
  const { isLoading, user } = useUser();

  const onPlay = useOnPlay(songs);

  useEffect(() => {
    // If not logged in / logged out then avoid showing Liked page
    if (!isLoading && !user) router.replace("/"); // redirect to Home
  }, [isLoading, user, router]);

  // If no liked songs
  if (songs.length === 0) {
    return (
      <div
        className={twMerge(
          "flex flex-col gap-y-2",
          "w-full",
          "px-6",
          "text-neutral-400"
        )}
      >
        No liked songs
      </div>
    );
  }

  // If liked songs exist
  return (
    <div className={twMerge("flex flex-col gap-y-2", "w-full", "p-6")}>
      {songs.map((song) => (
        <div
          key={song.id}
          className={twMerge("flex items-center gap-x-4", "w-full")}
        >
          {/* Song Item */}
          <div className="flex-1">
            <MediaItem data={song} onClick={(id: string) => onPlay(id)} />
          </div>

          {/* Liked Icon */}
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};

export default LikedContent;
