import Cart from "../models/Cart.model.js";
import Order from "../models/Order.model.js";
import User from "../models/User.model.js";

// @desc    Create a new order
// @route   POST /api/orders/ad
// @access  Private
export const addOrder = async (req, res) => {
  const { totalPrice, address, status } = req.body;

  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId });
    const user = await User.findById(userId);

    if (!address) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide address" });
    }

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty", success: false });
    }

    const orders = new Order({
      userId,
      userName: user.name,
      userPhone: user.phone,
      items: cart.items,
      totalPrice,
      address,
      status,
    });

    await orders.save();

    // clear the cart after order
    await Cart.findOneAndUpdate(
      { userId },
      { $set: { items: [] } },
      { new: true }
    );

    res
      .status(201)
      .json({ message: "Order made successfully. Cart cleared", data: orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get all orders (admin only)
// @route   GET /api/orders
// @access  Private/Admin
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res
      .status(200)
      .json({ data: orders, message: "Welcome Dallybyte your orders" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get logged-in user's orders
// @route   GET /api/orders/my
// @access  Private
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id });
    res.status(200).json({ data: orders, message: "Your orders" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Cancel logged-in user's order
// @route   DELETE /api/orders/cancel
// @access  Private
export const cancelOrder = async (req, res) => {
  try {
    const orders = await Order.findOneAndDelete({ userId: req.user.id });

    if (!orders) {
      return res.status(404).json({
        message: "No order found",
        success: false,
      });
    }

    res.status(200).json({ data: orders, message: "Order canceled" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
