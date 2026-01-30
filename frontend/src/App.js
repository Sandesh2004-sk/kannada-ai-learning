import { useState } from "react";
import WritingCanvas from "./components/WritingCanvas";

const letters = ["ಅ", "ಆ", "ಇ", "ಈ", "ಉ"];

function App() {
  const [index, setIndex] = useState(0);
  const [result, setResult] = useState("");

  const speakLetter = () => {
    const utterance = new SpeechSynthesisUtterance(letters[index]);
    utterance.lang = "kn-IN";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const nextLetter = () => {
    setIndex((prev) => (prev + 1) % letters.length);
    setResult("");
  };

  const sendToBackend = async (imageBlob) => {
    const formData = new FormData();
    formData.append("file", imageBlob, "drawing.png");

    const response = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setResult(`Image received. Size: ${data.image_size}`);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>Kannada AI Learning Platform</h1>

      <h2>Write this letter:</h2>
      <h1 style={{ fontSize: "64px" }}>{letters[index]}</h1>

      <button onClick={speakLetter}>🔊 Play Sound</button>
      <button onClick={nextLetter} style={{ marginLeft: "10px" }}>
        Next Letter
      </button>

      <br /><br />

      <WritingCanvas onSubmit={sendToBackend} />

      <p><b>{result}</b></p>
    </div>
  );
}

export default App;
