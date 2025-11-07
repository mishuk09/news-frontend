import NewsCard from "./NewsCard";
import { Home } from "lucide-react";

const LatestNewsHeader = ({ headline, description, category, bgImage, news, loading }) => {
  return (
    <div className="relative mb-130">

      <section
        className="relative w-full h-[350px] flex flex-col   text-white overflow-hidden"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Container */}
        <div className="relative max-w-7xl mx-auto w-full px-6">
          
          {/* Route (Top Left) */}
          <div className="absolute top-2 left-0 flex items-center gap-2 z-20">
           <p> <Home className="text-white " size={16} /></p>
            <p className="text-red-400  cursor-pointer font-semibold tracking-wide uppercase">
              / {category }
            </p>
          </div>

          {/* Headline + Description (Centered) */}
          <div className="relative text-center pt-16">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-lg">
              {headline || "শিরোনাম এখানে প্রদর্শিত হবে"}
            </h1>
            <p className="text-gray-200 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto drop-shadow-md mt-4">
              {description ||
                "দেশের এবং বিশ্বের সর্বশেষ ও গুরুত্বপূর্ণ সংবাদ এক নজরে দেখতে পারেন। সত্য ও নিরপেক্ষ সংবাদের জন্য আমাদের সাথেই থাকুন।"}
            </p>
          </div>
        </div>
      </section>

      {/* News Cards Section */}
      <section className="absolute top-[230px] w-full py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {loading ? (
            <Skeleton height={150} count={3} />
          ) : (
            Array.isArray(news) &&
            news.slice(1, 9).map((article, index) => (
              <NewsCard key={index} news={article} />
            ))
          )}
        </div>
      </section>

    </div>
  );
};

export default LatestNewsHeader;
