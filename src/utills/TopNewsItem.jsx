import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import DescriptionText from "./DescriptionText";

const TopNewsItem = ({ mostnews, loading }) => {
    if (loading) {
        return (
            <div className="flex gap-4 p-2 border-b border-gray-300">
                <div className="w-26 h-26 flex-shrink-0">
                    <Skeleton height={"100%"} width={"100%"} />
                </div>

                <div className="flex flex-col gap-2 w-full">
                    <Skeleton height={20} width="90%" />
                    <Skeleton height={15} count={2} />
                </div>
            </div>
        );
    }

    // 🔥 Prevent destructuring crash
    if (!mostnews) {
        return null; // or fallback UI
    }

    const { _id, title, description, img } = mostnews;
    const imageUrl =
        Array.isArray(img) && img.length > 0
            ? img[0]
            : "https://placehold.co/100x70?text=No+Image";

    return (
        <a
            href={`/news/${_id}`}
            className="flex gap-4 p-2 hover:bg-[var(--hover-bg)] border-b border-gray-300 cursor-pointer"
        >
            <div className="w-26 h-26 flex-shrink-0 rounded-md overflow-hidden border border-gray-200">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover"
                    onError={(e) =>
                        (e.target.src =
                            "https://placehold.co/100x70/D1D5DB/4B5563?text=ছবি")
                    }
                />
            </div>
            <div>
                <p className="text-sm sm:text-xl line-clamp-2 font-semibold leading-snug text-[var(--primary-text-color)]">
                    {title}
                </p>
                 <DescriptionText description={description} />
                {/* <p
                className="text-[var(--primary-text-color)] text-lg mt-1 line-clamp-2 leading-tight 
                            [&_*]:font-normal [&_*]:text-inherit [&_*]:not-italic [&_*]:m-0"
                dangerouslySetInnerHTML={{ __html: description }}
                ></p> */}

            </div>
        </a>
    );
};

export default TopNewsItem;
