import mongoose from "mongoose";

const announcementSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Please provide announcement title"],
      maxlength: 30,
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Please provide announcement description"],
      maxlength: 200,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Announcement", announcementSchema);
