import React, { useState } from 'react';
import Headline from '../components/Headline';
import NatonalFormat from '../components/NationalFormat/NatonalFormat';

const National = () => {

    const [selectedDivision, setSelectedDivision] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedUpazila, setSelectedUpazila] = useState('');

    return (
        <div className="  p-4 mt-10 rounded-lg max-w-7xl mx-auto">
            <Headline name='বাংলাদেশ' link='https://flagsireland.com/cdn/shop/files/BangladeshFlag.png?v=1705068579' />


            <div className="mt-4 px-10 h-30 bg-white items-center border border-gray-300  rounded-2xl  flex justify-between  gap-4 ">
                <div className="flex flex-col">

                    <p className='font-semibold text-xl'>জেলার খবর</p>

                </div>

                <div className="flex flex-col">
                    <select
                        id="division"
                        className="mt-2 p-2 border border-gray-300 w-60 rounded-md text-gray-700"
                        value={selectedDivision}
                        onChange={(e) => setSelectedDivision(e.target.value)}
                    >
                        <option value="">বিভাগ</option>
                        <option value="dhaka">Dhaka</option>
                        <option value="chittagong">Chittagong</option>
                        <option value="rajshahi">Rajshahi</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <select
                        id="district"
                        className="mt-2 p-2 border border-gray-300 w-60 rounded-md text-gray-700"
                        value={selectedDistrict}
                        onChange={(e) => setSelectedDistrict(e.target.value)}
                    >
                        <option value="">জেলা</option>
                        <option value="dhakaDistrict">Dhaka District</option>
                        <option value="chittagongDistrict">Chittagong District</option>
                        <option value="rajshahiDistrict">Rajshahi District</option>
                    </select>
                </div>

                <div className="flex flex-col">

                    <select
                        id="upazila"
                        className="mt-2 p-2 border border-gray-300 w-60 rounded-md text-gray-700"
                        value={selectedUpazila}
                        onChange={(e) => setSelectedUpazila(e.target.value)}
                    >
                        <option value="">উপজেলা</option>
                        <option value="dhakaUpazila">Dhaka Upazila</option>
                        <option value="chittagongUpazila">Chittagong Upazila</option>
                        <option value="rajshahiUpazila">Rajshahi Upazila</option>
                    </select>
                </div>
                <div className="flex justify-center items-center mt-4 sm:col-span-2 md:col-span-1">
                    <button
                        className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
                        onClick={() => alert('Form Submitted')}
                    >
                        অনুসন্ধান
                    </button>
                </div>




            </div>
            <NatonalFormat />
        </div>
    );
}

export default National;
