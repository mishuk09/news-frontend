import React from 'react';
import Leftformat from '../Leftformat';
import RIghtformat from '../RIghtformat';
import Mainformat from '../Mainformat';
import useFetch from '../../hooks/useFetch';

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


const FeaturedCard = ({ title, img, createdAt }) => {

    return (
        <div className="relative flex flex-col bg-white rounded  overflow-hidden   border border-gray-100 ">
            <div className="relative w-full aspect-[3/2] overflow-hidden">
                <img
                    src={img}
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

const NatonalFormat = ({ division, district, upazila }) => {
    const { data: news, } = useFetch("http://localhost:5000/allnews/");

    return (
        <div>
            <div className='max-w-7xl mx-auto'>
                <div className='flex  gap-2 w-full pt-4'>
                    <div className=' hidden md:block  w-[25%]  h-full rounded'>
                        <Leftformat path='allnews' division={division} district={district} upazila={upazila} />
                    </div>

                    <div className='  p-1  w-full md:w-[50%] h-full rounded relative'>



                        <Mainformat path='allnews' division={division} district={district} upazila={upazila} />

                    </div>
                    <div className='   p-1 w-[25%] h-full hidden md:block   rounded'>


                        <RIghtformat path='allnews' division={division} district={district} upazila={upazila} />
                    </div>
                </div>
            </div>
            {/* Featured News */}
            <section className="mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {news && news.slice(7, 11).map((article, index) => (
                        <FeaturedCard key={index} {...article} />
                    ))}
                </div>
            </section>

            {/* <p>{upazila}</p>
            <p>{district}</p>
            <p>{division}</p> */}
        </div>
    );
};

export default NatonalFormat;