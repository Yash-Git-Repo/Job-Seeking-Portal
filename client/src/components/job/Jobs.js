import React, { useEffect, useState } from "react";
import "./Jobs.scss";
import JobCard from "../jobCard/JobCard";
import { axiosClient } from "../../utils/axiosClient";

function Jobs() {
  const [jobs, setJobs] = useState([]);

  async function fetchData() {
    const response = await axiosClient.get("/job/getAllJobs");
    const jobsResponse = response?.data?.result?.getAllJobs;
    setJobs(jobsResponse);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
   <div className="jobss">
    <JobCard props={jobs} />
   </div>
  );
}

export default Jobs;
