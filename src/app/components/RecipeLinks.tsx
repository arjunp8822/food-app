"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const RecipeLinks = () => {
  const pathname = usePathname().split("/")[2];
  return (
    <div className="flex sm:flex-col gap-2 sm:w-[100px] text-gray-500">
      <div
        className={`${
          pathname === "popular"
            ? "bg-gray-100 px-2 py-1 rounded text-black"
            : "px-2 py-1"
        }`}
      >
        <Link href="/recipes/popular">Popular</Link>
      </div>
      <div
        className={`${
          pathname === "mine"
            ? "bg-gray-100 px-2 py-1 rounded text-black"
            : "px-2 py-1"
        }`}
      >
        <Link href="/recipes/mine">Mine</Link>
      </div>
      <div
        className={`${
          pathname === "create"
            ? "bg-gray-100 px-2 py-1 rounded text-black"
            : "px-2 py-1"
        }`}
      >
        <Link href="/recipes/create">Create</Link>
      </div>
    </div>
  );
};

export default RecipeLinks;
