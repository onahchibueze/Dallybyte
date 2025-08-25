import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../components/signup.module.css";
import { FoodInfo } from "../store/FoodContext.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import GoogleAuthButton from "../components/GoogleAuthButton.jsx";

const LogIn = () => {
  const navigate = useNavigate();
  const { logIn, setAdmin, setUserInfo } = useContext(FoodInfo);

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(""); // <-- Added state

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 100,
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await logIn(form);
      setForm({ email: "", password: "" });
      console.log(res.data);
      if (res.data.isAdmin) {
        setAdmin(res.data);
        navigate("/adminpage");
      } else {
        setUserInfo(res.data); // <-- Store user info
        navigate("/menupage");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleEmailBlur = () => {
    if (!form.email.includes("@")) {
      setEmailError("Please enter a valid email!");
    } else {
      setEmailError("");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form} data-aos="fade-up">
        <h2 className={styles.formHeading}>Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          onBlur={handleEmailBlur}
          required
        />
        {emailError && <p className={styles.error}>{emailError}</p>}{" "}
        {/* Show error */}
        <div className={styles.inputContainer}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className={styles.togglePassword}
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>
        <button type="submit">Login</button>
        <p className={styles.formHeading}>or</p>
        <GoogleAuthButton />
        <p className={styles.loginLink}>
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default LogIn;
