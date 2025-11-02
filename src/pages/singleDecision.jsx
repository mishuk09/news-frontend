import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SingleDecision = () => {
    const { id } = useParams(); // 🆔 Get decision ID from URL
    const [decision, setDecision] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDecision = async () => {
            try {
                const res = await axios.get(`http://127.0.0.1:5000/decision/${id}`);
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

    if (loading) {
        return (
            <div className="text-center mt-10 text-gray-600 text-lg">
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
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {decision.title}
            </h1>

            <p className="text-gray-700 leading-relaxed mb-6">
                {decision.description}
            </p>

            <div className="flex items-center gap-4 mt-6">
                <img
                    src={
                        decision.authorImage ||
                        "https://via.placeholder.com/100x100.png?text=No+Image"
                    }
                    alt={decision.authorName}
                    className="w-16 h-16 rounded-full object-cover border"
                />
                <div>
                    <p className="font-semibold text-gray-800">
                        {decision.authorName || "Unknown Author"}
                    </p>
                    <p className="text-sm text-gray-500">
                        {new Date(decision.createdAt).toLocaleString()}
                    </p>
                </div>
            </div>

            {/* Related Articles (if exist) */}
            {decision.relatedArticles?.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">
                        Related Articles
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                        {decision.relatedArticles.map((article, idx) => (
                            <li key={idx}>
                                <span className="font-medium">{article.title}</span> —{" "}
                                {article.author}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SingleDecision;
