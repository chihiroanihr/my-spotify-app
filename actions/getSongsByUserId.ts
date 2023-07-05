import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { Song } from "@/types";

const getSongsByUserId = async (): Promise<Song[]> => {
  // Create server component superbase client
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  // Check user logged in
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  // If user not logged in
  if (sessionError) {
    console.log(sessionError.message);
    return [];
  }

  // Fetch all songs that belongs to current user
  const { data, error } = await supabase
    .from("songs") // from "songs" table in database
    .select("*")
    .eq("user_id", sessionData.session?.user.id) // current session equals to specific user_id in database
    .order("created_at", { ascending: false });

  // If fetch fails
  if (error) console.log(error.message);

  // return any data (ideally single data or array of data) or empty array
  return (data as any) || [];
};

export default getSongsByUserId;
