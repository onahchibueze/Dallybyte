import React, { useState } from "react";
import styles from "../components/admin_nav.module.css";
import toggleIcon from "../images/toggle.svg";
import { Link } from "react-router-dom";

const AdminNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.heading}>ADMIN</h2>
      </div>
      <ul className={styles.list}>
        <li className={styles.listItem}>👤 Profile</li>
        <li className={styles.listItem}>🍔 Menu</li>
        <li className={styles.listItem}> 🧾 Orders</li>
        <Link to="/adminpage/add">
          <li className={styles.listItem}> ➕ Add products</li>
        </Link>
      </ul>
    </div>
  );
};

export default AdminNav;
