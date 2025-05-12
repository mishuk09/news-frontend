import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
    return (
        <footer className=" max-w-7xl mx-auto pt-8 px-6">
            <div>
                <a href="/" className="text-2xl font-bold">
                    news71.com
                </a>
            </div>
            <div className=" mt-6 border-b border-gray-300 pb-4">


                <div className="flex gap-4 justify-between">
                    <a href="/" className="text-sm hover:text-blue-500 duration-200"> • সর্বশেষ</a>
                    <a href="/" className="text-sm hover:text-blue-500 duration-200"> • বাংলাদেশ</a>
                    <a href="/" className="text-sm hover:text-blue-500 duration-200"> • বিশ্ব</a>
                    <a href="/" className="text-sm hover:text-blue-500 duration-200"> • খেলা</a>
                    <a href="/" className="text-sm hover:text-blue-500 duration-200"> • বাণিজ্য</a>
                    <a href="/" className="text-sm hover:text-blue-500 duration-200"> • ইসলামী জীবন</a>
                    <a href="/" className="text-sm hover:text-blue-500 duration-200"> • জীবনযাপন</a>
                    <a href="/" className="text-sm hover:text-blue-500 duration-200"> • তথ্যপ্রযুক্তি</a>
                    <a href="/" className="text-sm hover:text-blue-500 duration-200"> • ভ্রমণ</a>
                    <a href="/" className="text-sm hover:text-blue-500 duration-200"> • বিবিধ</a>
                    <a href="/" className="text-sm hover:text-blue-500 duration-200"> • ভিডিও</a>
                    <a href="/" className="text-sm hover:text-blue-500 duration-200"> • বিনোদন</a>
                    <a href="/" className="text-sm hover:text-blue-500 duration-200"> • পত্রিকা</a>

                </div>

                {/* Right Section */}

            </div>
            <div className="flex flex-col mt-6 md:flex-row items-center  justify-between gap-6">
                <div className="flex flex-col items-center gap-2">
                    <div className="text-sm">
                        অনুসরণ করুন
                    </div>
                    <div className="flex gap-4">
                        <a href="/" className="text-lg">
                            <Facebook />
                        </a>
                        <a href="/" className="text-lg">
                            <Twitter />
                        </a>
                        <a href="/" className="text-lg">
                            <Instagram />
                        </a>
                        <a href="/" className="text-lg">
                            <Youtube />
                        </a>
                    </div>
                </div>
                <div className="flex flex-col gap-4 mt-4 md:mt-0">
                    <div className="flex items-center justify-center">
                        <a href="/" className="text-sm"> অ্যাপ ডাউনলোড করুন</a>
                    </div>
                    <div className="flex gap-4">
                        <a href="/" className="text-sm"><img className="w-30 h-10" src="https://www.netsupportmanager.com/wp-content/uploads/2019/06/en.png" alt="" /></a>
                        <a href="/" className="text-sm"><img className="w-30 h-10" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHMXXrbE56wocfz3A_sPV4okAAVA-7rg91erk6DCEZ9aJKFBLiTVblSSZr5EiVj6ohyg&usqp=CAU" alt="" /></a>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-gray-600 pt-4 mt-6 text-center text-sm">
                <p>১৯৯৮-২০১৮ নিউজ ৭১ | সম্পাদক ও প্রকাশক: মিশুক</p>
            </div>
        </footer>
    );
};

export default Footer;
