/** @format */

import { Request, Response } from "express";
import { feedbackService } from "@/services";
import { errorHandlerWrapper } from "@/utils";

// Handler to create feedback
const createFeedbackHandler = async (req: Request, res: Response) => {
  const { firstname, lastname, email, message, sentiment, userUuid } = req.body;

  // Create feedback entry via feedback service
  const newFeedback = await feedbackService.createFeedback({
    firstname,
    lastname,
    email,
    message,
    sentiment,
    userUuid,
  });

  if (newFeedback) {
    res.status(201).json(newFeedback);
  } else {
    res.status(400).json({ message: "Failed to create feedback" });
  }
};

// Optionally, you can add more handlers for retrieving feedback, etc.
const getFeedbackHandler = async (req: Request, res: Response) => {
  try {
    const { userUuid } = req.params;

    // Update the query to filter based on user.uuid
    const feedback = await feedbackService.getFeedbackByUuid(userUuid);

    if (feedback) {
      res.status(200).json(feedback);
    } else {
      res.status(404).json({ message: "No feedback found" });
    }
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching feedback" });
  }
};

// Handler to get all feedbacks
const getAllFeedbacksHandler = async (req: Request, res: Response) => {
  try {
    const feedbacks = await feedbackService.getAllFeedbacks();

    if (feedbacks) {
      res.status(200).json(feedbacks);
    } else {
      res.status(404).json({ message: "No feedback found" });
    }
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching feedback" });
  }
};

export const createFeedback = errorHandlerWrapper(createFeedbackHandler);
export const getFeedback = errorHandlerWrapper(getFeedbackHandler);
export const getAllFeedbacks = errorHandlerWrapper(getAllFeedbacksHandler);
