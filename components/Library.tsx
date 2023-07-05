"use client";

import { twMerge } from "tailwind-merge";
import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";

const Library = () => {
  const authModal = useAuthModal();
  const { user } = useUser();

  const uploadModal = useUploadModal();

  const onClick = () => {
    // First check whether user is logged in or not!
    if (!user) return authModal.onOpen(); // open auth modal

    // TODO: check for subscription

    return uploadModal.onOpen(); // open upload modal
  };

  return (
    <div className="flex flex-col">
      <div
        className={twMerge("pt-4 px-5", "flex items-center justify-between")}
      >
        {/* Icon + Your Library */}
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist className="text-neutral-400" size={26} />
          <p className="text-md font-medium text-neutral-400">Your Library</p>
        </div>

        {/* Add Icon */}
        <AiOutlinePlus
          onClick={onClick}
          size={20}
          className={twMerge(
            "text-neutral-400",
            "hover:text-white",
            "transition",
            "cursor-pointer"
          )}
        />
      </div>

      {/* List of Songs */}
      <div className={twMerge("mt-4 px-3", "flex flex-col gap-y-2")}>
        List of Songs
      </div>
    </div>
  );
};

export default Library;
