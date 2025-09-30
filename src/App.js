import "./App.css";
import { useState, useEffect } from "react";

function App() {
  // Get today's date as YYYY-MM-DD
  const today = new Date().toISOString().split("T")[0];

  const [entries, setEntries] = useState({});
  const [text, setText] = useState("");

  // Load saved entries from localStorage on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("diary")) || {};
    setEntries(saved);
    if (saved[today]) {
      setText(saved[today]);
    }
  }, [today]);

  // Save entry to localStorage
  const handleSave = (value) => {
    setText(value);
    const updated = { ...entries, [today]: value };
    setEntries(updated);
    localStorage.setItem("diary", JSON.stringify(updated));
  };

  // Sort all dates so entries appear in order
  const sortedDates = Object.keys(entries).sort();

  return (
    <div className="App">
      <header className="App-header">
        <h1>One Line a Day</h1>

        {/* Input for today's entry */}
        <div style={{ marginBottom: "1rem" }}>
          <label>{today}</label>
          {entries[today] ? (
            <p>{entries[today]}</p>
          ) : (
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)} // only update local state
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const updated = { ...entries, [today]: text };
                  setEntries(updated);
                  localStorage.setItem("diary", JSON.stringify(updated));
                }
              }}
              placeholder="Write one line..."
            />
          )}
          {/* Reset button */}
          <button
            style={{ marginTop: "0.5rem", padding: "0.3rem 0.6rem" }}
            onClick={() => {
              localStorage.removeItem("diary");
              window.location.reload(); // refresh to reset state
            }}
          >
            Reset Diary
          </button>
        </div>

        {/* Past entries */}
        <div style={{ textAlign: "left", maxWidth: "400px" }}>
          <h2>Your Entries</h2>
          <ul>
            {sortedDates.map((date) => (
              <li key={date}>
                <span style={{ fontSize: "0.8rem", marginRight: "0.5rem" }}>
                  {date}:
                </span>
                {entries[date]}
              </li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
