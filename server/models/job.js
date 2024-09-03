const mongoose = require("mongoose");
const validator = require("validator");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide Job title !"],
      minLength: [3, "Title must contain at least 3 characters !"],
      maxLength: [50, "Title cannot excees 50 characters !"],
    },
    description: {
      type: String,
      required: [true, "Please provide Job description !"],
      minLength: [3, "Job descriptio must contain at least 5 characters !"],
    },
    category: {
      type: String,
      required: [true, "Please provide your Job category !"],
    },
    country: {
      type: String,
      required: [true, "Job country is required !"],
    },
    city: {
      type: String,
      required: [true, "Job city is required !"],
    },
    location: {
      type: String,
      required: [true, "Please provide exact location!"],
      minLength: [8, "Job location must contain at least 8 characters !"],
    },
    fixedSalary: {
      type: Number,
      minLength: [4, "Fixed salary must contain at least 4 digits !"],
    },
    salaryFrom: {
      type: Number,
      minLength: [4, "Salary from must contain at least 4 digits !"],
      maxLength: [9, "Salary from cannot exceed 9 digits !"],
    },
    salaryTo: {
      type: Number,
      minLength: [4, "Salary from must contain at least 4 digits !"],
      maxLength: [9, "Salary from cannot exceed 9 digits !"],
    },
    expired: {
      type: Boolean,
      default: false,
    },
    postedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
}
);

module.exports = mongoose.model("job", jobSchema);
