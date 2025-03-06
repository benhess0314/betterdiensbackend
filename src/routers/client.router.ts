/** @format */

import { clientController } from "@/controllers"; // Import the client controller
import { Router } from "express";

export const clientRouter = Router();

// Route to create client
clientRouter.post("/create", clientController.createClient);

//Route to get all clients
clientRouter.get("/", clientController.getAllClients);
