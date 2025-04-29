import React, { useContext, useState } from 'react';
import { Calendar, ChevronDown, Languages, Menu, Search, Sun } from 'lucide-react';
import { ThemeContext } from '../hooks/ThemeContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, toggleTheme } = useContext(ThemeContext);

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
                <span className=" ">ঢাকা, রবিবার ৩০ মার্চ ২০২৫</span>

                <div className="text-4xl font-bold  ">NEWS 71</div>

                <div className="flex gap-4">
                    <Search className="" size={24} />
                    <Languages className="" size={24} />
                    <button onClick={toggleTheme} className='text-xl'>
                        {theme === 'light' ? '🌙  ' : '☀️ '}
                    </button>
                </div>
            </div>

            {/* Navigation Menu */}
            <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-100'}  h-12`}>
                <nav className="max-w-7xl mx-auto flex h-full justify-between items-center">
                    {/* Desktop Menu */}
                    <ul className="hidden border-r py-2 border-gray-300 lg:flex space-x-6 w-full justify-between">
                        <li className='flex '><a href="/" className=" h-full    hover:text-blue-600 transition">সরবরাহ </a> <ChevronDown /></li>
                        <li><a href="/" className=" h-full    hover:text-blue-600 transition">বাংলাদেশ</a></li>
                        <li><a href="/" className=" h-full    hover:text-blue-600 transition">বিশ্ব</a></li>
                        <li><a href="/" className=" h-full    hover:text-blue-600 transition">খেলা</a></li>
                        <li><a href="/" className=" h-full    hover:text-blue-600 transition">বাণিজ্য</a></li>
                        <li><a href="/" className=" h-full    hover:text-blue-600 transition">ইসলামী জীবন</a></li>
                        <li><a href="/" className=" h-full    hover:text-blue-600 transition">জীবনযাপন</a></li>
                        <li><a href="/" className=" h-full    hover:text-blue-600 transition">ভিডিও</a></li>
                        <li><a href="/" className=" h-full    hover:text-blue-600 transition">পত্রিকা</a></li>
                    </ul>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden text-gray-600"
                        onClick={toggleMobileMenu}
                        aria-label="Toggle menu"
                    >
                        <Menu size={24} className="" />
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
