import React from "react";
import styles from "../Footer/footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Brand / About */}
        <div className={styles.footerCol}>
          <h2 className={styles.logo}>Dallybyte</h2>
          <p className={styles.description}>
            Fast. Fresh. Affordable. Get your favorite meals delivered anytime,
            anywhere.
          </p>
        </div>

        {/* Links */}
        <div className={styles.footerCol}>
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/menupage">Menu</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div className={styles.footerCol}>
          <h3>Support</h3>
          <ul>
            <li>
              <a href="/faq">FAQ</a>
            </li>
            <li>
              <a href="/help">Help Center</a>
            </li>
            <li>
              <a href="/terms">Terms & Conditions</a>
            </li>
            <li>
              <a href="/privacy">Privacy Policy</a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className={styles.footerCol}>
          <h3>Stay Updated</h3>
          <form className={styles.newsletter}>
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
          <div className={styles.socials}>
            <a href="#">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      <div className={styles.copy}>
        <p>© {new Date().getFullYear()} STARK. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
