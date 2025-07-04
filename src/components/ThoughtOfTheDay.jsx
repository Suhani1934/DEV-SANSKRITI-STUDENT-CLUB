import React from "react";
import "./ThoughtOfTheDay.css";

const ThoughtOfTheDay = ({ thought }) => {
  return (
    <div className="thought-container py-2 px-3">
      <div className="thought-marquee">
        <span>{thought}</span>
      </div>
    </div>
  );
};

export default ThoughtOfTheDay;
