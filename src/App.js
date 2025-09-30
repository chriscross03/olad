import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const today = new Date().toISOString().split("T")[0];
  const [entries, setEntries] = useState({});
  const [text, setText] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("diary")) || {};
    setEntries(saved);
    if (saved[today]) setText(saved[today]);
  }, [today]);

  const handleSave = (value) => {
    setText(value);
    const updated = { ...entries, [today]: value };
    setEntries(updated);
    localStorage.setItem("diary", JSON.stringify(updated));
  };

  const sortedDates = Object.keys(entries).sort();

  return (
    <div className="app">
      <h1 className="title">One Line a Day</h1>

      <div className="today">
        <label className="date">{today}</label>
        {entries[today] ? (
          <p className="entry">{entries[today]}</p>
        ) : (
          <input
            className="input"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave(text)}
            placeholder="Write one line..."
          />
        )}
        <button
          className="reset"
          onClick={() => {
            localStorage.removeItem("diary");
            window.location.reload();
          }}
        >
          Reset
        </button>
      </div>

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
