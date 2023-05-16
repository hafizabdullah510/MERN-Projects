import express from "express";
import dotenv from "dotenv";
import Connection from "./DB/db.js";
import routes from "./Router/routes.js";
import fileUpload from "express-fileupload";
import "express-async-errors";
import * as Cloudinary from "cloudinary";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT;
const password = process.env.password;

Cloudinary.config({
  cloud_name: process.env.Cloud_name,
  api_key: process.env.Cloud_api,
  api_secret: process.env.Cloud_sec,
});

const app = express();
app.use(express.json());
// app.use(express.static("./public"));
app.use(fileUpload({ useTempFiles: true }));
app.use(cors());

app.use("/api/v1/products", routes);

const start = () => {
  try {
    Connection(password);
    app.listen(PORT, () => console.log(`Server is listening at Port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

start();
