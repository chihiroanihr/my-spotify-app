"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useSessionContext } from "@supabase/auth-helpers-react";
import { toast } from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";

interface LikeButtonProps {
  songId: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ songId }) => {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();

  const authModal = useAuthModal();
  const { user } = useUser();

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // If user not logged in
    if (!user?.id) return;

    // Fetch songs from "liked_songs" table
    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from("liked_songs")
        .select("*")
        .eq("user_id", user.id)
        .eq("song_id", songId)
        .single(); // return data as simple object instead of an array of objects

      // If fetch success
      if (!error && data) setIsLiked(true);
    };

    // Execute
    fetchData();
  }, [songId, supabaseClient, user?.id]);

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  const handleLike = async () => {
    // If user not logged in then open auth modal
    if (!user) return authModal.onOpen();

    // If user already liked the song then unlike the song
    if (isLiked) {
      const { error } = await supabaseClient
        .from("liked_songs")
        .delete() // unlike
        .eq("user_id", user.id)
        .eq("song_id", songId);

      // If unlike fails
      if (error) toast.error(error.message);
      // If unlike success
      else setIsLiked(false);
    }

    // If user did not like the song yet
    else {
      const { error } = await supabaseClient
        .from("liked_songs")
        .insert({ song_id: songId, user_id: user.id }); // insert liked song into table

      // If like fails
      if (error) toast.error(error.message);
      // If like success
      else {
        setIsLiked(true);
        toast.success("Liked!");
      }
    }

    // Refresh the page
    router.refresh();
  };

  return (
    <button onClick={handleLike} className="hover:opacity-75 transition">
      <Icon color={isLiked ? "#22c55e" : "white"} />
    </button>
  );
};

export default LikeButton;
