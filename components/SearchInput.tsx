"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import queryString from "query-string";

import Input from "./Input";
import useDebounce from "@/hooks/useDebounce";

const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>("");

  // Avoid re-fetching songs on every single inputs user enters (when user stops typing then re-fetching songs happen)
  const debouncedValue = useDebounce<string>(value, 500);

  useEffect(() => {
    const query = {
      title: debouncedValue,
    };

    // Stringify search result into URL
    const url = queryString.stringifyUrl({
      url: "/search",
      query: query,
    });

    // Change URL
    router.push(url);
  }, [debouncedValue, router]);

  return (
    <Input
      value={value}
      placeholder="What do you want to listen to ?"
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default SearchInput;
