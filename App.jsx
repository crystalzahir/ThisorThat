import { useState } from "react";
import { motion } from "framer-motion";

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
    if (current < questions.length - 1) setCurrent(current + 1);
  };

  const restart = () => {
    setCurrent(0);
    setResults({});
  };

  const finished = current >= questions.length;

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>This or That: Work Edition</h1>

      {!finished && (
        <>
          <h2>Choose your preference:</h2>
          <div style={{ display: 'flex', gap: '20px' }}>
            <button onClick={() => handleVote('left')}>{questions[current].left}</button>
            <button onClick={() => handleVote('right')}>{questions[current].right}</button>
          </div>
        </>
      )}

      {finished && (
        <>
          <h2>Your Results</h2>
          <ul>
            {questions.map((q) => (
              <li key={q.id}>
                {q.left} or {q.right} — <strong>You chose: {results[q.id] === 'left' ? q.left : q.right}</strong>
              </li>
            ))}
          </ul>
          <button onClick={restart}>Play Again</button>
        </>
      )}
    </div>
  );
}
