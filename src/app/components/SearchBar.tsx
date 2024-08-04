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
        className="p-1 border w-[400px]"
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <ul className="absolute bg-red-50 translate-y-12">
        {filteredItems.map((item) => (
          <li key={item.id} onClick={() => onItemSelect(item)}>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
