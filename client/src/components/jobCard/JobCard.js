import React, { useEffect } from 'react'
import './JobCard.scss'
import { useNavigate } from 'react-router-dom';

function JobCard({props}) {
    const navigate = useNavigate()
  return (
    <div className="job">
    {props?.map((item) => {
      const date = new Date(item?.createdAt);
      const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const formattedTime = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      return (
        <div className="job-card" key={item?.id}>
          <div className="text">
            <h2>{item?.title}</h2>
            <p>
              <strong>Category:</strong>
              {item?.category}
            </p>
            <p>
              <strong>Location:</strong> {item?.city}, {item?.country}
            </p>
            <p>
              <strong>Posted On:</strong>
              {formattedDate} at {formattedTime}
            </p>
          </div>
          <button
            className="btn"
            onClick={() => navigate(`/job/${item?._id}`)}
          >
            Job Details
          </button>
        </div>
      );
    })}
  </div>
  )
}

export default JobCard