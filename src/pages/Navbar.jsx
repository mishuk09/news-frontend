import React, { useState } from 'react';
import { Calendar, ChevronDown, Languages, Menu, Search, Sun } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMobileMenu = () => {
        setIsOpen(false);
    };

    return (
        <div>
            {/* Top Section with Date and Logo */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
                <span className="text-gray-500">ঢাকা, রবিবার ৩০ মার্চ ২০২৫</span>

                <div className="text-4xl font-bold text-gray-800">NEWS 71</div>

                <div className="flex gap-4">
                    <Search className="text-gray-500" size={24} />
                    <Languages className="text-gray-500" size={24} />
                    <Sun className="text-gray-500" size={24} />
                </div>
            </div>

            {/* Navigation Menu */}
            <div className="bg-blue-100 h-10 ">
                <nav className="max-w-7xl mx-auto flex h-full justify-between items-center">
                    {/* Desktop Menu */}
                    <ul className="hidden border-r py-2 border-gray-300 lg:flex space-x-6 w-full justify-between">
                        <li className='flex '><a href="/" className=" h-full   text-gray-700 hover:text-blue-600 transition">সরবরাহ </a> <ChevronDown /></li>
                        <li><a href="/" className=" h-full   text-gray-700 hover:text-blue-600 transition">বাংলাদেশ</a></li>
                        <li><a href="/" className=" h-full   text-gray-700 hover:text-blue-600 transition">বিশ্ব</a></li>
                        <li><a href="/" className=" h-full   text-gray-700 hover:text-blue-600 transition">খেলা</a></li>
                        <li><a href="/" className=" h-full   text-gray-700 hover:text-blue-600 transition">বাণিজ্য</a></li>
                        <li><a href="/" className=" h-full   text-gray-700 hover:text-blue-600 transition">ইসলামী জীবন</a></li>
                        <li><a href="/" className=" h-full   text-gray-700 hover:text-blue-600 transition">জীবনযাপন</a></li>
                        <li><a href="/" className=" h-full   text-gray-700 hover:text-blue-600 transition">ভিডিও</a></li>
                        <li><a href="/" className=" h-full   text-gray-700 hover:text-blue-600 transition">পত্রিকা</a></li>
                    </ul>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden text-gray-600"
                        onClick={toggleMobileMenu}
                        aria-label="Toggle menu"
                    >
                        <Menu size={24} className="text-gray-500" />
                    </button>
                </nav>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="lg:hidden">
                        <ul className="space-y-4 p-4">
                            <li><a href="/" onClick={closeMobileMenu} className="text-gray-700 hover:text-blue-600 transition">সরবরাহ</a></li>
                            <li><a href="/" onClick={closeMobileMenu} className="text-gray-700 hover:text-blue-600 transition">বাংলাদেশ</a></li>
                            <li><a href="/" onClick={closeMobileMenu} className="text-gray-700 hover:text-blue-600 transition">বিশ্ব</a></li>
                            <li><a href="/" onClick={closeMobileMenu} className="text-gray-700 hover:text-blue-600 transition">খেলা</a></li>
                            <li><a href="/" onClick={closeMobileMenu} className="text-gray-700 hover:text-blue-600 transition">বাণিজ্য</a></li>
                            <li><a href="/" onClick={closeMobileMenu} className="text-gray-700 hover:text-blue-600 transition">ইসলামী জীবন</a></li>
                            <li><a href="/" onClick={closeMobileMenu} className="text-gray-700 hover:text-blue-600 transition">জীবনযাপন</a></li>
                            <li><a href="/" onClick={closeMobileMenu} className="text-gray-700 hover:text-blue-600 transition">ভিডিও</a></li>
                            <li><a href="/" onClick={closeMobileMenu} className="text-gray-700 hover:text-blue-600 transition">পত্রিকা</a></li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
