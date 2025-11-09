import React, { useContext } from 'react';
import Headline from '../components/Headline';
import useFetch from '../hooks/useFetch';
import { ThemeContext } from '../hooks/ThemeContext';
import Skeleton from 'react-loading-skeleton';

const Morenews = () => {
    const { data: news, loading, error } = useFetch("http://72.61.112.34:5000/allnews/");
    const { theme } = useContext(ThemeContext);

    return (
        <div className='mt-14'>
            <Headline name="আরও সংবাদ" />


            <div className={`${theme === 'dark' ? 'dark-bg-color' : 'bg-white'} rounded grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4  `}>
                {loading ? (
                    <div className="p-3">
                        <Skeleton height={100} count={5} />
                    </div>
                ) : news && news.length > 0 ? (
                    news.slice(0, 9).map((blog) => (
                        <a key={blog._id} href={`/news/${blog._id}`}
                            className="flex   h-auto      cursor-pointer  lg:mb-1 lg:flex-row       ">
                            <div className="flex items-start p-2 border-b border-gray-200 hover:bg-[var(--hover-bg)]    transition cursor-pointer">
                                <div className="w-26 h-26 bg-gray-200 mr-4 rounded overflow-hidden flex-shrink-0">
                                    <img
                                        src={blog.img}
                                        alt="news"
                                        className="w-full h-full object-cover"
                                        onError={(e) => (e.target.src = "https://placehold.co/100x100?text=Error")}
                                    />
                                </div>
                                <p className=" text-xl   font-semibold text-[var(--primary-text-color)] leading-snug">
                                    {blog.title.slice(0, 80)}{blog.title.length > 50 ? '...' : ''}
                                </p>
                            </div>
                        </a>
                    ))
                ) : (
                    <p className="text-center text-gray-500 py-4">No related news found.</p>
                )}
            </div>

        </div>
    );
};

export default Morenews;