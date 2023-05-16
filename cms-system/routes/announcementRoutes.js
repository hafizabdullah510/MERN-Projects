import express from "express";

import {
  createAnnouncement,
  getAllAnnouncements,
} from "../controllers/announcementController.js";
import { authenticateUser } from "../middleware/auth.js";
const routes = express.Router();

routes.post("/create", authenticateUser, createAnnouncement);
routes.get("/allAnnouncements", getAllAnnouncements);

export default routes;
