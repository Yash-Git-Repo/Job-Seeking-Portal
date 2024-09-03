const Job = require("../models/job");
const { success, error } = require("../utils/responseWrapper");

const getAllJobs = async (req, res) => {
  try {
    const getAllJobs = await Job.find({ expired: false });
    if (!getAllJobs) {
      return res.json(error(404, { message: "No Jobs find" }));
    }
    return res.json(success(200, { getAllJobs }));
  } catch (e) {
    res.json(error(500, e.message));
  }
};

const getAllJobsPostedByOwner = async (req, res) => {
  try {
    const { ownerId } = req.params;
    
    const getAllJobs = await Job.find({postedBy: ownerId });

    if (!getAllJobs || getAllJobs.length === 0) {
      return res.json(error(404, { message: "No Jobs found" }));
    }

    return res.json(success(200, { getAllJobs }));
  } catch (e) {
    res.json(error(500, e.message));
  }
};

const getJobDetails = async (req, res) => {
  try {
    const { jobId } = req.params;

    const getJobDetails = await Job.findById(jobId);
    if (!getJobDetails) {
      return res.json(error(404, { message: "No Jobs find with this ID" }));
    }
    return res.json(success(200, { getJobDetails }));
  } catch (e) {
    res.json(error(500, e.message));
  }
};

const createJobController = async (req, res) => {
  try {
    const { role } = req.user;

    if (role !== "Employeer") {
      return res.json(error(403, "Job Seeker is not allowed to add Jobs !"));
    }
    const {
      title,
      description,
      category,
      country,
      city,
      location,
      fixedSalary,
      salaryFrom,
      salaryTo,
      isExpired,
    } = req.body;

    if (!title || !description || !category || !country || !city || !location) {
      return res.json(error(400, "Please provide full job details"));
    }

    if (
      (fixedSalary && (salaryFrom || salaryTo)) ||
      !(fixedSalary || (salaryFrom && salaryTo))
    ) {
      return res.json(
        error(
          400,
          "Please provide either a fixed salary or a salary range, not both."
        )
      );
    }
    const postedBy = req.user._id;

    const job = await Job.create({
      title,
      description,
      category,
      country,
      city,
      location,
      fixedSalary,
      salaryFrom,
      salaryTo,
      postedBy,
      expired: isExpired,
    });
    return res.json(success(201, job));
  } catch (e) {
    res.json(error(500, e.message));
  }
};

const updateJobController = async (req, res) => {
  try {
    const { role } = req.user;

    if (role !== "Employeer") {
      return res.json(error(403, "Job Seeker is not allowed to update Jobs !"));
    }

    const { jobId } = req.params;
    if (!jobId) {
      return res.json(error(400, "Job Id is required"));
    }

    const {
      title,
      description,
      category,
      country,
      city,
      location,
      fixedSalary,
      salaryFrom,
      salaryTo,
      isExpired,
    } = req.body;

    if (!title || !description || !category || !country || !city || !location) {
      return res.json(error(400, "Please provide full job details"));
    }

    if (
      (fixedSalary && (salaryFrom || salaryTo)) ||
      !(fixedSalary || (salaryFrom && salaryTo))
    ) {
      return res.json(
        error(
          400,
          "Please provide either a fixed salary or a salary range, not both."
        )
      );
    }

    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      {
        title,
        description,
        category,
        country,
        city,
        location,
        fixedSalary,
        salaryFrom,
        salaryTo,
        expired: isExpired,
      },
      { new: true } 
    );

    if (!updatedJob) {
      return res.json(error(404, "Job not found"));
    }

    return res.send(success(200, updatedJob));
  } catch (e) {
    console.log(e);
    res.send(error(500, e.message));
  }
};

const deleteJob = async (req, res) => {
  try {
    const { role } = req.user;

    if (role !== "Employeer") {
      return res.json(error(403, "Job Seeker is not allowed to delete Jobs !"));
    }

    const { jobId } = req.params;
    if (!jobId) {
      return res.json(error(400, "Job Id is required"));
    }
    const deletedJob = await Job.findByIdAndDelete(jobId);
    if (!deletedJob) {
      return res.json(error(404, "Job not found"));
    }

    return res.send(success(200, "Job successfully deleted"));
  } catch (e) {
    console.log(e);
    return res.send(error(501, e.message));
  }
};
const getMyJob = async (req, res) => {
  try {
    const { role } = req.user;

    if (role !== "Employeer") {
      return res.json(error(403, "Job Seeker is not allowed to add Jobs !"));
    }

    const myJob = await Job.find({ postedBy: req.user._id });
    const {
      title,
      description,
      category,
      country,
      city,
      location,
      fixedSalary,
      salaryFrom,
      salaryTo,
    } = req.body;
    if (!myJob) {
      return res.json(error(404, "Job not found associated with this user"));
    }
    return res.send(success(201, myJob));
  } catch (e) {
    console.log(e);

    res.send(error(500, e.message));
  }
};

module.exports = {
  getAllJobs,
  getJobDetails,
  createJobController,
  getMyJob,
  updateJobController,
  deleteJob,
  getAllJobsPostedByOwner,
};
