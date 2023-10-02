import React, { useEffect, useState } from "react";
import { BsCheckLg } from "react-icons/bs";

const RecipeCard = (props) => {
  const [multiplier, setMultiplier] = useState(1);
  const [oldProtein, setOldProtein] = useState(
    parseFloat(props.protein.toFixed(2))
  );
  const [oldCalories, setOldCalories] = useState(
    parseFloat(props.calories.toFixed(2))
  );
  const [oldCarbohydrates, setOldCarbohydrates] = useState(
    parseFloat(props.carbohydrates.toFixed(2))
  );

  const [oldFat, setOldFat] = useState(parseFloat(props.fat.toFixed(2)));
  const [newProtein, setNewProtein] = useState(
    parseFloat(props.protein.toFixed(2))
  );
  const [newCalories, setNewCalories] = useState(props.calories.toFixed(2));
  const [newCarbohydrates, setNewCarbohydrates] = useState(
    props.carbohydrates.toFixed(2)
  );
  const [newFat, setNewFat] = useState(props.fat.toFixed(2));

  const [showButton, setShowButton] = useState(true);

  const updateHandler = (e) => {
    setMultiplier(e.target.value);
  };

  useEffect(() => {
    setNewProtein(oldProtein * parseFloat(multiplier ? multiplier : 0));
    setNewCarbohydrates(
      oldCarbohydrates * parseFloat(multiplier ? multiplier : 0)
    );
    setNewFat(oldFat * parseFloat(multiplier ? multiplier : 0));
    setNewCalories(oldCalories * parseFloat(multiplier ? multiplier : 0));
  }, [multiplier]);

  const submitHandler = () => {
    props.setTotalProtein(props.totalProtein + newProtein);
    props.setTotalCarbohydrates(props.totalCarbohydrates + newCarbohydrates);
    props.setTotalFat(props.totalFat + newFat);
    props.setTotalCalories(props.totalCalories + newCalories);
    setShowButton(false);
  };

  return (
    <div className="flex rounded-2xl p-2 gap-2 justify-between items-center border">
      <div className="flex flex-col">
        <div className="w-full text-md">{props.name}</div>
        <div className="flex items-center gap-1 text-sm mb-2">
          <h3 className="bg-calories rounded-2xl p-1 text-white text-center">
            {Math.round(newCalories)} kCal
          </h3>
          <h3 className="bg-protein rounded-2xl p-1 text-white text-center">
            {Math.round(newProtein)}g protein
          </h3>
          <h3 className="bg-carbs rounded-2xl p-1 text-white text-center">
            {Math.round(newCarbohydrates)}g carbs
          </h3>
          <h3 className="bg-fat rounded-2xl p-1 text-white text-center">
            {Math.round(newFat)}g fat
          </h3>
        </div>
        <div>
          {showButton && (
            <div className="text-sm">
              Enter weight (g):
              <input
                type="number"
                placeholder="Enter Grams"
                value={multiplier}
                onChange={updateHandler}
                className="border ml-2 rounded-2xl p-2"
              />
            </div>
          )}
        </div>
      </div>
      {showButton && (
        <button
          className="border h-8 w-8 flex justify-center items-center rounded-full"
          onClick={submitHandler}
        >
          <BsCheckLg />
        </button>
      )}
    </div>
  );
};

export default RecipeCard;
