import { twMerge } from "tailwind-merge";

import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import SearchContent from "./components/SearchContent";
import getSongsByTitle from "@/actions/getSongsByTitle";

interface SearchProps {
  searchParams: {
    title: string;
  };
}

export const revalidate = 0; // no cache

const Search = async ({ searchParams }: SearchProps) => {
  const songs = await getSongsByTitle(searchParams.title);

  return (
    <div
      className={twMerge(
        "w-full h-full",
        "overflow-hidden overflow-y-auto",
        "rounded-lg",
        "bg-neutral-900"
      )}
    >
      {/* Header */}
      <Header
        className="from-bg-neutral-900" // reset gradient effect when search page opens
      >
        {/* Search Input */}
        <div className={twMerge("flex flex-col gap-y-6", "mb-2")}>
          <h1 className="font-semibold text-3xl text-white">Search</h1>
          <SearchInput />
        </div>
      </Header>

      {/* Search Content (Results) */}
      <SearchContent songs={songs} />
    </div>
  );
};

export default Search;
