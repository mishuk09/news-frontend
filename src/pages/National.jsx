import React, { useContext, useState } from 'react';
import Headline from '../components/Headline';
import NatonalFormat from '../components/NationalFormat/NatonalFormat';
import { ThemeContext } from '../hooks/ThemeContext';
import divisionsData from '../components/divisions.json'; // Correct import of JSON
import { Flag } from 'lucide-react';

const National = () => {
    const { theme } = useContext(ThemeContext);

    const [selectedDivision, setSelectedDivision] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedUpazila, setSelectedUpazila] = useState('');

    // Handle division change
    const handleDivisionChange = (e) => {
        setSelectedDivision(e.target.value);
        setSelectedDistrict('');  // Reset district when division changes
        setSelectedUpazila('');  // Reset upazila when district changes
    };

    // Get the districts based on the selected division
    const getDistricts = () => {
        if (selectedDivision) {
            const division = divisionsData.divisions.find(
                (division) => division.name.toLowerCase() === selectedDivision.toLowerCase()
            );
            return division ? division.districts : [];
        }
        return [];
    };

    // Get upazilas based on selected district
    const getUpazilas = () => {
        if (selectedDivision && selectedDistrict) {
            const division = divisionsData.divisions.find(
                (division) => division.name.toLowerCase() === selectedDivision.toLowerCase()
            );
            if (division) {
                const district = division.districts.find(
                    (district) => district.name.toLowerCase() === selectedDistrict.toLowerCase()
                );
                return district ? district.upazilas : [];
            }
        }
        return [];
    };

    // Handle form submission
    const handleSubmit = () => {
        console.log('Division:', selectedDivision);
        console.log('District:', selectedDistrict);
        console.log('Upazila:', selectedUpazila);
    };

    return (
        <div className="p-4 mt-10 rounded-lg max-w-7xl mx-auto">
            <Headline name="বাংলাদেশ"/>

            <div className={`${theme === 'dark' ? 'dark-bg-color mt-4 px-10 h-30 items-center border border-gray-300 rounded-2xl flex justify-between gap-4' : 'shadow bg-white mt-4 px-10 h-30 items-center border border-gray-300 rounded-2xl flex justify-between gap-4'}`}>
                <div className="flex flex-col">
                    <p className="font-semibold text-xl">জেলার খবর</p>
                </div>

                <div className="flex flex-col">
                    <select
                        id="division"
                        className="mt-2 p-2 border border-gray-300 w-60 rounded-md"
                        value={selectedDivision}
                        onChange={handleDivisionChange}
                    >
                        <option value="">বিভাগ</option>
                        {divisionsData.divisions.map((division) => (
                            <option key={division.name} value={division.name.toLowerCase()}>
                                {division.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col">
                    <select
                        id="district"
                        className="mt-2 p-2 border border-gray-300 w-60 rounded-md"
                        value={selectedDistrict}
                        onChange={(e) => setSelectedDistrict(e.target.value)}
                    >
                        <option value="">জেলা</option>
                        {getDistricts().map((district) => (
                            <option key={district.name} value={district.name}>
                                {district.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col">
                    <select
                        id="upazila"
                        className="mt-2 p-2 border border-gray-300 w-60 rounded-md"
                        value={selectedUpazila}
                        onChange={(e) => setSelectedUpazila(e.target.value)}
                    >
                        <option value="">উপজেলা</option>
                        {getUpazilas().map((upazila) => (
                            <option key={upazila} value={upazila}>
                                {upazila}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex justify-center items-center mt-4 sm:col-span-2 md:col-span-1">
                    <button
                        className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
                        onClick={handleSubmit}
                    >
                        অনুসন্ধান
                    </button>
                </div>
            </div>
            <NatonalFormat division={selectedDivision} district={selectedDistrict} upazila={selectedUpazila} />
        </div>
    );
};

export default National;
