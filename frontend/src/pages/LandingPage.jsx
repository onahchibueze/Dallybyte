import React from "react";
import LandingPageNav from "../components/LandingPageNav";
import Hero from "../components/Hero";
import Testimonial from "../components/Testimonial";
import Offers from "../components/Offers";
import HeroSec from "../components/HeroSec";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <div>
      <Hero />
      <Testimonial />
      <Offers />
      <HeroSec />
      <Footer />
    </div>
  );
};

export default LandingPage;
