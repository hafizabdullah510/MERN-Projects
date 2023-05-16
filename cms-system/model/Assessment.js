import mongoose from "mongoose";
const assessmentSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Please provide title"],
      maxlength: 30,
    },
    total_marks: {
      type: Number,
      default: 10,
    },
    assessment_type: {
      type: String,
      enum: ["quiz", "assignment", "midterm", "final"],
      required: [true, "Please provide assessment"],
    },
    is_lab_assessment: {
      type: Boolean,
      required: function () {
        return this.assessment_type !== "quiz";
      },
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: "Course",
      required: [true, "Please provide course"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Assessment", assessmentSchema);
