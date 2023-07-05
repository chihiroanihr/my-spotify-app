import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import getAllSongs from "./getAllSongs";
import { Song } from "@/types";

const getSongsByTitle = async (title: string): Promise<Song[]> => {
  // Create server component superbase client
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  // If there's no title then just fetch all songs as result
  if (!title) {
    const allSongs = await getAllSongs();
    return allSongs;
  }

  // If title entered, fetch songs that matches it
  const { data, error } = await supabase
    .from("songs") // from "songs" table in database
    .select("*")
    .ilike("title", `%${title}%`) // gives you precise search algorithm
    .order("created_at", { ascending: false });

  // If fetch fails
  if (error) console.log(error.message);

  // return any data (ideally single data or array of data) or empty array
  return (data as any) || [];
};

export default getSongsByTitle;
