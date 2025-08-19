import express from "express";
import { isAdmin, verifyToken } from "../middleware/auth.js";
import {
  addOrder,
  getAllOrders,
  getMyOrders,
  cancelOrder,
} from "../controllers/order.controller.js";

const orderRouter = express.Router();

orderRouter.post("/add", verifyToken, addOrder);
orderRouter.get("/", verifyToken, isAdmin, getAllOrders);
orderRouter.get("/my", verifyToken, getMyOrders);
orderRouter.delete("/cancel", verifyToken, cancelOrder);

export default orderRouter;
