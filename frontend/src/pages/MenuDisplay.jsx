import React from "react";
import { MenuNav } from "../components/Menunav/MenuNav.jsx";
import Display from "../components/Display/Display.jsx";
import { Routes, Route } from "react-router-dom";
import CartPage from "./CartPage";
import Footer from "../components/Footer/Footer.jsx";

const MenuDisplay = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // full screen height
      }}
    >
      <MenuNav />

      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Display />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default MenuDisplay;
