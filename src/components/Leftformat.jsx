import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../hooks/ThemeContext';
import axios from 'axios';

const Leftformat = ({ path, division, district, upazila }) => {
    const { theme } = useContext(ThemeContext);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/${path}/`)
            .then(response => {
                const nofilter = response.data;

                let filteredBlogs = [];

                if (division && district && upazila) {
                    // Try to match all three
                    filteredBlogs = nofilter.filter(blog =>
                        blog.divission === division &&
                        blog.district === district &&
                        blog.upazila === upazila
                    );
                }

                if (filteredBlogs.length === 0 && division && district) {
                    // Try to match division + district
                    filteredBlogs = nofilter.filter(blog =>
                        blog.divission === division &&
                        blog.district === district
                    );
                }

                if (filteredBlogs.length === 0 && division) {
                    // Try to match only division
                    filteredBlogs = nofilter.filter(blog =>
                        blog.divission === division
                    );
                }

                if (filteredBlogs.length === 0) {
                    // If no filter is applied or no matching found, show all
                    filteredBlogs = nofilter;
                }

                setBlogs(filteredBlogs);
            })
            .catch(error => {
                console.log(error);
            });
    }, [path, division, district, upazila]);


    return (
        <div>
            <div className={`${theme === 'dark' ? 'dark-bg-color' : 'bg-white'}  p-3 shadow-md rounded-sm mt-1`}>
                <h2 className='text-1xl mb-3   font-bold border-b-2 border-dotted pb-1'>Random Blog</h2>

                {Array.isArray(blogs) && blogs.slice(0, 6).map((blog) => (
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

        </div>
    );
};

export default Leftformat;