/** @format */

import { Request, Response } from "express";
import { clientService } from "@/services";
import { errorHandlerWrapper } from "@/utils";

// Handler to create client
const createClientHandler = async (req: Request, res: Response) => {
  const { email, isSeller, state } = req.body;
  // Create client entry via client service
  const newClient = await clientService.createClient({
    email,
    isSeller,
    state,
  });

  if (newClient) {
    res.status(201).json(newClient);
  } else {
    res.status(400).json({ message: "Failed to create client" });
  }
};

// Optionally, you can add more handlers for retrieving client, etc.
const getClientHandler = async (req: Request, res: Response) => {
  try {
    const { userUuid } = req.params;

    // Update the query to filter based on user.uuid
    const client = await clientService.getClientByUuid(userUuid);

    if (client) {
      res.status(200).json(client);
    } else {
      res.status(404).json({ message: "No client found" });
    }
  } catch (error) {
    console.error("Error fetching client:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching client" });
  }
};

// Handler to get all clients
const getAllClientsHandler = async (req: Request, res: Response) => {
  try {
    const clients = await clientService.getAllClients();

    if (clients) {
      res.status(200).json(clients);
    } else {
      res.status(404).json({ message: "No client found" });
    }
  } catch (error) {
    console.error("Error fetching client:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching client" });
  }
};

export const createClient = errorHandlerWrapper(createClientHandler);
export const getClient = errorHandlerWrapper(getClientHandler);
export const getAllClients = errorHandlerWrapper(getAllClientsHandler);
