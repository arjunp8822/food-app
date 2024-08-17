import React from "react";
import { getSession } from "@/auth/actions";
import NavbarItems from "./NavbarItems";

const Navbar = async () => {
  const session = await getSession();
  return (
    <div>
      <NavbarItems isLoggedIn={session.isLoggedIn} />
    </div>
  );
};

export default Navbar;
