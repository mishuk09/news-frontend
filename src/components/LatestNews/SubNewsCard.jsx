// src/components/NewsCard.jsx (New File)
import React from 'react';
import { ArrowRight } from 'lucide-react';

const placeholderImage = "https://via.placeholder.com/600x400.png?text=No+Image+Available";

/**
 * Renders a single, professionally styled news card.
 * @param {object} item - The news data object.
 */
const SubNewsCard = ({ item }) => {
    const imageUrl = item.img && item.img.length > 0 ? item.img[0] : placeholderImage;
    const category = item.category || "সাধারণ";
    const newsLink = `/news/${item._id}`; // Ensure your routing supports this path

    return (
        <article
            className="group bg-white rounded-xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-1"
            onClick={() => window.location.href = newsLink} // Simple navigation for example
        >
            {/* Image & Category Tag */}
            <div className="relative h-56 w-full overflow-hidden">
                <img
                    src={imageUrl}
                    alt={item.title || "News Image"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute bottom-3 left-3 bg-red-700 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-lg opacity-95">
                    {category}
                </span>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col h-full">
                <h3 className="text-xl font-extrabold text-gray-900 mb-3 leading-snug group-hover:text-red-700 transition duration-300">
                    {item.title || "শিরোনাম পাওয়া যায়নি"}
                </h3>
                {item.description && (
                    <p className="text-gray-600 text-base line-clamp-3 mb-4">
                        {item.description}
                    </p>
                )}

                {/* Read More Link */}
                <div className="mt-auto">
                    <a
                        href={newsLink}
                        className="inline-flex items-center text-blue-600 font-bold hover:text-red-700 transition duration-300"
                        aria-label={`Read more about ${item.title}`}
                    >
                        বিস্তারিত পড়ুন <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                    </a>
                </div>
            </div>
        </article>
    );
};

export default SubNewsCard;