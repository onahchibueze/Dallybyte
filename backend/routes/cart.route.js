import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  getCart,
  addToCart,
  deleteCartItem,
} from "../controllers/cart.controller.js";

const cartRouter = express.Router();

cartRouter.get("/", verifyToken, getCart);
cartRouter.post("/add", verifyToken, addToCart);
cartRouter.delete("/delete/:id", verifyToken, deleteCartItem);

export default cartRouter;
