import React from "react";
import { Item } from "@/app/recipes/create/page";

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
  if (!currentItem) return null;

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
          value={currentItemWeight}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            onWeightChange(isNaN(value) ? 1 : value);
          }}
          min={1}
          id="grams"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <p className="border p-2 rounded-lg bg-gray-100 text-gray-800">
          {Math.round(currentItemWeight * currentItem.calories)} Calories
        </p>
        <p className="border p-2 rounded-lg text-gray-800">
          {Math.round(currentItemWeight * currentItem.carbohydrates)}g Carbs
        </p>
        <p className="border p-2 rounded-lg text-gray-800">
          {Math.round(currentItemWeight * currentItem.fat)}g Fat
        </p>
        <p className="border p-2 rounded-lg text-gray-800">
          {Math.round(currentItemWeight * currentItem.protein)}g Protein
        </p>
        <p className="border p-2 rounded-lg text-gray-800">
          {Math.round(currentItemWeight * currentItem.sugar)}g Sugar
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
