import React, { useEffect, useRef } from "react";

const CircularProgress = ({ value, text, info, animate = true }) => {
  const progress = useRef();

  useEffect(() => {
    if (!progress.current) return;
    progress.current.style.setProperty("--progress", value + "%");
  }, [value]);

  return (
    <div ref={progress} className="progress">
      <div className="progress-inner">
        {text}
        {info && (
          <span className={`progress-info ${animate ? "animate" : ""}`}>
            {info}
          </span>
        )}
      </div>
    </div>
  );
};

export default CircularProgress;
