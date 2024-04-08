'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useGesture } from '@use-gesture/react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Logo from './Logo';
import Undo from './Undo';

const Canvas = () => {
  const canvasRef = useRef(null);
  const [selectedShape, setSelectedShape] = useState('pointer');
  const [lineColor, setLineColor] = useState('#ffffff'); // Default color
  const [drawing, setDrawing] = useState(false);
  const [tempRectangle, setTempRectangle] = useState(null);
  const [penLines, setPenLines] = useState([]); // Storing lines with their color
  const [rectangles, setRectangles] = useState([]); // Storing rectangles with their color
  const [tempCircle, setTempCircle] = useState(null); // Temporary circle during drawing
  const [circles, setCircles] = useState([]); // Storing circles with their color
  const [undoStack, setUndoStack] = useState([]); // Undo stack
  const [redoStack, setRedoStack] = useState([]); // Redo stack

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
  
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 'z') {
        undo();
      }
    };
  
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  
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
  
    // Capture current state before drawing
    const currentState = {
      penLines,
      rectangles,
      circles,
    };
    setUndoStack((prevUndoStack) => [currentState, ...prevUndoStack]);
  
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

    // Push current state to undo stack after drawing
    const currentState = {
      penLines,
      rectangles,
      circles,
    };
    setUndoStack((prevUndoStack) => [currentState, ...prevUndoStack]);
    setRedoStack([]); // Clear redo stack after new drawing action
  };

  const clearCanvas = () => {
    setRectangles([]);
    setPenLines([]);
    setCircles([]);
    setTempRectangle(null);
    setUndoStack([]); // Clear undo stack after clearing canvas
    setRedoStack([]); // Clear redo stack after clearing canvas
  };

  const handleColorChange = (color) => {
    setLineColor(color);
  };

  const selectShape = (shape) => {
    setSelectedShape(shape);
  };

  const undo = () => {
    if (undoStack.length === 0) return;
  
    const currentState = {
      penLines,
      rectangles,
      circles,
    };
  

    setRedoStack((prevRedoStack) => [currentState, ...prevRedoStack]);
    const prevState = undoStack.shift(); // Change pop to shift
  
    // Restore previous state
    setPenLines(prevState.penLines);
    setRectangles(prevState.rectangles);
    setCircles(prevState.circles);
  };

  const redo = () => {
    if (redoStack.length === 0) return;

    const nextState = redoStack.shift();
    setUndoStack((prevUndoStack) => [nextState, ...prevUndoStack]);

    // Restore next state
    setPenLines(nextState.penLines);
    setRectangles(nextState.rectangles);
    setCircles(nextState.circles);
  };

  const bind = useGesture({
    onDragStart: startDrawing,
    onDrag: continueDrawing,
    onDragEnd: stopDrawing,
  });

  return (
    <div>
      <Logo />
      <Navbar onClearCanvas={clearCanvas} onColorChange={handleColorChange} onSelectShape={selectShape} />
      <Sidebar />
      <canvas
        {...bind()}
        ref={canvasRef}
        className="border border-none"
        style={{ touchAction: 'none' }}
      />
      <Undo onUndo={undo} onRedo={redo} />
    </div>
  );
};

export default Canvas;
