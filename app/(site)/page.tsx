import { twMerge } from "tailwind-merge";

import PageContent from "./components/PageContent";
import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import getAllSongs from "@/actions/getAllSongs";

export const revalidate = 0; // This page will not be cached, data will always be up-to-date.

export default async function Home() {
  // Fetch all the songs
  const songs = await getAllSongs();

  return (
    <div
      className={twMerge(
        "w-full h-full",
        "overflow-hidden overflow-y-auto",
        "rounded-lg",
        "bg-neutral-900"
      )}
    >
      {/* Header Section */}
      <Header>
        <div className="mb-2">
          {/* Title */}
          <h1 className="font-semibold text-3xl text-white">Welcome back</h1>

          {/* List of Songs */}
          <div
            className={twMerge(
              "grid",
              "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4",
              "gap-3",
              "mt-4"
            )}
          >
            <ListItem
              name="Liked Songs"
              image="/images/liked.png"
              href="liked"
            />
          </div>
        </div>
      </Header>

      {/* Recommended Songs Section */}
      <div className="mt-2 mb-7 px-6">
        {/* Title */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-white">Newest songs</h1>
        </div>

        {/* List of All Songs (fetched from dtabase) */}
        <PageContent songs={songs} />
      </div>
    </div>
  );
}
