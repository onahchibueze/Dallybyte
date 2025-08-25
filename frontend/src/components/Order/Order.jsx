import React, { useContext, useState } from "react";
import styles from "../Order/order.module.css";
import FoodInfo from "../../store/FoodContext";

const Order = ({ total }) => {
  const { setAddress, address, totalAmount } = useContext(FoodInfo);

  return (
    <div className={styles.orderContainer}>
      <form className={styles.orderForm}>
        <div className={styles.inputGroup}>
          <label htmlFor="address">Delivery Address</label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
      </form>
    </div>
  );
};

export default Order;
