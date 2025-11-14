import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import Morenews from "./Morenews";

const API_URL = "https://news-backend-user.onrender.com/decision/";

const SingleDecision = () => {
    const { id } = useParams();
    const [decision, setDecision] = useState(null);
    const [allDecisions, setAllDecisions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch single decision
    useEffect(() => {
        const fetchDecision = async () => {
            try {
                const res = await axios.get(`${API_URL}${id}`);
                setDecision(res.data);
            } catch (err) {
                console.error("Error fetching decision:", err);
                setError("Failed to load decision details.");
            } finally {
                setLoading(false);
            }
        };

        fetchDecision();
    }, [id]);

    // Fetch all other decisions
    useEffect(() => {
        const fetchAllDecisions = async () => {
            try {
                const res = await axios.get(API_URL);
                // Exclude the currently viewed decision
                const others = res.data.filter((d) => d.id !== parseInt(id));
                setAllDecisions(others);
            } catch (err) {
                console.error("Error fetching all decisions:", err);
            }
        };

        fetchAllDecisions();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64 text-gray-600 text-lg animate-pulse">
                Loading decision details...
            </div>
        );
    }

    if (error || !decision) {
        return (
            <div className="text-center mt-10 text-red-500 text-lg">
                {error || "Decision not found."}
            </div>
        );
    }

    return (
        <section className="max-w-7xl mx-auto mt-12 mb-12 px-6">
            {/* Header */}
            <div className="text-center mb-10">
                <h2 className="text-4xl font-bold   mb-2">
                    🧭 সিদ্ধান্তের বিস্তারিত তথ্য
                </h2>
                <p className="text-[var(--primary-text-color)] max-w-2xl mx-auto text-lg">
                    📘 এই অংশে আপনি নির্দিষ্ট সিদ্ধান্তটির প্রেক্ষাপট, যুক্তি ও মূল বিশ্লেষণ সম্পর্কে বিস্তারিতভাবে জানতে পারবেন।
                </p>
                <p className="text-sm text-gray-500 mt-2">
                    📅 সাল: {new Date().getFullYear()}
                </p>
            </div>

            {/* Main Decision Card */}
            <div className="rounded shadow p-8 border border-gray-200 mb-12">
                <h1 className="text-3xl font-semibold   mb-4">
                    {decision.title}
                </h1>

                <p className="text-[var(--primary-text-color)]  text-lg leading-relaxed mb-6 border-l-4 border-blue-500 pl-4 italic">
                    {decision.description}
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4 mt-8 border-t pt-6">
                    <img
                        src={
                            decision.authorImage ||
                            "https://via.placeholder.com/100x100.png?text=No+Image"
                        }
                        alt={decision.authorName}
                        className="w-16 h-16 rounded-full object-cover border"
                    />
                    <div>
                        <p className="font-semibold text-[var(--primary-text-color)] ">
                            {decision.authorName || "Unknown Author"}
                        </p>
                        <p className="text-sm text-gray-500">
                            {new Date(decision.createdAt).toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* Related Articles */}
                {decision.relatedArticles?.length > 0 && (
                    <div className="mt-10">
                        <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                            Related Articles
                        </h3>
                        <ul className="space-y-3">
                            {decision.relatedArticles.map((article, idx) => (
                                <li
                                    key={idx}
                                    className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition"
                                >
                                    <span className="font-medium text-gray-900">
                                        {article.title}
                                    </span>
                                    <span className="text-gray-500"> — {article.author}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Other Decisions */}
            {allDecisions.length > 0 && (
                <div className="mt-16">
                    <h3 className="text-3xl font-bold mb-6   text-center">
                        অন্যান্য সিদ্ধান্তসমূহ
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {allDecisions.map((d) => (
                            <a
                                key={d._id}
                                href={`/decision/${d._id}`}
                                className="block   border rounded shadow-sm hover:shadow-md transition overflow-hidden"
                            >
                                {/* Image Section */}
                                <div className="h-48 w-full overflow-hidden">
                                    <img
                                        src={
                                            d.authorImage ||
                                            "https://via.placeholder.com/600x400.png?text=No+Image"
                                        }
                                        alt={d.title}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                </div>

                                {/* Content Section */}
                                <div className="p-2">
                                    <h4 className="text-xl font-semibold   mb-2">
                                        {d.title}
                                    </h4>
                                    <p className="text-[var(--primary-text-color)] line-clamp-3">
                                        {d.description}
                                    </p>
                                    <div className="mt-3 text-sm text-blue-600 font-medium">
                                        বিস্তারিত দেখুন →
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            )}

            <section>
                <Morenews />
            </section>
        </section>
    );
};

export default SingleDecision;
