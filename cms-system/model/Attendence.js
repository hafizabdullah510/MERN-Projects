import mongoose from "mongoose";

const attendenceSchema = mongoose.Schema(
  {
    is_lab_attendance: {
      type: Boolean,
      default: false,
    },
    student: {
      type: mongoose.Types.ObjectId,
      ref: "Student",
      required: [true, "Please provide student"],
    },

    course: {
      type: mongoose.Types.ObjectId,
      ref: "Course",
      required: [true, "Please provide course"],
    },
    isPresent: {
      type: Boolean,
      default: true,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

export default mongoose.model("Attendence", attendenceSchema);
