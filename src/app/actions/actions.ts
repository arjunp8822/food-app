"use server";

import { getSession } from "@/auth/actions";
import prisma from "../../../db";

export const getAllUsers = async () => {
  const session = await getSession();

  if (session.isLoggedIn && session.isAdmin) {
    const users = await prisma.user.findMany({
      include: {
        _count: {
          select: { recipes: true },
        },
      },
    });
    return users;
  }
};

export const fetchAllRecipes = async () => {
  const recipes = await prisma.recipe.findMany({
    include: {
      author: true,
    },
  });
  console.log(recipes);
  return recipes;
};
