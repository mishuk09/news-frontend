import React, { useContext, useEffect, useState } from 'react';
import { Calendar, ChevronDown, Languages, Menu, Search, Sun } from 'lucide-react';
import { ThemeContext } from '../hooks/ThemeContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState(false)
    const { theme, toggleTheme } = useContext(ThemeContext);

    const [todayBn, setTodayBn] = useState('');


    useEffect(() => {
        const now = new Date();
        const opts = {
            weekday: 'long',  
            day: 'numeric', 
            month: 'long',  
            year: 'numeric'  
        };
        // 'bn-BD' for Bangla (Bangladesh) locale
        const formatted = now.toLocaleDateString('bn-BD', opts);
        setTodayBn(formatted);
    }, []);
    const toggleMobileMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMobileMenu = () => {
        setIsOpen(false);
    };

    return (
        <div>
            {/* Top Section with Date and Logo */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4 relative">
                <span className="">
                    ঢাকা, {todayBn}
                </span>

                <a href='/' className="text-4xl font-bold  ">NEWS 71</a>



                {search && <div className="absolute top-18 left-1/2 w-1/3   rounded-lg bg-blue-50 z-20 flex justify-center items-center">
                    <input type="text" placeholder='Search...' className='border border-blue-300 w-full rounded-lg p-2' />
                </div>
                }
                <div className="flex gap-4">
                    <Search onClick={() => setSearch(true)} className="" size={24} />
                    <Languages className="" size={24} />
                    <button
                        onClick={toggleTheme}
                        className="
    relative inline-flex items-center h-6 w-12
    bg-gray-200 dark:bg-gray-700
    rounded-full px-1
    transition-colors duration-300
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
  "
                    >
                        {/* Moon icon (left) */}
                        <span className="absolute left-1 text-xs text-gray-600 dark:text-gray-300">
                            🌙
                        </span>

                        {/* Sun icon (right) */}
                        <span className="absolute right-1 text-xs text-gray-600 dark:text-gray-300">
                            ☀️
                        </span>

                        {/* Sliding thumb */}
                        <span
                            className={`
      inline-block w-4 h-4 bg-white rounded-full shadow
      transform transition-transform duration-300
      ${theme === 'light' ? 'translate-x-0' : 'translate-x-6'}
    `}
                        />
                    </button>

                </div>
            </div>

            {/* Navigation Menu */}
            <div className={`${theme === 'dark' ? 'dark-bg-color' : 'bg-blue-100'}  h-12`}>
                <nav className="max-w-7xl mx-auto flex h-full justify-between items-center">
                    {/* Desktop Menu */}
                    <ul className="hidden font-medium border-r py-2 border-gray-300 lg:flex space-x-6 w-full justify-between">
                        <li className='flex '><a href="/" className=" h-full    hover:text-blue-600 transition">সর্বশেষ </a> </li>
                        <li><a href="/" className=" h-full    hover:text-blue-600 transition">বাংলাদেশ</a></li>
                        <li><a href="/" className=" h-full    hover:text-blue-600 transition">বিশ্ব</a></li>
                        <li><a href="/" className=" h-full    hover:text-blue-600 transition">খেলা</a></li>
                        <li><a href="/" className=" h-full    hover:text-blue-600 transition">বাণিজ্য</a></li>
                        <li><a href="/" className=" h-full    hover:text-blue-600 transition">ইসলামী জীবন</a></li>
                        <li><a href="/" className=" h-full    hover:text-blue-600 transition">জীবনযাপন</a></li>
                        <li><a href="/" className=" h-full    hover:text-blue-600 transition">তথ্যপ্রযুক্তি

                        </a></li>
                        <li><a href="/" className=" h-full    hover:text-blue-600 transition">ভ্রমণ

                        </a></li>
                        <li><a href="/" className=" h-full    hover:text-blue-600 transition">বিবিধ</a></li>
                        <li><a href="/" className=" h-full    hover:text-blue-600 transition">ভিডিও</a></li>
                        <li><a href="/" className=" h-full    hover:text-blue-600 transition">বিনোদন</a></li>
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
