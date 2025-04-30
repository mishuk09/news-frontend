import { useContext, useEffect, useState } from 'react';
import { Facebook, Instagram, Linkedin, Clock, Twitter, List } from "lucide-react";

import { Pagination, Stack } from '@mui/material';
import axios from 'axios';
import { ThemeContext } from '../hooks/ThemeContext';
import Poll from '../utills/Poll';


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
    }, [])



    const socialLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
        twitter: `https://twitter.com/intent/tweet?url=${shareUrl}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
        instagram: '#' // Instagram doesn't support direct URL sharing
    };

    // const handlePageChange = (event, value) => {
    //     setCurrentPage(value);
    // };

    // const startIndex = (currentPage - 1) * itemsPerPageSection1;
    // const endIndex = startIndex + itemsPerPageSection1;
    // const displayedBlogs = blogs && blogs.slice(startIndex, endIndex);
    // const displayedBlogs = blogs && Array.isArray(blogs) ? blogs.slice(startIndex, endIndex) : [];




    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                <p className="mt-3 text-lg font-semibold text-gray-600">Loading categories...</p>
            </div>
        );
    }





    return (
        <div className=''>
            <div className='max-w-7xl mx-auto'>
                <div className='flex  gap-2 w-full pt-6'>
                    <div className=' hidden md:block  w-[25%] px-2 h-full rounded'>
                        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}  p-3 mt-0 shadow-md rounded-sm`}>
                            <h2 className='text-1xl font-nunito font-bold border-b-2 border-dotted pb-1 mb-2'>Category</h2>
                            <ul className='overflow-hidden category-scrollbar max-h-[205px] overflow-y-auto'>
                                {categories.map(({ category, count }) => (
                                    <li>
                                        <div key={blogs.name} className='border-b cursor-pointer hover:text-green-700  border-dotted mt-1 border-slate-900 font-nunito font-bold text-sm'>
                                            <div>
                                                <div className='justify-between flex items-center text-center'>
                                                    <p className='flex  '>

                                                        <List className='me-2' />
                                                        {category}
                                                    </p>
                                                    <p className='me-2'> ({count})</p>
                                                </div>
                                            </div>

                                        </div>
                                    </li>
                                ))}
                            </ul>

                        </div>
                        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}  p-3 shadow-md rounded-sm mt-2`}>
                            <h2 className='text-1xl mb-3   font-bold border-b-2 border-dotted pb-1'>Random Blog</h2>

                            {Array.isArray(blogs) && blogs.slice(0, 5).map((blog) => (
                                <a key={blog._id} href={`/product/${blog._id}`}
                                    className="flex  p-3 h-auto      cursor-pointer  lg:mb-1 lg:flex-row    rounded shadow">
                                    <img src={blog.img} alt=""
                                        className="inline-block rounded object-cover  w-14 h-14" />
                                    <div className="flex flex-col items-start ps-2">
                                        <p className='hover:text-green-600 font-medium    leading-6 duration-200'>
                                            {blog.title
                                                ? `${blog.title.split(" ").slice(0, 3).join(" ")}…`
                                                : "Untitled…"}
                                        </p>
                                        {/* <p className='mt-2 flex gap-1 text-xs  '>
                                            <Clock size={15} />
                                            {new Date(blog.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </p> */}

                                    </div>
                                </a>
                            ))}

                        </div>
                        <div className='mt-2 grid grid-cols-1 gap-2 relative'>

                            {
                                blogs && blogs.slice(0, 2).map((blog) => (
                                    <a key={blog._id} href={`/product/${blog._id}`} className={`flex${theme === 'dark' ? 'bg-gray-800' : 'cursor-pointer flex-col gap-3  h-[220px]   shadow rounded-sm '} `}>
                                        <img src={blog.img} alt="" className="inline-block  rounded-t h-[150px] w-full object-cover" />
                                        <div className="flex flex-col items-start p-1">

                                            <p className="mb-1 leading-6   font-medium   hover:text-green-600 duration-200  ">  {blog.title.split(' ').slice(0, 5).join(' ')}…</p>

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

                    </div>

                    <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-1  w-full md:w-[50%] h-full rounded relative`}>
                        <div className='h-full    relative rounded-sm'>

                            {Array.isArray(blogs) && blogs.slice(2, 3).map((blog) => (
                                <a className='cursor-pointer'
                                    href={`/product/${blog._id}`}
                                    key={blog.id}>
                                    <div className='relative'>
                                        <img className='w-full rounded-sm h-[350px]' src={blog.img} alt="" />

                                        {/* Add the gradient overlay using ::before pseudo-element */}
                                        <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black'></div>
                                    </div>

                                    <div className='absolute text-white ps-3 bottom-3'>

                                        <p className='mt-2 font-bold hover:text-green-600 duration-200  font-sans text-4xl'> {blog.title}...</p>
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
                            ))
                            }
                        </div>
                        <div className=' grid grid-cols-2 gap-2 mt-2 relative'>

                            {Array.isArray(blogs) && blogs.slice(1, 3).map((blog) => (
                                // <a key={blog._id} href={`/product/${blog._id}`} className={`flex${theme==='dark'? 'bg-gray-800':'cursor-pointer flex-col gap-3     shadow rounded-sm '}   `}>
                                //     <img src={blog.img} alt="" className="inline-block  rounded-t h-[150px] w-full object-cover" />
                                //     <div className="flex flex-col items-start p-1">

                                //         <p className="mb-1 leading-6   font-medium   hover:text-green-600 duration-200  "> {blog.title}...</p>

                                //         <p className='mt-2 flex gap-1 text-xs '>
                                //             <Clock size={15} />
                                //             {new Date(blog.createdAt).toLocaleDateString('en-US', {
                                //                 year: 'numeric',
                                //                 month: 'long',
                                //                 day: 'numeric',
                                //             })}
                                //         </p>
                                //     </div>
                                // </a>
                                <a className='cursor-pointer'
                                    href={`/product/${blog._id}`}
                                    key={blog.id}>
                                    <div className='relative'>
                                        <img className='w-full rounded-sm h-[150px] ' src={blog.img} alt="" />

                                        {/* Add the gradient overlay using ::before pseudo-element */}
                                        <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black'></div>
                                    </div>

                                    <div className='absolute text-white ps-3 bottom-3'>

                                        <p className='mt-2 font-bold hover:text-green-700 duration-200  font-sans '> {blog.title.split(' ').slice(0, 5).join(' ')}…</p>
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
                            ))
                            }
                        </div>


                        <div className='mt-8 grid grid-cols-2 gap-2 relative'>

                            {
                                blogs && blogs.slice(0,6).map((blog) => (
                                    <a key={blog._id} href={`/product/${blog._id}`} className={`flex${theme === 'dark' ? 'bg-gray-800' : 'cursor-pointer flex-col gap-3     shadow rounded-sm '} `}>
                                        <img src={blog.img} alt="" className="inline-block  rounded-t h-[150px] w-full object-cover" />
                                        <div className="flex flex-col items-start p-1">

                                            <p className="mb-1 leading-6   font-medium   hover:text-green-600 duration-200  ">   {blog.title
                                                ? `${blog.title.split(" ").slice(0, 5).join(" ")}…`
                                                : "Untitled…"} </p>

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
                    </div>
                    <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}  p-1 w-[25%] h-full hidden md:block   rounded`}>

                        <div className='grid grid-cols-2 gap-2'>
                            <a href={socialLinks.facebook} target='_blank' rel='noopener noreferrer' className='w-full flex cursor-pointer text-white items-center ps-2 h-10 rounded-sm bg-blue-600'>
                                <div className='w-[20%]'><Facebook size={16} /></div>
                                <div className='w-[70%]'>Facebook</div>
                            </a>
                            <a href={socialLinks.twitter} target='_blank' rel='noopener noreferrer' className='w-full flex cursor-pointer ps-2 h-10 rounded-sm text-white items-center bg-black'>
                                <div className='w-[20%]'><Twitter size={16} /></div>
                                <div className='w-[70%]'>Twitter</div>
                            </a>
                            <a href={socialLinks.linkedin} target='_blank' rel='noopener noreferrer' className='w-full flex cursor-pointer ps-2 h-10 rounded-sm text-white items-center bg-blue-600'>
                                <div className='w-[20%]'><Linkedin size={16} /></div>
                                <div className='w-[70%]'>Linkedin</div>
                            </a>
                            <a href={socialLinks.instagram} target='_blank' rel='noopener noreferrer' className='w-full flex cursor-pointer ps-2 h-10 rounded-sm text-white items-center bg-gradient-to-r from-pink-500 to-purple-500'>
                                <div className='w-[20%]'><Instagram size={16} /></div>
                                <div className='w-[70%]'>Instagram</div>
                            </a>
                        </div>

                        <div className='h-full mt-4 grid grid-rows-1 gap-2 relative rounded-sm'>
                            <h2 className='text-2xl mb-2 border-b-2 border-dotted text-green-600   font-bold'>AI Blogs</h2>
                            {Array.isArray(blogs) && blogs.slice(0, 1).map((blog) => (
                                <a href={`/product/${blog._id}`} key={blog.id} className='cursor-pointer relative rounded-sm'>
                                    <div className='relative'>
                                        <img className='w-full rounded-sm h-[150px]' src={blog.img} alt="" />
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
                        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}   mt-2 h-full rounded-sm`}>

                            {Array.isArray(blogs) && blogs.slice(0, 3).map((blog) => (
                                <a key={blog._id} href={`/product/${blog._id}`} className="flex p-3 h-auto       cursor-pointer    lg:mb-1 lg:flex-row   shadow ">
                                    <img src={blog.img} alt=""
                                        className="inline-block rounded object-cover  w-14 h-14" />
                                    <div className="flex flex-col items-start   ps-2">
                                        <p className='hover:text-green-600 font-medium    leading-6 duration-200'>
                                            {blog.title.split(' ').slice(0, 4).join(' ')}…
                                        </p>
                                        {/* <p className='mt-2 flex gap-1 text-xs '>
                                            <Clock size={15} />
                                            {new Date(blog.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </p> */}

                                    </div>

                                </a>
                            ))}
                        </div>
                        <div className='bg-white mt-4   h-full rounded-sm'>

                            <Poll />

                        </div>

                    </div>
                </div>
            </div>
            {/* <div className='flex items-center text-center justify-center mt-14 pb-20'>
                <Stack spacing={2}>
                    <Pagination
                        count={Math.ceil((blogs?.length || 0) / itemsPerPageSection1)}
                        page={currentPage}
                        onChange={handlePageChange}
                        variant='outlined'
                        shape='rounded'
                    />
                </Stack>
            </div> */}
        </div >
    );
};

export default Home;
