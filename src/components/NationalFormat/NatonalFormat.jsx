import React from 'react';
import Leftformat from '../Leftformat';
import RIghtformat from '../RIghtformat';
import Mainformat from '../Mainformat';

const NatonalFormat = ({ division, district, upazila }) => {
    return (
        <div>
            <div className='max-w-7xl mx-auto'>
                <div className='flex  gap-2 w-full pt-6'>
                    <div className=' hidden md:block  w-[25%] px-2 h-full rounded'>
                        <Leftformat path='allnews' division={division} district={district} upazila={upazila} />
                    </div>

                    <div className='  p-1  w-full md:w-[50%] h-full rounded relative'>



                        <Mainformat path='allnews' division={division} district={district} upazila={upazila} />

                    </div>
                    <div className='   p-1 w-[25%] h-full hidden md:block   rounded'>


                        <RIghtformat path='allnews' division={division} district={district} upazila={upazila} />
                    </div>
                </div>
            </div>

            <p>{upazila}</p>
            <p>{district}</p>
            <p>{division}</p>
        </div>
    );
};

export default NatonalFormat;