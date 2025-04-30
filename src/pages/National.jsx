import React, { useState } from "react";

const National = () => {
    const [activeTab, setActiveTab] = useState("জেলার খবর");

    return (
        <div className="bg-blue-50 p-5 rounded-lg shadow-md max-w-7xl mx-auto">
            <div className="flex items-center space-x-4 mb-6">
                <img src="/path/to/flag.png" alt="Bangladesh Flag" className="w-10 h-6" />
                <h2 className="text-2xl font-semibold text-gray-800">বাংলাদেশ</h2>
            </div>
            <div className="flex space-x-4 mb-6">
                <button
                    className={`px-4 py-2 rounded-lg text-lg ${activeTab === "জেলার খবর"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-blue-600 border border-blue-600"
                        }`}
                    onClick={() => setActiveTab("জেলার খবর")}
                >
                    জেলার খবর
                </button>
                <button
                    className={`px-4 py-2 rounded-lg text-lg ${activeTab === "বিভাগ"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-blue-600 border border-blue-600"
                        }`}
                    onClick={() => setActiveTab("বিভাগ")}
                >
                    বিভাগ
                </button>
                <button
                    className={`px-4 py-2 rounded-lg text-lg ${activeTab === "জেলা"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-blue-600 border border-blue-600"
                        }`}
                    onClick={() => setActiveTab("জেলা")}
                >
                    জেলা
                </button>
                <button
                    className={`px-4 py-2 rounded-lg text-lg ${activeTab === "উপজেলা"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-blue-600 border border-blue-600"
                        }`}
                    onClick={() => setActiveTab("উপজেলা")}
                >
                    উপজেলা
                </button>
            </div>
            <div className="flex justify-end">
                <button className="bg-red-500 text-white px-6 py-2 rounded-lg text-lg">
                    অনুসরণ
                </button>
            </div>
        </div>
    );
};

export default National;
