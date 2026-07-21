import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonDemo = () => {
  const [isDark, setIsDark] = useState(
    document.body.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.body.classList.contains("dark"));
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

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