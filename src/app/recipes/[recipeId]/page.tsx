import { fetchRecipeById } from "@/app/actions/actions";
import { notFound } from "next/navigation";
import items from "@/raw/items.json";
import protein from "/public/protein.png";
import carbs from "/public/carbs.png";
import fat from "/public/fat.png";
import Image from "next/image";

interface Props {
  params: {
    recipeId: string;
  };
}

export interface TotalItemProps {
  itemName: string;
  weight: number;
  calories: number;
  protein: number;
  fat: number;
  sugar: number;
  carbs: number;
}

const page = async ({ params }: Props) => {
  const recipe = await fetchRecipeById(params.recipeId);

  if (!recipe) return notFound();

  const ItemList: TotalItemProps[] = [];

  recipe?.items.forEach((i) => {
    const item = items.find((j) => j.id === i.itemId);
    if (item) {
      ItemList.push({
        itemName: item.name,
        weight: i.weight,
        calories: i.weight * item.calories,
        protein: i.weight * item.protein,
        fat: i.weight * item.fat,
        sugar: i.weight * item.sugar,
        carbs: i.weight * item.carbohydrates,
      });
    }
  });

  const totalMacros = {
    calories: recipe.totalCalories,
    protein: recipe.totalProtein,
    fat: recipe.totalFat,
    carbohydrates: recipe.totalCarbohydrates,
  };

  ItemList.forEach((i) => {
    totalMacros.calories += i.calories || 0;
    totalMacros.protein += i.protein || 0;
    totalMacros.fat += i.fat || 0;
    totalMacros.carbohydrates += i.carbs || 0;
  });

  return (
    <div>
      <h1 className="font-semibold capitalize text-lg lg:text-2xl">
        {recipe.title}
      </h1>
      <p className="text-gray-500 mb-8 lg:mb-16">
        Created by {recipe.author.email}
      </p>

      <div className="flex justify-center items-center flex-col lg:flex-row mb-8 lg:mb-16 gap-8">
        <div className="w-full flex justify-center items-center">
          <div className="h-52 w-52 lg:h-72 lg:w-72 bg-gray-800 rounded-full flex justify-center items-center">
            <div className="h-40 w-40 lg:h-60 lg:w-60 bg-white rounded-full flex justify-center items-center flex-col gap-2">
              <span className="text-2xl lg:text-4xl font-semibold">
                {Math.round(totalMacros.calories)}
              </span>
              <span>kCal</span>
            </div>
          </div>
        </div>
        <div className="flex gap-4 lg:gap-12 w-full justify-center items-center lg:justify-start">
          <div className="flex flex-col justify-center items-center relative border w-[100px] h-[100px] p-4 rounded-lg shadow-sm">
            <Image
              src={protein}
              alt="protein image"
              className="w-8 h-8 absolute -top-4 left-1/2 -translate-x-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-0 lg:-left-4 z-10 bg-white"
            />
            <span className="text-lg lg:text-2xl font-semibold">
              {Math.round(totalMacros.protein)}g
            </span>
            <span>Protein</span>
          </div>

          <div className="flex flex-col justify-center items-center relative border w-[100px] h-[100px] p-4 rounded-lg shadow-sm">
            <Image
              src={carbs}
              alt="protein image"
              className="w-8 h-8 absolute -top-4 left-1/2 -translate-x-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-0 lg:-left-4 z-10 bg-white"
            />
            <span className="text-lg lg:text-2xl font-semibold">
              {Math.round(totalMacros.carbohydrates)}g
            </span>
            <span>Carbs</span>
          </div>

          <div className="flex flex-col justify-center items-center relative border w-[100px] h-[100px] p-4 rounded-lg shadow-sm">
            <Image
              src={fat}
              alt="protein image"
              className="w-8 h-8 absolute -top-4 left-1/2 -translate-x-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-0 lg:-left-4 z-10 bg-white"
            />
            <span className="text-lg lg:text-2xl font-semibold">
              {Math.round(totalMacros.fat)}g
            </span>
            <span>Fat</span>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center h-full">
        <div className="w-full max-h-full overflow-y-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="p-2">Items</th>
                <th className="p-2 text-center">Weight</th>
                <th className="p-2 text-center">Calories</th>
                <th className="p-2 text-center">Protein</th>
                <th className="p-2 text-center">Fat</th>
                <th className="p-2 text-center">Sugar</th>
                <th className="p-2 text-center">Carbohydrates</th>
              </tr>
            </thead>
            <tbody>
              {ItemList.map((i) => {
                return (
                  <tr key={i.itemName} className="">
                    <td className="p-2 border-b min-w-[200px]">{i.itemName}</td>
                    <td className="p-2 border-b text-center">
                      {Math.round(i.weight)}g
                    </td>
                    <td className="p-2 border-b text-center">
                      {Math.round(i.calories)}
                    </td>
                    <td className="p-2 border-b text-center">
                      {Math.round(i.protein)}g
                    </td>
                    <td className="p-2 border-b text-center">
                      {Math.round(i.fat)}g
                    </td>
                    <td className="p-2 border-b text-center">
                      {Math.round(i.sugar)}g
                    </td>
                    <td className="p-2 border-b text-center">
                      {Math.round(i.carbs)}g
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default page;
