/** @format */

import { FeedbackEntity, UserEntity } from "@/entities";
import { AppDataSource } from "@/setup/datasource";
import { CreateFeedbackRequestType } from "@/types/feedback.type";
import Sentiment from "sentiment";

// Function to create a new feedback
export const createFeedback = async ({
  firstname,
  lastname,
  email,
  message,
  sentiment,
  userUuid, // Assuming you're passing userUuid to associate feedback with a user
}: CreateFeedbackRequestType): Promise<FeedbackEntity | null> => {
  const feedbackRepository = AppDataSource.getRepository(FeedbackEntity);
  const userRepository = AppDataSource.getRepository(UserEntity);
  // // Check if feedback exists with the same message (Optional: you can customize this check based on requirements)
  const existingUser = await userRepository.findOne({
    where: { uuid: userUuid },
  });

  if (!existingUser) {
    throw new Error("User not found");
  }

  // AFINN-based sentiment analysis
  const sentimentAnalyzer = new Sentiment();
  const sentimentResult = sentimentAnalyzer.analyze(message);
  const fsentiment =
    sentimentResult.score > 0
      ? "good"
      : sentimentResult.score < 0
      ? "bad"
      : "neutral";

  const newFeedback = new FeedbackEntity();
  Object.assign(newFeedback, {
    firstname,
    lastname,
    email,
    message,
    sentiment: fsentiment,
    user: existingUser,
  });

  return await feedbackRepository.save(newFeedback);
};

// Function to get feedback by feedback UUID or user UUID
export const getFeedbackbyfid = async ({
  feedbackUuid,
  userUuid,
}: {
  feedbackUuid?: string;
  userUuid?: string;
}): Promise<FeedbackEntity[] | FeedbackEntity | null> => {
  const feedbackRepository = AppDataSource.getRepository(FeedbackEntity);

  if (feedbackUuid) {
    // Get feedback by UUID
    const feedback = await feedbackRepository.findOne({
      where: { uuid: feedbackUuid },
      relations: ["user"], // This loads the user associated with the feedback
    });
    return feedback;
  }

  if (userUuid) {
    // Get all feedbacks for a user
    const feedbacks = await feedbackRepository.find({
      where: { user: { uuid: userUuid } },
      relations: ["user"], // This loads the user associated with the feedbacks
    });
    return feedbacks;
  }

  return null;
};

// Function to get feedbacks by UUID (feedback UUID or user UUID)
export const getFeedbackByUuid = async (
  uuid: string
): Promise<FeedbackEntity[] | FeedbackEntity | null> => {
  const feedbackRepository = AppDataSource.getRepository(FeedbackEntity);

  // Try finding feedback by feedback UUID
  const feedback = await feedbackRepository.findOne({
    where: { uuid },
    relations: ["user"], // Include the associated user
  });

  if (feedback) {
    return feedback; // Return if it's a feedback UUID
  }

  // If not found, try finding all feedbacks associated with the user UUID
  const feedbacks = await feedbackRepository.find({
    where: { user: { uuid } },
    relations: ["user"], // Include the associated user
  });

  if (feedbacks.length > 0) {
    return feedbacks; // Return if it's a user UUID
  }

  return null; // Return null if no feedbacks or users match the UUID
};

// Function to get all feedbacks
export const getAllFeedbacks = async (): Promise<FeedbackEntity[] | null> => {
  const feedbackRepository = AppDataSource.getRepository(FeedbackEntity);
  return await feedbackRepository.find();
};
