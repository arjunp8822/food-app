import React, { useEffect, useState } from "react";
import axios from "axios";
import IngredientCard from "../components/IngredientCard";
import RecipeCard from "../components/RecipeCard";
import data from "../../../backend/solids.json";

const Home = () => {
  const [solidIngredients, setSolidIngredients] = useState([]);
  const [searchIngredients, setSearchIngredients] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalCarbohydrates, setTotalCarbohydrates] = useState(0);
  const [totalFat, setTotalFat] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);
  const [multiply, setMultiply] = useState(1);

  const fetchIngredients = async () => {
    await setSolidIngredients(data);
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  const searchByIngredient = (e) => {
    setSearchIngredients(e.target.value);
    setSearchResults(
      solidIngredients
        .filter((x) =>
          x.Name.toLowerCase().includes(searchIngredients.toLowerCase())
        )
        .slice(0, 20)
    );
  };

  const addToRecipe = (item) => {
    setRecipe((prev) => [...prev, item]);
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-4 mt-8 mb-8">
        <div className="flex flex-col items-center justify-center border-2 border-calories rounded-full p-4 w-36 h-36">
          <h3 className="text-4xl text-calories">
            {Math.round(totalCalories)}
          </h3>
          <p className="text-sm text-secondary">Calories</p>
        </div>
        <div className="flex flex-row justify-center items-center gap-4">
          <div className="flex flex-col items-center justify-center border-2 border-protein rounded-full p-4 w-24 h-24">
            <h3 className="text-2xl text-protein">
              {Math.round(totalProtein)}
            </h3>
            <p className="text-sm text-secondary">Protein</p>
          </div>
          <div className="flex flex-col items-center justify-center border-2 border-carbs rounded-full p-4 w-24 h-24">
            <h3 className="text-2xl text-carbs">
              {Math.round(totalCarbohydrates)}
            </h3>
            <p className="text-sm text-secondary">Carbs</p>
          </div>
          <div className="flex flex-col items-center justify-center border-2 border-fat rounded-full p-4 w-24 h-24">
            <h3 className="text-2xl text-fat">{Math.round(totalFat)}</h3>
            <p className="text-sm text-secondary">Fat</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 px-4 mb-8">
        {recipe.length > 0 &&
          recipe.map((item) => (
            <RecipeCard
              key={item._id}
              name={item.Name}
              calories={item.Calories}
              kilojoules={item.Kilojoules}
              protein={item.Protein}
              carbohydrates={item.Carbohydrates}
              fat={item.Fat}
              setMultiply={setMultiply}
              totalProtein={totalProtein}
              totalCarbohydrates={totalCarbohydrates}
              totalFat={totalFat}
              totalCalories={totalCalories}
              setTotalProtein={setTotalProtein}
              setTotalCarbohydrates={setTotalCarbohydrates}
              setTotalFat={setTotalFat}
              setTotalCalories={setTotalCalories}
            />
          ))}
      </div>
      <form>
        <div className="px-4">
          <input
            type="text"
            placeholder="Search"
            onChange={searchByIngredient}
            value={searchIngredients}
            className="border px-4 py-2 rounded-2xl w-full mb-8 text-sm"
          />
        </div>
      </form>
      <div className="flex flex-col gap-3 px-4">
        {searchResults?.map((result) => (
          <IngredientCard
            key={result._id}
            result={result}
            addToRecipe={addToRecipe}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
