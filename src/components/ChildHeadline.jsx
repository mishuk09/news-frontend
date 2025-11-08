import React from 'react';

const ChildHeadline = ({name}) => {
    return (
        <div className="w-full text-sm text-white text-center  bg-[var(--primary-color)] hover:bg-red-600  py-1 rounded ">
        <a
          href={`/category/${encodeURIComponent(name)}`}
          className="font-medium   duration-200 transition"
        >
        {name}
        </a>
      </div>
    );
};

export default ChildHeadline;