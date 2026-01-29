import { useState } from "react";
import WritingCanvas from "./components/WritingCanvas";

const letters = [
  { char: "ಅ", sound: "ಅ" },
  { char: "ಆ", sound: "ಆ" },
  { char: "ಇ", sound: "ಇ" },
  { char: "ಈ", sound: "ಈ" },
  { char: "ಉ", sound: "ಉ" },
];

function App() {
  const [index, setIndex] = useState(0);

  const speakLetter = () => {
    const utterance = new SpeechSynthesisUtterance(letters[index].sound);
    utterance.lang = "kn-IN";
    window.speechSynthesis.cancel(); // stop previous
    window.speechSynthesis.speak(utterance);
  };

  const nextLetter = () => {
    setIndex((prev) => (prev + 1) % letters.length);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>Kannada AI Learning Platform</h1>

      <h2>Write this letter:</h2>
      <h1 style={{ fontSize: "64px" }}>{letters[index].char}</h1>

      <button onClick={speakLetter}>🔊 Play Sound</button>
      <button onClick={nextLetter} style={{ marginLeft: "10px" }}>
        Next Letter
      </button>

      <br /><br />

      <WritingCanvas />
    </div>
  );
}

export default App;
