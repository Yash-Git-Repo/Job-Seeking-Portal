const Application = require("../models/application");
const { success, error } = require("../utils/responseWrapper");
const cloudinary = require("../cloudinaryConfig");
const Job = require("../models/job");

const employeerGetAllJobApplications = async (req, res) => {
  try {
    const { role } = req.user;

    if (role !== "Employeer") {
      return res.json(
        error(403, "Job Seeker is not allowed to see Employeer's Application !")
      );
    }
    const application = await Application.find({
      "employeerId.user": req.user.id,
    });
    if (!application) {
      return response.json(error(404, "No application found"));
    }
    return res.json(success(200, { application }));
  } catch (e) {
    res.send(error(500, e.message));
  }
};

const jobSeekerGetAllJobApplications = async (req, res) => {
  try {
    const { role } = req.user;

    if (role !== "Job Seeker") {
      return res.json(
        error(403, "Employeer is not allowed to see Job Seeker's Application !")
      );
    }
    const application = await Application.find({
      "applicantId.user": req.user.id,
    });
    if (!application) {
      return response.json(error(404, "No application found"));
    }
    return res.json(success(200, { application }));
  } catch (e) {
    console.log(e);
    
    res.send(error(500, e.message));
  }
};

const jobSeekerDeleteApplications = async (req, res) => {
  try {
    const { role } = req.user;

    if (role !== "Job Seeker") {
      return res.json(
        error(
          403,
          "Employeer is not allowed to delete Job Seeker's Application !"
        )
      );
    }

    const { applicationId } = req.params;
    console.log('applica',applicationId);
    
    const deletedApplication = await Application.findByIdAndDelete(
      applicationId
    );
    if (!deletedApplication) {
      return res.json(error(404, "Job not found"));
    }
    console.log('cdkjcbdbvkdjbvk');
    
    return res.json(success(200, "Application deleted successfully"));
  } catch (e) {
    console.log(e);
    
    res.send(error(500, e.message));
  }
};

const postApplication = async (req, res) => {
  try {
    const { role } = req.user;
    const { resume } = req.files;

    if (role !== "Job Seeker") {
      return res.json(
        error(
          403,
          "Employeer is not allowed to delete Job Seeker's Application !"
        )
      );
    }
    if (!resume) {
      return res.send(error(404, "Resumeis required"));
    }

    const allowedFormats = [
      "image/png",
      "images/jpg",
      "image/webp",
      "image/jpeg",
    ];
    if (!allowedFormats.includes(resume.mimetype)) {
      return res.send(
        error(400, "Please upload your resume in PNG , JPG , WEBP format !")
      );
    }

    const cloudinaryResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        resume.tempFilePath,
        { folder: "resumeImages" },
        (err, result) => {
          if (err) {
            console.error("Cloudinary upload error:", err);
            return reject(err);
          }
          resolve(result);
        }
      );
    });

    const { name, email, coverLetter, phone, address, jobId } = req.body;

    const existingApplication = await Application.findOne({
      email,
      jobId
    });
    if (existingApplication) {
      return res.json(
        error(408, "An application with this email already exists")
      );
    }

    if (!jobId) {
      return res.json(error(404, "Job not found !"));
    }
    const applicantId = {
      user: req.user._id,
      role: "Job Seeker",
    };

    const jobDetails = await Job.findById(jobId);
    if (!jobDetails) {
      return res.json(error(404, " Job not found"));
    }
    
    const employeerId = {
      user: jobDetails.postedBy,
      role: "Employeer",
    };
    if (!name || !email || !coverLetter || !phone || !address) {
      return res.json(error(400, "All fields are required"));
    }
    const application = await Application.create({
      name,
      email,
      coverLetter,
      phone,
      address,
      applicantId,
      employeerId,
      resume: {
        publicId: cloudinaryResult.public_id,
        url: cloudinaryResult.url,
      },
    });
    await application.save();
    return res.send(success(201, application));
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  employeerGetAllJobApplications,
  jobSeekerDeleteApplications,
  jobSeekerGetAllJobApplications,
  postApplication,
};
