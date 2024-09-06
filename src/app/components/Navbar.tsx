import React from "react";
import { getSession } from "@/auth/actions";
import NavbarItems from "./NavbarItems";

const Navbar = async () => {
  const session = await getSession();
  return (
    <div className="text-sm">
      <NavbarItems isLoggedIn={session.isLoggedIn} isAdmin={session.isAdmin!} />
    </div>
  );
};

export default Navbar;
