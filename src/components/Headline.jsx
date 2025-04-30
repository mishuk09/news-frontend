import React from 'react';

const Headline = ({ link, name }) => {
    return (
        <div>
            <div className="flex items-center space-x-4">
                <img src={link} alt="Bangladesh Flag" className="w-10 h-6" />
                <h1 className="text-xl font-bold text-black">{name}</h1>
            </div>
            <hr className='mt-2 text-gray-300' />
        </div>
    );
};

export default Headline;