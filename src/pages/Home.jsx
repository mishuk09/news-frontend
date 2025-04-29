import { useEffect, useState } from 'react';
import { Facebook, Instagram, Linkedin, Clock, Twitter, List } from "lucide-react";

import { Pagination, Stack } from '@mui/material';
import axios from 'axios';


const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPageSection1 = 3;
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

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const startIndex = (currentPage - 1) * itemsPerPageSection1;
    const endIndex = startIndex + itemsPerPageSection1;
    // const displayedBlogs = blogs && blogs.slice(startIndex, endIndex);
    const displayedBlogs = blogs && Array.isArray(blogs) ? blogs.slice(startIndex, endIndex) : [];




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
                        <div className='bg-white     px-2 py-3 h-full rounded-sm'>
                            <h2 className='text-1xl font-nunito font-bold border-b-2 border-dotted pb-1 mb-2'>Category</h2>
                            <ul>
                                {categories.map(({ category, count }) => (
                                    <li>
                                        <div key={blogs.name} className='border-b cursor-pointer hover:text-green-700  border-dotted mt-1 border-slate-900 font-nunito font-bold text-sm'>
                                            <div>
                                                <div className='justify-between flex items-center text-center'>
                                                    <p className='flex  '>

                                                        <List className='me-2' />
                                                        {category}
                                                    </p>
                                                    <p> ({count})</p>
                                                </div>
                                            </div>

                                        </div>
                                    </li>
                                ))}
                            </ul>

                        </div>
                        <div className='bg-white  p-2 mt-0  rounded-sm'>
                            <h2 className='text-1xl mb-3   font-bold border-b-2 border-dotted pb-1'>Random Blog</h2>

                            {Array.isArray(blogs) && blogs.slice(0, 5).map((blog) => (
                                <a key={blog._id} href={`/product/${blog._id}`}
                                    className="flex  p-3 h-24     bg-white cursor-pointer  lg:mb-1 lg:flex-row  border border-gray-300 rounded shadow">
                                    <img src={blog.img} alt=""
                                        className="inline-block rounded object-cover  w-14 h-14" />
                                    <div className="flex flex-col items-start ps-2">
                                        <p className='hover:text-green-600 font-normal leading-4 duration-200'>
                                            {blog.title}...
                                        </p>
                                        <p className='mt-2 flex gap-1 text-xs text-slate-500'>
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

                    <div className=' bg-white p-2 w-full  md:w-[50%]  h-full rounded relative'>
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
                                        <p className='mt-2 flex gap-1 text-xs text-slate-500'>
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
                        <div className=' grid grid-cols-2 gap-2 mt-4'>

                            {Array.isArray(blogs) && blogs.slice(1, 3).map((blog) => (
                                <a key={blog._id} href={`/product/${blog._id}`} className="flex  bg-white cursor-pointer flex-col gap-3   px-2 py-2   shadow rounded-sm  ">
                                    <img src={blog.img} alt="" className="inline-block  rounded-t h-[150px] w-full object-cover" />
                                    <div className="flex flex-col items-start ">

                                        <p className="mb-1 leading-6   font-medium   hover:text-green-600 duration-200  "> {blog.title}...</p>

                                        <p className='mt-2 flex gap-1 text-xs text-slate-500'>
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
                        <div className='mt-6  '>
                            <h1 className='font-bold text-2xl pb-1 border-b-2 border-dotted mb-3 text-green-500'>Latest Blogs</h1>
                            {
                                displayedBlogs && displayedBlogs.map((blog) => (

                                    <a key={blog._id} href={`/product/${blog._id}`} className="flex   cursor-pointer p-2 flex-col bg-white shadow-sm  rounded pb-8 mb-4 lg:mb-3 lg:flex-row lg:[border-bottom:1px_solid_rgb(236,_236,_236)]">
                                        <img src={blog.img} alt="" className="inline-block rounded h-60 w-full object-cover md:h-36 lg:h-32 lg:w-32" />
                                        <div className="flex flex-col items-start pt-1 lg:px-8">

                                            <p className="mb-1 text-sm font-medium  hover:text-green-600 duration-200 md:text-lg "> {blog.title}...</p>

                                            <div className="flex flex-col items-start">
                                                <div className="flex flex-col mt-1 text-sm text-[#636262] sm:text-base lg:flex-row lg:items-center">
                                                    <p
                                                        className='text-gray-700  font-normal text-justify overflow-hidden text-base'
                                                        style={{
                                                            display: '-webkit-box',
                                                            WebkitLineClamp: 2,
                                                            WebkitBoxOrient: 'vertical',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis'
                                                        }}
                                                        dangerouslySetInnerHTML={{ __html: blog.description }}
                                                    >

                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>))}
                        </div>
                    </div>
                    <div className='bg-white w-[25%] p-2  hidden md:block h-full rounded'>
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
                                        <p className='mt-2 flex gap-1 text-xs text-slate-500'>
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
                        <div className='bg-white    mt-2 rounded-sm'>

                            {Array.isArray(blogs) && blogs.slice(0, 3).map((blog) => (
                                <a key={blog._id} href={`/product/${blog._id}`} className="flex p-2  h-24 bg-white    cursor-pointer   pb-8 lg:mb-1 lg:flex-row  border border-gray-300 shadow ">
                                    <img src={blog.img} alt="" className="inline-block rounded object-cover w-20" />
                                    <div className="flex flex-col items-start   ps-2">
                                        <p className='hover:text-green-600 leading-4 font-medium duration-200'>
                                            {blog.title}...
                                        </p>
                                        <p className='mt-2 flex gap-1 text-xs text-slate-500'>
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
                        <div className='bg-white mt-4   p-2 h-full rounded-sm'>



                        </div>

                    </div>
                </div>
            </div>
            <div className='flex items-center text-center justify-center mt-14 pb-20'>
                <Stack spacing={2}>
                    <Pagination
                        // count={Math.ceil(blogs.length / itemsPerPageSection1)}
                        count={Math.ceil((blogs?.length || 0) / itemsPerPageSection1)}
                        page={currentPage}
                        onChange={handlePageChange}
                        variant='outlined'
                        shape='rounded'
                    />
                </Stack>
            </div>
        </div >
    );
};

export default Home;
