import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContextProvider"
import { useNavigate, useParams } from "react-router-dom"
import { Plus } from "lucide-react";
import { logoutUser } from "../lib/appwrite/auth";

export default function UserDetails() {

    const { user, setUser } = useAuth();
    const params = useParams();
    const navigate = useNavigate()
    const [isCreator, setIsCreator] = useState(false);

    async function handleLogout() {
        const resp = await logoutUser()
        if (resp) {
            setUser(null)
            navigate('/auth/login')
        }
    }

    useEffect(() => {
        setIsCreator(user?.$id == params.id)
    }, [params.id])

    return (
        <div className="w-full h-full md:border rounded mt-10 py-10 px-4 md:px-10">
            <div className="flex flex-col md:flex-row items-center gap-x-20">
                <div className="relative">
                    <img
                        className="w-full max-w-28 aspect-square rounded-full"
                        src={user?.avatar}
                        alt={user?.username}
                    />
                    {
                        isCreator && (
                            <button className="absolute -bottom-1 right-0">
                                <Plus className="bg-indigo-400 rounded-full p-1 w-8 h-8" />
                            </button>
                        )
                    }
                </div>

                <div className="text-gray-600 flex items-center mt-10 md:mt-0 justify-around gap-x-16">
                    <span className="flex flex-col items-center">
                        <h3 className="text-2xl font-semibold">
                            {user?.posts.length}
                        </h3>
                        <p className="font-semibold text-sm text-gray-500">
                            Posts
                        </p>
                    </span>

                    <span className="flex flex-col items-center">
                        <h3 className="text-2xl font-semibold">
                            {user?.followers.length}
                        </h3>
                        <p className="font-semibold text-sm text-gray-500">
                            Followers
                        </p>
                    </span>

                    <span className="flex flex-col items-center">
                        <h3 className="text-2xl font-semibold">
                            {user?.followings.length}
                        </h3>
                        <p className="font-semibold text-sm text-gray-500">
                            Followings
                        </p>
                    </span>
                </div>
            </div>

            <div className="mt-5 space-y-1 flex flex-col items-center md:items-start">
                <h2 className="text-gray-600 text-lg font-semibold">
                    {user?.name}
                </h2>

                <p className="text-gray-500 text-sm">
                    {user?.bio || 'No bio added yet'}
                </p>
            </div>

            {
                isCreator ? (
                    <div className="flex items-center mt-5 gap-2">
                        <button className="bg-indigo-500 active:bg-indigo-400 text-gray-100 w-full p-2 text-lg font-semibold rounded">
                            Edit Profile
                        </button>
                        <button onClick={handleLogout} className="bg-red-500 active:bg-red-400 text-gray-100 w-full p-2 text-lg font-semibold rounded">
                            Logout
                        </button>
                    </div>
                ) : (
                    <button className="bg-indigo-500 active:bg-indigo-400 text-gray-100 w-full p-2 text-lg font-semibold rounded">
                        Follow
                    </button>
                )
            }

        </div>
    )
}
