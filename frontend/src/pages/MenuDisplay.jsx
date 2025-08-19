import React from "react";
import { MenuNav } from "../components/MenuNav";
import Display from "../components/Display";
import { Routes, Route } from "react-router-dom";
import CartPage from "./CartPage";
import Footer from "../components/Footer";
const MenuDisplay = () => {
  return (
    <div>
      <MenuNav />
      <Routes>
        <Route path="/" element={<Display />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default MenuDisplay;
