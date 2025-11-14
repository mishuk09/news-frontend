import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../hooks/ThemeContext';
import axios from 'axios';
import { Clock } from 'lucide-react';
import useFetch from '../hooks/useFetch';
import Skeleton from 'react-loading-skeleton';
import NewsTime from '../utills/NewsTime';
import DescriptionText from '../utills/DescriptionText';

const Mainformat = () => {
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

    return (
        <div>
            <div className={`${theme === 'dark' ? 'dark-bg-color' : 'bg-white'} p-1  w-full   h-full rounded relative`}>
                <div className='h-full    relative rounded-sm'>
                    {loading ? <Skeleton height={500} /> : (
                        Array.isArray(news) && news.slice(2, 3).map((blog) => (
                            <a key={blog._id} href={`/product/${blog._id}`} className="lg:col-span-2 cursor-pointer">
                                <div className="  rounded overflow-hidden  border border-gray-200">
                                    {/* 🔹 Full overlay gradient */}
                                    <div className="relative aspect-video w-full h-[385px] bg-gray-100">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
                                        <img
                                            src={blog.img}
                                            alt="Main news"
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="flex justify-between absolute bottom-0 left-0 w-full p-2 text-sm text-white z-10">
                                            <p className="font-semibold  ">
                                                {blog.category} {" "}
                                            </p>
                                            <p className="  opacity-90">
                                                <NewsTime createdAt={blog.createdAt} />
                                            </p>
                                        </div>
                                    </div>
                                    <div className="p-2">
                                        <h2 className="text-3xl font-bold text-[var(--primary-text-color)] leading-tight hover:text-red-600 transition">
                                            {blog.title}
                                        </h2>
                                        <DescriptionText description={blog.description} />
                                        {/* <DescriptionPreview description={blog.description} /> */}
                                        {/* <p className=" text-[var(--primary-text-color)] text-lg mt-1 line-clamp-2 leading-tight" dangerouslySetInnerHTML={{ __html: blog.description }}></p> */}
                                    </div>
                                </div>
                            </a>
                        )))}

                </div>
                
            </div>
        </div>
    );
};

export default Mainformat;