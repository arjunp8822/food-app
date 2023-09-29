const mongoose = require("mongoose");

const SolidIngredientSchema = new mongoose.Schema(
  {
    Name: String,
    Calories: Number,
    Kilojoules: Number,
    Protein: Number,
    Fat: Number,
    Sugars: Number,
    Carbohydrates: Number,
  },
  {
    timestamps: true,
  }
);

const SolidIngredient = mongoose.model(
  "SolidIngredient",
  SolidIngredientSchema
);

module.exports = SolidIngredient;
