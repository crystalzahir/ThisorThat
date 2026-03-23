import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
  { id: 1, left: "Early morning brainstorming", right: "Late-afternoon creative bursts" },
  { id: 2, left: "Inbox zero", right: "Controlled chaos" },
  { id: 3, left: "Video on in meetings", right: "Camera-off comfort" },
  { id: 4, left: "Quick Teams chat", right: "Detailed email" },
  { id: 5, left: "A/B testing", right: "Go-with-your-gut decisions" }
];

export default function App() {
  const [current, setCurrent] = useState(0);
  const [results, setResults] = useState({});

  const handleVote = (side) => {
    const q = questions[current];
    setResults((prev) => ({ ...prev, [q.id]: side }));

    if (current < questions.length - 1) {
      setCurrent(current + 1);
    }
  };

  const restart = () => {
    setCurrent(0);
    setResults({});
  };

  const finished = current >= questions.length;

  // Calculate summary
  const leftChoices = Object.values(results).filter((v) => v === "left").length;
  const rightChoices = Object.values(results).filter((v) => v === "right").length;

  return (
    <div style={{ padding: 30, fontFamily: "sans-serif", maxWidth: 600, margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>This or That: Work Edition</h1>

      <AnimatePresence mode="wait">
        {!finished && (
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35 }}
          >
            <h2 style={{ marginBottom: 20 }}>Choose your preference:</h2>

            <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
              <motion.button
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleVote("left")}
                style={buttonStyle}
              >
                {questions[current].left}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleVote("right")}
                style={buttonStyle}
              >
                {questions[current].right}
              </motion.button>
            </div>
          </motion.div>
        )}

        {finished && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <h2>Your Results</h2>

            <div
              style={{
                background: "#f4f4f4",
                padding: 20,
                borderRadius: 10,
                marginBottom: 20
              }}
            >
              <strong>Summary:</strong>
              <p>You chose LEFT {leftChoices} time(s).</p>
              <p>You chose RIGHT {rightChoices} time(s).</p>

              <p style={{ marginTop: 10, fontStyle: "italic" }}>
                {leftChoices > rightChoices
                  ? "Overall, you lean toward the more decisive or structured options."
                  : leftChoices < rightChoices
                  ? "Overall, you lean toward the more flexible or spontaneous options."
                  : "You're perfectly balanced between both styles!"}
              </p>
            </div>

            <ul style={{ paddingLeft: 0 }}>
              {questions.map((q) => (
                <motion.li
                  key={q.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: q.id * 0.1 }}
                  style={{ listStyle: "none", marginBottom: 12, padding: 10, background: "#fafafa", borderRadius: 8 }}
                >
                  <strong>{q.left}</strong> or <strong>{q.right}</strong>
                  <div style={{ marginTop: 6 }}>
                    ✅ You chose:{" "}
                    <span style={{ color: "#1a73e8", fontWeight: 600 }}>
                      {results[q.id] === "left" ? q.left : q.right}
                    </span>
                  </div>
                </motion.li>
              ))}
            </ul>

            <motion.button
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              onClick={restart}
              style={{ ...buttonStyle, marginTop: 20 }}
            >
              Play Again
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const buttonStyle = {
  padding: "12px 18px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  background: "#1a73e8",
  color: "white",
  fontSize: "1rem",
  fontWeight: 600,
  width: "45%"
};
