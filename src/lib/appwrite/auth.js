import { ID } from "appwrite";
import config, { account, database } from "./config";

export async function createAccount({ name, username, email, password }) {
    try {

        if (
            !name.trim() ||
            !username.trim() ||
            !email.trim() ||
            !password.trim()
        ) {
            throw "All fields are required"
        }

        const authAccount = await account.create(ID.unique(), email, password, name);

        if (authAccount) {
            const newUser = await database.createDocument(
                config.databaseId,
                config.usersCollectionId,
                authAccount.$id,
                {
                    name,
                    username,
                }
            )

            if (newUser) {
                await loginAccount({ email, password })
            }
        }

        return null

    } catch (error) {
        console.log("Error occured while creating account", error)
        throw error
    }
}

export async function loginAccount({ email, password }) {
    try {

        const currentUser = await account.createEmailPasswordSession(email, password)

        if (currentUser) {
            return await database.getDocument(
                config.databaseId,
                config.usersCollectionId,
                currentUser.$id
            )
        }

        return null

    } catch (error) {
        console.log("Error occured while logging account", error)
        throw error
    }
}

export async function getCurrentUserDetails() {
    try {

        const currentUser = await account.get();

        if (currentUser) {
            return await database.getDocument(
                config.databaseId,
                config.usersCollectionId,
                currentUser.$id
            )
        }

        return null

    } catch (error) {
        console.log("Error occured while getting user details", error)
        throw error
    }
}

export async function updateUserDetails({ name, username, avatar, bio, userId }) {
    try {

        if (!userId.trim()) {
            throw "UserId is required"
        }

        if (name.trim()) {
            await account.updateName(name)
        }

        const updatedFields = {}
        if (name.trim()) updatedFields.name = name;
        if (username.trim()) updatedFields.name = username;
        if (bio.trim()) updatedFields.name = bio;

        console.log(updatedFields)
        return;
        // Temperory

        // if (avatar) {
        //     const savedAvatar = await storage.createFile(
        //         config.bucketId,
        //         ID.unique(),
        //         avatar
        //     )

        //     if (savedAvatar) {
        //         const avatarUrl = await storage.getFileView(
        //             config.bucketId,
        //             savedAvatar.$id
        //         )

        //         if (avatarUrl) updatedFields.avatar = avatarUrl;
        //     }
        // }


        // const updatedDetails = await database.updateDocument(
        //     config.databaseId,
        //     config.usersCollectionId,
        //     userId,
        //     updatedFields
        // )

        // return updatedDetails

    } catch (error) {
        console.log("Error occured while updating user details", error)
        throw error
    }
}

export async function logoutUser() {
    try {
        return await account.deleteSession('current')
    } catch (error) {
        console.log("Error occured while logging out user", error)
        throw error
    }
}