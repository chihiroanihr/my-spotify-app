"use client";

import { useEffect, useState } from "react";

import { twMerge } from "tailwind-merge";
import useSound from "use-sound";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";

import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import Slider from "./Slider";
import usePlayer from "@/hooks/usePlayer";
import { Song } from "@/types";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  // Play next song
  const onPlayNext = () => {
    if (player.ids.length === 0) return;

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];

    // if next song is the last song in the array then return to first song
    if (!nextSong) return player.setId(player.ids[0]);

    // set next song
    player.setId(nextSong);
  };

  // Play previous song
  const onPlayPrevious = () => {
    if (player.ids.length === 0) return;

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousSong = player.ids[currentIndex - 1];

    // if next song is the first song in the array then return to last song
    if (!previousSong) return player.setId(player.ids[player.ids.length - 1]);

    // set next song
    player.setId(previousSong);
  };

  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false), onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  const togglePlay = () => {
    if (!isPlaying) play();
    else pause();
  };

  const toggleMute = () => {
    if (volume === 0) setVolume(1);
    else setVolume(0);
  };

  return (
    <div className={twMerge("grid", "grid-cols-2 md:grid-cols-3", "h-full")}>
      {/* Song Info */}
      <div className={twMerge("flex justify-start", "w-full")}>
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>

      {/* Mobile View Play Controller */}
      <div
        className={twMerge(
          "md:hidden",
          "col-auto",
          "flex justify-end items-center",
          "w-full"
        )}
      >
        {/* Play Button */}
        <div
          onClick={togglePlay}
          className={twMerge(
            "flex justify-center items-center",
            "w-10 h-10",
            "p-1",
            "rounded-full",
            "bg-white",
            "cursor-pointer"
          )}
        >
          <Icon size={30} className="text-black" />
        </div>
      </div>

      {/* Desktop View Play Controller */}
      <div
        className={twMerge(
          "hidden",
          "md:flex justify-center items-center",
          "gap-x-6",
          "w-full h-full",
          "max-w-[722px]"
        )}
      >
        {/* Backward Button */}
        <AiFillStepBackward
          onClick={onPlayPrevious}
          size={30}
          className={twMerge(
            "text-neutral-400",
            "hover:text-white",
            "transition",
            "cursor-pointer"
          )}
        />
        {/* Play Button */}
        <div
          onClick={togglePlay}
          className={twMerge(
            "flex justify-center items-center",
            "w-10 h-10",
            "p-1",
            "rounded-full",
            "bg-white",
            "cursor-pointer"
          )}
        >
          <Icon size={30} className="text-black" />
        </div>
        {/* Forward Button */}
        <AiFillStepForward
          onClick={onPlayNext}
          size={30}
          className={twMerge(
            "text-neutral-400",
            "hover:text-white",
            "transition",
            "cursor-pointer"
          )}
        />
      </div>

      {/* Volume Adjustment Controller */}
      <div
        className={twMerge("hidden", "md:flex justify-end", "w-full", "pr-2")}
      >
        <div className={twMerge("flex items-center", "gap-x-2", "w-[120px]")}>
          {/* Volume Icon */}
          <VolumeIcon
            onClick={toggleMute}
            size={34}
            className="cursor-pointer"
          />
          <Slider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
