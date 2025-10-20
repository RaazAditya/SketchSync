// src/components/board/CanvasContainer.jsx
import React, { useEffect, useRef } from "react";
import { Canvas } from "fabric";

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
      stopContextMenu: true, // Prevents right-click menu on canvas
    });

    fabricCanvasRef.current = fabricCanvas;
    setCanvas(fabricCanvas);

    // --- 1. DEFINE YOUR ZOOM FUNCTION ---
    // We define it as a named function so we can remove it later
    const handleMouseWheel = (opt) => {
      const delta = opt.e.deltaY;
      let zoom = fabricCanvas.getZoom();
      zoom *= 0.999 ** delta;
      if (zoom > 20) zoom = 20;
      if (zoom < 0.01) zoom = 0.01;

      // Use zoomToPoint to zoom towards the mouse cursor
      fabricCanvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
      
      opt.e.preventDefault();
      opt.e.stopPropagation();
    };

    // --- 2. ATTACH THE EVENT LISTENER ---
    fabricCanvas.on("mouse:wheel", handleMouseWheel);

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

    // --- 3. ADD CLEANUP IN THE RETURN FUNCTION ---
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", resizeCanvas);
      
      // Remove the listener to prevent memory leaks
      fabricCanvas.off("mouse:wheel", handleMouseWheel); 

      fabricCanvas.dispose();
    };
  }, [canvasElementRef, setCanvas]);

  return (
    <div
      ref={containerRef}
      // This container defines the bounds for the canvas
      className="relative h-full w-full overflow-hidden"
    >
      <canvas
        ref={canvasElementRef}
        // Disables right-click context menu on the canvas element itself
        onContextMenu={(e) => e.preventDefault()} 
      />
    </div>
  );
});

export default CanvasContainer;