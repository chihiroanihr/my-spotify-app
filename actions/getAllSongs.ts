import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { Song } from "@/types";

const getAllSongs = async (): Promise<Song[]> => {
  // Create server component superbase client
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  // Fetch all songs
  const { data, error } = await supabase
    .from("songs") // from "songs" table in database
    .select("*")
    .order("created_at", { ascending: false });

  // If fetch fails
  if (error) console.log(error);

  // return any data (ideally single data or array of data) or empty array
  return (data as any) || [];
};

export default getAllSongs;
