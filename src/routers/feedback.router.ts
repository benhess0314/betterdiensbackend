/** @format */

import { feedbackController } from "@/controllers"; // Import the feedback controller
import { Router } from "express";

export const feedbackRouter = Router();

// Route to create feedback
feedbackRouter.post("/create", feedbackController.createFeedback);

// Route to get feedback for a specific user (based on user UUID)
feedbackRouter.get("/:userUuid", feedbackController.getFeedback);

//Route to get all feedbacks
feedbackRouter.get("/", feedbackController.getAllFeedbacks);
