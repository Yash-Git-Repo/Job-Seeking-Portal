import React from "react";
import { Link } from "react-router-dom";
// import {
//   AiOutlineFacebook,
//   AiOutlineInstagram,
//   AiOutlineMail,
//   AiOutlineTwitter,
// } from "react-icons/ai";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <p>&copy; 2024 MyApp. All rights reserved.</p>
      </div>
      {/* <div className="footer-right">
        <h3 className="footer-heading">Follow Us</h3>
        <div className="footer-social">
          <a href="#" className="social-icon" aria-label="Facebook">
            <i className="fab fa-facebook-f">
              <AiOutlineFacebook />
            </i>
          </a>
          <a href="#" className="social-icon" aria-label="Twitter">
            <i className="fab fa-twitter">
              <AiOutlineTwitter />
            </i>
          </a>
          <a href="#" className="social-icon" aria-label="LinkedIn">
            <i className="fab fa-linkedin-in">
              <AiOutlineMail />
            </i>
          </a>
          <a href="#" className="social-icon" aria-label="Instagram">
            <i className="fab fa-instagram">
              <AiOutlineInstagram />
            </i>
          </a>
        </div>
      </div> */}
    </footer>
  );
};

export default Footer;
