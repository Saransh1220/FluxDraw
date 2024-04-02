
'use client';
import { useState, useEffect, useRef } from 'react';
import { useGesture } from '@use-gesture/react';
import Navbar from './Navbar';
import Sidebar from '../components/Sidebar';
import CanvasDrag from './CanvasDrag';

const Canvas = () => {
  const [selectedShape, setSelectedShape] = useState(null);
  const [drawing, setDrawing] = useState(false);
  const [lineColor, setLineColor] = useState('#ffffff'); // Initial line color black
  const canvasRef = useRef(null);
  

  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight - 56; // subtracting navbar height
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const startDrawing = ({ xy }) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect(); // Get the size and position of the canvas relative to the viewport
    const x = xy[0] - rect.left; // Adjust x coordinate based on canvas position
    const y = xy[1] - rect.top; // Adjust y coordinate based on canvas position
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = lineColor; // Set line color
    setDrawing(true);
  
  };

  const continueDrawing = ({ xy }) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = xy[0] - rect.left;
    const y = xy[1] - rect.top;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleColorChange = (color) => {
    setLineColor(color);
  };

  const selectShape = (shape) => {
    console.log(`Selected shape: ${shape}`);
    // You can implement shape drawing logic here
  };

  const bind = useGesture({
    onDragStart: ({ xy }) => startDrawing({ xy }),
    onDrag: ({ xy }) => continueDrawing({ xy }),
    onDragEnd: stopDrawing,
  });

  return (
    <div>
      <Navbar onClearCanvas={clearCanvas} onColorChange={handleColorChange} onSelectShape={selectShape} />
      <Sidebar />
      <canvas
        {...bind()}
        ref={canvasRef}
        className="border border-none "
        style={{ touchAction: 'none' }} 
      />
      <CanvasDrag />
    </div>
  );
};

export default Canvas;