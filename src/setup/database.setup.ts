/** @format */

import { DataSource } from "typeorm";
import { createDatabase } from "typeorm-extension";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { UserEntity } from "@/entities";
import { FeedbackEntity } from "@/entities/feedback.entity"; // Import FeedbackEntity
import { ClientEntity } from "@/entities/client.entity";
import { AppDataSource } from "./datasource";
import bcrypt from "bcryptjs";
import { authService } from "@/services";
import { CreateUserRequestType } from "@/types";
import "dotenv/config";

// Create a test connection
const testDatabaseConnection = async () => {
  try {
    console.log("Testing database connection...");

    const testDataSource = new DataSource({
      type: "postgres",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      ssl:
        process.env.SSL_MODE === "require"
          ? { rejectUnauthorized: false }
          : false,
    });

    await testDataSource.initialize();
    console.log("✅ Database connection successful!");
    await testDataSource.destroy();
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
};

export const databaseSetup = async (): Promise<void> => {
  await testDatabaseConnection();

  // await createDatabase({
  //   ifNotExist: true,
  //   options: {
  //     type: "postgres",
  //     host: process.env.DB_HOST,
  //     username: process.env.DB_USERNAME,
  //     password: process.env.DB_PASSWORD,
  //     port: Number(process.env.DB_PORT),
  //     database: "test",
  //     synchronize: true,
  //     entities: [UserEntity, FeedbackEntity, ClientEntity], // Add FeedbackEntity here
  //     entitySkipConstructor: true,
  //     namingStrategy: new SnakeNamingStrategy(),
  //     ssl:
  //       process.env.SSL_MODE === "require"
  //         ? { rejectUnauthorized: false }
  //         : false, // Ensure SSL is properly handled
  //   },
  // });

  await AppDataSource.initialize();

  // Adding admin user when the database setup
  const userRepository = AppDataSource.getRepository(UserEntity);

  const userCount: number = await userRepository.count();

  if (userCount === 0) {
    const adminHashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD,
      10
    );

    const adminUser: CreateUserRequestType = {
      name: process.env.ADMIN_NAME,
      hashedPassword: adminHashedPassword,
      role: "admin",
    };

    authService.createUser(adminUser);
  }
};
