import { Client, Account , Databases } from 'appwrite';

const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_ENDPOINT) // Your Appwrite Endpoint
  .setProject(import.meta.env.VITE_PROJECT_ID); // Your project ID


export const account = new Account(client);

export const databases = new Databases(client);


