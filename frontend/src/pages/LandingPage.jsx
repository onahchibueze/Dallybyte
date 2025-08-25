import React from "react";
import LandingPageNav from "../components/LandingPageNav/LandingPageNav";
import Hero from "../components/Hero/Hero";
import Testimonial from "../components/Testimonial/Testimonial";
import Offers from "../components/Offers/Offers";
import HeroSec from "../components/HeroSec/HeroSec";
import Footer from "../components/Footer/Footer";

const LandingPage = () => {
  return (
    <div>
      <Hero />
      <Testimonial />

      <HeroSec />
      <Footer />
    </div>
  );
};

export default LandingPage;
