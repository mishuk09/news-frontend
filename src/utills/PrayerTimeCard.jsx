import React, { useContext, useEffect, useState } from "react";
import { Sun, Sunrise, MapPin, RefreshCcw } from "lucide-react";
import { ThemeContext } from "../hooks/ThemeContext";

export default function PrayerTimeCard() {
    const { theme } = useContext(ThemeContext);
    const [city, setCity] = useState("Dhaka");
    const [times, setTimes] = useState(null);
    const [dateInfo, setDateInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // 🔹 Convert English digits to Bangla
    const toBanglaNumber = (str) =>
        str.replace(/[0-9]/g, (d) => "০১২৩৪৫৬৭৮৯"[d]);

    // 🔹 Convert 24h → 12h + Bangla numerals
    const formatBanglaTime = (timeStr) => {
        if (!timeStr) return "";
        const [hStr, mStr] = timeStr.split(":");
        let hour = parseInt(hStr, 10);
        const minute = parseInt(mStr, 10);
        const isPM = hour >= 12;
        hour = hour % 12 || 12;
        const period = isPM ? "pm" : "am";
        const formatted = `${hour}:${minute.toString().padStart(2, "0")} ${period}`;
        return toBanglaNumber(formatted);
    };
 
    // 1️⃣ Move the fetching logic into a named function
    const fetchPrayerTimes = async () => {
        setLoading(true);
        setError("");

        const startTime = Date.now();

        try {
            const res = await fetch(
                `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Bangladesh&method=13`
            );
            const data = await res.json();

            if (data.code === 200) {
                setTimes(data.data.timings);
                setDateInfo(data.data.date);
            } else {
                setError("সময়সূচি পাওয়া যায়নি।");
            }
        } catch (err) {
            console.error(err);
            setError("নামাজের সময় আনতে সমস্যা হয়েছে।");
        } finally {
            // ⏱ Ensure at least 1 second of spinner time
            const elapsed = Date.now() - startTime;
            const delay = Math.max(1000 - elapsed, 0);
            setTimeout(() => setLoading(false), delay);
        }
    };


    // 2️⃣ Call it on mount and whenever city changes
    useEffect(() => {
        fetchPrayerTimes();
    }, [city]);

    return (
        <div
            className={`max-w-sm mx-auto rounded mt-1 overflow-hidden shadow-xl border ${theme === "dark"
                ? "bg-gray-900 border-gray-800 text-gray-100"
                : "bg-white border-gray-200 text-gray-800"
                } transition-all duration-500`}
        >
            {/* Header */}
            <div
                className="relative text-center text-white py-4"
                style={{
                    backgroundImage:
                        "url('https://www.edarabia.com/wp-content/uploads/2019/02/prayer-times-malaysia.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-sky-900/80 to-cyan-600/70"></div>

                <h2 className="relative text-2xl font-bold tracking-wide drop-shadow-lg">
                    নামাজের সময়সূচি
                </h2>
                <p className="relative text-sm opacity-90  flex items-center justify-center gap-1">
                    <MapPin className="w-4 h-4 text-amber-300" /> {city}, বাংলাদেশ
                </p>

                {/* City Selector */}
                <div className="relative z-10 mt-4">
                    <select
                        className="px-3 py-1.5 bg-white/90 text-gray-800 rounded text-sm font-medium focus:outline-none hover:bg-white"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    >
                        <option>Dhaka</option>
                        <option>Chattogram</option>
                        <option>Sylhet</option>
                        <option>Rajshahi</option>
                        <option>Khulna</option>
                        <option>Barisal</option>
                        <option>Rangpur</option>
                    </select>
                </div>
            </div>

            {/* Loading / Error / Content */}
            {loading ? (
                <div className="animate-pulse p-6 space-y-3">
                    <div className="h-5 bg-gray-200  rounded"></div>
                    <div className="h-5 bg-gray-200  rounded w-5/6"></div>
                    <div className="h-5 bg-gray-200  rounded w-4/6"></div>
                </div>
            ) : error ? (
                <div className="text-center py-10 text-red-600 font-semibold">
                    {error}
                </div>
            ) : (
                <>
                    {/* Date */}
                    <div className="text-center   py-2 border-b border-sky-200">
                        <p className="text-[var(--primary-text-color)] font-semibold  ">
                            {dateInfo.weekday?.en} {dateInfo.readable}
                        </p>
                    </div>

                    {/* Prayer Times */}
                    <div className="px-4 py-3">
                        <div className="grid grid-cols-2 gap-3  font-medium">
                            <p className="flex justify-between border-b pb-1">
                                <span>ফজর</span> <span>{formatBanglaTime(times.Fajr)}</span>
                            </p>
                            <p className="flex justify-between border-b pb-1">
                                <span>জোহর</span> <span>{formatBanglaTime(times.Dhuhr)}</span>
                            </p>
                            <p className="flex justify-between border-b pb-1">
                                <span>আসর</span> <span>{formatBanglaTime(times.Asr)}</span>
                            </p>
                            <p className="flex justify-between border-b pb-1">
                                <span>মাগরিব</span> <span>{formatBanglaTime(times.Maghrib)}</span>
                            </p>
                            <p className="flex justify-between border-b pb-1">
                                <span>এশা</span> <span>{formatBanglaTime(times.Isha)}</span>
                            </p>
                            <p className="flex justify-between text-sky-600 font-semibold">
                                <span>কাল ফজর</span> <span>{formatBanglaTime(times.Fajr)}</span>
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-200   px-6 py-4 text-sm">
                        {/* <p className="text-center text-gray-700 mb-3">
                            সূত্র : ইসলামিক ফাউন্ডেশন বাংলাদেশ
                        </p> */}

                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sky-800">
                                <div className="flex items-center gap-2">
                                    <Sun className="w-5 h-5 text-amber-500" />
                                    <span>আজ সূর্যাস্ত</span>
                                </div>
                                <span className="font-semibold">
                                    {formatBanglaTime(times.Sunset)}
                                </span>
                            </div>

                            <div className="flex items-center justify-between text-orange-700">
                                <div className="flex items-center gap-2">
                                    <Sunrise className="w-5 h-5 text-orange-500" />
                                    <span>আগামীকাল সূর্যোদয়</span>
                                </div>
                                <span className="font-semibold">
                                    {formatBanglaTime(times.Sunrise)}
                                </span>
                            </div>
                        </div>
                    </div>
                </>
            )}

            <button
                onClick={fetchPrayerTimes}
                disabled={loading}
                className={`flex items-center justify-center w-full gap-2 py-3 font-medium text-sm transition-colors duration-300
    ${loading
                        ? "bg-sky-400 cursor-not-allowed text-white/90"
                        : "bg-sky-600 hover:bg-sky-700 text-white"
                    }`}
            >
                <RefreshCcw
                    className={`w-4 h-4 transition-transform ${loading ? "animate-spin" : ""
                        }`}
                />
                {loading ? "রিফ্রেশ হচ্ছে..." : "রিফ্রেশ করুন"}
            </button>

        </div>
    );
}
