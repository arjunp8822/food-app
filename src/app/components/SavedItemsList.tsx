import React from "react";
import { Item } from "@/app/recipes/create/page";

interface SavedItemsListProps {
  savedItems: Item[];
  removeItem: (index: number) => void;
}

const SavedItemsList: React.FC<SavedItemsListProps> = ({
  savedItems,
  removeItem,
}) => {
  return (
    <ul className="flex flex-col gap-2 mt-4">
      {savedItems.map((item, index) => (
        <li key={index}>
          <div className="flex gap-2 bg-red-50 w-fit">
            <p>{item.name}</p>
            <p>{item.calories.toFixed(0)} kCal</p>
            <button onClick={() => removeItem(index)}>Remove</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SavedItemsList;
