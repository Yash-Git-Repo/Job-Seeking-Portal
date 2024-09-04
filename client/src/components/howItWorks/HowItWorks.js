import React, { useContext } from "react";
import { FaUserPlus } from "react-icons/fa";
import { RiFileSearchFill } from "react-icons/ri";
import { IoMdSend } from "react-icons/io";
import "./HowItWorks.scss";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

function HowItWorks() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  return (
    <div className="how-it-works">
      <div className="container">
        <h3>How this Works?</h3>
        <div className="banner">
          <div
            className="card"
            onClick={() => {
              navigate('/signUp')
            }}
          >
            <FaUserPlus />
            <p>Create Account</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima,
              dolorum?
            </p>
          </div>
          {user && user?.role === "Job Seeker" && (
            <div
              className="card"
              onClick={() => {
                navigate("/getAllJobs");
              }}
            >
              <RiFileSearchFill />
              <p>Find a Job</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Minima, dolorum?
              </p>
            </div>
          )}
          {user && user?.role === "Employeer" && (
            <div
              className="card"
              onClick={() => {
                navigate("/createJob");
              }}
            >
              <IoMdSend />
              <p>Post a Job</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Minima, dolorum?
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
