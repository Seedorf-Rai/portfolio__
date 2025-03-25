import { Client, Account , Databases ,ID } from 'appwrite';

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client.setEndpoint(import.meta.env.VITE_ENDPOINT);
    this.client.setProject(import.meta.env.VITE_PROJECT_ID);
    this.account = new Account(this.client);
  }

  async login({email, password}) {
    try{
      return await this.account.createEmailPasswordSession(email, password);
    }
    catch(error){
      console.error(error);
      return null;
      }
  }

  async logout() {
    try{
      return await this.account.deleteSession('current');
    }
    catch(error){
      console.error(error);
      return null;
    }
  }

  async isLoggedIn() {
    try{
      return await this.account.get();
    }
    catch(error){
      console.error(error);
      return null;
    }
  }

}

const authService = new AuthService();

export default authService;


