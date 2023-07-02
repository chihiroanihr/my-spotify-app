"use client";

import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { FaUserAlt } from "react-icons/fa";

import Button from "./Button";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter();

  const handleLogout = () => {
    // Implement Handle Logout
  };

  return (
    <div
      className={twMerge(
        "h-fit",
        "p-6",
        "bg-gradient-to-b from-emerald-800",
        className
      )}
    >
      {/* Header Buttons Section */}
      <div
        className={twMerge(
          "w-full",
          "mb-4",
          "flex items-center justify-between"
        )}
      >
        {/* Desktop View */}
        <div className="hidden md:flex gap-x-2 items-center">
          {/* Left (Back) Button */}
          <button
            onClick={() => router.back()}
            className={twMerge(
              "flex items-center justify-center",
              "rounded-full",
              "bg-black",
              "hover:opacity-75",
              "transition",
              "cursor-pointer"
            )}
          >
            <RxCaretLeft className="text-white" size={35} />
          </button>

          {/* Right (Forward) Button */}
          <button
            onClick={() => router.forward()}
            className={twMerge(
              "flex items-center justify-center",
              "rounded-full",
              "bg-black",
              "hover:opacity-75",
              "transition",
              "cursor-pointer"
            )}
          >
            <RxCaretRight className="text-white" size={35} />
          </button>
        </div>

        {/* Mobile View */}
        <div className="flex md:hidden gap-x-2 items-center">
          {/* Home Button */}
          <button
            onClick={() => router.push("/")}
            className={twMerge(
              "flex items-center justify-center",
              "p-2",
              "rounded-full",
              "bg-white",
              "hover:opacity-75",
              "transition",
              "cursor-pointer"
            )}
          >
            <HiHome className="text-black" size={20} />
          </button>

          {/* Search Button */}
          <button
            onClick={() => router.push("/search")}
            className={twMerge(
              "flex items-center justify-center",
              "p-2",
              "rounded-full",
              "bg-white",
              "hover:opacity-75",
              "transition",
              "cursor-pointer"
            )}
          >
            <BiSearch className="text-black" size={20} />
          </button>
        </div>

        {/* Login Section */}
        <div className="flex justify-between items-center gap-x-4">
          {/* Sign up Button */}
          <div>
            <Button
              onClick={() => {}}
              className={twMerge(
                "bg-transparent",
                "font-medium text-neutral-300"
              )}
            >
              {/* !! Text does whitespace-nowrap if we wrap butto with div element*/}
              Sign up
            </Button>
          </div>

          {/* Log in Button */}
          <div>
            <Button
              onClick={() => {}}
              className={twMerge("px-6 py-2", "bg-white")}
            >
              Log in
            </Button>
          </div>
        </div>
      </div>

      {/* Header Content Section */}
      {children}
    </div>
  );
};

export default Header;
