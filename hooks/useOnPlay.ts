import usePlayer from "./usePlayer";
import useAuthModal from "./useAuthModal";
import { useUser } from "./useUser";

import { Song } from "@/types";

const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();
  const authModal = useAuthModal();
  const { user } = useUser();

  const onPlay = (id: string) => {
    // Play music only if client is subscribed / logged in
    if (!user) return authModal.onOpen();

    // play current music
    player.setId(id);
    // queue rest of the musics
    player.setIds(songs.map((song) => song.id));
  };

  return onPlay;
};

export default useOnPlay;
