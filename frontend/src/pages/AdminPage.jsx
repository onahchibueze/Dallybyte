import React, { useEffect } from "react";
import AdminNav from "../components/AdminNav/AdminNav";
import TopNav from "../components/AdminNav/TopNav";
import styles from "../components/admin.module.css";
import AddPage from "./AddPage";
import { Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const AdminPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in ms
      once: false, // false = animate every time you scroll back
      offset: 100, // start animation before fully in view
    });
  }, []);
  return (
    <div className={styles.grid}>
      <div data-aos="fade-right">
        <AdminNav />
      </div>
      <div data-aos="fade-up" data-aos-delay="200">
        <TopNav />
        <Routes>
          <Route path="/add" element={<AddPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPage;
