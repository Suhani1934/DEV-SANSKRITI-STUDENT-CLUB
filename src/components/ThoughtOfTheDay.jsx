import React, { useEffect, useState } from "react";
import thoughts from "../data/thoughts";
import "./ThoughtOfTheDay.css";

const ThoughtOfTheDay = () => {
  const [thought, setThought] = useState("");
  const [dateString, setDateString] = useState("");

  useEffect(() => {
    const today = new Date();

    // Format date: "Wednesday, July 9, 2025"
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    const formattedDate = today.toLocaleDateString("en-US", options);
    setDateString(formattedDate);

    const dayOfYear =
      Math.floor(
        (today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
      ) % thoughts.length;

    setThought(thoughts[dayOfYear]);
  }, []);

  return (
    <div className="thought-container py-2 px-3">
      <div className="thought-marquee">
        <span>
          📅 <strong>{dateString}</strong> | 🎯 Thought of the Day: {thought}
        </span>
      </div>
    </div>
  );
};

export default ThoughtOfTheDay;
