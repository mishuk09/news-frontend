import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../hooks/ThemeContext';
import axios from 'axios';
import { Clock } from 'lucide-react';

const Mainformat = ({ path }) => {
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
            <div className='  relative py-3'>

                {
                    blogs && blogs.slice(6, 7).map((blog) => (
                        <a key={blog._id} href={`/product/${blog._id}`} className={`flex${theme === 'dark' ? 'dark-bg-color' : 'cursor-pointer flex-col gap-3     shadow rounded-sm '} `}>
                            <img src={blog.img} alt="" className="inline-block  rounded-t h-full w-full object-cover" />
                            <div className="flex flex-col items-start p-1">

                                <p className="mb-1 leading-6   font-semibold text-2xl mt-4   text-[var(--primary-text-color)]  ">   {blog.title
                                } </p>
                                <div className='text-justify text-lg pt-2' dangerouslySetInnerHTML={{ __html: blog.description.split(' ').slice(0, 20).join(' ') }} />


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
    );
};

export default Mainformat;