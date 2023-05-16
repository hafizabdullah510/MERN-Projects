import mongoose from "mongoose";

const departmentSchema = mongoose.Schema({
  department_name: {
    type: String,
    trim: true,
    enum: ["CS", "BBA", "PHARMACY", "ELECTRICAL", "MECHANICAL", "CHEMICAL"],
    required: [true, "Please provide department name"],
    maxlength: 30,
  },
  courses: [],
  instructors: [],
});

export default mongoose.model("Department", departmentSchema);
