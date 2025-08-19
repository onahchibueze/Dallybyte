import mongoose from "mongoose";
const getTimeDate = () => {
  const options = { timeZone: "Africa/Lagos" };
  const now = new Date();
  const date = now.toLocaleDateString("en-CA", options);
  const time = now.toLocaleTimeString("en-GB", options);
  return { date, time };
};

const OrderSchema = new mongoose.Schema({
  userId: String,
  userName: String,
  userPhone: Number,

  items: [
    {
      itemId: String,
      quantity: Number,
    },
  ],
  totalPrice: Number,
  address: { type: String, require: true },
  status: { type: Boolean },
  date: { type: String, default: () => getTimeDate().date },
  Time: { type: String, default: () => getTimeDate().time },
});
const Order = mongoose.model("Order", OrderSchema);
export default Order;
