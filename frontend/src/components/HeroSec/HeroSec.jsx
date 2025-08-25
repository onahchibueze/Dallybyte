import React, { useContext } from "react";
import styles from "../HeroSec/Herosec.module.css";
import { Link } from "react-router-dom";
import FoodInfo from "../../store/FoodContext";

const HeroSec = () => {
  const { userInfo, setSearch, setCategories } = useContext(FoodInfo);

  return (
    <div>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroHeading}>
            Fast. Fresh. Affordable.
            <span className={styles.highlight}> Delivered to You.</span>
          </h1>
          <p className={styles.heroSub}>
            Order from 100+ weekly fast-food favorites and enjoy the lowest
            delivery fees — only with{" "}
            <span className={styles.brand}>DallyByte</span>.
          </p>
          {!userInfo && <p>🔥 Hungry? Please sign up or log in to order!</p>}
          <Link to="/menupage">
            <button
              className={styles.ctaBtn}
              onClick={() => {
                setSearch(null);
                setCategories(null);
              }}
            >
              Order Now
            </button>
          </Link>
        </div>
      </section>

      {/* Showcase Section */}
      <section className={styles.showcase}>
        <div className={styles.showcaseWrapper}>
          <img
            src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=781&auto=format&fit=crop&ixlib=rb-4.1.0"
            alt="Delicious fast food"
            loading="lazy"
            className={styles.showcaseImg}
          />
          <div className={styles.showcaseText}>
            <h2 className={styles.showcaseHeading}>Delicious, Anytime</h2>
            <p className={styles.showcaseSub}>
              From pizza to shawarma, burgers to doughnuts — get your cravings
              delivered in minutes with{" "}
              <span className={styles.brand}>DallyByte</span>.
            </p>

            <Link to="/menupage">
              <button
                className={styles.ctaBtn}
                onClick={() => {
                  setSearch(null);
                  setCategories(null);
                }}
              >
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSec;
