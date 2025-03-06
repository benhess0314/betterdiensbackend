/** @format */

import express from "express";
import { authRouter } from "./auth.router";
import { feedbackRouter } from "./feedback.router";
import { clientRouter } from "./client.router";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/client", clientRouter);
router.use("/feedback", feedbackRouter);

export default router;
