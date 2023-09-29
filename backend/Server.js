const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const SolidIngredient = require("./models/SolidIngredientModel");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/ingredients/solids", async (req, res) => {
  try {
    const solids = await SolidIngredient.find({});
    res.json(solids);
  } catch (e) {
    console.log(e);
  }
});

mongoose.connect(process.env.MONGODB).catch((e) => console.log(e));

app.listen(4000);
