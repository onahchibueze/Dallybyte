import Cart from "../models/Cart.model.js";
import Food from "../models/Food.model.js";
import mongoose from "mongoose";

// GET cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate("items.itemId");

    if (!cart || cart.items.length === 0) {
      return res.status(404).json({
        message: "No items in cart",
        success: false,
        data: [],
      });
    }

    const totalAmount = cart.items.reduce((total, item) => {
      const price = item.itemId?.price || item.food.price;
      return total + price * item.quantity;
    }, 0);

    res.status(200).json({
      data: cart.items,
      totalAmount,
      success: true,
      message: "Your cart",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      success: false,
    });
  }
};

// ADD item to cart
export const addToCart = async (req, res) => {
  const { itemId, quantity } = req.body;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product Id" });
  }

  try {
    const food = await Food.findById(itemId);
    let cart = await Cart.findOne({ userId: req.user.id });
    let existingItem;

    if (!cart) {
      cart = new Cart({
        userId: req.user.id,
        items: [{ itemId, quantity, food: food.toObject() }],
      });
    } else {
      existingItem = cart.items.find(
        (item) => item.itemId.toString() === itemId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ itemId, quantity, food: food.toObject() });
      }
    }

    await cart.save();

    res.status(201).json({
      data: cart,
      success: true,
      message: existingItem
        ? `Updated quantity by +${quantity}`
        : "Item added to cart",
    });
  } catch (error) {
    res.status(500).json({ error: error.message, success: false });
  }
};

// DELETE item from cart
export const deleteCartItem = async (req, res) => {
  const { id } = req.params;

  try {
    const cart = await Cart.findOneAndUpdate(
      { userId: req.user.id },
      { $pull: { items: { _id: id } } }, // 👈 delete by itemId or _id
      { new: true }
    ).populate("items.itemId");

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    const totalAmount = cart.items.reduce((total, item) => {
      const price = item.itemId?.price || item.food.price;
      return total + price * item.quantity;
    }, 0);

    res.json({
      success: true,
      message: "Item removed. Please refresh.",
      data: cart.items,
      totalAmount,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
