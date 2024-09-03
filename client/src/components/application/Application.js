import React, { useContext, useEffect, useState } from "react";
import "./Application.scss";
import { UserContext } from "../../context/userContext";
import { axiosClient } from "../../utils/axiosClient";
import { useNavigate } from "react-router-dom";

function Application() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [application, setApplication] = useState([]);

  async function fetchData() {
    try {
      if (user?.role === "Job Seeker") {
        const jobSeekerApplication = await axiosClient.get(
          "/application/jobSeekerGetAllJobApplications"
        );

        setApplication(jobSeekerApplication?.data?.result?.application);
      } else {
        const employeerApplication = await axiosClient.get(
          "/application/employeerGetAllJobApplications"
        );
        setApplication(employeerApplication?.data?.result?.application);
      }
    } catch (error) {}
  }

  async function handleDelete(jobId) {
    try {
      await axiosClient.delete(
        `/application/jobSeekerDeleteApplications/${jobId}`
      );
      navigate("/application");
    } catch (error) {}
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="application">
      <h2>
        {user && user?.role === "Job Seeker"
          ? "Application Details"
          : "Applicant's Application"}
      </h2>
      {application?.map((item, index) => {
        return (
          <>
            <div className="application-container" key={index}>
              <div className="application-field">
                <strong>Name:</strong> {item.name}
              </div>
              <div className="application-field">
                <strong>Email:</strong> {item.email}
              </div>
              <div className="application-field">
                <strong>Cover Letter:</strong> {item.coverLetter}
              </div>
              <div className="application-field">
                <strong>Phone:</strong> {item.phone}
              </div>
              <div className="application-field">
                <strong>Address:</strong> {item.address}
              </div>
              <div className="application-field">
                <strong>Resume:</strong>{" "}
                <a
                  href={item.resume.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Resume
                </a>
              </div>
            </div>
            <div className="delete">
              {user?.role === "Job Seeker" && (
                <button
                  className="delete-button"
                  onClick={() => handleDelete(item?._id)}
                >
                  Delete
                </button>
              )}
            </div>
            <hr />
          </>
        );
      })}
    </div>
  );
}

export default Application;
