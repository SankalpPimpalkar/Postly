export default function PostSkeleton() {
    return (
        <div className="bg-gray-50 p-4 space-y-4 sm:rounded-lg sm:shadow animate-pulse">
            {/* Post Image Skeleton */}
            <div className="relative w-full aspect-square bg-gray-200 rounded-lg"></div>

            {/* Post Description Skeleton */}
            <div className="space-y-2 px-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>

            {/* Post Tags Skeleton */}
            <div className="flex flex-wrap gap-2 px-2">
                <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                <div className="h-6 bg-gray-200 rounded-full w-12"></div>
                <div className="h-6 bg-gray-200 rounded-full w-20"></div>
            </div>

            {/* Actions Skeleton */}
            <div className="flex items-center gap-6 px-2">
                <div className="flex items-center gap-2">
                    <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-12"></div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-12"></div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-12"></div>
                </div>
            </div>

            {/* Profile and Follow Skeleton */}
            <div className="flex items-center justify-between p-2">
                {/* Profile Info */}
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                        <div className="h-3 bg-gray-200 rounded w-16"></div>
                    </div>
                </div>

                {/* Follow Button Skeleton */}
                <div className="h-8 bg-gray-200 rounded w-20"></div>
            </div>
        </div>
    );
}
