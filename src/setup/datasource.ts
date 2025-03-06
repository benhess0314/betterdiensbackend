/** @format */

import { DataSource } from "typeorm";
import { UserEntity } from "@/entities";
import { FeedbackEntity } from "@/entities/feedback.entity"; // Import the FeedbackEntity
import { ClientEntity } from "@/entities/client.entity";
import "dotenv/config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_DATABASE,
  entities: [UserEntity, FeedbackEntity, ClientEntity], // Add FeedbackEntity here
  synchronize: true,
  logging: false, // Enable logging for debugging
  ssl:
    process.env.SSL_MODE === "require" ? { rejectUnauthorized: false } : false, // Handle SSL
});
