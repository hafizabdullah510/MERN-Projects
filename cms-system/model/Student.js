import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const studentSchema = mongoose.Schema(
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
    program: {
      type: String,
      required: [true, "Please provide program"],
    },
    semester: {
      type: Number,
      required: [true, "Please provide semester number"],
    },
    section: {
      type: String,
      required: [true, "Please provide section"],
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
      default: "student",
    },
    courses: [],
    instructors: [],
    department: {
      type: mongoose.Types.ObjectId,
      ref: "Department",
      required: [true, "please provide department"],
    },
    assessments: [],
    notifications: [],
  },
  { timestamps: true }
);

studentSchema.methods.createJWT = function () {
  const token = jwt.sign(
    { userId: this._id, role: this.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );

  return token;
};

studentSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

studentSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("Student", studentSchema);
