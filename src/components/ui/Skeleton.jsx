import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonDemo = () => {
    const isDark = document.documentElement.classList.contains("dark");

    return (
        <SkeletonTheme
            baseColor={isDark ? "#1f2937" : "#ebebeb"}
            highlightColor={isDark ? "#374151" : "#f5f5f5"}
        >
            <div>
                <Skeleton height={170} />
                <Skeleton height={20} className="mt-3" />
                <Skeleton height={20} width="70%" />
                <Skeleton height={30} width="40%" className="mt-3" />
            </div>
        </SkeletonTheme>
    );
};

export default SkeletonDemo;