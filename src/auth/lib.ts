import { SessionOptions } from "iron-session";

export interface SessionData {
  userId?: string;
  username?: string;
  isAdmin?: boolean;
  isLoggedIn: boolean;
  recipes?: string[];
}

export const defaultSession: SessionData = {
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  password: process.env.SECRET_KEY!,
  cookieName: "ap-session",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
};
