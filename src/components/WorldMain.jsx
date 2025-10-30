import React from 'react';
import { ChevronRight } from 'lucide-react';
import useFetch from '../hooks/useFetch';

// --- Helper Component to format time ---
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

    return <p className="text-base  absolute bottom-1 right-1">{getTimeAgo(createdAt)}</p>;
};

// --- Components ---
const TrendingItem = ({ title, news }) => {
    const imageUrl = Array.isArray(news.img) && news.img.length > 0 ? news.img[0] : "https://placehold.co/100x100?text=No+Image";

    return (
        <div className="flex items-start py-3 border-b border-gray-200 hover:bg-gray-100   transition cursor-pointer">
            <div className="w-20 h-20 bg-gray-200 mr-4 rounded overflow-hidden flex-shrink-0">
                <img
                    src={imageUrl}
                    alt="news"
                    className="w-full h-full object-cover"
                    onError={(e) => (e.target.src = "https://placehold.co/100x100?text=Error")}
                />
            </div>
            <p className=" text-xl   font-medium leading-snug">
                {title.slice(0, 80)}{title.length > 50 ? '...' : ''}
            </p>
        </div>
    );
};

const FeaturedCard = ({ title, img, createdAt }) => {
    const imageUrl = Array.isArray(img) && img.length > 0 ? img[0] : "https://placehold.co/300x200?text=No+Image";

    return (
        <div className="relative flex flex-col bg-white rounded  overflow-hidden   border border-gray-100 ">
            <div className="relative w-full aspect-[3/2] overflow-hidden">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) => (e.target.src = "https://placehold.co/300x200/F3F4F6/1F2937?text=Placeholder")}
                />
            </div>
            <div className="p-4">
                <h3 className="text-base sm:text-xl font-semibold  hover:text-red-600 transition leading-snug">
                    {title}
                </h3>
            </div>
            <NewsTime createdAt={createdAt} />
        </div>
    );
};

const TopNewsItem = ({ title, img, description }) => {
    const imageUrl = Array.isArray(img) && img.length > 0 ? img[0] : "https://placehold.co/100x70?text=No+Image";

    return (
        <div className="flex gap-4 p-2   hover:bg-gray-100 border-b border-gray-300   cursor-pointer">
            <div className="w-26 h-26 flex-shrink-0 rounded-md overflow-hidden border border-gray-200">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover"
                    onError={(e) => (e.target.src = "https://placehold.co/100x70/D1D5DB/4B5563?text=ছবি")}
                />
            </div>
            <div>
                <p className=" text-sm sm:text-xl  *: font-semibold leading-snug hover:text-red-600 transition">
                    {title.length > 70 ? `${title.slice(0, 70)}...` : title}
                </p>
                <p>
                    <DescriptionParaPreview description={description} />
                </p>
            </div>


        </div>
    );
};

// --- Helper Component to format description ---

const DescriptionPreview = ({ description }) => {

    const getShortText = (html) => {
        if (!html) return "";

        // 1️⃣ Remove all HTML tags
        let text = html.replace(/<[^>]*>/g, " ");

        // 2️⃣ Replace HTML entities like &nbsp; &amp; &quot;
        text = text
            .replace(/&nbsp;/g, " ")
            .replace(/&amp;/g, "&")
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">");

        // 3️⃣ Remove extra spaces/newlines/tabs
        const cleanText = text.replace(/\s+/g, " ").trim();

        // 4️⃣ Limit to 50 words
        const words = cleanText.split(" ");
        const shortText =
            words.length > 50 ? words.slice(0, 50).join(" ") + "..." : cleanText;

        return shortText;
    };


    return (
        <p className="text-lg text-gray-600 text-justify">
            {getShortText(description)}
        </p>
    );
};

// --- Helper Component to format description ---

const DescriptionParaPreview = ({ description }) => {

    const getShortText = (html) => {
        if (!html) return "";

        // 1️⃣ Remove all HTML tags
        let text = html.replace(/<[^>]*>/g, " ");

        // 2️⃣ Replace HTML entities like &nbsp; &amp; &quot;
        text = text
            .replace(/&nbsp;/g, " ")
            .replace(/&amp;/g, "&")
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">");

        // 3️⃣ Remove extra spaces/newlines/tabs
        const cleanText = text.replace(/\s+/g, " ").trim();

        // 4️⃣ Limit to 50 words
        const words = cleanText.split(" ");
        const shortText =
            words.length > 10 ? words.slice(0, 10).join(" ") + "..." : cleanText;

        return shortText;
    };


    return (
        <p className="text-lg text-gray-600 text-justify leading-tight">
            {getShortText(description)}
        </p>
    );
};
// --- Main Component ---
const WorldMain = () => {
    const { data: news, loading, error } = useFetch("http://localhost:5000/allnews/");
    // ✅ Filter news by category
    const worldNews = news.filter(item => item.category === "বিশ্ব");
    if (loading) return <p className="text-center py-10 ">Loading...</p>;
    if (error) return <p className="text-center py-10 text-red-600">Error: {error.message}</p>;

    return (
        <div className="min-h-screen">
            <main className="max-w-7xl mx-auto px-3 py-2 ">

                {/* Hero Section */}
                <section className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">

                    {worldNews.slice(0, 1).map((item, index) => {
                        const imageUrl = Array.isArray(item.img) && item.img.length > 0 ? item.img[0] : "https://placehold.co/600x400?text=No+Image";
                        return (
                            <div key={index} className="lg:col-span-2 cursor-pointer">
                                <div className="bg-white rounded overflow-hidden  border border-gray-200">
                                    <div className="relative aspect-video bg-gray-100">
                                        <img
                                            src={imageUrl}
                                            alt="Main news"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-2">
                                        <h2 className="text-3xl font-bold  leading-tight hover:text-red-600 transition">
                                            {item.title}
                                        </h2>
                                        <DescriptionPreview description={item.description} />


                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* Trending News */}
                    <div className="lg:col-span-2 bg-white px-2 rounded border-b border-gray-200">
                        <h3 className="text-lg font-bold  mb-3 border-b-2 border-red-600 pb-1">
                            আলোচিত খবর
                        </h3>
                        <div className="grid grid-cols-2 gap-2  ">
                            {news.slice(2, 10).map((item, index) => (
                                <TrendingItem key={index} title={item.title} news={item} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Featured News */}
                <section className="mb-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {worldNews.slice(7, 11).map((article, index) => (
                            <FeaturedCard key={index} {...article} />
                        ))}
                    </div>
                </section>

                {/* Top News Updates */}
                <section>
                    <h2 className="text-2xl font-bold  mb-6 border-b border-red-600 pb-3 flex items-center gap-2">
                        শীর্ষ খবর ও হালনাগাদ
                        <ChevronRight className="w-5 h-5 text-red-600" />
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-2 rounded   ">
                        {worldNews.slice(12, 30).map((item, index) => (
                            <TopNewsItem key={index} {...item} />
                        ))}
                    </div>
                </section>

            </main>
        </div>
    );
};

export default WorldMain;
