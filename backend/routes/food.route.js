import express from "express";
import { isAdmin, verifyToken } from "../middleware/auth.js";
import upload from "../middleware/cloudinaryupload.js";
import {
  getFoods,
  addFood,
  deleteFood,
  updateFood,
} from "../controllers/food.controller.js";

const foodRouter = express.Router();

foodRouter.get("/", getFoods);
foodRouter.post("/add", verifyToken, isAdmin, upload.single("image"), addFood);
foodRouter.delete("/:id", verifyToken, isAdmin, deleteFood);
foodRouter.put(
  "/update/:fid",
  verifyToken,
  isAdmin,
  upload.single("image"),
  updateFood
);

export default foodRouter;
