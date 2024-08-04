import Link from "next/link";
import React from "react";
import LogOut from "./LogOut";
import { getSession } from "@/auth/actions";

const Navbar = async () => {
  const session = await getSession();
  return (
    <div className="p-2 flex justify-between">
      <div>
        <Link href="/">Food App</Link>
      </div>
      <ul className="flex gap-4">
        <li>
          <Link href="/recipes/popular">Recipes</Link>
        </li>
        {session.isLoggedIn && (
          <li>
            <Link href="/admin">Admin</Link>
          </li>
        )}
        {session.isLoggedIn && (
          <li>
            <Link href="/profile">Profile</Link>
          </li>
        )}
        {!session.isLoggedIn && (
          <li>
            <Link href="/login">Login</Link>
          </li>
        )}
        {session.isLoggedIn && (
          <li>
            <LogOut />
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
