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

  const restart = () => { setCurrent(0); setResults({}); };
  const finished = current >= questions.length;

  return (
    <div style={{ padding: 40, fontFamily: 'Arial' }}>
      <h1>This or That: Work Edition</h1>
      {!finished && (
        <div>
          <p>Choose your preference:</p>
          <button onClick={() => handleVote("left")}>{questions[current].left}</button>
          <button onClick={() => handleVote("right")}>{questions[current].right}</button>
        </div>
      )}
      {finished && (
        <div>
          <h2>Your Results</h2>
          {questions.map((q)=>(
            <div key={q.id}>
              <strong>{q.left} or {q.right}</strong><br />
              You chose: {results[q.id]==="left" ? q.left : q.right}
            </div>
          ))}
          <button onClick={restart}>Play Again</button>
        </div>
      )}
    </div>
  );
}
