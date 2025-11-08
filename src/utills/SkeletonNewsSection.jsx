import React from "react";

const SkeletonBox = ({ className }) => (
    <div className={`bg-gray-300 animate-pulse rounded ${className}`}></div>
);

export default function SkeletonNewsSection() {
    return (
        <div className="bg-[var(--bg-color)] p-2 flex flex-col h-full">
            
            {/* Category Title skeleton */}
            <SkeletonBox className="h-6 w-40 mb-4" />

            {/* Feature Image */}
            <SkeletonBox className="w-full h-40 mb-4" />

            {/* List Items */}
            <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex space-x-3">
                        <SkeletonBox className="w-24 h-16" />
                        <div className="flex flex-col space-y-2">
                            <SkeletonBox className="h-4 w-48" />
                            <SkeletonBox className="h-4 w-32" />
                        </div>
                    </div>
                ))}
            </div>

            {/* “More News” Button */}
            <SkeletonBox className="h-10 w-full mt-6" />
        </div>
    );
}
