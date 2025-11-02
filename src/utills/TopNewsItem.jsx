
const TopNewsItem = ({ title, img, description }) => {
    const imageUrl = Array.isArray(img) && img.length > 0 ? img[0] : "https://placehold.co/100x70?text=No+Image";

    return (
        <div className="flex gap-4 p-2   hover:bg-gray-100 border-b border-gray-300   cursor-pointer">
            <div className="w-26 h-26 flex-shrink-0 rounded-md overflow-hidden border border-gray-200">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover"
                    onError={(e) => (e.target.src = "https://placehold.co/100x70/D1D5DB/4B5563?text=ছবি")}
                />
            </div>
            <div>
                <p className=" text-sm sm:text-xl  line-clamp-2 font-semibold leading-snug hover:text-red-600 transition">
                  {title}
                </p>
                <p>
                    <p className=" text-[var(--primary-text-color)] text-lg mt-1 line-clamp-2 leading-tight" dangerouslySetInnerHTML={{ __html: description }}></p>

                </p>
            </div>


        </div>
    );
};
export default TopNewsItem;