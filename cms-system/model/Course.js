import mongoose from "mongoose";

const courseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide course name"],
      maxlength: 50,
      unique: true,
    },
    course_code: {
      type: String,
      trim: true,
      required: [true, "Please provide course code"],
      maxlength: 20,
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Please provide description"],
      maxlength: 250,
    },
    pre_requisites: {
      type: [String],
    },
    credit_hours: {
      type: Number,
      required: [true, "Please provide credit hours"],
    },
    has_lab_credits: {
      type: Boolean,
      default: false,
    },
    instructors: [],
    department: {
      type: mongoose.Types.ObjectId,
      ref: "Department",
      required: [true, "Please provide Department"],
    },
    students: [],
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
