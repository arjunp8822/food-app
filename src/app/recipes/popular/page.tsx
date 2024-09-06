import { fetchAllRecipes } from "@/app/actions/actions";
import RecipeCard from "@/app/components/RecipeCard";
import { getSession } from "@/auth/actions";
import { redirect } from "next/navigation";

const PopularRecipes = async () => {
  const session = await getSession();

  if (!session.isLoggedIn) {
    return redirect("/login");
  }

  const recipes = await fetchAllRecipes();

  return (
    <div>
      <ul className="grid md:grid-cols-2 gap-4">
        {recipes.map((recipe) => {
          console.log(recipe);
          return (
            <li key={recipe.id}>
              <RecipeCard
                title={recipe.title}
                author={recipe.author.email}
                id={recipe.id}
                calories={recipe.totalCalories}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PopularRecipes;
