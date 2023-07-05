"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import uniqid from "uniqid";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { toast } from "react-hot-toast";

import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";

const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const uploadModal = useUploadModal();

  const { user } = useUser();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });

  const onChange = (open: boolean) => {
    // When closing the modal
    if (!open) {
      reset(); // Reset the form
      uploadModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    // Upload to Supabase Database
    try {
      setIsLoading(true);

      const songFile = values.song?.[0];
      const imageFile = values.image?.[0];

      // Validate Inputs
      if (!user || !songFile || !imageFile) {
        toast.error("Missing fields.");
        return; // prevent from further execution
      }

      const uniqueID = uniqid();

      // Upload Song
      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs") // "songs" is a bucket name inside your supabase database
        .upload(`song-${values.title}-${uniqueID}`, songFile, {
          cacheControl: "3600",
          upsert: false, // error thrown if object already exists in DB
        });
      // If failed uploading song
      if (songError) {
        setIsLoading(false);
        return toast.error("Failed to upload the song.");
      }

      // Upload Image
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images") // store inside "image" bucket
          .upload(`image-${values.title}-${uniqueID}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });
      // If failed uploading image
      if (imageError) {
        setIsLoading(false);
        return toast.error("Failed to upload the image.");
      }

      // Insert Query to Song Table
      const { error: supabaseError } = await supabaseClient
        .from("songs") // store inside "songs" table
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          image_path: imageData.path,
          song_path: songData.path,
        });
      // If failed inserting songs to database
      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }

      // Upload Success
      router.refresh();
      setIsLoading(false);
      toast.success("Song successfully created.");
      reset(); // resest form
      uploadModal.onClose(); // close modal
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Add a song"
      description="Upload an MP3 file."
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        {/* Title Field */}
        <Input
          id="title" // Make sure id and register is the same
          placeholder="Song title"
          disabled={isLoading}
          {...register("title", { required: true })} // required prevents from form to be submitted without empty inputs
        />

        {/* Author Field */}
        <Input
          id="author"
          placeholder="Song author"
          disabled={isLoading}
          {...register("author", { required: true })}
        />

        {/* Song File Field */}
        <div>
          <div className="pb-1">Select a song file</div>
          <Input
            id="song"
            type="file"
            accept=".mp3" // only accept MP3 files
            disabled={isLoading}
            {...register("song", { required: true })}
          />
        </div>

        {/* Image Field */}
        <div>
          <div className="pb-1">Select an image</div>
          <Input
            id="image"
            type="file"
            accept="image/*" // only accept any image type files
            disabled={isLoading}
            {...register("image", { required: true })}
          />
        </div>

        {/* Create (submit) Button */}
        <Button type="submit" disabled={isLoading}>
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
