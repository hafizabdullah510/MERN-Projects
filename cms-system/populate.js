import { readFile } from "fs/promises";
import Student from "./model/Student.js";
import Instructor from "./model/Instructor.js";
import Timetable from "./model/Timetable.js";
import Course from "./model/Course.js";
import dotenv from "dotenv";
import Attendence from "./model/Attendence.js";
import Assessment from "./model/Assessment.js";
import Notification from "./model/Notification.js";
import Assessment_Marks from "./model/Assessment_Marks.js";
dotenv.config();

// import connectDB from "./db/connect.js";
import Connection from "./Db/db.js";

const start = async () => {
  try {
    await Connection(process.env.url);

    const jsonProducts = JSON.parse(
      await readFile(
        new URL("./mock_data/notification_mock.json", import.meta.url)
      )
    );
    await Notification.create(jsonProducts);
    console.log("Success!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
