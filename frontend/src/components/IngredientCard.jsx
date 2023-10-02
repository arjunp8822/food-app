import React from "react";

const IngredientCard = (props) => {
  return (
    <div className="flex gap-8 bg-card p-2 rounded-2xl justify-between items-center">
      <h2 className="text-sm">{props.result.Name}</h2>
      <div>
        <button
          onClick={() => props.addToRecipe(props.result)}
          className="p-1 rounded-full w-8 h-8 flex justify-center items-center border border-white"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default IngredientCard;
