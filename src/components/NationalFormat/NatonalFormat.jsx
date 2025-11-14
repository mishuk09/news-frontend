import React, { useContext, useEffect, useState } from 'react';
import Leftformat from '../Leftformat';
import RIghtformat from '../RIghtformat';
import Mainformat from '../Mainformat';
import useFetch from '../../hooks/useFetch';
import Sidenews from '../../utills/Sidenews';
import { ThemeContext } from '../../hooks/ThemeContext';
import Skeleton from 'react-loading-skeleton';
import NewsCard from '../../utills/NewsCard';
import axios from 'axios';
 
 
const NatonalFormat = ({ division, district, upazila }) => {
    const { theme } = useContext(ThemeContext);

    const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
  axios.get("https://news-backend-user.onrender.com/allnews/")
    .then(res => {
      // Make sure res.data is an array
      if (Array.isArray(res.data)) {
        const bangladeshNews = res.data.filter(item => item.category === "বাংলাদেশ");
        console.log("Filtered news:", bangladeshNews);
        setNews(bangladeshNews);
      } else {
        console.warn("Data is not an array:", res.data);
        setNews([]);
      }
      setLoading(false);
    })
    .catch(err => {
      console.error("Error fetching news:", err);
      setLoading(false);
    });
}, []);


    // const { data: news, loading } = useFetch("https://news-backend-user.onrender.com/allnews/");

    return (
        <div>
            <div className='max-w-7xl mx-auto'>
                <div className='flex  gap-2 w-full pt-4'>
                    {/* <div className=' hidden md:block  w-[25%]  h-full rounded'>
                        <Sidenews key={news._id} blog={news} />
                    </div> */}
                    <div className={`${theme === 'dark' ? 'dark-bg-color' : 'bg-white'} hidden md:block  w-[25%]  h-full rounded `}>
                        {loading ? <Skeleton height={100} count={5} /> : (
                            Array.isArray(news) && news.slice(0, 5).map((blog) => (
                                <Sidenews scroll={true} maxHeight="500px" key={blog._id} blog={blog} />
                            ))
                        )}
                    </div>

                    <div className='  p-1  w-full md:w-[50%] h-full rounded relative'>



                        <Mainformat path='allnews' division={division} district={district} upazila={upazila} />

                    </div>
                    <div className={`${theme === 'dark' ? 'dark-bg-color' : 'bg-white'} hidden md:block  w-[25%]  h-full rounded `}>
                        {loading ? <Skeleton height={100} count={5} /> : (
                            Array.isArray(news) && news.slice(0, 5).map((blog) => (
                                <Sidenews scroll={true} maxHeight="500px" key={blog._id} blog={blog} />
                            ))
                        )}
                    </div>
                </div>
            </div>
            {/* Featured News */}
            <section className="mt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {news && news.slice(0, 4).map((article, index) => (
                        // <FeaturedCard key={index} {...article} />
                        <NewsCard key={index} news={article} />
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