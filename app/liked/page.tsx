import Image from "next/image";
import { twMerge } from "tailwind-merge";

import LikedContent from "./components/LikedContent";
import Header from "@/components/Header";
import getLikedSongs from "@/actions/getLikedSongs";

export const revalidate = 0; // no cache

const Liked = async () => {
  const songs = await getLikedSongs();

  return (
    <div
      className={twMerge(
        "w-full h-full",
        "overflow-hidden overflow-y-auto",
        "rounded-lg",
        "bg-neutral-900"
      )}
    >
      <Header className="mt-20">
        <div className="flex md:flex-row flex-col items-center gap-x-5">
          {/* Liked Songs Playlist Image */}
          <div className={twMerge("relative", "w-32 h-32", "lg:w-44 lg:h-44")}>
            <Image
              className="object-cover"
              src="/images/liked.png"
              fill
              alt="Playlist"
            />
          </div>

          {/* Liked Songs Playlist Title */}
          <div className={twMerge("flex flex-col gap-y-2", "md:mt-0 mt-4")}>
            <p className={twMerge("md:block hidden", "font-semibold text-sm")}>
              Playlist
            </p>
            <h1 className="font-bold lg:text-7xl sm:text-5xl text-4xl text-white">
              Liked Songs
            </h1>
          </div>
        </div>
      </Header>

      <LikedContent songs={songs} />
    </div>
  );
};

export default Liked;
