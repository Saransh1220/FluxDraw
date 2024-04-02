import React, { useRef, useEffect } from "react";
function CanvasDrag() {
  const canvas = useRef();
  let getCtx = null;
  const canBoxes = [
    { x: 190, y: 250, w: 120, h: 70 },
    { x: 110, y: 115, w: 100, h: 70 },
  ];
  let isMoveDown = false;
  let targetCanvas = null;
  let startX = null;
  let startY = null;
  useEffect(() => {
    const canvasDimensions = canvas.current;
    canvasDimensions.width = canvasDimensions.clientWidth;
    canvasDimensions.height = canvasDimensions.clientHeight;
    getCtx = canvasDimensions.getContext("2d");
  }, []);
  useEffect(() => {
    canvasDraw();
  }, []);
  const canvasDraw = () => {
    getCtx.clearRect(
      0,
      0,
      canvas.current.clientWidth,
      canvas.current.clientHeight,
    );
    canBoxes.map((info) => fillCanvas(info));
  };
  const fillCanvas = (info, style = {}) => {
    const { x, y, w, h } = info;
    const { backgroundColor = "#D75755" } = style;
    getCtx.beginPath();
    getCtx.fillStyle = backgroundColor;
    getCtx.fillRect(x, y, w, h);
  };
  const moveableItem = (x, y) => {
    let isCanvasTarget = null;
    for (let i = 0; i < canBoxes.length; i++) {
      const block = canBoxes[i];
      if (
        x >= block.x &&
        x <= block.x + block.w &&
        y >= block.y &&
        y <= block.y + block.h
      ) {
        targetCanvas = block;
        isCanvasTarget = true;
        break;
      }
    }
    return isCanvasTarget;
  };
  const onMouseDown = (e) => {
    startX = parseInt(e.nativeEvent.offsetX - canvas.current.clientLeft);
    startY = parseInt(e.nativeEvent.offsetY - canvas.current.clientTop);
    isMoveDown = moveableItem(startX, startY);
  };
  const onMouseMove = (e) => {
    if (!isMoveDown) return;
    const mouseX = parseInt(e.nativeEvent.offsetX - canvas.current.clientLeft);
    const mouseY = parseInt(e.nativeEvent.offsetY - canvas.current.clientTop);
    const mouseStartX = mouseX - startX;
    const mouseStartY = mouseY - startY;
    startX = mouseX;
    startY = mouseY;
    targetCanvas.x += mouseStartX;
    targetCanvas.y += mouseStartY;
    canvasDraw();
  };
  const onMouseUp = (e) => {
    targetCanvas = null;
    isMoveDown = false;
  };
  const onMouseOut = (e) => {
    onMouseUp(e);
  };
  return (
    <div>
      <canvas
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseOut={onMouseOut}
        ref={canvas}
      ></canvas>
    </div>
  );
}
export default CanvasDrag;