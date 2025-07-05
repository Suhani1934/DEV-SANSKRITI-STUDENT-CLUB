import React, { useEffect, useState } from "react";
import thoughts from "../data/thoughts";
import "./ThoughtOfTheDay.css";

const ThoughtOfTheDay = () => {
  const [thought, setThought] = useState("");

  useEffect(() => {
    const today = new Date();
    const daysSinceEpoch = Math.floor(today.getTime() / (1000 * 60 * 60 * 24));
    const index = daysSinceEpoch % thoughts.length;
    setThought(thoughts[index]);
  }, []);
  
  return (
    <div className="thought-container py-2 px-3">
      <div className="thought-marquee">
        <span>{thought}</span>
      </div>
    </div>
  );
};

export default ThoughtOfTheDay;
