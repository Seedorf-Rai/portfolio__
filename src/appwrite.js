import { Client, Account } from 'appwrite';

const client = new Client();

client
//   .setEndpoint('http://localhost/v1') // Your Appwrite Endpoint
  .setProject('67cd29be003cd50c4c04'); // Your project ID

export const account = new Account(client);
