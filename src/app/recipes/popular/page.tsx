import { fetchAllRecipes } from "@/app/actions/actions";
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
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>{recipe.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default PopularRecipes;
