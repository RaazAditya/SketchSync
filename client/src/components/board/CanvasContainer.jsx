// src/components/board/CanvasContainer.jsx
import React, { useEffect, useRef } from "react";
import { Canvas } from "fabric";
// import { useFetcher } from "react-router-dom"; // This was unused

const CanvasContainer = React.forwardRef(({ setCanvas }, ref) => {
  const containerRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const canvasElementRef = ref; // This is the ref from the parent

  useEffect(() => {
    const container = containerRef.current;
    const canvasEl = canvasElementRef.current;
    if (!container || !canvasEl) return;

    const fabricCanvas = new Canvas(canvasEl, {
      backgroundColor: "#111",
      selection: true,
    });

    fabricCanvasRef.current = fabricCanvas;
    setCanvas(fabricCanvas);

    // Function to fit canvas to parent
    const resizeCanvas = () => {
      const { clientWidth, clientHeight } = container;
      fabricCanvas.setWidth(clientWidth);
      fabricCanvas.setHeight(clientHeight);
      fabricCanvas.renderAll();
    };

    // ResizeObserver (for layout changes)
    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(container);

    // Also listen to window resize (for screen shrink)
    window.addEventListener("resize", resizeCanvas);

    // Initial fit
    resizeCanvas();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", resizeCanvas);
      fabricCanvas.dispose();
    };
  }, [canvasElementRef, setCanvas]);

  return (
    <div
      ref={containerRef}
      // This container defines the bounds for the canvas
      className=" relative h-full w-full overflow-hidden"
    >
      <canvas
        ref={canvasElementRef}
        // No className needed, fabric.js will control the height/width
      />
    </div>
  );
});

export default CanvasContainer;