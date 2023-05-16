import express from "express";
import {
  LocalImageUpload,
  ImageUpload,
} from "../controller/imageController.js";
import { createProduct, getProducts } from "../controller/productController.js";

const routes = express.Router();

routes.post("/create", createProduct);

routes.get("/all", getProducts);
routes.post("/upload", ImageUpload);

export default routes;
