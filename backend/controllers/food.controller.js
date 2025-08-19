import Food from "../models/Food.model.js";
import mongoose from "mongoose";

// ✅ Get all foods
export const getFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).json({ message: "Welcome", data: foods, success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Add new food
export const addFood = async (req, res) => {
  try {
    const { name, price, description, category, ingredients } = req.body;
    const imageUrl = req.file?.path;

    if (!name || !price || !description || !category || !ingredients) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide all fields" });
    }

    const food = new Food({
      name,
      price,
      description,
      category,
      ingredients,
      image: imageUrl,
    });

    await food.save();
    res.status(201).json({
      message: "Product added successfully",
      data: food,
      success: true,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Delete food by id
export const deleteFood = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product Id" });
  }

  try {
    await Food.findByIdAndDelete(id);
    const foods = await Food.find();
    res.status(200).json({ message: "Deleted successfully", data: foods });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Update food by id
export const updateFood = async (req, res) => {
  const { fid } = req.params;
  const { name, price, description, category, ingredients } = req.body;

  if (!mongoose.Types.ObjectId.isValid(fid)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product Id" });
  }

  try {
    const food = await Food.findById(fid);
    const imageUrl = req.file?.path;

    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food not found" });
    }

    if (name) food.name = name;
    if (price) food.price = price;
    if (description) food.description = description;
    if (category) food.category = category;
    if (ingredients) food.ingredients = ingredients;
    if (imageUrl) food.image = imageUrl;

    await food.save();
    res.status(200).json({ message: "Updated successfully", data: food });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
