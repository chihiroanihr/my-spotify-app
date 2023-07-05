import Link from "next/link";

import { twMerge } from "tailwind-merge";
import { IconType } from "react-icons";

interface SidebarItemProps {
  icon: IconType;
  label: string;
  active?: boolean;
  href: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon, // to use it as an element
  label,
  active,
  href,
}) => {
  return (
    <Link
      href={href}
      className={twMerge(
        `
        w-full h-auto py-1
        flex flex-row items-center gap-x-4 
        text-md font-medium
        text-neutral-400
        hover:text-white
        transition
        cursor-pointer
        `,
        active && "text-white"
      )}
    >
      <Icon size={26} />
      <p className="w-100 truncate">{label}</p>
    </Link>
  );
};

export default SidebarItem;
