// src/components/Headline.jsx

const Headline = ({ name }) => {
  return (
    <div>
      <div className="flex items-center">
        <a
          href={`/category/${encodeURIComponent(name)}`}
          className="text-2xl font-bold hover:text-[var(--primary-color)] duration-200 transition"
        >
          📰 {name}
        </a>
      </div>
      <hr className="mt-2 text-gray-300" />
    </div>
  );
};

export default Headline;
