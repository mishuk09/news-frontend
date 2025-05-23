import React from 'react';

const Headline = ({ link, name }) => {
    return (
        <div>
            <div className="flex items-center space-x-4">
                <p className="w-6 h-6" >{link}</p>
                <h1 className="text-xl font-bold ">{name}</h1>
            </div>
            <hr className='mt-2 text-gray-300' />
        </div>
    );
};

export default Headline;