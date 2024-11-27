import { useEffect, useState } from "react"
import Post from "../../components/Post"
import { getAllPosts } from "../../lib/appwrite/database"
import PostSkeleton from "../../components/PostSkeleton"

function Home() {

    const [posts, setPosts] = useState([])
    const [isLoadingPosts, setIsLoadingPosts] = useState(false)

    useEffect(() => {
        (async () => {
            setIsLoadingPosts(true)
            const posts = await getAllPosts()
            if (posts) {
                setPosts(posts.documents)
            }
            setIsLoadingPosts(false)
        })()
    }, [])

    console.log("Posts", posts)

    return (
        <div className="w-full">
            <div className="w-full max-w-[90rem] md:px-2 md:py-4 h-full mx-auto grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-3 divide-y sm:divide-y-0 divide-gray-300 sm:gap-3">
                {
                    !isLoadingPosts && posts?.map(post => (
                        <Post key={post.$id} postDetails={post} />
                    ))
                }

                {
                    isLoadingPosts &&
                    [0, 1, 2].map(skeleton => (
                        <PostSkeleton key={skeleton} />
                    ))
                }
            </div>
        </div>
    )
}

export default Home