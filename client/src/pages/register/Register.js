import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosClient } from "../../utils/axiosClient";
import("./Register.scss");

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userRole, setUserRole] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axiosClient.post("/auth/signUp", {
        name,
        email,
        userRole,
        phoneNumber,
        password,
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="SignUp">
      <div className="SignUp-box">
        <h2 className="heading">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="name"
            className="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>

          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>

          <label htmlFor="role">User Role</label>
          <select
            id="role"
            className="role"
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
          >
            <option value="Job Seeker">Job Seeker</option>
            <option value="Employeer">Employeer</option>
          </select>

          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            className="phone"
            id="phone"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          ></input>

          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>

          <input type="submit" className="submit" />
        </form>
        <p className="sub-heading">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
