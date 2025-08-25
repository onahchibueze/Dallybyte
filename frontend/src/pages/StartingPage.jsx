import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./SignUp";
import LandingPage from "./LandingPage";
import LandingPageNav from "../components/LandingPageNav/LandingPageNav";
import LogIn from "./LogIn";

const StartingPage = () => {
  return (
    <>
      <LandingPageNav />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </>
  );
};

export default StartingPage;
