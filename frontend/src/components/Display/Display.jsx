import React, { useContext, useEffect, useState } from "react";
import FoodInfo from "../../store/FoodContext";
import MenuCard from "../MenuCard/MenuCard";
import styles from "../Display/display.module.css";
import Loader from "../Loader/Loader";

const Display = () => {
  const {
    getItem,
    search,
    foods,
    categories,
    itemId,
    setQuantity,
    quantity,
    addToCart,
    userInfo,
  } = useContext(FoodInfo);

  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    getItem();
  }, []);
  const handleAddToCart = async () => {
    setQuantity(1);
    const res = await addToCart();
    console.log(res.data.items);
  };
  const filteredProducts = Array.isArray(foods)
    ? foods.filter((food) => {
        const matchesSearch = food.name
          .toLowerCase()
          .includes(search?.toLowerCase() || "");
        const matchesCategories = categories
          ? food.category
              .toLowerCase()
              .includes(categories?.toLowerCase() || "")
          : true;
        return matchesSearch && matchesCategories;
      })
    : [];

  const categoryItem = filteredProducts.find((item) => item._id === itemId);

  const handleAdd = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleMinus = () => {
    setQuantity((prev) => (prev > 0 ? prev - 1 : 0));
  };

  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.categoryHeader}>{categories}</h2>
      </div>

      <div className={styles.grid}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <MenuCard
              key={product._id}
              product={product}
              setIsOpen={setIsOpen}
            />
          ))
        ) : (
          <Loader />
        )}

        {categoryItem && (
          <div
            className={`${
              isOpen ? styles.productDetailsContainer : styles.hide
            }`}
          >
            <div className={styles.productDetails}>
              <div className={styles.flex}>
                <div className={styles.imgContainer}>
                  <img src={categoryItem.image} alt={categoryItem.name} />
                </div>
                <div className={styles.pre}>
                  <h3 className={styles.heading}>
                    ₦{categoryItem.price.toLocaleString()}
                  </h3>
                  <div className={styles.cartControls}>
                    <button onClick={handleMinus} disabled={quantity === 1}>
                      -
                    </button>
                    <span>{quantity}</span>
                    <button onClick={handleAdd}>+</button>
                  </div>
                  <button
                    className={styles.addToCartBtn}
                    onClick={handleAddToCart}
                  >
                    Add to cart
                  </button>
                </div>
                <div></div>
                <button
                  className={styles.btn}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  X{" "}
                </button>
              </div>
              <div className={styles.preD}>
                <h1>{categoryItem.name}</h1>
                <hr />
                <span className={styles.span}>
                  <h2>Description</h2>
                  <p>{categoryItem.description}</p>
                </span>
                <hr />
                <span className={styles.span}>
                  <h2>Ingridents</h2>
                  <p>{categoryItem.ingredients}</p>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Display;
