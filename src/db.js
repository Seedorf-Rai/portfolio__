import { Client, ID, Databases, Storage } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client.setEndpoint(import.meta.env.VITE_ENDPOINT)
            .setProject(import.meta.env.VITE_PROJECT_ID);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createProject({ image, title, description, link, technologies }) {
        try {
            return await this.databases.createDocument(
                import.meta.env.VITE_DATABASE_ID,
                import.meta.env.VITE_COLLECTION_ID_PROJECT,
                ID.unique(),
                { title, description, image, link, technologies }
            );
        } catch (error) {
            console.error(error);
        }
    }

    async getProjects() {
        try {
            return await this.databases.listDocuments(
                import.meta.env.VITE_DATABASE_ID,
                import.meta.env.VITE_COLLECTION_ID_PROJECT
            );
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async updateProject({ id, image, title, description, link, technologies }) {
        try {
            return await this.databases.updateDocument(
                import.meta.env.VITE_DATABASE_ID,
                import.meta.env.VITE_COLLECTION_ID_PROJECT,
                id,
                { title, description, image, link, technologies }
            );
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async deleteProject(id) {
        try {
            return await this.databases.deleteDocument(
                import.meta.env.VITE_DATABASE_ID,
                import.meta.env.VITE_COLLECTION_ID_PROJECT,
                id
            );
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                import.meta.env.VITE_PROJECT_BUCKET,
                ID.unique(),
                file
            );
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async deleteFile(file) {
        try {
            return await this.bucket.deleteFile(
                import.meta.env.VITE_PROJECT_BUCKET,
                file
            );
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

const service = new Service();
export default service;
