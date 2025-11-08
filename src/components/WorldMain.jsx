import React from 'react';
import { ChevronRight } from 'lucide-react';
import useFetch from '../hooks/useFetch';
import NewsTime from '../utills/NewsTime';
import NewsCard from '../utills/NewsCard';
import Sidenews from '../utills/Sidenews';
import TopNewsItem from '../utills/TopNewsItem';




const WorldMain = () => {
    const { data: news, loading, error } = useFetch("http://localhost:5000/allnews/");
    // ✅ Filter news by category
    const worldNews = news.filter(item => item.category === "বিশ্ব");
    if (loading) return <p className="text-center py-10 ">Loading...</p>;
    if (error) return <p className="text-center py-10 text-red-600">Error: {error.message}</p>;

    return (
        <div className="min-h-screen">
            <main className="max-w-7xl mx-auto px-3 py-2 ">

                {/* Hero Section */}
                <section className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">



                    <div className='h-full lg:col-span-2 cursor-pointer   relative rounded'>
                        {loading ? <Skeleton height={500} /> : (
                            Array.isArray(worldNews) && worldNews.slice(0, 1).map((blog) => (
                                <a key={blog._id} href={`/product/${blog._id}`} className="lg:col-span-2 cursor-pointer">
                                    <div className="  rounded overflow-hidden  border border-gray-200">
                                        {/* 🔹 Full overlay gradient */}
                                        <div className="relative aspect-video w-full h-[335px] bg-[var(--bg-color)]">
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
                                            {/* <DescriptionPreview description={blog.description} /> */}
                                            <p className=" text-[var(--primary-text-color)] text-lg mt-1 line-clamp-4 leading-tight" dangerouslySetInnerHTML={{ __html: blog.description }}></p>
                                        </div>
                                    </div>
                                </a>
                            )))}

                    </div>

                    {/* Trending News */}
                    <div className="lg:col-span-2 bg-[var(--bg-color)] px-2 rounded border-b border-gray-200">
                        <h3 className="text-lg font-bold  mb-3 border-b-2 border-red-600 pb-1">
                            আলোচিত খবর
                        </h3>
                        <div className="grid grid-cols-2 gap-2  ">
                            {worldNews.slice(2, 10).map((item, index) => (
                                // <TrendingItem key={index} title={item.title} news={item} />
                                // <NewsCard key={index} news={item} />
                                <Sidenews key={index} blog={item} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Featured News */}
                <section className="mb-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {news.slice(1, 5).map((article, index) => (
                            <NewsCard key={index} news={article} />

                        ))}
                    </div>
                </section>

                {/* Top News Updates */}
                <section>
                    <h2 className="text-2xl font-bold  mb-6 border-b border-red-600 pb-3 flex items-center gap-2">
                        শীর্ষ খবর ও হালনাগাদ
                        <ChevronRight className="w-5 h-5 text-red-600" />
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[var(--bg-color)] p-2 rounded   ">
                        {news.slice(1, 7).map((data, index) => (
                            <TopNewsItem key={index} news={data} />
                        ))}
                    </div>
                </section>

            </main>
        </div>
    );
};

export default WorldMain;
