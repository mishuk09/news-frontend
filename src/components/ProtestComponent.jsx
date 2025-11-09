import React, { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const ProtestComponent = () => {
    const API_URL = "http://72.61.112.34:5000/decision/";
    const [decisions, setDecisions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(API_URL);
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

    // Skeleton for loading state
    if (loading) {
        return (
            <div className="flex mt-10 gap-10 w-full">
                {/* LEFT CARD SKELETON */}
                <div className="hidden lg:block w-[40%] p-6 border border-gray-300 rounded shadow-md">
                    <Skeleton height={30} width={`80%`} className="mb-4" />
                    <Skeleton count={5} />
                    <div className="flex items-center gap-3 mt-4">
                        <Skeleton circle={true} height={56} width={56} />
                        <Skeleton height={20} width={120} />
                    </div>
                </div>

                {/* RIGHT LIST SKELETON */}
                <div className="space-y-6 w-full lg:w-[60%]">
                    {Array(4)
                        .fill(0)
                        .map((_, index) => (
                            <div key={index} className="flex items-center gap-4 border-b pb-3 border-gray-300">
                                <Skeleton circle={true} height={56} width={56} />
                                <div className="flex-1">
                                    <Skeleton height={24} width={`90%`} className="mb-2" />
                                    <Skeleton height={18} width={`50%`} />
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        );
    }

    if (decisions.length === 0) {
        return (
            <div className="text-center text-gray-500 mt-10">No decisions found.</div>
        );
    }

    const latest = decisions[0];
    const others = decisions.slice(1);

    return (
        <div className="flex mt-10 gap-10 w-full">
            {/* LEFT CARD */}
            <a
                href={`/decision/${latest._id}`}
                className="bg-[var(--bg-color)] hidden lg:block w-[40%] relative p-6 border border-gray-300 rounded shadow-md col-span-2 hover:shadow-lg transition cursor-pointer"
            >
                <div className="absolute left-[-30px] bg-indigo-950 text-white px-4 py-3 inline-block rounded mb-4 text-xl font-semibold w-full">
                    {latest.title || "No title available"}
                </div>
                <p className="text-lg text-[var(--primary-text-color)] mb-4 pt-16 line-clamp-5 leading-relaxed text-justify">
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
                    <h3 className="text-[var(--primary-text-color)] font-semibold">
                        {latest.authorName || "Unknown Author"}
                    </h3>
                </div>
            </a>

            {/* RIGHT LIST */}
            <div className="space-y-6 w-full lg:w-[60%]">
                {others.map((item, index) => (
                    <a
                        href={`/decision/${item._id}`}
                        key={item._id || index}
                        className="flex items-center gap-4 border-b pb-3 border-gray-300 hover:bg-[var(--hover-bg)] transition cursor-pointer"
                    >
                        <img
                            src={
                                item.authorImage ||
                                "https://via.placeholder.com/80x80.png?text=No+Image"
                            }
                            alt={item.authorName || "Unknown Author"}
                            className="w-14 h-14 rounded-full object-cover border border-gray-300 shrink-0"
                        />
                        <div className="flex-1">
                            <h4 className="text-xl font-semibold leading-snug hover:underline text-[var(--primary-text-color)]">
                                {item.title || "Untitled Decision"}
                            </h4>
                            <p className="text-[var(--primary-text-color)] mt-1">
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
