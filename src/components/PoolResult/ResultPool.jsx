import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../../hooks/ThemeContext";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ResultPool() {
    const { theme } = useContext(ThemeContext);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_BASE = "http://72.61.112.34:5000/questionPool/question";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(API_BASE);
                const sorted = res.data.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
                setQuestions(sorted);
            } catch (err) {
                console.error("Error loading poll results:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const calcPercent = (optionVotes, totalVotes) =>
        totalVotes === 0 ? 0 : ((optionVotes / totalVotes) * 100).toFixed(1);

    // 🧱 Loading Skeleton
    if (loading) {
        return (
            <SkeletonTheme
                baseColor={theme === "dark" ? "#2a2a2a" : "#e0e0e0"}
                highlightColor={theme === "dark" ? "#3a3a3a" : "#f5f5f5"}
            >
                <div
                    className={`${theme === "dark"
                        ? "dark-bg-color text-white"
                        : "bg-white text-gray-800"
                        } p-4 rounded shadow max-w-3xl mx-auto`}
                >
                    <h2 className="text-xl font-semibold mb-4">
                        <Skeleton width={200} />
                    </h2>
                    {/* Skeleton for question */}
                    <Skeleton count={2} height={20} className="mb-4" />
                    {/* Skeleton for poll bars */}
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="mb-3">
                            <Skeleton height={10} />
                        </div>
                    ))}
                    <Skeleton width={100} height={12} />
                </div>
            </SkeletonTheme>
        );
    }

    // 🧾 No results
    if (questions.length === 0) {
        return (
            <div
                className={`${theme === "dark"
                    ? "dark-bg-color text-white"
                    : "bg-white text-gray-800"
                    } p-4 rounded shadow text-center`}
            >
                কোন ফলাফল পাওয়া যায়নি।
            </div>
        );
    }

    // 🏆 Actual poll display (unchanged from your version)
    const latest = questions[0];
    const older = questions.slice(1);

    return (
        <div
            className={`${theme === "dark" ? "dark-bg-color text-white" : "bg-white text-gray-900"
                } rounded p-4 mt-4 mb-15 shadow max-w-7xl mx-auto`}
        >
            {/* 🟨 Latest Poll */}
            <div className="border-b border-gray-300 pb-4 mb-4">
                <h2 className="text-2xl font-bold mb-3 text-[var(--primary-color)]">
                    🏆 আজকের সর্বশেষ প্রশ্ন
                </h2>
                <p className="text-lg mb-4">{latest.questionText}</p>

                {(() => {
                    const totalVotes = latest.options.reduce((a, o) => a + o.votes, 0);
                    return latest.options.map((opt) => {
                        const percent = calcPercent(opt.votes, totalVotes);
                        return (
                            <div key={opt._id} className="mb-2">
                                <div className="flex justify-between mb-1 text-sm font-medium">
                                    <span>{opt.text}</span>
                                    <span>
                                        {opt.votes} ভোট ({percent}%)
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div
                                        className="bg-[var(--primary-color)] h-3 rounded-full transition-all"
                                        style={{ width: `${percent}%` }}
                                    ></div>
                                </div>
                            </div>
                        );
                    });
                })()}
                <p className="text-xs mt-2 text-gray-500">
                    মোট ভোট: {latest.options.reduce((a, o) => a + o.votes, 0)}
                </p>
            </div>

            {/* 🧾 Older Polls */}
            <h3 className="text-lg font-semibold mb-3  text-[var(--primary-text-color)]">
                পুরনো প্রশ্নগুলোর ফলাফল
            </h3>
            {older.length === 0 ? (
                <p className="text-sm text-gray-500">আর কোন পুরনো প্রশ্ন নেই।</p>
            ) : (
                <div className="grid gap-4 md:grid-cols-2">
                    {older.map((q) => {
                        const totalVotes = q.options.reduce((a, o) => a + o.votes, 0);
                        return (
                            <div
                                key={q._id}
                                className="border border-gray-200 rounded p-3  "
                            >
                                <p className="font-medium mb-2">{q.questionText}</p>
                                {q.options.map((opt) => {
                                    const percent = calcPercent(opt.votes, totalVotes);
                                    return (
                                        <div key={opt._id} className="mb-1">
                                            <div className="flex justify-between text-sm">
                                                <span>{opt.text}</span>
                                                <span>
                                                    {opt.votes} ({percent}%)
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-blue-500 h-2 rounded-full"
                                                    style={{ width: `${percent}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
