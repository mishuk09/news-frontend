import React from "react";
import NewsTime from "./NewsTime";

const NewsCard = ({ news }) => {
    const { _id, title, description, img, category, location, createdAt } = news;

    return (
        <a
            href={`/news/${_id}`}
            className="block   rounded overflow-hidden   hover:bg-[var(--hover-bg)] transition cursor-pointer border border-gray-100"
        >
            <div className="relative w-full h-40">
                {/* Image */}
                <img
                    src={img || "https://placehold.co/600x400?text=No+Image"}
                    alt={title}
                    className="w-full h-full object-cover"
                />

                {/* 🔹 Full overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                {/* 🔹 Bottom text content */}
                <div className="flex justify-between absolute bottom-0 left-0 w-full p-2 text-sm text-white z-10">
                    <p className="font-semibold  ">
                        {category} {" "}
                        <span className="text-[var(--primary-color)]">{location}</span>
                    </p>
                    <p className="  opacity-90">
                        <NewsTime createdAt={createdAt} />
                    </p>
                </div>
            </div>

            {/* Text content */}
            <div className="p-2">
                <h2 className="text-lg font-semibold text-[var(--primary-text-color)] line-clamp-2 leading-tight">
                    {title}
                </h2>
                <p className=" text-[var(--primary-text-color)] text-lg mt-1 line-clamp-2 leading-tight" dangerouslySetInnerHTML={{ __html: description }}></p>
            </div>
        </a>
    );
};

export default NewsCard;
