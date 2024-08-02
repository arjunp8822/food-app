import React from "react";
import { fetchAllRecipes } from "../actions/actions";

const Recipes = async () => {
  const recipes = await fetchAllRecipes();
  return (
    <div>
      <h1>Recipe Page</h1>
      <table>
        <thead>
          <tr className="text-left border">
            <th className="p-1 border border-gray-300">Recipe</th>
            <th className="p-1 border border-gray-300">Author</th>
          </tr>
        </thead>
        <tbody>
          {recipes?.map((recipe) => (
            <tr key={recipe.id}>
              <td className="p-1 border border-gray-300">{recipe.title}</td>
              <td className="p-1 border border-gray-300">
                {recipe.author.email}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recipes;
