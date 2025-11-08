
import Skeleton from "react-loading-skeleton";
import NewsTime from "./NewsTime";

const Sidenews = ({ blog, loading }) => {

    if (loading) {
        return (
            <div className="flex h-auto lg:mb-1 lg:flex-row p-2 border-b border-gray-200">
                
                {/* Image Skeleton */}
                <div className="w-20 h-20 mr-4">
                    <Skeleton height={"100%"} width={"100%"} />
                </div>

                {/* Text Area */}
                <div className="flex flex-col justify-between w-full relative">

                    {/* Title Skeleton */}
                    <Skeleton height={20} width={"90%"} count={2} />

                    {/* Bottom row */}
                    <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center mt-3">
                        <Skeleton width={60} height={12} />   {/* Category */}
                        <Skeleton width={50} height={12} />   {/* Time */}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <a key={blog._id} href={`/news/${blog._id}`}
            className="flex h-auto cursor-pointer lg:mb-1 lg:flex-row">

            <div className="flex items-start p-2 border-b border-gray-200 hover:bg-[var(--hover-bg)] transition cursor-pointer relative">

                <div className="w-20 h-20 bg-gray-200 mr-4 rounded overflow-hidden flex-shrink-0">
                    <img
                        src={blog.img}
                        alt="news"
                        className="w-full h-full object-cover"
                        onError={(e) => (e.target.src = "https://placehold.co/100x100?text=Error")}
                    />
                </div>

                <div className="flex flex-col h-full relative justify-between">
                    <p className="text-lg font-semibold text-[var(--primary-text-color)] leading-tight line-clamp-2">
                        {blog.title}
                    </p>

                    <div className="flex justify-between items-center absolute bottom-0 left-0 right-0">
                        <p className="text-sm">{blog.category}</p>
                        <NewsTime createdAt={blog.createdAt} />
                    </div>
                </div>
            </div>
        </a>
    );
};

export default Sidenews;
