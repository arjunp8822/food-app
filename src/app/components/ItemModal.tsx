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
    <div className="mt-2">
      <input
        type="number"
        placeholder="grams"
        className="border p-1"
        value={currentItemWeight}
        onChange={(e) => {
          const value = parseInt(e.target.value);
          onWeightChange(isNaN(value) ? 1 : value);
        }}
        min={1}
      />
      <p>{currentItem.name}</p>
      <p>{currentItemWeight * currentItem.calories}</p>
      <p>{currentItemWeight * currentItem.carbohydrates}</p>
      <p>{currentItemWeight * currentItem.fat}</p>
      <p>{currentItemWeight * currentItem.protein}</p>
      <p>{currentItemWeight * currentItem.sugar}</p>
      <button className="bg-black text-white p-1" onClick={onSave}>
        Add
      </button>
      <button className="bg-gray-200 p-1" onClick={onClear}>
        Clear
      </button>
    </div>
  );
};

export default ItemModal;
