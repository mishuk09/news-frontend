// src/components/LatestNewsSection.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChevronRight } from "lucide-react";
import LatestNewsHeader from "../../utills/LatestNewsHeader";
import LatestNewsChild from "./LatestNewsChild";
import TopNewsItem from "../../utills/TopNewsItem";

const API_URL = "https://news-backend-user.onrender.com/allnews/";

// Map category to background image
const categoryBgImages = {
  "বাংলাদেশ": "https://cdn.pixabay.com/photo/2019/10/24/05/13/national-parliament-of-bangladesh-4573350_1280.jpg",
  "বিশ্ব": "https://cdn.pixabay.com/photo/2016/01/09/19/30/globe-1130870_1280.jpg",
  "রাজনীতি": "https://cdn.pixabay.com/photo/2019/01/14/13/58/vote-3932253_1280.jpg",
  "স্বাস্থ্য": "https://cdn.pixabay.com/photo/2013/02/05/15/18/landscape-78058_1280.jpg",
  "ধর্ম": "https://cdn.pixabay.com/photo/2023/07/08/09/53/monastery-8114076_1280.jpg",
  "শিক্ষা": "https://cdn.pixabay.com/photo/2016/06/11/05/18/graduation-1449488_1280.jpg",
  "বাণিজ্য": "https://cdn.pixabay.com/photo/2015/01/08/18/11/laptops-593296_1280.jpg",
  "তথ্যপ্রযুক্তি": "https://cdn.pixabay.com/photo/2020/10/14/21/51/laptop-5655536_1280.jpg",
  "ভ্রমণ": "https://cdn.pixabay.com/photo/2019/04/17/18/04/camels-4134934_1280.jpg",
  "বিনোদন": "https://cdn.pixabay.com/photo/2018/06/10/22/48/chess-3467512_1280.jpg",
  "বিবিধ": "https://cdn.pixabay.com/photo/2020/08/31/12/23/people-5532331_1280.jpg",
  "মতামত": "https://cdn.pixabay.com/photo/2018/11/26/13/42/question-mark-3839456_1280.jpg",
  "বিজ্ঞান": "https://cdn.pixabay.com/photo/2022/04/13/16/18/future-7130603_1280.jpg",
  "খেলা": "https://cdn.pixabay.com/photo/2015/01/26/22/40/child-613199_1280.jpg",
};

const LatestNews = ({ category }) => {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mostRead, setMostRead] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL);
        setNews([...response.data].reverse());
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("🚨 খবর লোড করতে সমস্যা হচ্ছে। অনুগ্রহ করে পরে আবার চেষ্টা করুন।");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Filter based on category
  useEffect(() => {
    if (news.length > 0 && category) {
      const filtered = news.filter(
        (item) => item.category?.trim() === category.trim()
      );
      setFilteredNews(filtered);
    }
  }, [news, category]);

  // Fetch most read news
  useEffect(() => {
    axios
      .get("https://news-backend-user.onrender.com/most-view/")
      .then((res) => setMostRead(res.data.mostRead))
      .catch((err) => console.error(err));
  }, []);

  // Determine dynamic background image
  const bgImage = categoryBgImages[category] || "https://t4.ftcdn.net/jpg/09/72/52/97/360_F_972529706_IfJTvvISURwyWhZFQtLZdhc8ouYSh27Y.jpg";

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-3 border-b-4 border-red-600 inline-block pb-2">
            📰 সর্বশেষ খবর
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-gray-100 rounded-xl shadow-lg p-6 animate-pulse h-80"
            >
              <div className="h-32 bg-gray-300 rounded-lg mb-4"></div>
              <div className="h-6 bg-gray-300 rounded mb-2 w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded mb-4 w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <div
        className="text-center bg-red-50 border-l-4 border-red-500 text-red-700 p-4 max-w-lg mx-auto my-10"
        role="alert"
      >
        <p className="font-bold">ত্রুটি!</p>
        <p>{error}</p>
      </div>
    );
  }

  if (filteredNews.length === 0) {
    return (
      <div
        className="text-center bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700 p-4 max-w-lg mx-auto my-10"
        role="alert"
      >
        <p className="font-bold">খবর নেই</p>
        <p>এই মুহূর্তে “{category}” বিভাগে কোনো নতুন খবর নেই।</p>
      </div>
    );
  }

  return (
    <>
      <LatestNewsHeader
        category={category}
        headline={category}
        description={`"${category}" বিভাগের সর্বশেষ খবর`}
        bgImage={bgImage}
        news={filteredNews}
        loading={loading}
      />
      <LatestNewsChild news={filteredNews} loading={loading} />

      <section className="max-w-7xl mx-auto my-10">
        <h2 className="text-2xl px-2 font-bold mb-6 border-b border-red-600 pb-3 flex items-center gap-2">
          শীর্ষ খবর ও হালনাগাদ
          <ChevronRight className="w-5 h-5 text-red-600" />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[var(-bg-color)] p-2 rounded">
          {mostRead.slice(0, 6).map((data, index) => (
            <TopNewsItem key={index} mostnews={data} />
          ))}
        </div>
      </section>
    </>
  );
};

export default LatestNews;
