import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { Song } from "@/types";

// Load images for songs
const useLoadImage = (song: Song) => {
  const supabaseClient = useSupabaseClient();

  // If song does not exist
  if (!song) return null;
  
  // If song exists then fetch its image
  const { data: imageData } = supabaseClient.storage
    .from("images") // from "images" table inside database
    .getPublicUrl(song.image_path); // get image data under the image_path key of the specific song.

  return imageData.publicUrl;
};

export default useLoadImage;
