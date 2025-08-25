import React, { useContext, useState } from "react";
import user from "../../images/user-solid-full (2).svg";
import cart from "../../images/cart-shopping-solid-full.svg";
import searchIcon from "../../images/magnifying-glass-solid-full.svg";
import order from "../../images/bag-shopping-solid-full.svg";
import menuIcon from "../../images/toggle.svg";
import styles from "../Menunav/menu_nav.module.css";
import FoodInfo from "../../store/FoodContext";
import { Link, useNavigate } from "react-router-dom";

export const MenuNav = () => {
  const { search, setSearch, setCategories, userInfo, getProfile, logOut } =
    useContext(FoodInfo);

  const [showFastFoods, setShowFastFoods] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [error, setError] = useState(null); // ✅ Added error state

  // Handle category selection
  const handleCategoryClick = (category) => {
    setCategories(category);
    setMenuOpen(false);
  };
  const navigate = useNavigate();
  // Handle profile dropdown
  const handleClick = async () => {
    try {
      const res = await getProfile();
      setProfileOpen(!profileOpen);
      console.log(res?.data);
    } catch (err) {
      setError("Unable to load profile");
      setProfileOpen(!profileOpen);
    }
  };

  // Handle logout
  const handleLogOut = async () => {
    await logOut();
    navigate("/");
    setProfileOpen(false);
  };

  return (
    <div className={styles.container}>
      {/* Top Navigation */}
      <div className={styles.topNavContainer}>
        <Link to="/">
          <div className={styles.header}>
            <h1 className={styles.heading}>DallyByte</h1>
            <p className={styles.slogan}>electrify your taste buds...</p>
          </div>
        </Link>

        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <img src={searchIcon} alt="Search" className={styles.searchIcon} />
        </div>

        <div className={styles.imgContainer}>
          <img src={user} alt="User" onClick={() => handleClick()} />
          <Link to="cart/">
            <img src={cart} alt="Cart" />
          </Link>
          <img src={order} alt="Orders" />
          <img
            src={menuIcon}
            alt="Menu"
            className={styles.menuIcon}
            onClick={() => setMenuOpen(!menuOpen)}
          />
        </div>
      </div>

      {/* Mobile Categories Menu */}
      <div className={`${styles.menuWrapper} ${menuOpen ? styles.open : ""}`}>
        <ul className={styles.menuList}>
          <Link to="/menupage">
            <li onClick={() => handleCategoryClick(null)}>All</li>
          </Link>
          <li onClick={() => handleCategoryClick("Breakfast")}>Breakfast</li>

          <li
            className={styles.collapsible}
            onClick={() => setShowFastFoods(!showFastFoods)}
          >
            Fast foods {showFastFoods ? "▲" : "▼"}
          </li>
          {showFastFoods && (
            <ul className={styles.subMenu}>
              <li onClick={() => handleCategoryClick("Pizza")}>Pizza</li>
              <li onClick={() => handleCategoryClick("Burger")}>Burger</li>
              <li onClick={() => handleCategoryClick("Shawarma")}>Shawarma</li>
              <li onClick={() => handleCategoryClick("Fried foods")}>
                Fried foods
              </li>
            </ul>
          )}

          <li onClick={() => handleCategoryClick("Pastries")}>Pastries</li>
          <li onClick={() => handleCategoryClick("Drinks")}>Drinks</li>
        </ul>
      </div>

      {/* Desktop Categories Menu */}
      <div className={styles.menu}>
        <ul className={styles.menuList}>
          <Link to="/menupage">
            <li onClick={() => handleCategoryClick(null)}>All</li>
          </Link>
          <li onClick={() => handleCategoryClick("Breakfast")}>Breakfast</li>

          <li
            className={styles.collapsible}
            onClick={() => setShowFastFoods(!showFastFoods)}
          >
            Fast foods {showFastFoods ? "▲" : "▼"}
          </li>
          {showFastFoods && (
            <ul className={styles.subMenu}>
              <li onClick={() => handleCategoryClick("Pizza")}>Pizza</li>
              <li onClick={() => handleCategoryClick("Burger")}>Burger</li>
              <li onClick={() => handleCategoryClick("Shawarma")}>Shawarma</li>
              <li onClick={() => handleCategoryClick("Fried foods")}>
                Fried foods
              </li>
            </ul>
          )}

          <li onClick={() => handleCategoryClick("Pastries")}>Pastries</li>
          <li onClick={() => handleCategoryClick("Drinks")}>Drinks</li>
        </ul>
      </div>

      {/* Profile Dropdown */}
      <div
        className={`${styles.profileContainer} ${
          profileOpen ? styles.profileOpen : ""
        }`}
      >
        {!userInfo ? (
          <div className={styles.signinBox}>
            <h2>Welcome 👋</h2>
            <p>{error || "Please sign in to access your profile."}</p>
            <Link to="/signup">
              <button className={styles.signinBtn}>Sign In</button>
            </Link>
          </div>
        ) : (
          <div className={styles.profile}>
            {/* Avatar */}
            <div className={styles.avatar}>
              {userInfo.name ? userInfo.name[0].toUpperCase() : "U"}
            </div>

            {/* User details */}
            <div className={styles.details}>
              <h1>{userInfo.name}</h1>

              <h3>{userInfo.email}</h3>
            </div>

            <hr className={styles.divider} />

            <button className={styles.logoutBtn} onClick={handleLogOut}>
              Logout
            </button>
            <button
              className={styles.logoutBtn}
              onClick={() => setProfileOpen(!profileOpen)}
            >
              ✖️
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
