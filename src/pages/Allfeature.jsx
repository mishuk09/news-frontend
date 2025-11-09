import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Headline from '../components/Headline';
import { WholeWord } from 'lucide-react';
import NewsTime from '../utills/NewsTime';
import SubHeadline from '../components/SubHeadline';
import ChildHeadline from '../components/ChildHeadline';
import SkeletonNewsSection from '../utills/SkeletonNewsSection';


const getFirstImageUrl = (news) => {
    // Check if 'img' is an array and has at least one element
    if (Array.isArray(news.img) && news.img.length > 0) {
        return news.img[0];
    }
    // Fallback image source if no image is available
    return 'https://placehold.co/600x400/CCCCCC/6b7280?text=No+Image';
};


// --- COMPONENTS ---

const NewsItemCard = ({ news }) => {
    const imageUrl = getFirstImageUrl(news);

    return (
        <a href={`/news/${news._id}`}
            className="flex h-auto space-x-3 group cursor-pointer  border-b border-gray-300 p-2 -mx-2  ">
            <div className="flex-shrink-0">
                <img
                    src={imageUrl} // Use the clean URL
                    alt={news.title}
                    className="w-24 h-16 object-cover rounded group-hover:opacity-80 transition duration-200 shadow-sm"
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x70/6b7280/ffffff?text=News"; }}
                />
            </div>
            <div className="flex flex-col  ">
                <h3 className="text-lg font-medium line-clamp-2 leading-snug group-hover:text-red-700 transition duration-200">
                    {news.title}
                </h3>
                <NewsTime createdAt={news.createdAt} />
            </div>
        </a>
    );
};

const FeatureItemCard = ({ news }) => {
    const { _id, title, category, location, createdAt } = news;

    const imageUrl = getFirstImageUrl(news);

    return (
        <a
            href={`/news/${_id}`}
            className="block  h-full rounded overflow-hidden hover:[var(--hover-bg)] hover:shadow-lg transition-all duration-300 border border-gray-100"
        >
            <div className="relative w-full h-40">
                {/* Image */}
                <img
                    src={imageUrl || "https://placehold.co/600x400?text=No+Image"}
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
            </div>
        </a>
    );
};


const NewsSection = ({ category, newsItems }) => {
    // We display the first item as the feature and the next 3 as the list
    const mainItem = newsItems[0];
    const listItems = newsItems.slice(1, 4);

    if (!mainItem) return null;

    return (
        <div className="bg-[var(--bg-color)] p-2 flex flex-col h-full">
            <div className="flex justify-between items-center pb-2 mb-4 border-b border-red-100">
                <h2 className="text-xl font-extrabold  border-b-2 border-red-600 pb-1">
                    {/* {category} */}
                    <SubHeadline name={category} />
                </h2>
            </div>

            <div className="flex-grow">
                <FeatureItemCard news={mainItem} />
            </div>

            {listItems.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-gray-100 mt-4">
                    {listItems.map((news) => (
                        <NewsItemCard key={news._id} news={news} />
                    ))}
                </div>
            )}

            <div className="mt-6 pt-4 border-t border-gray-100">
                {/* <button
                    onClick={() => console.log(`More news clicked for: ${category}`)}
                    className="w-full text-sm text-white font-semi-bold bg-[var(--primary-color)] hover:bg-red-600  py-3 rounded "
                >
                    আরও দেখুন
                </button> */}
                <ChildHeadline name={category} />
            </div>
        </div>
    );
};

// --- MAIN APP COMPONENT ---
export default function Allfeature() {
    const [allNews, setAllNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const categories = ['তথ্যপ্রযুক্তি', 'জীবন যাপন', 'চাকরি', 'ধর্ম', 'স্বাস্থ্য', 'শিক্ষা', 'বিনোদন', 'খেলা', 'বাণিজ্য'];

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('http://72.61.112.34:5000/allnews/');
                setAllNews(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch news:", err);
                setError("Error loading news data.");
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    // 2. Group news by category
    const groupedNews = allNews.reduce((acc, news) => {
        // IMPORTANT: Normalize the category string to handle potential whitespace issues from the database
        const normalizedCategory = (news.category || '').trim();

        if (normalizedCategory) {
            acc[normalizedCategory] = acc[normalizedCategory] || [];
            acc[normalizedCategory].push(news);
        }
        return acc;
    }, {});

    // 3. Filter sections to display
    // 3. Filter sections to display
    const sectionsToDisplay = categories
        .filter(cat => groupedNews[cat] && groupedNews[cat].length > 0)
        .map(cat => ({ category: cat, items: groupedNews[cat] }));


    // ... (rest of the component JSX remains the same)
    return (
        <div className="min-h-screen max-w-7xl mx-auto p-4 md:p-8">
            {/* Loading/Error State */}
           {loading && (
    <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {[1, 2, 3, 4].map((i) => (
            <SkeletonNewsSection key={i} />
        ))}
    </main>
)}

            {error && (
                <div className="text-center py-10 text-xl text-red-600">
                    {error}
                </div>
            )}

            {/* News Grid (Only renders if not loading and no error) */}
            {!loading && !error && (
                <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-3">
                    {sectionsToDisplay.map((section, index) => (
                        <div key={index}>
                            <NewsSection category={section.category} newsItems={section.items} />
                        </div>
                    ))}
                </main>
            )}

            {/* Display a message if no sections are available (i.e., less than 4 items per category) */}
            {!loading && !error && sectionsToDisplay.length === 0 && (
                <div className="text-center py-10 text-xl ">
                    কোনো বিভাগে পর্যাপ্ত খবর (কমপক্ষে ৪টি) পাওয়া যায়নি।
                </div>
            )}
        </div>
    );
}