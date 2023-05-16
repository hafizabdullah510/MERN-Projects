import express from "express";
import dotenv from "dotenv";
import "express-async-errors"; // include on the top always

import Connection from "./DB/db.js";
import authRoutes from "./Routes/authRoutes.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT;
const password = process.env.password;

const app = express();

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(cors());

app.use("/api/v1/auth", authRoutes);

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await Connection(password);
    app.listen(PORT, () =>
      console.log(`Server is Listening at Port : ${PORT}`)
    );
  } catch (err) {
    console.log(err);
  }
};

start();
