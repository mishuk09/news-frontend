const SubHeadline = ({ name }) => {
  return (
    <div>
      <div className="flex items-center">
        <a
          href={`/category/${encodeURIComponent(name)}`}
          className="text-xl font-bold hover:text-[var(--primary-color)] duration-200 transition"
        >
          📰 {name}
        </a>
      </div>
    </div>
  );
};

export default SubHeadline;
