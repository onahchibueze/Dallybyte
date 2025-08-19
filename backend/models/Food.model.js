import mongoose from "mongoose";

export const FoodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: String,
  description: { type: String, required: true },
  category: { type: String, required: true },
  ingredients: { type: String, required: true },
});
const Food = mongoose.model("Food", FoodSchema);
export default Food;
