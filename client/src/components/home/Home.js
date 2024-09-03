import React from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import "./Home.scss";
import Hero from "../hero/Hero";
import HowItWorks from "../howItWorks/HowItWorks";
import PopularCategories from "../popularCategories/PopularCategories";
import PopularCompanies from "../popularCompanies/PopularCompanies";

function Home() {
  return (
    <div className="home">
      <div className="home-hero">
        <Hero />
      </div>
      <div className="home-howItWorks">
        <HowItWorks />
      </div>
      <div className="popular-categories">
        <PopularCategories />
      </div>
      <div className="popular-companies">
        <PopularCompanies />
      </div>
    </div>
  );
}

export default Home;
