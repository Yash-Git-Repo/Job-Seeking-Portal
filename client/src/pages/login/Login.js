import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosClient } from "../../utils/axiosClient";
import { KEY_ACCESS_TOKEN, setItem } from "../../utils/localStorageManager";
import { UserContext } from "../../context/userContext";
import("./Login.scss");

function Login() {
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); 
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axiosClient.post("/auth/login", {
        email,
        password,
        role,
      });
      updateUser(response?.data?.result?.user);

      if (response?.data?.statusCode === 200) {
        setItem(KEY_ACCESS_TOKEN, response?.data?.result?.accessToken);
        navigate("/");
      } else {
        setError("Invalid credentials or login failed.");
      }
    } catch (e) {
      setError("An error occurred. Please try again.");
      console.error(e);
    }
  }
  
  return (
    <div className="login">
      <div className="login-box">
        <h2 className="heading">Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label htmlFor="role">User Role</label>
          <select
            id="role"
            className="role"
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select a role</option> 
            <option value="Job Seeker">Job Seeker</option>
            <option value="Employeer">Employeer</option> 
          </select>

          <input type="submit" className="submit" />
        </form>
        <p className="sub-heading">
          Don't have an account? <Link to="/signUp">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
