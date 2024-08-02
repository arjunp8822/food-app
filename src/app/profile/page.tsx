import { getSession } from "@/auth/actions";
import { redirect } from "next/navigation";
import React from "react";

const ProfilePage = async () => {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect("/login");
  }

  return <div>ProfilePage for {session.username}</div>;
};

export default ProfilePage;
