import { useState } from "react";
import { useAuth } from "../context/AuthContextProvider";
import PostBlock from "./PostBlock";

export default function UserProfileContent() {
    const [activeTab, setActiveTab] = useState("posts");
    const { user } = useAuth()

    const renderContent = () => {
        switch (activeTab) {
            case "posts":
                return (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
                        {
                            user?.posts.map(post => (
                                <PostBlock post={post} key={post.$id} />
                            ))
                        }
                    </div>
                );
            case "saves":
                return (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
                        {
                            user?.saves.map(save => (
                                <PostBlock post={save.post} key={save.$id} />
                            ))
                        }
                    </div>
                );
            case "likes":
                return (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
                        {
                            user?.liked.map(likedPost => (
                                <PostBlock post={likedPost} key={likedPost.$id} />
                            ))
                        }
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="w-full h-full md:border rounded md:mt-10 px-4 md:p-6">
            <div className="h-full">
                <div className="flex justify-center border-b">
                    {["posts", "saves", "likes"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`w-1/3 py-3 text-center font-medium text-sm transition 
                            ${activeTab === tab
                                    ? "text-indigo-500 border-b-2 border-indigo-400"
                                    : "text-gray-400"
                                }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="mt-5 text-indigo-400">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}
