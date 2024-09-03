const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
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
    phone: {
      type: Number,
      required: [true, "Please provide your phone Number !"],
    },
    password: {
        type: String,
        required: [true, "Please provide your name !"],
        minLength: [3, "Password must contain at least 3 characters !"],
      },
    role: {
      type: String,
      required: [true,'Please provide your role !'],
      enum:['Job Seeker' , 'Employeer']
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
