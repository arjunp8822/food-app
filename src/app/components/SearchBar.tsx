import React from "react";
import { Item } from "@/app/recipes/create/page";

interface SearchBarProps {
  searchValue: string;
  onSearchChange: (val: string) => void;
  filteredItems: Item[];
  onItemSelect: (item: Item) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchValue,
  onSearchChange,
  filteredItems,
  onItemSelect,
}) => {
  return (
    <div className="flex gap-2 relative">
      <input
        type="text"
        placeholder="Start searching for an item"
        className="p-2 border w-full rounded-lg"
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      {filteredItems.length > 0 && (
        <ul className="absolute translate-y-12 border z-10 bg-white p-2 rounded-lg flex flex-col gap-1 w-full shadow-sm text-gray-500">
          {filteredItems.map((item) => (
            <li
              key={item.id}
              onClick={() => onItemSelect(item)}
              className="hover:bg-gray-100 transition-all cursor-pointer p-1 rounded"
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
