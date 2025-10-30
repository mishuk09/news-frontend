import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../hooks/ThemeContext';
import axios from 'axios';

const RIghtformat = ({ path }) => {
    const { theme } = useContext(ThemeContext);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/${path}/`)
            .then(response => {
                // setPosts(response.data.slice(0, 12));
                setBlogs(response.data);

            })
            .catch(error => {
                console.log(error);

            });
    }, []);

    return (
        <div>
            <div className={`${theme === 'dark' ? 'dark-bg-color' : 'bg-white'} rounded `}>
                {Array.isArray(blogs) && blogs.slice(8, 13).map((blog) => (
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

export default RIghtformat;