import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [entries, setEntries] = useState({});

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/entries.json`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => setEntries(data))
      .catch((err) => console.error("Error loading entries:", err));
  }, []);

  const sortedDates = Object.keys(entries).sort();

  return (
    <div className="container">
      <h1 className="title">One Line a Day</h1>
      <p className="description">
        What follows is a simple record of my life, written one day at a time.
        Each date holds a single line, a brief fragment of thought or memory.
        Over time, these lines form a quiet timeline of days gone by. The
        collection is not exhaustive, nor is it perfect—just a small practice in
        noticing. This project was inspired by Rory Flint's{" "}
        <a
          href="https://days.rory.codes/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Day by Day
        </a>
        , Buster Benson’s{" "}
        <a
          href="https://busterbenson.com/life-in-weeks/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Life in Weeks
        </a>
        , and a{" "}
        <a
          href="https://waitbutwhy.com/2014/05/life-weeks.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          blog post
        </a>{" "}
        by Tim Urban.
      </p>

      <div className="past">
        <h2>Your Entries</h2>
        <ul>
          {sortedDates.map((date) => (
            <li key={date}>
              <span className="list-date">{date}:</span>
              {entries[date]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
