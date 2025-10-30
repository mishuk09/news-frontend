import React, { useContext } from "react";
import { Sun, Sunrise } from "lucide-react";
import { ThemeContext } from "../hooks/ThemeContext";

export default function PrayerTimeCard() {
    const { theme } = useContext(ThemeContext);
    const times = {
        fajr: "৪:৪৫",
        dhuhr: "১১:৪৭",
        asr: "৩:৫০",
        maghrib: "৫:৩১",
        isha: "৬:৫৪",
        nextFajr: "৪:৪৪",
        sunset: "৫:৫৮",
        sunriseTomorrow: "৫:৫৮",
    };

    return (
        // <div className="max-w-sm mx-auto rounded overflow-hidden shadow-xl border border-gray-200 bg-white">
        <div className={`${theme === 'dark' ? 'dark-bg-color rounded' : 'bg-white rounded'}   rounded  py-2  mx-auto `}>
            {/* Header with background image */}
            <div
                className="relative text-center text-white py-8"
                style={{
                    backgroundImage:
                        "url('https://decorateur-oriental.fr/cdn/shop/articles/les-bases-de-lislam-les-5-piliers-et-les-croyances-fondamentales-930441.jpg?v=1735894706&width=1100')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-sky-800/80 to-sky-500/80"></div>

                <h2 className="relative text-3xl font-extrabold tracking-wide drop-shadow-lg">
                    নামাজের সময়সূচি
                </h2>
            </div>

            {/* Date Section */}
            <div className="text-center bg-sky-100 py-3 border-b border-sky-200">
                <p className="text-sky-900 font-semibold text-lg">
                    বৃহস্পতিবার, ২৩ অক্টোবর ২০২৫
                </p>
            </div>

            {/* Prayer Times */}
            <div className="px-6 py-5 text-gray-800">
                <div className="grid grid-cols-2 gap-y-3 text-lg font-medium">
                    <p className="flex justify-between border-b pb-1">
                        <span>ফজর</span> <span>{times.fajr}</span>
                    </p>
                    <p className="flex justify-between border-b pb-1">
                        <span>মাগরিব</span> <span>{times.maghrib}</span>
                    </p>
                    <p className="flex justify-between border-b pb-1">
                        <span>জোহর</span> <span>{times.dhuhr}</span>
                    </p>
                    <p className="flex justify-between border-b pb-1">
                        <span>এশা</span> <span>{times.isha}</span>
                    </p>
                    <p className="flex justify-between border-b pb-1">
                        <span>আসর</span> <span>{times.asr}</span>
                    </p>
                    <p className="flex justify-between text-sky-600 font-semibold">
                        <span>কাল ফজর</span> <span>{times.nextFajr}</span>
                    </p>
                </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 bg-sky-50 px-6 py-4 text-sm">
                <p className="text-center text-gray-700 mb-3">
                    সূত্র : ইসলামিক ফাউন্ডেশন
                </p>

                <div className="space-y-2">
                    <div className="flex items-center justify-between text-sky-800">
                        <div className="flex items-center gap-2">
                            <Sun className="w-5 h-5 text-amber-500" />
                            <span>আজ সূর্যাস্ত</span>
                        </div>
                        <span className="font-semibold">{times.sunset}</span>
                    </div>

                    <div className="flex items-center justify-between text-orange-700">
                        <div className="flex items-center gap-2">
                            <Sunrise className="w-5 h-5 text-orange-500" />
                            <span>আগামীকাল সূর্যোদয়</span>
                        </div>
                        <span className="font-semibold">{times.sunriseTomorrow}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
