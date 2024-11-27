import { ID, Query } from "appwrite";
import config, { database, storage } from "./config";

export async function getAllPosts() {
    try {

        return await database.listDocuments(
            config.databaseId,
            config.postsCollectionId,
            [
                Query.orderDesc('$createdAt')
            ]
        )

    } catch (error) {
        console.log("Error getting posts", error)
        throw error
    }
}

export async function createNewPost({ description, tags, images, creator }) {
    try {
        const uploadResults = await Promise.all(
            images.map(async (image) => {
                const savedImage = await storage.createFile(
                    config.bucketId,
                    ID.unique(),
                    image
                );

                const imageUrl = await storage.getFileView(
                    config.bucketId,
                    savedImage.$id
                );

                return { imageUrl, imageId: savedImage.$id };
            })
        );

        const postImageUrls = uploadResults.map((result) => result.imageUrl);
        const postImageIds = uploadResults.map((result) => result.imageId);

        const post = await database.createDocument(
            config.databaseId,
            config.postsCollectionId,
            ID.unique(),
            {
                description,
                creator,
                postImageUrls,
                postImageIds,
                tags,
            }
        );

        return post;
    } catch (error) {
        console.log("Error occurred while uploading post", error);
        throw error;
    }
}

export async function toggleLikePost({ postDetails, user }) {
    try {

        const post = await database.getDocument(
            config.databaseId,
            config.postsCollectionId,
            postDetails.$id
        )

        const isLiked = post.likes.some(like => like.$id == user.$id)
        console.log(post.likes)
        console.log("isLiked", isLiked)
        let updatedLikedList;

        if (isLiked) {
            updatedLikedList = post.likes.filter(like => like.$id != user.$id)
        } else {
            updatedLikedList = [...post.likes, user.$id]
        }

        if (updatedLikedList) {
            return await database.updateDocument(
                config.databaseId,
                config.postsCollectionId,
                post.$id,
                {
                    likes: updatedLikedList
                }
            )
        }

    } catch (error) {
        console.log("Error occurred while liking the post", error)
        throw error
    }
}