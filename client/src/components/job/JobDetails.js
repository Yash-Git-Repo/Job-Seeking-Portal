import React, { useContext, useEffect, useState } from "react";
import "./JobDetails.scss";
import { axiosClient } from "../../utils/axiosClient";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/userContext";

function JobDetails() {
  const navigate = useNavigate();
  const [jobDetails, setJobDetails] = useState();
  const params = useParams();
  const { user } = useContext(UserContext);

  async function fetchData() {
    const JobDetails = await axiosClient.get(
      `/job/getJobDetails/${params?.jobId}`
    );
    setJobDetails(JobDetails?.data?.result?.getJobDetails);
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job?"
    );
    if (confirmed) {
      try {
        await axiosClient.delete(`/job/deleteJob/${jobDetails?._id}`);
        navigate("/getAllJobs");
      } catch (error) {
        console.error("Error deleting job:", error);
      }
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="job-details">
      <h1>{jobDetails?.title}</h1>
      <p>
        <strong>Category:</strong> {jobDetails?.category}
      </p>
      <p>
        <strong>Description:</strong> {jobDetails?.description}
      </p>
      <p>
        <strong>Location:</strong> {jobDetails?.city}, {jobDetails?.country}
      </p>
      <p>
        <strong>Address:</strong> {jobDetails?.location}
      </p>
      <p>
        <strong>Salary Range:</strong> ₹{jobDetails?.salaryFrom} - ₹
        {jobDetails?.salaryTo}
      </p>
      <p>
        <strong>Posted On:</strong>{" "}
        {new Date(jobDetails?.createdAt).toLocaleDateString()}
      </p>
      <p>
        <strong>Last Updated:</strong>{" "}
        {new Date(jobDetails?.updatedAt).toLocaleDateString()}
      </p>
      <p>
        <strong>Status:</strong> {jobDetails?.expired ? "Expired" : "Active"}
      </p>
      <div className="btn">
        {user && user.role === "Job Seeker" ? (
          <button className="apply-btn" onClick={() => navigate(`/apply/${jobDetails?._id}`)}>
            Apply Now
          </button>
        ) : (
          <></>
        )}
      </div>
      {user &&
      user.role === "Employeer" &&
      user?._id === jobDetails?.postedBy ? (
        <div className="btn">
          <button
            className="apply-btn"
            onClick={() => navigate("/createJob", { state: { jobDetails } })}
          >
            Update
          </button>
          <button className="apply-btn" onClick={handleDelete}>
            Delete
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default JobDetails;
