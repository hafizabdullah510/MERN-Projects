import express from "express";
import { createNotification } from "../controllers/notificationController.js";
import { authenticateUser } from "../middleware/auth.js";

const routes = express.Router();

routes.post("/create", authenticateUser, createNotification);

export default routes;
