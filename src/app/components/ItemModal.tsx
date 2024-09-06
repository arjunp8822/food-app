import React, { useState } from "react";
import { Item } from "@/app/components/CreateRecipe";

interface ItemModalProps {
  currentItem: Item | undefined;
  currentItemWeight: number;
  onWeightChange: (val: number) => void;
  onSave: () => void;
  onClear: () => void;
}

const ItemModal: React.FC<ItemModalProps> = ({
  currentItem,
  currentItemWeight,
  onWeightChange,
  onSave,
  onClear,
}) => {
  const [weight, setWeight] = useState<number | string>(currentItemWeight);

  if (!currentItem) return null;

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = parseInt(value, 10);

    if (value === "" || isNaN(numericValue)) {
      setWeight("");
      onWeightChange(0);
    } else {
      setWeight(numericValue);
      onWeightChange(numericValue);
    }
  };

  // Ensure that currentItemWeight is a number
  const weightValue = typeof weight === "number" ? weight : 0;

  return (
    <div className="border shadow-sm p-8 rounded-lg flex flex-col gap-4 w-[400px] bg-white">
      <h1 className="font-semibold">{currentItem.name}</h1>
      <div className="flex flex-col gap-1">
        <label htmlFor="grams" className="font-semibold">
          Enter your weight in grams
        </label>
        <input
          type="number"
          placeholder="grams"
          className="border p-2 rounded-lg"
          value={weight}
          onChange={handleWeightChange}
          min={0}
          id="grams"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <p className="border p-2 rounded-lg bg-gray-100 text-gray-800">
          {Math.round(weightValue * (currentItem.calories || 0))} Calories
        </p>
        <p className="border p-2 rounded-lg text-gray-800">
          {Math.round(weightValue * (currentItem.carbohydrates || 0))}g Carbs
        </p>
        <p className="border p-2 rounded-lg text-gray-800">
          {Math.round(weightValue * (currentItem.fat || 0))}g Fat
        </p>
        <p className="border p-2 rounded-lg text-gray-800">
          {Math.round(weightValue * (currentItem.protein || 0))}g Protein
        </p>
        <p className="border p-2 rounded-lg text-gray-800">
          {Math.round(weightValue * (currentItem.sugar || 0))}g Sugar
        </p>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          className="bg-gray-200 p-2 w-[80px] rounded-lg"
          onClick={onClear}
        >
          Clear
        </button>
        <button
          className="bg-black text-white p-2 w-[80px] rounded-lg"
          onClick={onSave}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default ItemModal;
