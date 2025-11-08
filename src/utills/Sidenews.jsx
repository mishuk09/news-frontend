// NewsTime.jsx or inside your current file if it's there

import NewsTime from "./NewsTime";
 
// Sidenews component remains the same:
const Sidenews = ({ blog }) => {
    return (
        <a key={blog._id} href={`/news/${blog._id}`}
            className="flex h-auto cursor-pointer lg:mb-1 lg:flex-row">
            {/* The parent div MUST be relative for the absolute positioning to work */}
            <div className="flex items-start   p-2 border-b border-gray-200 hover:bg-[var(--hover-bg)] transition cursor-pointer relative">
                <div className="w-20 h-20 bg-gray-200 mr-4 rounded overflow-hidden flex-shrink-0">
                    <img
                        src={blog.img}
                        alt="news"
                        className="w-full h-full object-cover "
                        onError={(e) => (e.target.src = "https://placehold.co/100x100?text=Error")}
                    />
                </div>
                <div className="flex flex-col h-full relative  justify-between ">
                    <p className="text-lg font-semibold text-[var(--primary-text-color)] leading-tight line-clamp-2">
                        {blog.title}
                    </p>

                    <div className="flex justify-between items-center absolute bottom-0 left-0 right-0 ">
                        {/* First item: blog.category */}
                        <p className="text-sm">
                            {blog.category}
                        </p>

                        {/* Second item: NewsTime (pushed to the right by justify-between) */}
                        <NewsTime createdAt={blog.createdAt} />
                    </div>
                </div>
            </div>
        </a>
    );
};

export default Sidenews;