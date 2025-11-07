// src/components/LatestNewsSection.jsx (Updated Main File)
import React, { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "../../utills/NewsCard";
import SubNewsCard from "./SubNewsCard";
import { ArrowRight, ChevronRight } from "lucide-react";
import LatestNewsHeader from "../../utills/LatestNewsHeader";
import National from "../../pages/National";
import LatestNewsChild from "./LatestNewsChild";
import TopNewsItem from "../../utills/TopNewsItem";

const API_URL = "http://localhost:5000/allnews/";
const bgImage = "https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/1837D/production/_85979199_bangladesh_farmer_g.jpg";
/**
 * Main component for the Latest News Section, handling data fetching and layout.
 */
const LatestNews = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(API_URL);
                setNews(response.data);
            } catch (err) {
                console.error("Error fetching news:", err);
                setError("🚨 খবর লোড করতে সমস্যা হচ্ছে। অনুগ্রহ করে পরে আবার চেষ্টা করুন।");
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    // --- Loading State ---
    if (loading) {
        // Professional Skeleton/Shimmer loading for a modern feel
        return (
            <section className="max-w-7xl mx-auto px-6 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-3 border-b-4 border-red-600 inline-block pb-2">
                        📰 সর্বশেষ খবর
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-gray-100 rounded-xl shadow-lg p-6 animate-pulse h-80">
                            <div className="h-32 bg-gray-300 rounded-lg mb-4"></div>
                            <div className="h-6 bg-gray-300 rounded mb-2 w-3/4"></div>
                            <div className="h-4 bg-gray-300 rounded mb-4 w-full"></div>
                            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    // --- Error State ---
    if (error) {
        return (
            <div className="text-center bg-red-50 border-l-4 border-red-500 text-red-700 p-4 max-w-lg mx-auto my-10" role="alert">
                <p className="font-bold">ত্রুটি!</p>
                <p>{error}</p>
            </div>
        );
    }

    // Check for empty data
    if (news.length === 0) {
        return (
            <div className="text-center bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700 p-4 max-w-lg mx-auto my-10" role="alert">
                <p className="font-bold">খবর নেই</p>
                <p>এই মুহূর্তে দেখানোর মতো কোনো নতুন খবর নেই।</p>
            </div>
        );
    }

    // --- Success State (Main Content) ---
    return (
        <>

            <LatestNewsHeader
                category="বাংলাদেশ"
                headline="বাংলাদেশ"
                description="বাংলাদেশ জাতীয় নির্বাচনের জন্য ২০২৫ সালে প্রার্থী তালিকা ঘোষণা করেছে বিএনপি। এতে রয়েছে অভিজ্ঞ ও তরুণ প্রার্থীর ."
                bgImage={bgImage}
                news={news}
                loading={loading}
            />
            <LatestNewsChild news={news} loading={loading} />

             {/* Top News Updates */}
                <section className="max-w-7xl mx-auto my-10">
                    <h2 className="text-2xl font-bold  mb-6 border-b border-red-600 pb-3 flex items-center gap-2">
                        শীর্ষ খবর ও হালনাগাদ
                        <ChevronRight className="w-5 h-5 text-red-600" />
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-2 rounded   ">
                        {news.slice(1, 7).map((data, index) => (
                            <TopNewsItem key={index} news={data} />
                        ))}
                    </div>
                </section>
        </>

    );
};

export default LatestNews;