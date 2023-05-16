import mongoose from "mongoose";
const notificationSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Please provide title"],
      maxlength: 50,
    },
    description: {
      type: String,
      maxlength: 150,
    },
    course_name: {
      type: String,
      trim: true,
      required: [true, "Please provide course name"],
      maxlength: 50,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
