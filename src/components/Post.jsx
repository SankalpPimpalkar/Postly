/* eslint-disable react/prop-types */
import { Bookmark, Ellipsis, Heart, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContextProvider";
import formatDate from "../utils/formatDate";
import { toggleLikePost } from "../lib/appwrite/database";

export default function Post({ postDetails }) {
    const { user } = useAuth();

    const [likes, setLikes] = useState([]);
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isCreator, setIsCreator] = useState(false);
    const [saveCount, setSaveCount] = useState(0);
    const [likeCount, setLikeCount] = useState(0);
    const [commentCount] = useState(postDetails?.comments.length || 0);

    const handleLikeToggle = async () => {
        if (!user || !postDetails) return;
        setIsLiked(!isLiked)
        setLikeCount(isLiked ? (likeCount - 1) : (likeCount + 1))

        try {
            const updatedPost = await toggleLikePost({ postDetails, user });
            console.log(updatedPost.likes)
            if (updatedPost) {
                setLikes(updatedPost.likes);
            }
        } catch (error) {
            console.error("Error toggling like:", error);
            setLikeCount(isLiked ? (likeCount - 1) : (likeCount + 1))
            setIsLiked(!isLiked)
        }
    };

    const handleSaveToggle = () => {
        setIsSaved((prev) => !prev);
        setSaveCount((prev) => prev + (isSaved ? -1 : 1));
    };

    useEffect(() => {
        if (postDetails && user) {
            setLikes(postDetails.likes)
            setLikeCount(postDetails.likes.length)
            setIsLiked(postDetails.likes.some((like) => like.$id === user.$id));
            setIsSaved(postDetails.saves.some((save) => save.user.$id === user.$id));
            setIsCreator(postDetails.creator.$id === user.$id);
        }
    }, [postDetails, user]);

    return (
        <div className="bg-gray-50 p-4 space-y-4 sm:rounded-lg sm:shadow hover:shadow-lg transition-shadow duration-300">
            {/* Post Image */}
            <Link to={`/posts/${postDetails?.$id}`}>
                <div className="relative w-full aspect-square overflow-hidden bg-gray-200 rounded-lg">
                    <img
                        className="absolute inset-0 w-full h-full object-cover"
                        src={postDetails?.postImageUrls[0]}
                        alt="Post"
                    />
                </div>
            </Link>

            {/* Post Description */}
            <p className="text-gray-600 text-sm px-2 line-clamp-3">
                {postDetails?.description}
            </p>

            {/* Post Tags */}
            {postDetails?.tags?.length > 0 ? (
                <ul className="flex flex-wrap gap-2 px-2 text-sm">
                    {postDetails.tags.map((tag) => (
                        <li
                            key={tag}
                            className="bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full cursor-pointer"
                        >
                            {tag}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-sm px-2 py-1 text-gray-400">No Tags</p>
            )}

            {/* Actions: Like, Save, Comment */}
            <div className="flex items-center gap-6">
                {/* Like Button */}
                <button
                    onClick={handleLikeToggle}
                    aria-label={isLiked ? "Unlike post" : "Like post"}
                    className="flex items-center gap-2"
                >
                    <Heart
                        className={isLiked ? "text-red-500" : "text-gray-400"}
                        fill={isLiked ? "currentColor" : "none"}
                        strokeWidth={1.4}
                    />
                    <span className="text-sm text-gray-600 font-medium">
                        {likeCount} {likeCount === 1 ? "Like" : "Likes"}
                    </span>
                </button>

                {/* Save Button */}
                <button
                    onClick={handleSaveToggle}
                    aria-label={isSaved ? "Unsave post" : "Save post"}
                    className="flex items-center gap-2"
                >
                    <Bookmark
                        className={isSaved ? "text-indigo-500" : "text-gray-400"}
                        fill={isSaved ? "currentColor" : "none"}
                        strokeWidth={1.4}
                    />
                    <span className="text-sm text-gray-600 font-medium">
                        {saveCount} {saveCount === 1 ? "Save" : "Saves"}
                    </span>
                </button>

                {/* Comment Button */}
                <Link to={`/posts/${postDetails?.$id}`} className="flex items-center gap-2">
                    <MessageCircle className="text-gray-400" strokeWidth={1.4} />
                    <span className="text-sm text-gray-600 font-medium">
                        {commentCount} {commentCount === 1 ? "Comment" : "Comments"}
                    </span>
                </Link>
            </div>

            {/* Profile and Actions */}
            <div className="flex items-center justify-between p-2">
                {/* Creator Profile */}
                <Link to={`/users/${postDetails?.creator.$id}`} className="flex items-center gap-3">
                    <img
                        className="w-12 h-12 object-cover rounded-full border border-gray-300"
                        src={postDetails?.creator.avatar}
                        alt={postDetails?.creator.username}
                    />
                    <div>
                        <h3 className="text-gray-800 font-semibold text-sm">
                            {postDetails?.creator.username}
                        </h3>
                        <p className="text-gray-500 text-xs">
                            {formatDate(postDetails?.$createdAt)}
                        </p>
                    </div>
                </Link>

                {/* Follow Button or Menu */}
                {!isCreator ? (
                    <button
                        className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                        aria-label={`Follow ${postDetails?.creator.username}`}
                    >
                        Follow
                    </button>
                ) : (
                    <button aria-label="Post options">
                        <Ellipsis className="text-gray-600" />
                    </button>
                )}
            </div>
        </div>
    );
}
