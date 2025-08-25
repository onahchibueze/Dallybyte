import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom"; // make sure react-router-dom is installed
import styles from "../components/signup.module.css";
import FoodInfo from "../store/FoodContext.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import GoogleAuthButton from "../components/GoogleAuthButton.jsx";

const SignUp = () => {
  const { admin } = useContext(FoodInfo);
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in ms
      once: false, // false = animate every time you scroll back
      offset: 100, // start animation before fully in view
    });
  }, []);

  const { signUp } = useContext(FoodInfo);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signUp(form);
      console.log("Server response:", res);
      setForm({
        name: "",
        email: "",
        phone: "",
        password: "",
      });
    } catch (error) {
      console.error("Sign up failed:", error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form} data-aos="fade-up">
        <h2 className={styles.formHeading}>Create an account</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
        />

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

        <button type="submit">Create an account</button>
        <p className={styles.formHeading}>or</p>
        <GoogleAuthButton />
        {/* Already have an account */}
        <p className={styles.loginLink}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
