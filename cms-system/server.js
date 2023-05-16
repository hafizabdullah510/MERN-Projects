import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
// Do not need to use cors if using proxy on front-end (import cors from 'cors')
import Connection from "./Db/db.js";
import adminAuthRoutes from "./routes/adminAuthRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import deptRoutes from "./routes/deptRoutes.js";
import instructorRoutes from "./routes/instructorRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import announcementRoutes from "./routes/announcementRoutes.js";
import timetableRoutes from "./routes/timetableRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import attendenceRoutes from "./routes/attendenceRoutes.js";
import assessmentRoutes from "./routes/assessmentRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

import notFound from "./middleware/notFound.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// ENV VAR
dotenv.config();
const url = process.env.url;
const PORT = process.env.PORT || 8000;

//Api Routes
app.get("/api/v1", (req, res) => {
  res.json({ msg: "Home Route" });
});
app.use("/api/v1/admin/auth", adminAuthRoutes);
app.use("/api/v1/student", studentRoutes);
app.use("/api/v1/department", deptRoutes);
app.use("/api/v1/faculty", instructorRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/announcement", announcementRoutes);
app.use("/api/v1/timetable", timetableRoutes);
app.use("/api/v1/enrollment", enrollmentRoutes);
app.use("/api/v1/attendence", attendenceRoutes);
app.use("/api/v1/assessment", assessmentRoutes);
app.use("/api/v1/notification", notificationRoutes);

//Error Routes
app.use(notFound);
app.use(errorHandlerMiddleware);

//Database Connection
const start = async () => {
  try {
    await Connection(url);
    app.listen(PORT, () =>
      console.log(`Server is listening at PORT : ${PORT}`)
    );
  } catch (err) {
    console.log(err);
  }
};

start();
