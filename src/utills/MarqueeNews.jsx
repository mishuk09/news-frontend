import React, { useState, useEffect } from 'react';
import Marquee from 'react-fast-marquee';
import axios from 'axios';

const MarqueeNews = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch data from the endpoint
        axios.get('http://localhost:5000/allnews/')
            .then(response => {
                // Assuming the response data is an array of news objects,
                // and each object has a 'title' property.
                // We take the first 5 items.
                setNews(response.data.slice(0, 5));
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching news:", err);
                setError("Failed to load news titles.");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="bg-gray-800 text-white p-2">Loading news...</div>;
    }

    if (error || news.length === 0) {
        return <div className="bg-red-600 text-white p-2">No news available or an error occurred.</div>;
    }

    return (
        <div className="max-w-7xl  mx-auto lg:rounded bg-[var(--primary-color)] text-white py-2 px-4   flex items-center overflow-hidden">

            {/* Static 'Head' or 'Breaking' label */}
            <div className="flex-shrink-0 lg:text-lg font-bold mr-4 border-r pr-4  ">
               সর্বশেষ খবর
            </div>

            {/* Marquee component */}
            <Marquee
                gradient={false} // No gradient for full visibility
                speed={70} // Adjust speed as needed (pixels/second)
                direction="left" // Scrolls from right to left
                pauseOnHover={true} // Pauses when mouse hovers over
                className="flex-grow"
            >
                {news.map((item, index) => (
                    // Use a Link component if using React Router, otherwise an <a> tag
                    // The URL is just a placeholder here; replace with actual news link logic.
                    <a
                        key={index}
                       href={`/product/${item._id}`} // Replace with actual URL structure and ID
                        className="text-white hover:text-blue-400 whitespace-nowrap mx-3  text-lg transition-colors duration-200"
                    // Tailwind class to style the text
                    >
                        •   {item.title}
                    </a>
                ))}
            </Marquee>
        </div>
    );
};

export default MarqueeNews;