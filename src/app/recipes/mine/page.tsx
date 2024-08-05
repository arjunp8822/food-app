import { fetchAllRecipesByAuthor } from "@/app/actions/actions";
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
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>{recipe.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyRecipes;
