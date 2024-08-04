"use server";

import { defaultSession, SessionData, sessionOptions } from "@/auth/lib";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "../../db";
let bcrypt = require("bcryptjs");

export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  return session;
};

export const register = async (formData: FormData) => {
  const session = await getSession();

  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  // confirm passwords match

  if (password !== confirmPassword) return { error: "Passwords do not match" };

  // hash password

  let hashedPassword = bcrypt.hashSync(password, 8);

  // find existing user

  const user = await prisma.user.findUnique({
    where: {
      email: username,
    },
  });

  if (user) return { error: "User already exists" };

  // save to DB

  const newUser = await prisma.user.create({
    data: {
      email: username,
      password: hashedPassword,
      isAdmin: false,
    },
  });

  // save to session

  session.userId = newUser.id;
  session.username = newUser.email;
  session.isAdmin = newUser.isAdmin;
  session.isLoggedIn = true;

  await session.save();
  redirect("/");
};

export const login = async (formData: FormData) => {
  const session = await getSession();

  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  // find user

  const user = await prisma.user.findUnique({
    where: {
      email: username,
    },
  });

  console.log(user);

  if (!user) return { error: "Incorrect username or password" };

  // check password

  if (user.password === password) {
    session.userId = user.id;
    session.username = user.email;
    session.isAdmin = user.isAdmin;
    session.isLoggedIn = true;

    await session.save();
    redirect("/");
  } else {
    return { error: "Incorrect username or password" };
  }
};

export const logout = async () => {
  const session = await getSession();
  session.destroy();
  redirect("/");
};
