import React, { useState } from "react";
import "./ApplyForm.scss";
import { useNavigate, useParams } from "react-router-dom";
import { axiosClient } from "../../utils/axiosClient";

function ApplyForm() {
  const navigate = useNavigate();
  const params = useParams();
  const jobId = params?.jobId;

  const [application, setApplication] = useState({
    name: "",
    email: "",
    coverLetter: "",
    phone: "",
    address: "",
    resume: null,
  });

  const [resumeName, setResumeName] = useState("No file chosen");
  const [successMessage, setSuccessMessage] = useState(""); 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setApplication({
      ...application,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setApplication({
        ...application,
        resume: file,
      });
      setResumeName(file.name);
    } else {
      setApplication({
        ...application,
        resume: null,
      });
      setResumeName("No file chosen");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", application.name);
    formData.append("email", application.email);
    formData.append("coverLetter", application.coverLetter);
    formData.append("phone", application.phone);
    formData.append("address", application.address);
    formData.append("jobId", jobId);
    if (application.resume) {
      formData.append("resume", application.resume);
    }

    try {
      const response = await axiosClient.post('/application/postApplication', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccessMessage("Application submitted successfully!"); 
      setTimeout(() => navigate('/getAllJobs'), 6000);
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  return (
    <div className="apply-form">
      <h2>Job Application</h2>
      {successMessage && <p className="success-message">{successMessage}</p>} 
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={application.name}
            onChange={handleChange}
            placeholder="Your Name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={application.email}
            onChange={handleChange}
            placeholder="Your Email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="coverLetter">Cover Letter</label>
          <textarea
            id="coverLetter"
            name="coverLetter"
            value={application.coverLetter}
            onChange={handleChange}
            placeholder="Your Cover Letter"
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={application.phone}
            onChange={handleChange}
            placeholder="Your Phone Number"
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={application.address}
            onChange={handleChange}
            placeholder="Your Address"
          />
        </div>

        <div className="form-group">
          <label htmlFor="resume">Resume</label>
          <input
            type="file"
            id="resume"
            name="resume"
            accept="image/*"
            onChange={handleFileChange}
          />
          <input
            type="text"
            readOnly
            value={resumeName}
            className="file-input-text"
          />
        </div>

        <button type="submit" className="submit-btn">
          Submit Application
        </button>
      </form>
    </div>
  );
}

export default ApplyForm;
