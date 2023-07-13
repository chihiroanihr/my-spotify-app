import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { Song } from "@/types";

const getLikedSongs = async (): Promise<Song[]> => {
  // Create server component superbase client
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  // Get user session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Fetch all liked songs fron current user
  const { data, error } = await supabase
    .from("liked_songs") // from "liked_songs" table in database
    .select("*, songs(*)") // liked_songs table is (foreign key) relational to songs table thus it is necessary
    .eq("user_id", session?.user?.id) // only fetch liked songs from current user
    .order("created_at", { ascending: false });

  // If fetch fails
  if (error) {
    console.log(error);
    return [];
  }

  // If no liked songs from current user
  if (!data) return [];

  // Return liked song info
  return data.map((item) => ({
    ...item.songs,
  }));
};

export default getLikedSongs;
