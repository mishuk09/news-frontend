import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../hooks/ThemeContext';
import axios from 'axios';

const Leftformat = ({ path, division, district, upazila }) => {
    const { theme } = useContext(ThemeContext);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        axios.get(`https://news-backend-user.onrender.com/${path}/`)
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
            <div className={`${theme === 'dark' ? 'dark-bg-color' : 'bg-white'}     rounded`}>

                {Array.isArray(blogs) && blogs.slice(0, 5).map((blog) => (
                    <a key={blog._id} href={`/product/${blog._id}`}
                        className="flex   h-auto      cursor-pointer  lg:mb-1 lg:flex-row       ">
                        <div className="flex items-start p-3 border-b border-gray-200 hover:bg-gray-100   transition cursor-pointer">
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

                        {/* </div> */}
                    </a>

                ))}

            </div>

        </div>
    );
};

export default Leftformat;