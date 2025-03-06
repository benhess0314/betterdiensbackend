/** @format */

export type CreateClientRequestType = {
  uuid?: string; // Optional: Client UUID if it's provided or needed
  email: string; // Email of the client
  isSeller: boolean; // Whether the client is a seller or not
  state: string; // The actual client state
};
