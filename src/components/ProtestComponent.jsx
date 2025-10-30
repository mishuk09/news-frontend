import React from "react";
import { PenSquare } from "lucide-react";

const ProtestComponent = () => {
    return (
        <div className=" flex mt-10 gap-10 w-full">
            {/* Left Card */}
            <div className="bg-blue-50 w-[40%] relative p-6 border border-gray-300 rounded shadow-md col-span-2">
                <div className="absolute left-[-30px]  bg-indigo-950 text-white px-4 py-3 inline-block  rounded mb-4 text-xl font-semibold w-full">
                    বিক্ষোভের নামে লুটপাট নিতান্তই ছোটলোকি
                </div>
                <p className= " text-lg text-gray-700 mb-4 pt-16 leading-relaxed text-justify ">
                    ফিলিস্তিনের গাজায় ইসরায়েলের গণহত্যার প্রতিবাদে বিক্ষোভের সময় দেশের বিভিন্ন স্থানে দোকান,
                    ব্যবসা প্রতিষ্ঠানে হামলা, ভাঙচুর ও লুটপাটের ঘটনা ঘটেছে। এই ঘটনায় ইমামত অন্তত ৪১ জনকে গ্রেফতার করেছে আইন-শৃঙ্খলা বাহিনী।
                </p>
                <div className="flex items-center gap-3 mt-4">
                    <img
                        src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSZNCunC5QDkqt7JpDJPot1h93-WkK5KVE_F5nKAXnPO9s7qKED2vex60ONRgodCvSmMS_32YwhsV-ufYtDkN5ftg"
                        alt="Mizanur Rahman Azhari"
                        className="w-14 h-14 rounded-full object-cover"
                    />
                    <h3 className="text-gray-900 font-semibold">মিজানুর রহমান আজহারী</h3>
                </div>
            </div>

            {/* Right List */}
            <div className="space-y-6 w-[60%]">
                {[
                    "বিশ্লেষণ বাংলাদেশের নদীতে চীনের সহায়তা: ভালো না মন্দ?",
                    "মতামত: রেকর্ড রেমিট্যান্স দিলেন প্রবাসীরা, রাষ্ট্র ঋণদের কী",
                    "বিশ্লেষণ এনসিপি: তারুণ্যের উথান, নাকি জাসদের ছায়া",
                    "মতামত: প্রতিদিন রাতে আমি ওকে চুমু দিতাম, যেন এটা হয়"
                ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3 border-b pb-2 border-gray-300">
                        <PenSquare className=" shrink-0 rounded-full border border-gray-300 w-10 h-10 p-3" size={24} />
                        <div>
                            <h4 className="  text-2xl  font-semibold leading-snug hover:underline cursor-pointer">
                                {item}
                            </h4>
                            <p className="">নজরুল ইসলাম</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProtestComponent;