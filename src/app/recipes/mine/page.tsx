import { fetchAllRecipesByAuthor } from "@/app/actions/actions";
import RecipeCard from "@/app/components/RecipeCard";
import { getSession } from "@/auth/actions";
import { redirect } from "next/navigation";

const MyRecipes = async () => {
  const session = await getSession();

  if (!session.isLoggedIn) {
    return redirect("/login");
  }

  const recipes = await fetchAllRecipesByAuthor(session.userId!);

  return (
    <div>
      <ul className="grid md:grid-cols-2 gap-4">
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <RecipeCard
              title={recipe.title}
              author={recipe.author.email}
              id={recipe.id}
              calories={recipe.totalCalories}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyRecipes;
