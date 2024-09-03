import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./PostJobs.scss";
import { axiosClient } from "../../utils/axiosClient";
import { useNavigate } from "react-router-dom";

function PostJobs() {
  const navigate = useNavigate();
  const location = useLocation();
  const jobDetails = location.state?.jobDetails;

  useEffect(() => {
    if (jobDetails) {
      setJob({
        title: jobDetails.title || "",
        description: jobDetails.description || "",
        category: jobDetails.category || "",
        country: jobDetails.country || "",
        city: jobDetails.city || "",
        location: jobDetails.location || "",
        salaryFrom: jobDetails.salaryFrom || "",
        salaryTo: jobDetails.salaryTo || "",
        expired: jobDetails.expired || false,
      });
    }
  }, [jobDetails]);

  const [job, setJob] = useState({
    title: "",
    description: "",
    category: "",
    country: "",
    city: "",
    location: "",
    salaryFrom: "",
    salaryTo: "",
    isExpired: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({
      ...job,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (jobDetails) {
      try {
        const updateJob = 
        await axiosClient.put(`/job/updateJob/${jobDetails?._id}`, job);
        navigate("/getAllJobs");
      } catch (error) {
        console.error("Error posting job:", error);
      }
    } else {
      try {
        await axiosClient.post("/job/createJob", job);
        navigate("/getAllJobs");
      } catch (error) {
        console.error("Error posting job:", error);
      }
    }
  };

  return (
    <div className="post-job">
      <h1>{jobDetails ? "Update Job" : "Post Job"}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={job.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={job.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={job.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            name="country"
            value={job.country}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={job.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={job.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="salaryFrom">Salary From:</label>
          <input
            type="number"
            id="salaryFrom"
            name="salaryFrom"
            value={job.salaryFrom}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="salaryTo">Salary To:</label>
          <input
            type="number"
            id="salaryTo"
            name="salaryTo"
            value={job.salaryTo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="isExpired">Is Expired:</label>
          <select
            id="isExpired"
            name="isExpired"
            value={job.isExpired}
            onChange={handleChange}
            required
          >
            <option value={true}>True</option>
            <option value={false}>False</option>
          </select>
        </div>
        <button type="submit">{jobDetails ? "Update Job" : "Post Job"}</button>
      </form>
    </div>
  );
}

export default PostJobs;
