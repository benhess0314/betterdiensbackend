/** @format */

export type CreateFeedbackRequestType = {
  uuid?: string; // Optional: Feedback UUID if it's provided or needed
  firstname: string; // First name of the user giving the feedback
  lastname: string; // Last name of the user giving the feedback
  email: string; // Email of the user providing feedback
  message: string; // The actual feedback message
  sentiment: "good" | "bad" | "neutral"; // Sentiment of the feedback
  userUuid: string; // UUID of the user associated with the feedback
};
