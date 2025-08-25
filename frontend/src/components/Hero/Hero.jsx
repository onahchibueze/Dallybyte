import React, { useContext } from "react";
import styles from "./hero.module.css";
import { Link } from "react-router-dom";
import FoodInfo from "../../store/FoodContext";
const Hero = () => {
  const { setSearch, setCategories } = useContext(FoodInfo);
  return (
    <div className={styles.container}>
      <div className={styles.heroHeader}>
        <div className={styles.heroHeading}>
          <h1 className={styles.mainHeading}>
            <p>Electrify</p> your taste buds with...
          </h1>
          <h2 className={styles.subHeading}>Quality fast foods.</h2>
          <h2 className={styles.subHeading}>Delivered to your door steps.</h2>
        </div>
        <Link
          to="/menupage"
          onClick={() => {
            setSearch(null);
            setCategories(null);
          }}
        >
          <button className={styles.btn}> See pricing</button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
