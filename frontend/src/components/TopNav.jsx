import React from "react";
import styles from "../components/admin_nav.module.css";
const TopNav = () => {
  return (
    <div className={styles.topContainer}>
      <div className={styles.topNavContainer}>
        <div className={styles.inputContainer}>
          <input type="text" placeholder="Search" />
        </div>

        {/* Toggle Button */}
      </div>
    </div>
  );
};

export default TopNav;
