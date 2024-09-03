import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { RiFileSearchFill } from "react-icons/ri";
import { IoMdSend } from "react-icons/io";
import './HowItWorks.scss'

function HowItWorks() {
  return (
    <div className="how-it-works">
      <div className="container">
        <h3>How this Works ?</h3>
        <div className="banner">
          <div className="card">
            <FaUserPlus />
            <p>Create Account</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima,
              dolorum?
            </p>
          </div>
          <div className="card">
            <RiFileSearchFill />
            <p>Find a Job / Post a Job</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima,
              dolorum?
            </p>
          </div>
          <div className="card">
            <IoMdSend />
            <p>Find a Job / Post a Job</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima,
              dolorum?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
