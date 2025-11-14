import { useContext, useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router';
import { useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import axios from 'axios';
import { Facebook, Twitter, Linkedin, Share2, MessageCircle, ChevronRight } from 'lucide-react';
import { ThemeContext } from '../hooks/ThemeContext';
import Morenews from './Morenews';
import TopNewsItem from '../utills/TopNewsItem';
import Sidenews from '../utills/Sidenews';

const  SemiFrontNewsDetails = () => {
    const { id } = useParams();

    const [blog, setBlog] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const { theme } = useContext(ThemeContext);

    const currentUrl = typeof window !== "undefined" ? window.location.href : "";

    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(blog?.title || "")}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
        whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(blog?.title + " " + currentUrl)}`,
    };

    useEffect(() => {
        const fetchBlog = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://news-backend-user.onrender.com/semi-top-news/${id}`);
                if (!response.ok) {
                    console.error('Failed to fetch blog details');
                    return;
                }
                const { singleItem } = await response.json();   // ← grab the real document
                setBlog(singleItem);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);


    useEffect(() => {
        const fetchRelatedBlogs = async () => {
            if (!blog?.category) return; // wait until blog is loaded

            setLoading(true);
            try {
                const response = await axios.get('https://news-backend-user.onrender.com/allnews');
                // Filter: same category, but not the same blog
                const related = response.data.filter(
                    (b) => b.category === blog.category && b._id !== blog._id
                );
                setBlogs(related.reverse());
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchRelatedBlogs();
    }, [blog]);



    return (
        <div className=' pb-10 min-h-screen'>
            <div className='max-w-7xl mx-auto'>
                <div className='flex gap-4 pt-4'>

                    <div className="w-[20%] md:w-[30%]   h-full  sticky top-4 hidden md:flex flex-col shadow-sm">
                        <h2 className='text-xl mb-2 border-b-1 p-2 border-dotted     font-semibold'>এ সম্পর্কিত খবর</h2>

                        <div className={`${theme === 'dark' ? 'dark-bg-color' : 'bg-white'} rounded`}>
                                 {loading ? <Skeleton height={100} count={5} /> : (
                                   Array.isArray(blogs) && blogs.slice(0, 4).map((blog) => (
                                  <Sidenews scroll={true}   key={blog._id} blog={blog} />
                                    ))
                                   )}
                        </div>
                    </div>


                    <div className="w-full md:w-[60%]   border border-gray-200 rounded p-2  ">
                        {loading || !blog ? (
                            <>
                                <Skeleton height={36} width={'80%'} />
                                <Skeleton height={20} width={'50%'} className="mt-3" />
                                <Skeleton height={320} className="mt-6" />
                                <Skeleton height={140} className="mt-6" />
                            </>
                        ) : (
                            <>
                                {/* Title */}
                                <h1 className="font-semibold text-2xl md:text-4xl text-[var(--primary-text-color)] leading-snug tracking-wide mt-2">
                                    {blog.title}
                                </h1>

                                {/* Category */}
                                <span className="inline-block  text-white bg-[var(--primary-color)] px-3 py-0 rounded-full mt-1">
                                    {blog.category}
                                </span>

                                <div className='flex justify-between border-b pb-2 border-gray-300'>
                                    {/* Date */}
                                    <p className="mt-3 flex items-center gap-1   text-slate-500">
                                        <span className="font-medium text-[var(--primary-text-color)]">প্রকাশঃ</span>
                                        {new Date(blog.createdAt).toLocaleDateString('bn-BD', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </p>

                                    {/* Social Share */}
                                    <div className="flex items-center gap-3 mt-4">
                                        <Share2 size={16} className="text-[var(--primary-text-color)]" />
                                        <p className="text-sm text-[var(--primary-text-color)]">শেয়ার করুন:</p>

                                        <div className="flex gap-3">
                                            <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:scale-110 transition-transform">
                                                <Facebook size={18} />
                                            </a>
                                            <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:scale-110 transition-transform">
                                                <Twitter size={18} />
                                            </a>
                                            <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:scale-110 transition-transform">
                                                <Linkedin size={18} />
                                            </a>
                                            <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:scale-110 transition-transform">
                                                <MessageCircle size={18} />
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Image */}
                                <div className="mt-3 overflow-hidden rounded">
                                    <img
                                        className="w-full h-auto rounded object-cover transition-transform duration-500 hover:scale-105"
                                        src={blog.img}
                                        alt={blog.title}
                                    />
                                </div>
                                <p className='py-1 flex  justify-end'>(ছবিঃ সংগৃহিত)</p>

                                {/* Description */}
                                <div
                                    className="text-justify text-lg text-[var(--primary-text-color)]  leading-relaxed pt-8 prose max-w-none prose-p:mb-4 prose-img:rounded-lg"
                                    dangerouslySetInnerHTML={{ __html: blog.description }}
                                />
                            </>
                        )}
                    </div>

                    <div className='w-[20%]   flex-col hidden md:flex     h-[400px]'>

                        <h2 className='text-xl mb-2 border-b-1 p-2 border-dotted     font-semibold'>সর্বশেষ</h2>

                        <div className={`${theme === 'dark' ? 'dark-bg-color' : 'bg-white'} rounded `}>
                            {loading ? (
                                <Skeleton height={100} count={5} />
                            ) : (Array.isArray(blogs) && blogs.slice(0, 4).map((blog) => (
                                <a key={blog._id} href={`/news/${blog._id}`}
                                    className="flex   h-auto      cursor-pointer  lg:mb-1 lg:flex-row       ">
                                    <div className="flex items-start p-2 border-b border-gray-200 hover:bg-[var(--hover-bg)]   transition cursor-pointer">
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
                            )))}
                        </div>




                    </div>
                </div>
                <section className="max-w-7xl mx-auto my-10">
                <h2 className="text-2xl px-2 font-bold  mb-6 border-b border-red-600 pb-3 flex items-center gap-2">
                সম্পর্কিত অন্যান্য
                <ChevronRight className="w-5 h-5 text-red-600" />
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[var(-bg-color)] p-2 rounded">
                {blogs.slice(0, 6).map((data, index) => (
                    <TopNewsItem key={index} mostnews={data} />
                ))}
                </div>
            </section>
            </div>
        </div>
    );
};

export default SemiFrontNewsDetails;
