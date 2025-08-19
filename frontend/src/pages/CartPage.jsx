import React, { useContext, useEffect } from "react";
import FoodInfo from "../store/FoodContext";
import styles from "../components/cartPage.module.css";

import Order from "../components/Order.jsx";
const CartPage = () => {
  const { cart, getCart, deleteCart, addOrder } = useContext(FoodInfo);

  useEffect(() => {
    getCart();
  }, []);

  if (!cart || !cart.data) return <p className={styles.p}>No item in cart</p>;

  const cartItems = cart.data.map((item) => ({
    id: item._id, // unique key
    name: item.food.name,
    price: item.food.price,
    quantity: item.quantity,
    image: item.food.image,
  }));

  console.log(cartItems);
  const handleClick = async (id) => {
    await deleteCart(id);
  };
  const handleAdd = async (total) => {
    await addOrder(total);
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Your Cart</h2>

      <div className={styles.cartContent}>
        <div className={styles.mainContent}>
          {cartItems.map((f) => (
            <div key={f.id} className={styles.contentSub}>
              <div className={styles.flexSub}>
                <div className={styles.imgContainer}>
                  <img src={f.image} alt="" />
                </div>

                <div className={styles.textContainer}>
                  <h3 className={styles.name}>{f.name}</h3>
                  <p> Quantity {f.quantity} </p>
                </div>
              </div>

              <div className={styles.con}>
                <h3>₦{f.price.toLocaleString()}</h3>

                <p onClick={() => handleClick(f.id)}>Remove</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.summary}>
          <Order total={cart.totalAmount} />
          <div>
            <h3>Delivery price:</h3>
            <h3>₦2,000</h3>
          </div>
          <div>
            <h3>Total price of items:</h3>

            <h3>₦{cart.totalAmount.toLocaleString()}</h3>
          </div>
          <div>
            <h3>Subtotal:</h3>
            <h3>₦{(cart.totalAmount + 2000).toLocaleString()}</h3>
          </div>

          <button
            className={styles.btn}
            onClick={() => handleAdd(cart.totalAmount)}
          >
            Place an order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
