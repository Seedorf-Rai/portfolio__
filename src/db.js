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
            // Step 1: Retrieve project document to get image details
            const project = await this.databases.getDocument(
                import.meta.env.VITE_DATABASE_ID,
                import.meta.env.VITE_COLLECTION_ID_PROJECT,
                id
            );

            console.log("Project Data:", project); // 🔍 Debugging log

            if (!project) {
                throw new Error("Project not found.");
            }

            // Step 2: Extract file ID correctly
            let fileId = null;

            if (project.image) {
                console.log("Stored Image Value:", project.image); // 🔍 Debugging log

                // If project.image is just the fileId, use it directly
                if (!project.image.includes("/")) {
                    fileId = project.image;
                } else {
                    // If it's a full URL, extract the fileId
                    const urlParts = project.image.split("/");
                    fileId = urlParts[urlParts.length - 2]; // Might need adjustment
                }
            }

            if (fileId) {
                console.log("Deleting File ID:", fileId); // 🔍 Debugging log
                await this.deleteFile(fileId);
            } else {
                console.warn("No valid file ID found, skipping file deletion.");
            }

            // Step 3: Delete the project document from the database
            return await this.databases.deleteDocument(
                import.meta.env.VITE_DATABASE_ID,
                import.meta.env.VITE_COLLECTION_ID_PROJECT,
                id
            );
        } catch (error) {
            console.error("Error deleting project:", error);
            return null;
        }
    }



    async uploadFile(file) {
        try {
            const uploadedFile = await this.bucket.createFile(
                import.meta.env.VITE_PROJECT_BUCKET,
                ID.unique(),
                file
            );
            console.log("Uploaded File:", uploadedFile);

            if (!uploadedFile || !uploadedFile.$id) {
                throw new Error("File upload failed, no ID returned.");
            }

            return uploadedFile.$id;
        } catch (error) {
            console.error("Upload error:", error);
            return null;
        }
    }

    async getFileURL(fileId) {
        try {
            console.log("Retrieving file preview for ID:", fileId);
            const fileUrl = await this.bucket.getFilePreview(
                import.meta.env.VITE_PROJECT_BUCKET,
                fileId
            );
            console.log("Generated File URL:", fileUrl);
            return fileUrl;
        } catch (error) {
            console.error("Error getting file URL:", error);
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
    //setting
    async getSetting() {
        try {
            return await this.databases.listDocuments(
                import.meta.env.VITE_DATABASE_ID,
                import.meta.env.VITE_COLLECTION_ID_SETTING
            );
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async updateSetting({
        name,
        designation,
        linkedin,
        github,
        instagram,
        gmail,
        phone_number,
        address,
        id
    }) {
        try {
            return await this.databases.updateDocument(
                import.meta.env.VITE_DATABASE_ID,
                import.meta.env.VITE_COLLECTION_ID_SETTING,
                id,
                { name, designation, linkedin, github, instagram, gmail, phone_number, address }
            );
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getAbout() {
        try {
            return await this.databases.listDocuments(
                import.meta.env.VITE_DATABASE_ID,
                import.meta.env.VITE_COLLECTION_ID_ABOUT
            );
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async updateAbout({ id, imageFile, description }) {
        try {
            if (!id) throw new Error("Document ID is required for updating.");

            let imageId = null;
            let imageUrl = null;

            // If a new image file is provided, upload it using the existing method
            if (imageFile) {
                imageId = await this.uploadFile(imageFile);
                if (imageId) {
                    imageUrl = await this.getFileURL(imageId);
                }
            }

            console.log(imageId);
            console.log(imageUrl);
            console.log(description);



            // Update the document with the new image ID and description
            return await this.databases.updateDocument(
                import.meta.env.VITE_DATABASE_ID,
                import.meta.env.VITE_COLLECTION_ID_ABOUT, // Ensure this is correct
                id,
                {
                    image: imageUrl || undefined, // Use new image URL if available
                    description,
                }
            );
        } catch (error) {
            console.error("Error updating About section:", error);
            return null;
        }
    }
    async deleteAbout(id) {
        try {
            // Step 1: Retrieve the About document
            const about = await this.databases.getDocument(
                import.meta.env.VITE_DATABASE_ID,
                import.meta.env.VITE_COLLECTION_ID_ABOUT,
                id
            );

            console.log("About Data:", about); // Debugging log

            if (!about) {
                throw new Error("About document not found.");
            }

            // Step 2: Extract file ID if image exists
            let fileId = null;

            if (about.image) {
                console.log("Stored Image Value:", about.image); // Debugging log

                // If about.image is just the fileId, use it directly
                if (!about.image.includes("/")) {
                    fileId = about.image;
                } else {
                    // If it's a full URL, extract the fileId
                    const urlParts = about.image.split("/");
                    fileId = urlParts[urlParts.length - 2]; // Adjust if necessary
                }
            }

            // Step 3: Delete the image file from storage
            if (fileId) {
                console.log("Deleting File ID:", fileId);
                await this.deleteFile(fileId);
            } else {
                console.warn("No valid file ID found, skipping file deletion.");
            }

            // Step 4: Delete the About document
            return await this.databases.deleteDocument(
                import.meta.env.VITE_DATABASE_ID,
                import.meta.env.VITE_COLLECTION_ID_ABOUT,
                id
            );
        } catch (error) {
            console.error("Error deleting About section:", error);
            return null;
        }
    }

    async createAbout({ image, description }) {
        try {
            return await this.databases.createDocument(
                import.meta.env.VITE_DATABASE_ID,
                import.meta.env.VITE_COLLECTION_ID_ABOUT, // Ensure this matches your DB setup
                ID.unique(),
                { image, description }
            );
        } catch (error) {
            console.error("Error creating About section:", error);
            return null;
        }
    }

    async getIntro() {
        try {
            return await this.databases.listDocuments(
                import.meta.env.VITE_DATABASE_ID,
                import.meta.env.VITE_COLLECTION_ID_INTRO
            );
        } catch (error) {
            console.error("Error fetching Intro section:", error);
            return null;
        }
    }

    async createIntro({ image, description }) {
        try {
            return await this.databases.createDocument(
                import.meta.env.VITE_DATABASE_ID,
                import.meta.env.VITE_COLLECTION_ID_INTRO,
                ID.unique(),
                { image, description }
            );
        } catch (error) {
            console.error("Error creating Intro section:", error);
            return null;
        }
    }

    async updateIntro({ id, imageFile, description }) {
        try {
            if (!id) throw new Error("Document ID is required for updating.");

            let imageId = null;
            let imageUrl = null;

            // Upload new image if provided
            if (imageFile) {
                imageId = await this.uploadFile(imageFile);
                if (imageId) {
                    imageUrl = await this.getFileURL(imageId);
                }
            }

            return await this.databases.updateDocument(
                import.meta.env.VITE_DATABASE_ID,
                import.meta.env.VITE_COLLECTION_ID_INTRO,
                id,
                {
                    image: imageUrl || undefined, // Update image if available
                    description,
                }
            );
        } catch (error) {
            console.error("Error updating Intro section:", error);
            return null;
        }
    }

    async deleteIntro(id) {
        try {
            // Step 1: Retrieve the Intro document
            const intro = await this.databases.getDocument(
                import.meta.env.VITE_DATABASE_ID,
                import.meta.env.VITE_COLLECTION_ID_INTRO,
                id
            );

            if (!intro) {
                throw new Error("Intro document not found.");
            }

            // Step 2: Extract file ID if image exists
            let fileId = null;

            if (intro.image) {
                if (!intro.image.includes("/")) {
                    fileId = intro.image;
                } else {
                    const urlParts = intro.image.split("/");
                    fileId = urlParts[urlParts.length - 2]; // Extract fileId from URL
                }
            }

            // Step 3: Delete the image file from storage if it exists
            if (fileId) {
                await this.deleteFile(fileId);
            }

            // Step 4: Delete the Intro document
            return await this.databases.deleteDocument(
                import.meta.env.VITE_DATABASE_ID,
                import.meta.env.VITE_COLLECTION_ID_INTRO,
                id
            );
        } catch (error) {
            console.error("Error deleting Intro section:", error);
            return null;
        }
    }

    async getTechnologies() {
        try {
            return await this.databases.listDocuments(
                import.meta.env.VITE_DATABASE_ID,
                import.meta.env.VITE_COLLECTION_ID_TECHNOLOGY
            );
        } catch (error) {
            console.error("Error fetching technologies:", error);
            return null;
        }
    }

    async createTechnology({ name }) {
        try {
            return await this.databases.createDocument(
                import.meta.env.VITE_DATABASE_ID,
                import.meta.env.VITE_COLLECTION_ID_TECHNOLOGY,
                ID.unique(),
                { name }
            );
        } catch (error) {
            console.error("Error creating technology:", error);
            return null;
        }
    }

    async updateTechnology({ id, name }) {
        try {
            if (!id) throw new Error("Document ID is required for updating.");

            return await this.databases.updateDocument(
                import.meta.env.VITE_DATABASE_ID,
                import.meta.env.VITE_COLLECTION_ID_TECHNOLOGY,
                id,
                { name }
            );
        } catch (error) {
            console.error("Error updating technology:", error);
            return null;
        }
    }

    async deleteTechnology(id) {
        try {
            return await this.databases.deleteDocument(
                import.meta.env.VITE_DATABASE_ID,
                import.meta.env.VITE_COLLECTION_ID_TECHNOLOGY,
                id
            );
        } catch (error) {
            console.error("Error deleting technology:", error);
            return null;
        }
    }


    async getEducation() {
        try {
            return await this.databases.listDocuments(
                import.meta.env.VITE_DATABASE_ID,
                import.meta.env.VITE_COLLECTION_ID_EDUCATION
            );
        } catch (error) {
            console.error("Error fetching education records:", error);
            return null;
        }
    }

    async createEducation({ date, level, institute, description }) {
        try {
            return await this.databases.createDocument(
                import.meta.env.VITE_DATABASE_ID,
                import.meta.env.VITE_COLLECTION_ID_EDUCATION,
                ID.unique(),
                { date, level, institute, description }
            );
        } catch (error) {
            console.error("Error creating education record:", error);
            return null;
        }
    }

    async updateEducation({ id, date, level, institute, description }) {
        try {
            if (!id) throw new Error("Document ID is required for updating.");

            return await this.databases.updateDocument(
                import.meta.env.VITE_DATABASE_ID,
                import.meta.env.VITE_COLLECTION_ID_EDUCATION,
                id,
                { date, level, institute, description }
            );
        } catch (error) {
            console.error("Error updating education record:", error);
            return null;
        }
    }

    async deleteEducation(id) {
        try {
            return await this.databases.deleteDocument(
                import.meta.env.VITE_DATABASE_ID,
                import.meta.env.VITE_COLLECTION_ID_EDUCATION,
                id
            );
        } catch (error) {
            console.error("Error deleting education record:", error);
            return null;
        }
    }

    // async createRandD({ image, title, description, link, technologies }) {
    //     try {
    //         return await this.databases.createDocument(
    //             import.meta.env.VITE_DATABASE_ID,
    //             import.meta.env.VITE_COLLECTION_ID_RANDD,
    //             ID.unique(),
    //             { title, description, image, link, technologies }
    //         );
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    // async getRandD() {
    //     try {
    //         return await this.databases.listDocuments(
    //             import.meta.env.VITE_DATABASE_ID,
    //             import.meta.env.VITE_COLLECTION_ID_RANDD
    //         );
    //     } catch (error) {
    //         console.error(error);
    //         return null;
    //     }
    // }

    // async updateRandD({ id, image, title, description, link, technologies }) {
    //     try {
    //         return await this.databases.updateDocument(
    //             import.meta.env.VITE_DATABASE_ID,
    //             import.meta.env.VITE_COLLECTION_ID_RANDD,
    //             id,
    //             { title, description, image, link, technologies }
    //         );
    //     } catch (error) {
    //         console.error(error);
    //         return null;
    //     }
    // }

    // async deleteRandD(id) {
    //     try {
    //         // Step 1: Retrieve RandD document to get image details
    //         const randD = await this.databases.getDocument(
    //             import.meta.env.VITE_DATABASE_ID,
    //             import.meta.env.VITE_COLLECTION_ID_RANDD,
    //             id
    //         );

    //         console.log("RandD Data:", randD); // Debugging log

    //         if (!randD) {
    //             throw new Error("RandD entry not found.");
    //         }

    //         // Step 2: Extract file ID correctly
    //         let fileId = null;

    //         if (randD.image) {
    //             console.log("Stored Image Value:", randD.image); // Debugging log

    //             if (!randD.image.includes("/")) {
    //                 fileId = randD.image;
    //             } else {
    //                 const urlParts = randD.image.split("/");
    //                 fileId = urlParts[urlParts.length - 2]; // Might need adjustment
    //             }
    //         }

    //         if (fileId) {
    //             console.log("Deleting File ID:", fileId); // Debugging log
    //             await this.deleteFile(fileId);
    //         } else {
    //             console.warn("No valid file ID found, skipping file deletion.");
    //         }

    //         // Step 3: Delete the RandD document from the database
    //         return await this.databases.deleteDocument(
    //             import.meta.env.VITE_DATABASE_ID,
    //             import.meta.env.VITE_COLLECTION_ID_RANDD,
    //             id
    //         );
    //     } catch (error) {
    //         console.error("Error deleting RandD entry:", error);
    //         return null;
    //     }
    // }
    async createRandD({ image, title, description, link, technologies }) {
        try {
            return await this.databases.createDocument(
                import.meta.env.VITE_DATABASE_ID,
                import.meta.env.VITE_COLLECTION_ID_RANDD,
                ID.unique(),
                { title, description, image, link, technologies }
            );
        } catch (error) {
            console.error(error);
        }
    }

    async getRandD() {
        try {
            return await this.databases.listDocuments(
                import.meta.env.VITE_DATABASE_ID,
                import.meta.env.VITE_COLLECTION_ID_RANDD
            );
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async updateRandD({ id, image, title, description, link, technologies }) {
        try {
            return await this.databases.updateDocument(
                import.meta.env.VITE_DATABASE_ID,
                import.meta.env.VITE_COLLECTION_ID_RANDD,
                id,
                { title, description, image, link, technologies }
            );
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async deleteRandD(id) {
        try {
            // Step 1: Retrieve project document to get image details
            const project = await this.databases.getDocument(
                import.meta.env.VITE_DATABASE_ID,
                import.meta.env.VITE_COLLECTION_ID_RANDD,
                id
            );

            console.log("RandD Data:", project); // 🔍 Debugging log

            if (!project) {
                throw new Error("RandD not found.");
            }

            // Step 2: Extract file ID correctly
            let fileId = null;

            if (project.image) {
                console.log("Stored Image Value:", project.image); // 🔍 Debugging log

                // If project.image is just the fileId, use it directly
                if (!project.image.includes("/")) {
                    fileId = project.image;
                } else {
                    // If it's a full URL, extract the fileId
                    const urlParts = project.image.split("/");
                    fileId = urlParts[urlParts.length - 2]; // Might need adjustment
                }
            }

            if (fileId) {
                console.log("Deleting File ID:", fileId); // 🔍 Debugging log
                await this.deleteFile(fileId);
            } else {
                console.warn("No valid file ID found, skipping file deletion.");
            }

            // Step 3: Delete the project document from the database
            return await this.databases.deleteDocument(
                import.meta.env.VITE_DATABASE_ID,
                import.meta.env.VITE_COLLECTION_ID_RANDD,
                id
            );
        } catch (error) {
            console.error("Error deleting RandD:", error);
            return null;
        }
    }

}

const service = new Service();
export default service;
