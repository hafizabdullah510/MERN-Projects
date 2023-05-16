import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const instructorSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide first name"],
      trim: true,
      maxlength: 30,
    },
    lastName: {
      type: String,
      required: [true, "Please provide last name"],
      trim: true,
      maxlength: 30,
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "Please provide valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 6,
    },
    phoneNumber: {
      type: String,
      required: [true, "Please provide phone Number"],
    },
    gender: {
      type: String,
      required: [true, "Please provide gender"],
      enum: ["male", "female", "other"],
    },
    role: {
      type: String,
      default: "instructor",
    },
    department: {
      type: mongoose.Types.ObjectId,
      ref: "Department",
      required: [true, "Please provide department"],
    },
    courses: [],
    students: [],
  },
  { timestamps: true }
);

instructorSchema.methods.createJWT = function () {
  const token = jwt.sign(
    { userId: this._id, role: this.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );

  return token;
};

instructorSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

instructorSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("Instructor", instructorSchema);
