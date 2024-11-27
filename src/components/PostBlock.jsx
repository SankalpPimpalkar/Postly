/* eslint-disable react/prop-types */

export default function PostBlock({ post }) {
    return (
        <div className="text-indigo-500">
            <img
                className="aspect-square object-scale-down border w-full rounded"
                src={post?.postImageUrls[0]}
                alt="post-preview"
            />
        </div>
    )
}
