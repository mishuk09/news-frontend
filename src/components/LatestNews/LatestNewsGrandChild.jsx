import React, { useContext } from 'react';
import Sidenews from '../../utills/Sidenews';
import { ThemeContext } from '../../hooks/ThemeContext';
import Skeleton from 'react-loading-skeleton';
import NewsCard from '../../utills/NewsCard';
import LatestNewsFormat from './LatestNewsFormat';
 

const LatestNewsGrandChild = ({ news,loading }) => {
    const { theme } = useContext(ThemeContext);

    return (
        <div>
            <div className='max-w-7xl mx-auto'>
                <div className='flex  gap-2 w-full pt-4'>
                    <div className={`${theme === 'dark' ? 'dark-bg-color' : 'bg-white'} hidden md:block  w-[25%]  h-full rounded `}>
                        {loading ? <Skeleton height={100} count={5} /> : (
                            Array.isArray(news) && news.slice(8, 13).map((blog) => (
                                <Sidenews scroll={true} maxHeight="500px" key={blog._id} blog={blog} />
                            ))
                        )}
                    </div>

                    <div className='  p-1  w-full md:w-[50%] h-full rounded relative'>
                        <LatestNewsFormat news={news} loading={loading} />
                    </div>

                    <div className={`${theme === 'dark' ? 'dark-bg-color' : 'bg-white'} hidden md:block  w-[25%]  h-full rounded `}>
                        {loading ? <Skeleton height={100} count={5} /> : (
                            Array.isArray(news) && news.slice(8, 13).map((blog) => (
                                <Sidenews scroll={true} maxHeight="500px" key={blog._id} blog={blog} />
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Featured News */}
            <section className="mt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {news && news.slice(8, 20).map((article, index) => (
                        <NewsCard key={index} news={article} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default LatestNewsGrandChild;