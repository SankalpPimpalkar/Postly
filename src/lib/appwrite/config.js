import { Client, Account, Databases, Storage, Avatars } from "appwrite";

const config = {
    projectURL: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
    projectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    databaseId: String(import.meta.env.VITE_APPWRITE_DB_ID),
    usersCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_USERS_ID),
    postsCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_POSTS_ID),
    savesCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_SAVES_ID),
    bucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    followersCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_FOLLOWERS_ID),
}

const client = new Client()
client
    .setProject(config.projectId)
    .setEndpoint(config.projectURL)

export const account = new Account(client)
export const database = new Databases(client)
export const storage = new Storage(client)
export const avatar = new Avatars(client)

export default config;