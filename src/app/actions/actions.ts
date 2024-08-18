"use server";

import { getSession } from "@/auth/actions";
import prisma from "../../../db";
import { redirect } from "next/navigation";

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
  return recipes;
};

export const fetchAllRecipesByAuthor = async (author_id: string) => {
  const recipes = await prisma.recipe.findMany({
    where: {
      authorId: author_id,
    },
    include: {
      author: true,
    },
  });
  return recipes;
};

export const saveRecipe = async (recipeData: {
  title: string;
  authorId: string;
  savedItems: { id: number; weight: number }[];
}) => {
  const { title, authorId, savedItems } = recipeData;

  try {
    const recipe = await prisma.recipe.create({
      data: {
        title,
        authorId,
        items: {
          create: savedItems.map((item) => ({
            itemId: item.id,
            weight: item.weight,
          })),
        },
      },
    });

    return recipe;
  } catch (error) {
    console.error("Error saving recipe and items:", error);
    throw error;
  } finally {
    redirect("/recipes/mine");
  }
};
function async() {
  throw new Error("Function not implemented.");
}
