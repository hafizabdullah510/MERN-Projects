import mongoose from "mongoose";

const assessment_marks_schema = mongoose.Schema(
  {
    student: {
      type: mongoose.Types.ObjectId,
      ref: "Student",
      required: [true, "Please provide student"],
    },
    assessment: {
      type: mongoose.Types.ObjectId,
      ref: "Assessment",
      required: [true, "Please provide assessment id"],
    },
    obtained_marks: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Assessment_Mark", assessment_marks_schema);
