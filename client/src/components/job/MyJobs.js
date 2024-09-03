import React, { useContext, useEffect, useState } from "react";
import './MyJobs.scss'
import { axiosClient } from "../../utils/axiosClient";
import { UserContext } from "../../context/userContext";
import JobCard from "../jobCard/JobCard";

function MyJobs() {
  const {user} = useContext(UserContext)
  const [employeerJobs, setEmployeerJobs] = useState([]);

  async function fetchData() {
    const response = await axiosClient.get(`job/getAllJobsPostedByOwner/${user?._id}`);
    const jobsResponse = response?.data?.result?.getAllJobs;
    setEmployeerJobs(jobsResponse);
  }
    
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="my-jobs">
      <JobCard props={employeerJobs} />
    </div>
  );
}

export default MyJobs;
