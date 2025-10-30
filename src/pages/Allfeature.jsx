import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Headline from '../components/Headline';
import { WholeWord } from 'lucide-react';

// --- CATEGORY DEFINITIONS ---
// Define the categories you want to display. These MUST exactly match the values in your database.
const categories = ['তথ্যপ্রযুক্তি', 'জীবন যাপন', 'চাকরি', 'ধর্ম', 'স্বাস্থ্য', 'শিক্ষা', 'ইসলাম', 'বিনোদন'];

// --- UTILITY FUNCTION FOR IMAGE URL ---
/**
 * Safely extracts the first image URL from the news object's 'img' array.
 * @param {object} news The news article object from the database.
 * @returns {string} The first image URL or a fallback.
 */
const getFirstImageUrl = (news) => {
    // Check if 'img' is an array and has at least one element
    if (Array.isArray(news.img) && news.img.length > 0) {
        return news.img[0];
    }
    // Fallback image source if no image is available
    return 'https://placehold.co/600x400/CCCCCC/6b7280?text=No+Image';
};



const NewsTime = ({ createdAt }) => {
    const getTimeAgo = (dateString) => {
        if (!dateString) return "সময় নেই";

        const now = new Date();
        const date = new Date(dateString);
        const diffMs = now - date;

        const diffSeconds = Math.floor(diffMs / 1000);
        const diffMinutes = Math.floor(diffSeconds / 60);
        const diffHours = Math.floor(diffMinutes / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffSeconds < 60) return `${diffSeconds} সেকেন্ড আগে`;
        if (diffMinutes < 60) return `${diffMinutes} মিনিট আগে`;
        if (diffHours < 24) return `${diffHours} ঘণ্টা আগে`;
        return `${diffDays} দিন আগে`;
    };

    return <p className="text-xs mt-1">{getTimeAgo(createdAt)}</p>;
};

// --- COMPONENTS ---

const NewsItemCard = ({ news }) => {
    const imageUrl = getFirstImageUrl(news);

    return (
        <div className="flex h-26 space-x-3 group cursor-pointer hover:bg-red-50 p-2 -mx-2 rounded transition duration-200">
            <div className="flex-shrink-0">
                <img
                    src={imageUrl} // Use the clean URL
                    alt={news.title}
                    className="w-24 h-16 object-cover rounded group-hover:opacity-80 transition duration-200 shadow-sm"
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x70/6b7280/ffffff?text=News"; }}
                />
            </div>
            <div className="flex flex-col  ">
                <h3 className="text-lg font-medium leading-snug group-hover:text-red-700 transition duration-200">
                    {news.title.slice(0, 60)}{news.title.length > 60 ? '...' : ''}
                </h3>
                <NewsTime createdAt={news.createdAt} />
            </div>
        </div>
    );
};

const FeatureItemCard = ({ news }) => {
    const imageUrl = getFirstImageUrl(news);

    return (
        <div className="cursor-pointer group">
            {/* New: Added a container div for better control over the image aspect ratio and overflow */}
            <div className="w-full h-45 overflow-hidden rounded mb-3  group-hover:shadow-lg transition duration-300 bg-gray-200">
                <img
                    src={imageUrl}
                    alt={news.title}
                    // Fix: Removed 'h-auto'. Set the image to take full width and height of its parent div.
                    // 'object-cover' ensures it covers the area without stretching.
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/374151/ffffff?text=Feature+News"; }}
                />
            </div>
            <h3 className="text-xl font-bold  leading-tight group-hover:text-red-700 transition duration-200">
                {news.title}
            </h3>
            <p className="text-sm  mt-1 mb-4">{news.time || "সময় নেই"}</p>
        </div>
    );
};


const NewsSection = ({ category, newsItems }) => {
    // We display the first item as the feature and the next 3 as the list
    const mainItem = newsItems[0];
    const listItems = newsItems.slice(1, 4);

    if (!mainItem) return null;

    return (
        <div className="bg-white p-2 flex flex-col h-full">
            <div className="flex justify-between items-center pb-2 mb-4 border-b border-red-100">
                <h2 className="text-xl font-extrabold  border-b-2 border-red-600 pb-1">
                    {category}
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
                <button
                    onClick={() => console.log(`More news clicked for: ${category}`)}
                    className="w-full text-sm text-white font-semi-bold bg-[var(--primary-color)] hover:bg-red-600  py-3 rounded "
                >
                    আরও দেখুন
                </button>
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
                const response = await axios.get('http://localhost:5000/allnews/');
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

            {/* Intro Section */}
            <div className="mb-8">
                {/* <h2 className="text-3xl sm:text-4xl font-extrabold  border-b-4 border-red-600 pb-2 mb-2 inline-block">
                    অন্যান্য বিভাগীয় সংবাদ
                </h2> */}
                <Headline name='অন্যান্য বিভাগীয় সংবাদ' link={<WholeWord />} />
                <p className="text-xl  mt-2">
                    আপনার পছন্দের বিভাগ থেকে খবর দেখুন। প্রতিটি বিভাগের জন্য একটি প্রধান খবর এবং তিনটি গুরুত্বপূর্ণ খবর নীচে দেখানো হলো।
                </p>
            </div>

            {/* Loading/Error State */}
            {loading && (
                <div className="text-center py-10 text-xl ">
                    সংবাদ লোড হচ্ছে...
                </div>
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