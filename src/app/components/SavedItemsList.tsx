import React from "react";
import { Item } from "@/app/recipes/create/page";
import { IoIosClose } from "react-icons/io";

interface SavedItemsListProps {
  savedItems: Item[];
  removeItem: (index: number) => void;
}

const SavedItemsList: React.FC<SavedItemsListProps> = ({
  savedItems,
  removeItem,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="underline">Your saved ingrdients</h2>
      <ul className="flex gap-2 flex-wrap">
        {savedItems.map((item, index) => (
          <li
            key={index}
            className="flex gap-4 sm:gap-8 border p-2 rounded-lg shadow-sm justify-center"
          >
            <div className="flex flex-col">
              <p>{item.name}</p>
              <p className="text-gray-500">{item.calories.toFixed(0)} kCal</p>
            </div>
            <button onClick={() => removeItem(index)} className="text-lg">
              <IoIosClose />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedItemsList;
