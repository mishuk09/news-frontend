import React, { useEffect, useState } from "react";
import axios from "axios";
import { PenSquare } from "lucide-react";
import { Link } from "react-router-dom"; // ✅ Add this

const ProtestComponent = () => {
    const API_URL = "http://127.0.0.1:5000/decision/";
    const [decisions, setDecisions] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch latest 5 data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(API_URL);
                // Sort by createdAt (descending) if API provides timestamps
                const sorted = res.data.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
                setDecisions(sorted.slice(0, 5));
            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="text-center text-gray-500 mt-10">
                Loading latest decisions...
            </div>
        );
    }

    if (decisions.length === 0) {
        return (
            <div className="text-center text-gray-500 mt-10">No decisions found.</div>
        );
    }

    // First (latest) item for left card
    const latest = decisions[0];
    const others = decisions.slice(1);

    return (
        <div className="flex mt-10 gap-10 w-full">
            {/* LEFT CARD */}
            <a
                href={`/decision/${latest._id}`} // ✅ Makes left card clickable
                className="bg-blue-50 w-[40%] relative p-6 border border-gray-300 rounded shadow-md col-span-2 hover:shadow-lg transition cursor-pointer block"
            >
                <div className="absolute left-[-30px] bg-indigo-950 text-white px-4 py-3 inline-block rounded mb-4 text-xl font-semibold w-full">
                    {latest.title || "No title available"}
                </div>
                <p className="text-lg text-gray-700 mb-4 pt-16 line-clamp-5 leading-relaxed text-justify">
                    {latest.description || "No description provided for this decision."}
                </p>
                <div className="flex items-center gap-3 mt-4">
                    <img
                        src={
                            latest.authorImage ||
                            "https://via.placeholder.com/100x100.png?text=No+Image"
                        }
                        alt={latest.authorName || "Anonymous"}
                        className="w-14 h-14 rounded-full object-cover"
                    />
                    <h3 className="text-gray-900 font-semibold">
                        {latest.authorName || "Unknown Author"}
                    </h3>
                </div>
            </a>

            {/* RIGHT LIST */}
            <div className="space-y-6 w-[60%]">
                {others.map((item, index) => (
                    <a
                        href={`/decision/${item._id}`} // ✅ Makes each title clickable
                        key={item._id || index}
                        className="flex items-center gap-4 border-b pb-3 border-gray-300 hover:bg-gray-50 transition cursor-pointer"
                    >
                        {/* Author Image */}
                        <img
                            src={
                                item.authorImage ||
                                "https://via.placeholder.com/80x80.png?text=No+Image"
                            }
                            alt={item.authorName || "Unknown Author"}
                            className="w-14 h-14 rounded-full object-cover border border-gray-300 shrink-0"
                        />

                        {/* Text Section */}
                        <div className="flex-1">
                            <h4 className="text-xl font-semibold leading-snug hover:underline text-gray-900">
                                {item.title || "Untitled Decision"}
                            </h4>
                            <p className="text-gray-600 mt-1">
                                {item.authorName || "Unknown Author"}
                            </p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default ProtestComponent;
