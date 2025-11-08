import React, { useContext, useEffect, useRef, useState } from "react";
import {
    Calendar,
    ChevronDown,
    Globe,
    Menu,
    Search,
    Sun,
    X,
    Moon,
    Linkedin,
    MessageCircle,
    Share2,
} from "lucide-react";
import { ThemeContext } from "../hooks/ThemeContext";
import {
    Facebook,
    Twitter,
    Instagram,
    Youtube,
} from "lucide-react";
import banglareports from "../assets/navbar/banglareports.png";
import { useLocation } from "react-router-dom";
const NAV_ITEMS = [
    "সর্বশেষ",
    "বাংলাদেশ",
    "বিশ্ব",
    "স্বাস্থ্য",
    "ধর্ম",
    "শিক্ষা",
    "বাণিজ্য",
    "তথ্যপ্রযুক্তি",
    "ভ্রমণ",
    "বিনোদন",
    "বিবিধ",
    "মতামত",
    "বিজ্ঞান",
    "খেলা",
];

// const NavLink = ({ children }) => (
//     <a
//         href="#"
//         className="text-[var(--primary-text-color)] hover:text-red-600 transition duration-150 px-3 py-2 text-lg font-semibold whitespace-nowrap border-b-2 border-transparent hover:border-red-600"
//     >
//         {children}
//     </a>
// );

const MobileLink = ({ children, onClick }) => (
    <a
        href="#"
        onClick={onClick}
        className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-red-600 border-b border-gray-200"
    >
        {children}
    </a>
);

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [todayBn, setTodayBn] = useState("");
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [scrolled, setScrolled] = useState(false);

     const location = useLocation();
  const currentCategory = decodeURIComponent(location.pathname.split("/").pop());

    const searchRef = useRef(null);

    const currentUrl = typeof window !== "undefined" ? window.location.href : "";

    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
        whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(currentUrl)}`,
    };
    // Bangla Date
    useEffect(() => {
        const now = new Date();
        const formatted = now.toLocaleDateString("bn-BD", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        });
        setTodayBn(formatted);
    }, []);

    // Close search on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div className="w-full   border-b border-gray-200">
            {/* Top Section */}
            <div className="max-w-7xl mx-auto flex justify-between items-center  px-2 py-3">

                <a href="/" className=" ">
                    <img src={banglareports} className="w-full h-14" alt="Bangla Reports" />
                </a>
                <span className="text-lg text-[var(--primary-text-color)]">ঢাকা, {todayBn}</span>

                <div className="hidden lg:flex gap-2 ">
                    <div className="flex gap-1">
                        <Share2 size={16} className="text-[var(--primary-text-color)]" />
                        <p className="text-sm text-slate-600">শেয়ার করুন:</p>
                    </div>
                    {/* Social Icons */}
                    <div className="flex gap-3">
                        <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:scale-110 transition-transform">
                            <Facebook size={18} />
                        </a>
                        <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:scale-110 transition-transform">
                            <Twitter size={18} />
                        </a>
                        <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:scale-110 transition-transform">
                            <Linkedin size={18} />
                        </a>
                        <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:scale-110 transition-transform">
                            <MessageCircle size={18} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <header className="  border border-gray-300  transition">
                <div className="max-w-7xl mx-auto flex  justify-between items-center  h-14">
                    {/* Desktop Nav */}
                    <nav className="hidden   lg:flex space-x-3 xl:space-x-4">
                        {NAV_ITEMS.map((item, i) => (
                        <a
                        key={i}
                        href={`/category/${item}`}
                        className={`px-3 py-2 text-lg font-semibold border-b-2 transition duration-150 ${
                        currentCategory === item ? "text-red-600 border-red-600" : "text-[var(--primary-text-color)] hover:text-red-600 border-transparent hover:border-red-600"
                }`}
              >
                {item}
              </a>

                        ))}
                    </nav>

                    {/* Right Icons */}
                    <div className="flex items-center mx-auto lg:mx-0 space-x-3">
                        {/* Search */}
                        <div ref={searchRef} className="relative bg-red-50 text-[var(--primary-color)] rounded-md">
                            <button
                                onClick={() => setSearchOpen(!searchOpen)}
                                className="p-2 text-gray-700 hover:text-red-600 transition rounded-md"
                            >
                                <Search size={22} />
                            </button>
                            {searchOpen && (
                                <div className="absolute top-10 right-0 w-64 sm:w-72 bg-white border border-gray-200 rounded-md shadow-lg p-2 z-20">
                                    <input
                                        type="text"
                                        placeholder="Search news..."
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Language Selector */}
                        <div className="relative bg-red-50 text-[var(--primary-color)] rounded-md">
                            <button className="flex items-center px-3 py-2 font-semibold hover:bg-red-100 rounded-md space-x-1">
                                <Globe size={18} />
                                <span className="hidden sm:inline text-sm">Eng</span>
                                <ChevronDown size={16} />
                            </button>
                        </div>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="relative flex items-center justify-center w-10 h-10 bg-gray-100   rounded-full transition"
                            aria-label="Toggle Theme"
                        >
                            {theme === "light" ? (
                                <Moon size={18} className="text-gray-600" />
                            ) : (
                                <Sun size={18} className="text-yellow-400" />
                            )}
                        </button>

                        {/* Mobile Menu */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 text-gray-700 hover:text-red-600 transition"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Nav */}
                <div
                    className={`lg:hidden transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
                        }`}
                >
                    <div className="border-t border-gray-200    ">
                        {NAV_ITEMS.map((item, i) => (
                            <MobileLink key={i} onClick={() => setIsMobileMenuOpen(false)}>
                                {item}
                            </MobileLink>
                        ))}
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Navbar;
