// components/DescriptionText.jsx
import React from "react";

const DescriptionText = ({ description, className = "" }) => {
  return (
    <p
      className={`text-[var(--primary-text-color)] text-lg mt-1 line-clamp-2 leading-tight 
                  [&_*]:font-normal [&_*]:text-inherit [&_*]:not-italic [&_*]:m-0 ${className}`}
      dangerouslySetInnerHTML={{ __html: description }}
    ></p>
  );
};

export default DescriptionText;
