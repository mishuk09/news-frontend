import { useContext, useEffect, useState } from 'react';
import { Facebook, Instagram, Linkedin, Clock, Twitter, List } from "lucide-react";
import axios from 'axios';
import { ThemeContext } from '../hooks/ThemeContext';
import Poll from '../utills/Poll';
import PrayerTimeCard from '../utills/PrayerTimeCard';
import Sidenews from '../utills/Sidenews';
import Skeleton from 'react-loading-skeleton';
import NewsCard from '../utills/NewsCard';
import NewsTime from '../utills/NewsTime';


// const DescriptionPreview = ({ description }) => {

//     const getShortText = (html) => {
//         if (!html) return "";

//         // 1️⃣ Remove all HTML tags
//         let text = html.replace(/<[^>]*>/g, " ");

//         // 2️⃣ Replace HTML entities like &nbsp; &amp; &quot;
//         text = text
//             .replace(/&nbsp;/g, " ")
//             .replace(/&amp;/g, "&")
//             .replace(/&quot;/g, '"')
//             .replace(/&#39;/g, "'")
//             .replace(/&lt;/g, "<")
//             .replace(/&gt;/g, ">");

//         // 3️⃣ Remove extra spaces/newlines/tabs
//         const cleanText = text.replace(/\s+/g, " ").trim();

//         // 4️⃣ Limit to 50 words
//         const words = cleanText.split(" ");
//         const shortText =
//             words.length > 40 ? words.slice(0, 40).join(" ") + "..." : cleanText;

//         return shortText;
//     };


//     return (
//         <p className="text-lg text-gray-600 text-justify">
//             {getShortText(description)}
//         </p>
//     );
// };

// --- Helper Component to format time ---
// const NewsTime = ({ createdAt }) => {
//     const getTimeAgo = (dateString) => {
//         if (!dateString) return "সময় নেই";

//         const now = new Date();
//         const date = new Date(dateString);
//         const diffMs = now - date;

//         const diffSeconds = Math.floor(diffMs / 1000);
//         const diffMinutes = Math.floor(diffSeconds / 60);
//         const diffHours = Math.floor(diffMinutes / 60);
//         const diffDays = Math.floor(diffHours / 24);

//         if (diffSeconds < 60) return `${diffSeconds} সেকেন্ড আগে`;
//         if (diffMinutes < 60) return `${diffMinutes} মিনিট আগে`;
//         if (diffHours < 24) return `${diffHours} ঘণ্টা আগে`;
//         return `${diffDays} দিন আগে`;
//     };

//     return <p className="text-base  absolute bottom-1 right-1">{getTimeAgo(createdAt)}</p>;
// };



const FeaturedCard = ({ title, img, createdAt }) => {
    const imageUrl =
        Array.isArray(img) && img.length > 0
            ? img[0]
            : "https://placehold.co/400x250?text=No+Image";

    return (
        <div className="relative flex flex-col bg-white rounded overflow-hidden border border-gray-100  ">
            {/* Image Section */}
            <div className="relative w-full h-40 overflow-hidden">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) =>
                    (e.target.src =
                        "https://placehold.co/400x250/F3F4F6/1F2937?text=Placeholder")
                    }
                />
            </div>

            {/* Content Section */}
            <div className="flex flex-col flex-1 p-2">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 hover:text-red-600 transition-colors duration-200 leading-snug line-clamp-2">
                    {title}
                </h3>
                <div className="mt-2 text-sm text-gray-500">
                    <NewsTime createdAt={createdAt} />
                </div>
            </div>
        </div>
    );
};

const Home = () => {
    const { theme } = useContext(ThemeContext);

    const [blogs, setBlogs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [currentPage, setCurrentPage] = useState(1);
    // const itemsPerPageSection1 = 4;
    const shareUrl = encodeURIComponent(window.location.href);

    useEffect(() => {
        axios.get('http://localhost:5000/allnews/')
            .then(response => {
                // setPosts(response.data.slice(0, 12));
                setBlogs(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:5000/allnews/categories')
            .then(response => {
                setCategories(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    return (
        <div className=''>
            <div className='max-w-7xl mx-auto'>
                <div className='flex  gap-2 w-full pt-4'>
                    <div className=' hidden md:block   w-[25%] px-2 h-full rounded'>
                        <h2 className='text-2xl mb-2 border-b-2 border-dotted    font-bold'>সর্বাধিক পঠিত</h2>

                        <div className={`${theme === 'dark' ? 'dark-bg-color' : 'bg-white'} rounded `}>
                            {loading ? <Skeleton height={100} count={5} /> : (
                                Array.isArray(blogs) && blogs.slice(8, 12).map((blog) => (
                                    <Sidenews scroll={true} maxHeight="500px" key={blog._id} blog={blog} />
                                ))
                            )}
                        </div>

                        <section className="mb-12 mt-5">
                            <div className="grid grid-cols-1  gap-3">
                                {blogs && blogs.slice(3, 6).map((article, index) => (
                                    // <FeaturedCard key={index} {...article} />
                                    <NewsCard key={index} news={article} />
                                ))}
                            </div>
                        </section>


                    </div>

                    <div className={`${theme === 'dark' ? 'dark-bg-color' : 'bg-white'} p-1  w-full md:w-[50%] h-full rounded relative`}>
                        <div className='h-full    relative rounded-sm'>
                            {loading ? <Skeleton height={500} /> : (
                                Array.isArray(blogs) && blogs.slice(2, 3).map((blog) => (
                                    <a key={blog._id} href={`/product/${blog._id}`} className="lg:col-span-2 cursor-pointer">
                                        <div className="bg-white rounded overflow-hidden  border border-gray-200">
                                            {/* 🔹 Full overlay gradient */}
                                            <div className="relative aspect-video w-full h-[335px] bg-gray-100">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
                                                <img
                                                    src={blog.img}
                                                    alt="Main news"
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="flex justify-between absolute bottom-0 left-0 w-full p-2 text-sm text-white z-10">
                                                    <p className="font-semibold  ">
                                                        {blog.category} {" "}
                                                        {/* <span className="text-[var(--primary-color)]">{location}</span> */}
                                                    </p>
                                                    <p className="  opacity-90">
                                                        <NewsTime createdAt={blog.createdAt} />
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="p-2">
                                                <h2 className="text-3xl font-bold  leading-tight hover:text-red-600 transition">
                                                    {blog.title}
                                                </h2>
                                                {/* <DescriptionPreview description={blog.description} /> */}
                                                <p className=" text-gray-600 text-lg mt-1 line-clamp-2 leading-tight" dangerouslySetInnerHTML={{ __html: blog.description }}></p>
                                            </div>
                                        </div>
                                    </a>
                                )))}

                        </div>
                        <div className='mt-4   relative'>
                            {/* Featured News */}
                            <section className="mb-12">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3">
                                    {blogs && blogs.slice(8, 14).map((article, index) => (
                                        // <FeaturedCard key={index} {...article} />
                                        <NewsCard key={index} news={article} />
                                    ))}
                                </div>
                            </section>

                        </div>
                    </div>
                    <div className={`${theme === 'dark' ? ' dark-bg-color' : 'bg-white'}  p-1 w-[25%] h-full hidden md:block   rounded`}>
                        <div className='h-full  grid grid-rows-1 gap-2 relative rounded-sm'>
                            <h2 className='text-2xl mb-1 border-b-1 border-dotted    font-bold'>সর্বশেষ</h2>
                            {Array.isArray(blogs) && blogs.slice(0, 1).map((blog) => (
                                <a href={`/product/${blog._id}`} key={blog.id} className='cursor-pointer relative rounded-sm'>
                                    <div className='relative'>
                                        <img className='w-full rounded-sm h-[130px]' src={blog.img} alt="" />
                                        <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black'></div>
                                    </div>

                                    <div className='absolute text-white ps-3 bottom-3'>

                                        <p className='mt-2 font-medium hover:text-green-600 duration-200 font-sans '> {blog.title}...</p>
                                        <p className='mt-2 flex gap-1 text-xs '>
                                            <Clock size={15} />
                                            {new Date(blog.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </p>

                                    </div>
                                </a>
                            ))}
                        </div>
                        <div className={`${theme === 'dark' ? 'dark-bg-color' : 'bg-white'} rounded `}>
                            {Array.isArray(blogs) && blogs.slice(10, 13).map((blog) => (
                                <a key={blog._id} href={`/product/${blog._id}`}
                                    className="flex   h-auto      cursor-pointer  lg:mb-1 lg:flex-row       ">
                                    <div className="flex items-start p-2 border-b border-gray-200 hover:bg-gray-100   transition cursor-pointer">
                                        <div className="w-20 h-20 bg-gray-200 mr-4 rounded overflow-hidden flex-shrink-0">
                                            <img
                                                src={blog.img}
                                                alt="news"
                                                className="w-full h-full object-cover"
                                                onError={(e) => (e.target.src = "https://placehold.co/100x100?text=Error")}
                                            />
                                        </div>
                                        <p className=" text-lg   font-semibold text-[var(--primary-text-color)] leading-snug">
                                            {blog.title.slice(0, 80)}{blog.title.length > 50 ? '...' : ''}
                                        </p>
                                    </div>
                                </a>
                            ))}
                        </div>
                        <div className='bg-white mt-4   h-full rounded-sm'>

                            <Poll />

                        </div>
                        <div>
                            <PrayerTimeCard />
                        </div>

                    </div>
                </div>
            </div>
        </div >
    );
};

export default Home;
