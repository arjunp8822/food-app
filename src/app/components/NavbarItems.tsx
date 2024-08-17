"use client";

import Link from "next/link";
import LogOut from "./LogOut";
import { useState } from "react";
import { usePathname } from "next/navigation";

interface Props {
  isLoggedIn: boolean;
}

const NavbarItems = ({ isLoggedIn }: Props) => {
  const [showMobNav, setShowMobNav] = useState(false);
  const pathname = usePathname().split("/")[1];

  return (
    <nav className="flex p-2 justify-between h-[60px] items-center z-10 border border-b-gray-200 text-gray-500">
      <div className="text-black font-semibold">
        <Link href="/">Food App</Link>
      </div>
      <ul
        className={`flex transition-all duration-500 ease-in-out flex-col gap-4 p-4 w-full h-[calc(100%-60px)] bg-white fixed top-1/2 left-1/2 transform sm:static sm:top-auto sm:left-auto sm:transform-none sm:flex-row sm:h-auto sm:w-auto sm:p-0 z-10 ${
          showMobNav
            ? "opacity-100 -translate-y-[calc(50%-30px)] -translate-x-1/2"
            : "opacity-0 pointer-events-none sm:pointer-events-auto sm:opacity-100 -translate-y-[calc(50%-30px)] -translate-x-full"
        }`}
      >
        <li
          className={`${
            pathname === "recipes"
              ? "underline underline-offset-8 sm:no-underline sm:bg-gray-100 px-2 py-1 rounded text-black"
              : "px-2 py-1"
          }`}
        >
          <Link href="/recipes/popular" onClick={() => setShowMobNav(false)}>
            Recipes
          </Link>
        </li>
        {isLoggedIn && (
          <li
            className={`${
              pathname === "admin"
                ? "underline underline-offset-8 sm:no-underline sm:bg-gray-100 px-2 py-1 rounded text-black"
                : "px-2 py-1"
            }`}
          >
            <Link href="/admin" onClick={() => setShowMobNav(false)}>
              Admin
            </Link>
          </li>
        )}
        {isLoggedIn && (
          <li
            className={`${
              pathname === "profile"
                ? "underline underline-offset-8 sm:no-underline sm:bg-gray-100 px-2 py-1 rounded text-black"
                : "px-2 py-1"
            }`}
          >
            <Link href="/profile" onClick={() => setShowMobNav(false)}>
              Profile
            </Link>
          </li>
        )}
        {!isLoggedIn && (
          <li
            className={`${
              pathname === "login"
                ? "underline underline-offset-8 sm:no-underline sm:bg-gray-100 px-2 py-1 rounded text-black"
                : "px-2 py-1"
            }`}
          >
            <Link href="/login" onClick={() => setShowMobNav(false)}>
              Login
            </Link>
          </li>
        )}
        {isLoggedIn && (
          <li onClick={() => setShowMobNav(false)} className="px-2 py-1">
            <LogOut />
          </li>
        )}
      </ul>
      {/* mobile */}
      <button className="sm:hidden" onClick={() => setShowMobNav(!showMobNav)}>
        Mob
      </button>
    </nav>
  );
};

export default NavbarItems;
