'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useGesture } from '@use-gesture/react';
import Navbar from './Navbar';
import Sidebar from '../components/Sidebar';

const Canvas = () => {
  const [selectedShape, setSelectedShape] = useState('pointer');
  const [lineColor, setLineColor] = useState('#ffffff'); // Default color
  const [drawing, setDrawing] = useState(false);
  const [tempRectangle, setTempRectangle] = useState(null);
  const [penLines, setPenLines] = useState([]); // Storing lines with their color
  const [rectangles, setRectangles] = useState([]); // Storing rectangles with their color
  const [tempCircle, setTempCircle] = useState(null); // Temporary circle during drawing
  const [circles, setCircles] = useState([]); // Storing circles with their color
  
  const canvasRef = useRef(null);

  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight - 56; // Subtracting navbar height
      drawAll();
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  useEffect(() => {
    drawAll();
  }, [penLines, rectangles, tempRectangle, tempCircle, circles]); // Redraw when state changes
  
  const drawAll = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw all pen lines with their respective colors
    penLines.forEach((line) => {
      ctx.beginPath();
      line.points.forEach((point, index) => {
        if (index === 0) ctx.moveTo(point.x, point.y);
        else ctx.lineTo(point.x, point.y);
      });
      ctx.strokeStyle = line.color;
      ctx.stroke();
    });
    // Draw all rectangles with their respective colors
    rectangles.forEach(rect => {
      ctx.beginPath();
      ctx.strokeStyle = rect.color;
      ctx.strokeRect(rect.x1, rect.y1, rect.x2 - rect.x1, rect.y2 - rect.y1);
    });
    // Draw all circles with their respective colors
    circles.forEach(circle => {
      ctx.beginPath();
      ctx.strokeStyle = circle.color;
      ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
      ctx.stroke();
    });
    // Draw temp rectangle without saving color (it hasn't been finalized)
    if (tempRectangle) {
      ctx.beginPath();
      ctx.strokeStyle = lineColor; // Temp rectangle uses current line color
      ctx.strokeRect(tempRectangle.x1, tempRectangle.y1, tempRectangle.x2 - tempRectangle.x1, tempRectangle.y2 - tempRectangle.y1);
    }
    // Draw temp circle without saving color (it hasn't been finalized)
    if (tempCircle) {
      ctx.beginPath();
      ctx.strokeStyle = lineColor; // Temp circle uses current line color
      ctx.arc(tempCircle.x, tempCircle.y, tempCircle.radius, 0, 2 * Math.PI);
      ctx.stroke();
    }
  };

  const startDrawing = ({ xy }) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = xy[0] - rect.left;
    const y = xy[1] - rect.top;
    setDrawing(true);

    if (selectedShape === 'pen') {
      setPenLines((prevLines) => [...prevLines, { color: lineColor, points: [{ x, y }] }]);
    } else if (selectedShape === 'square') {
      setTempRectangle({ x1: x, y1: y, x2: x, y2: y }); // Start a new temp rectangle
    } else if (selectedShape === 'circle') {
      setTempCircle({ x, y, radius: 0, color: lineColor }); // Start a new temp circle
    }
  };

  const continueDrawing = ({ xy }) => {
    if (!drawing) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = xy[0] - rect.left;
    const y = xy[1] - rect.top;

    if (selectedShape === 'pen') {
      setPenLines((prevLines) => {
        const newLines = [...prevLines];
        newLines[newLines.length - 1].points.push({ x, y });
        return newLines;
      });
    } else if (selectedShape === 'square') {
      setTempRectangle((prevRect) => ({ ...prevRect, x2: x, y2: y }));
    } else if (selectedShape === 'circle') {
      setTempCircle((prevCircle) => {
        const radius = Math.sqrt(Math.pow(x - prevCircle.x, 2) + Math.pow(y - prevCircle.y, 2));
        return { ...prevCircle, radius };
      });
    }
  };

  const stopDrawing = () => {
    if (selectedShape === 'square' && tempRectangle) {
      setRectangles((prevRectangles) => [...prevRectangles, { ...tempRectangle, color: lineColor }]);
      setTempRectangle(null); // Clear the temporary rectangle
    } else if (selectedShape === 'circle' && tempCircle) {
      setCircles((prevCircles) => [...prevCircles, tempCircle]); // Store the finalized circle
      setTempCircle(null); // Clear the temporary circle
    }
    setDrawing(false);
  };

  const clearCanvas = () => {
    setRectangles([]);
    setPenLines([]);
    setCircles([]);
    setTempRectangle(null);
  };

  const handleColorChange = (color) => {
    setLineColor(color);
  };

  const selectShape = (shape) => {
    setSelectedShape(shape);
  };

  const bind = useGesture({
    onDragStart: startDrawing,
    onDrag: continueDrawing,
    onDragEnd: stopDrawing,
  });

  return (
    <div>
      <Navbar onClearCanvas={clearCanvas} onColorChange={handleColorChange} onSelectShape={selectShape} />
      <Sidebar />
      <canvas
        {...bind()}
        ref={canvasRef}
        className="border border-none"
        style={{ touchAction: 'none' }}
      />
    </div>
  );
};

export default Canvas;

