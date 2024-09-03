const mongoose = require("mongoose");
const validator = require("validator");

const applicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name !"],
      minLength: [3, "Name must contain at least 3 characters !"],
      maxLength: [30, "Name cannot excees 30 characters !"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid Email !"],
    },
    coverLetter: {
      type: String,
      required: [true, "Please provide your Cover Letter !"],
    },
    phone: {
      type: Number,
      required: [true, "Please provide your phone Number !"],
    },
    address: {
      type: String,
      required: [true, "Please provide your Address !"],
    },
    resume: {
        publicId: {
          type: String,
          required: [true, "Please provide the publicId of the resume!"],
        },
        url: {
          type: String,
          required: [true, "Please provide the URL of the resume!"],
        },
      },
    applicantId: {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      role: {
        type: String,
        enum: ["Job Seeker"],
      },
    },
    employeerId: {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      role: {
        type: String,
        enum: ["Employeer"],
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("application", applicationSchema);
