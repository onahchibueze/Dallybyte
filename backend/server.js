import express from "express";
import { connectDB } from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
// Routes
import authRouter from "./routes/auth.route.js";
import foodRouter from "./routes/food.route.js";
import cartRouter from "./routes/cart.route.js";
import orderRouter from "./routes/order.route.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
const __dirname = path.resolve();
// Routes
app.use("/api/auth", authRouter);
app.use("/api/products", foodRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`✅ Server started at http://localhost:${PORT}`);
});
