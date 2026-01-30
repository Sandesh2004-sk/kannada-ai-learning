import { useRef, useState } from "react";

function WritingCanvas({ onSubmit }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = (e) => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const submitDrawing = () => {
    const canvas = canvasRef.current;
    canvas.toBlob((blob) => {
      onSubmit(blob);
    });
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={400}
        height={300}
        style={{ border: "2px solid black", background: "white" }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />

      <br />

      <button onClick={clearCanvas}>Clear</button>
      <button onClick={submitDrawing} style={{ marginLeft: "10px" }}>
        Submit
      </button>
    </div>
  );
}

export default WritingCanvas;
