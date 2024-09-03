import React from "react";
import jobImg from "../../assets/jobImg.jpg";
import { FaBriefcase, FaBuilding } from "react-icons/fa";
import { IoMdPeople } from "react-icons/io";
import { IoIosPersonAdd } from "react-icons/io";
import './Hero.scss'


function Hero() {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <div className="hero-text">
          <h1>Find Your Dream Job</h1>
          <p>
            Explore thousands of job opportunities and take the next step in
            your career.
          </p>
          <button className="hero-button">Get Started</button>
        </div>
        <div className="hero-img">
          <img src={jobImg} alt="" />
        </div>
      </div>
      <div className="hero-icons">
        <div className="icon">
          <FaBriefcase />
          <div className="icon-text">
            <h3>1234</h3>
            <p>Live Jobs</p>
          </div>
        </div>
        <div className="icon">
          <FaBuilding />
          <div className="icon-text">
            <h3>1234</h3>
            <p>Companies</p>
          </div>
        </div>
        <div className="icon">
          <IoMdPeople />
          <div className="icon-text">
            <h3>1234</h3>
            <p>Job Seekers</p>
          </div>
        </div>
        <div className="icon">
          <IoIosPersonAdd />
          <div className="icon-text">
            <h3>1234</h3>
            <p>Employeers</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
