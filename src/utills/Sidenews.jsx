// NewsTime.jsx or inside your current file if it's there

const NewsTime = ({ createdAt }) => {

    // 1. Helper function to convert Arabic numerals to Bengali numerals
    const convertToBengaliNumerals = (number) => {
        // Bengali numerals map (0-9)
        const bengaliNumerals = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

        // Convert the number to a string and map each digit
        return String(number).split('').map(digit => {
            // Check if the character is a digit before conversion
            if (digit >= '0' && digit <= '9') {
                return bengaliNumerals[parseInt(digit, 10)];
            }
            return digit;  // Return the character as is if it's not a digit
        }).join('');
    };

    const getTimeAgo = (dateString) => {
        if (!dateString) return "সময় নেই";

        const now = new Date();
        const date = new Date(dateString);
        const diffMs = now - date;

        const diffSeconds = Math.floor(diffMs / 1000);
        const diffMinutes = Math.floor(diffSeconds / 60);
        const diffHours = Math.floor(diffMinutes / 60);
        const diffDays = Math.floor(diffHours / 24);

        let value;
        let unit;

        if (diffSeconds < 60) {
            value = diffSeconds;
            unit = "সেকেন্ড";
        } else if (diffMinutes < 60) {
            value = diffMinutes;
            unit = "মিনিট";
        } else if (diffHours < 24) {
            value = diffHours;
            unit = "ঘন্টা";
        } else {
            value = diffDays;
            unit = "দিন";
        }

        // Convert the calculated number to Bengali numerals
        const bengaliValue = convertToBengaliNumerals(value);

        // Use 'পূর্বে' (pub-be) instead of 'আগে' (age) as requested (পূর্ব্বে is also common)
        // If you prefer 'আগে', use that instead of 'পূর্বে'.
        return `${bengaliValue} ${unit} আগে`;
    }; 

    // The styling and positioning from the previous fix are preserved here.
    return (
        <p className="text-base absolute bottom-1 ">{getTimeAgo(createdAt)}</p>
    );
};

// Sidenews component remains the same:
const Sidenews = ({ blog }) => {
    return (
        <a key={blog._id} href={`/product/${blog._id}`}
            className="flex h-auto cursor-pointer lg:mb-1 lg:flex-row">
            {/* The parent div MUST be relative for the absolute positioning to work */}
            <div className="flex items-start p-2 border-b border-gray-200 hover:bg-gray-100 transition cursor-pointer relative">
                <div className="w-20 h-20 bg-gray-200 mr-4 rounded overflow-hidden flex-shrink-0">
                    <img
                        src={blog.img}
                        alt="news"
                        className="w-full h-full object-cover"
                        onError={(e) => (e.target.src = "https://placehold.co/100x100?text=Error")}
                    />
                </div>
                <div className="flex flex-col justify-between">
                    <p className="text-lg font-semibold text-[var(--primary-text-color)] leading-snug">
                        {blog.title.slice(0, 80)}{blog.title.length > 80 ? '...' : ''}
                    </p>
                    <NewsTime createdAt={blog.createdAt} />
                </div>
            </div>
        </a>
    );
};

export default Sidenews;