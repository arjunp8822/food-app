"use client";

import { useState } from "react";
import items from "@/raw/items.json";
import SearchBar from "@/app/components/SearchBar";
import ItemModal from "@/app/components/ItemModal";
import SavedItemsList from "@/app/components/SavedItemsList";
import { saveRecipe } from "@/app/actions/actions";

export interface Item {
  id: number;
  name: string;
  calories: number;
  kilojoules: number;
  protein: number;
  fat: number;
  sugar: number;
  carbohydrates: number;
  weight?: number;
}

export interface Recipe {
  name: string;
  authorId: string;
}

interface CreateRecipeProps {
  userId: string | undefined;
}

const CreateRecipe = ({ userId }: CreateRecipeProps) => {
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [currentItem, setCurrentItem] = useState<Item | undefined>(undefined);
  const [alteredItem, setAlteredItem] = useState<Item | undefined>(undefined);
  const [currentItemWeight, setCurrentItemWeight] = useState(1);
  const [savedItems, setSavedItems] = useState<Item[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [recipeName, setRecipeName] = useState("");

  const search = (val: string) => {
    setSearchValue(val);
    if (val) {
      const newItems = items
        .filter((item) => item.name.toLowerCase().includes(val.toLowerCase()))
        .slice(0, 10);
      setFilteredItems(newItems);
    } else {
      setFilteredItems([]);
    }
  };

  const openModal = (val: Item) => {
    setCurrentItem(val);
    setAlteredItem({
      ...val,
      weight: currentItemWeight,
      calories: val.calories * currentItemWeight,
      carbohydrates: val.carbohydrates * currentItemWeight,
      fat: val.fat * currentItemWeight,
      protein: val.protein * currentItemWeight,
      sugar: val.sugar * currentItemWeight,
    });
    setShowModal(true);
    setSearchValue("");
    setFilteredItems([]);
  };

  const saveItem = () => {
    if (alteredItem) {
      setSavedItems((prev) => [...prev, alteredItem]);
      setShowModal(false);
      setCurrentItemWeight(1);
    }
  };

  const handleWeightChange = (val: number) => {
    setCurrentItemWeight(val);
    setAlteredItem(
      currentItem
        ? {
            ...currentItem,
            weight: val,
            calories: currentItem.calories * val,
            carbohydrates: currentItem.carbohydrates * val,
            fat: currentItem.fat * val,
            protein: currentItem.protein * val,
            sugar: currentItem.sugar * val,
          }
        : undefined
    );
  };

  const removeItem = (index: number) => {
    setSavedItems((prev) => prev.filter((_, i) => i !== index));
  };

  const clearItem = () => {
    setCurrentItem(undefined);
    setAlteredItem(undefined);
    setCurrentItemWeight(1);
    setShowModal(false);
  };

  const saveToDB = async () => {
    if (!recipeName) {
      console.error("Recipe name is required.");
      return;
    }

    const recipeData = {
      title: recipeName,
      authorId: userId as string,
      savedItems: savedItems.map((item) => ({
        id: item.id,
        weight: item.weight || 1,
      })),
    };

    try {
      const response = await saveRecipe(recipeData);
      console.log("Recipe saved:", response);
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="font-semibold">
          Enter your recipe name
        </label>
        <input
          type="text"
          placeholder="Chicken leek soup"
          onChange={(e) => setRecipeName(e.target.value)}
          className="border p-2 rounded-lg"
          id="name"
        />
      </div>
      <div className="flex gap-1 flex-col">
        <h2 className="font-semibold">Add raw ingredients to your recipe</h2>
        <SearchBar
          searchValue={searchValue}
          onSearchChange={search}
          filteredItems={filteredItems}
          onItemSelect={openModal}
        />
      </div>

      {showModal && (
        <div className="w-full h-full top-0 left-0 fixed flex justify-center items-center backdrop-blur-sm p-4">
          <ItemModal
            currentItem={currentItem}
            currentItemWeight={currentItemWeight}
            onWeightChange={handleWeightChange}
            onSave={saveItem}
            onClear={clearItem}
          />
        </div>
      )}
      <SavedItemsList savedItems={savedItems} removeItem={removeItem} />
      <button
        onClick={saveToDB}
        className="bg-black text-white p-2 font-semibold w-[120px] rounded-lg"
      >
        Save Recipe
      </button>
    </div>
  );
};

export default CreateRecipe;
