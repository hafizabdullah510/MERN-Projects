import mongoose from "mongoose";

const timetableSchema = mongoose.Schema({
  is_lab_slot: {
    type: Boolean,
    default: false,
  },
  room_number: {
    type: String,
    required: [true, "Please Provide Room No"],
    maxlength: 30,
  },
  start_time: {
    type: Date,
    required: [true, "Please Provide start time"],
  },
  end_time: {
    type: Date,
    required: [true, "Please Provide end time"],
  },
  day_of_week: {
    type: String,
    enum: [
      "saturday",
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
    ].map((day) => day.toLowerCase()),
    required: [true, "Please provide day of week"],
  },
  course: {
    type: mongoose.Types.ObjectId,
    ref: "Course",
    required: [true, "Please provide course"],
  },
  section: {
    type: String,
    required: [true, "Please provide section"],
  },
});

export default mongoose.model("Timetable", timetableSchema);
