import React from 'react';

const Headline = ({ link, name }) => {
    return (
        <div>
            <div className="flex items-center  ">
                <a href={link} className="text-2xl font-bold hover:text-[var(--primary-color)] duration-200 transition"> 📰 {name}</a>
            </div>
            <hr className='mt-2 text-gray-300' />
        </div>
    );
};

export default Headline;