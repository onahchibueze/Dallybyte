import React, { useContext, useEffect, useState } from "react";
import styles from "../LandingPageNav/landingPageNav.module.css";
import toggleIcon from "../../images/toggle.svg";
import { Link } from "react-router-dom";
import FoodInfo from "../../store/FoodContext";

const LandingPageNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { setSearch, setCategories } = useContext(FoodInfo);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`${styles.container} ${scrolled ? styles.scrolled : ""}`}>
      <nav className={styles.navContainer}>
        {/* Logo */}
        <Link to="/">
          <h1 className={styles.header}>DallyByte</h1>
        </Link>

        {/* Desktop Menu */}
        <div id="navbar-default" className={styles.hide}>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <a href="" className={styles.a}>
                Home
              </a>
            </li>
            <li
              className={styles.listItem}
              onClick={() => {
                setSearch(null);
                setCategories(null);
              }}
            >
              <a href="/menupage" className={styles.a}>
                Menu
              </a>
            </li>
            {/*
            <li className={styles.listItem}>
              <a href="" className={styles.a}>
                Services
              </a>
            </li>
            <li className={styles.listItem}>
              <a href="" className={styles.a}>
                About us
              </a>
            </li>
            <li className={styles.listItem}>
              <a href="" className={styles.a}>
                Contact
              </a>
            </li>

            */}
          </ul>
        </div>

        {/* Desktop Buttons */}
        <div className={styles.btnContainer}>
          <Link to="/login">
            <button className={styles.btnLogin}>Login</button>
          </Link>
          <Link to="/signup">
            <button className={styles.btn}>Sign up</button>
          </Link>
        </div>

        {/* Toggle Button (mobile only) */}
        <button className={styles.toggle} onClick={() => setIsOpen(!isOpen)}>
          <img src={toggleIcon} alt="Toggle menu" />
        </button>

        {/* Mobile Menu */}
        <div className={`${styles.menu} ${isOpen ? styles.open : ""}`}>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <a href="#" className={styles.a} onClick={() => setIsOpen(false)}>
                Home
              </a>
            </li>
            <li className={styles.listItem}>
              <a
                href="/menupage"
                className={styles.a}
                onClick={() => setIsOpen(false)}
              >
                Menu
              </a>
            </li>
            {/*
            <li className={styles.listItem}>
              <a href="#" className={styles.a} onClick={() => setIsOpen(false)}>
                Services
              </a>
            </li>
            <li className={styles.listItem}>
              <a href="#" className={styles.a} onClick={() => setIsOpen(false)}>
                About us
              </a>
            </li>
            <li className={styles.listItem}>
              <a href="#" className={styles.a} onClick={() => setIsOpen(false)}>
                Contact
              </a>
            </li>
*/}
            <div className={styles.btnContainer}>
              <Link to="/signup">
                <button className={styles.btn} onClick={() => setIsOpen(false)}>
                  Sign up
                </button>
              </Link>
              <Link to="/login">
                <button
                  className={styles.btnLogin}
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </button>
              </Link>
            </div>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default LandingPageNav;
