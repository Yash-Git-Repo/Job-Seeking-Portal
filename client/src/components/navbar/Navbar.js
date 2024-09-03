import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import { axiosClient } from "../../utils/axiosClient";
import { KEY_ACCESS_TOKEN, removeItem } from "../../utils/localStorageManager";
import { UserContext } from "../../context/userContext";

const Navbar = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
  }, [user]);

  async function handleLogout() {
    try {
      await axiosClient.post("/auth/logout");
      removeItem(KEY_ACCESS_TOKEN);
      clearUser();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          MyApp
        </Link>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">
              Home
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/getAllJobs" className="navbar-link">
              All Jobs
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/application" className="navbar-link">
              {user && user?.role === "Employeer"
                ? "Applicant's Application"
                : "My Application"}
            </Link>
          </li>
          <li className="navbar-item">
            {user && user?.role === "Employeer" ? (
              <>
                <li>
                  <Link to="/createJob" className="navbar-link">
                    Post New Job
                  </Link>
                </li>
              </>
            ) : (
              <></>
            )}
          </li>
          <li className="navbar-item">
            {user && user?.role === "Employeer" ? (
              <>
                <li>
                  <Link to={`/getJobPostedByOwner/${user?._id}`} className="navbar-link">
                    View Your Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
              </>
            )}
          </li>
        </ul>
        <div className="navbar-actions">
          <button className="navbar-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
