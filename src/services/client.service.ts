/** @format */

import { ClientEntity } from "@/entities";
import { AppDataSource } from "@/setup/datasource";
import { CreateClientRequestType } from "@/types/client.type";

// Function to create a new client
export const createClient = async ({
  email,
  isSeller,
  state,
}: CreateClientRequestType): Promise<ClientEntity | null> => {
  const clientRepository = AppDataSource.getRepository(ClientEntity);

  const newClient = new ClientEntity();
  Object.assign(newClient, {
    email,
    isSeller,
    state,
  });

  return await clientRepository.save(newClient);
};

// Function to get client by UUID
export const getClientByUuid = async (
  uuid: string
): Promise<ClientEntity[] | ClientEntity | null> => {
  const clientRepository = AppDataSource.getRepository(ClientEntity);

  // Try finding client by client UUID
  const client = await clientRepository.findOne({
    where: { uuid },
  });

  if (client) {
    return client; // Return if it's a client UUID
  }

  return null; // Return null if no clients match the UUID
};

// Function to get all clients
export const getAllClients = async (): Promise<ClientEntity[] | null> => {
  const clientRepository = AppDataSource.getRepository(ClientEntity);
  return await clientRepository.find();
};
