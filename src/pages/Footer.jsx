import { Copyright, Facebook, Instagram, Linkedin, MessageCircle, Twitter, Youtube } from "lucide-react";
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
    "বিজ্ঞান",
    "খেলা",
];

const NavLink = ({ children }) => (
    <a
        href="#"
        className="text-[var(--primary-text-color)] hover:text-red-600 transition duration-150 px-3 py-2 text-lg font-semibold whitespace-nowrap border-b-2 border-transparent hover:border-red-600"
    >
        {children}
    </a>
);

const Footer = () => {
    const currentUrl = typeof window !== "undefined" ? window.location.href : "";
const location = useLocation();
  const currentCategory = decodeURIComponent(location.pathname.split("/").pop());
    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
        whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(currentUrl)}`,
    };
    return (
        <footer className=" ">
            <div className="max-w-7xl mx-auto   pb-6 px-6 border-t border-b border-gray-300">
                <div className="flex flex-col mt-6  md:flex-row items-center  justify-between gap-6">
                    <div>
                        <a href="/" className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                            <img src={banglareports} className=" h-16" alt="Bangla Reports" />
                        </a>
                    </div>
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
                    <div className="flex flex-col items-center gap-2">
                        <div className="">
                            অনুসরণ করুন
                        </div>
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
            </div>

            {/* Bottom Section */}
            <div className="flex items-center justify-center  pt-2 text-center text-sm">
                <p className="flex  gap-2"><Copyright size={17} /> 2025-2025 Banglareports.com</p>
            </div>
        </footer>
    );
};

export default Footer;
