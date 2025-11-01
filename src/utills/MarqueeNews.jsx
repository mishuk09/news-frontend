import React, { useState, useEffect } from 'react';
import Marquee from 'react-fast-marquee';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';

const MarqueeNews = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/allnews/')
            .then(response => {
                setNews(response.data.slice(0, 5)); // Limit to first 5 news items
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching news:", err);
                setError("Failed to load news titles.");
                setLoading(false);
            });
    }, []);

    return (
        <div >
            {loading ? (
                <Skeleton height={40} width={'100%'} />
            ) : error ? (
                <div>{error}</div>
            ) : (
                <div className="max-w-7xl mx-auto lg:rounded-b bg-[var(--primary-color)] text-white py-2 px-4 flex items-center overflow-hidden"> 
                    <div className="flex-shrink-0 lg:text-lg font-bold mr-4 border-r pr-4">
                        সর্বশেষ খবর
                    </div> 
                    <Marquee
                        gradient={false}
                        speed={70}
                        direction="left"
                        pauseOnHover={true}
                        className="flex-grow"
                    >
                        {news.map((item, index) => (
                            <a
                                key={index}
                                href={`/product/${item._id}`}
                                className="text-white hover:text-blue-400 whitespace-nowrap mx-3 text-lg transition-colors duration-200"
                            >
                                • {item.title}
                            </a>
                        ))}
                    </Marquee>
                </div>
            )}
        </div>
    );
};

export default MarqueeNews;
