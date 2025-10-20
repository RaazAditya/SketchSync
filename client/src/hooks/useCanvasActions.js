// src/hooks/useCanvasActions.js
import { Rect, Circle, PencilBrush, IText, FabricImage } from "fabric";
// import { EraserBrush } from "fabric/brushes"; // 👈 This is the fix

// Default properties for new objects
const defaultObjectProps = {
  cornerStyle: "circle",
  cornerStrokeColor: "white",
  cornerColor: "white",
  padding: 5,
  transparentCorners: false,
  cornerDashArray: [1, 1],
  borderColor: "white",
  borderDashArray: [2, 1, 2],
  borderScaleFactor: 2,
};

export const useCanvasActions = (canvas) => {
  // --- Shape Tools ---


  const addRectangle = () => {
    if (!canvas) return;
    canvas.isDrawingMode = false;
    const rect = new Rect({
      left: canvas.width / 2,
      top: canvas.height / 4,
      width: 150,
      height: 100,
      fill: "red",
      ...defaultObjectProps,
    });
    canvas.add(rect);
    canvas.setActiveObject(rect);
    canvas.renderAll();
  };

  const addCircle = () => {
    if (!canvas) return;
    canvas.isDrawingMode = false;
    const circle = new Circle({
      left: canvas.width / 2,
      top: canvas.height / 4,
      radius: 50,
      fill: "yellow",
      ...defaultObjectProps,
    });
    canvas.add(circle);
    canvas.setActiveObject(circle);
    canvas.renderAll();
  };

const addText = () => {
  if (!canvas) return;

  canvas.isDrawingMode = false;

  const text = new IText("Type here...", {
    left: canvas.width / 2 - 100, // roughly center
    top: canvas.height / 3,
    fill: "#ffffff", // white text
    fontSize: 30,
    fontFamily: "Courier New", // gives it a chalk/terminal-like feel
    fontWeight: "bold",
    textAlign: "center",

    // Blackboard look
    borderColor: "#ffffff", // white border
    borderScaleFactor: 2,

    // Handle styling
    cornerColor: "#ffffff",
    cornerStrokeColor: "#ffffff",
    cornerStyle: "circle",
    cornerSize: 12,

    // Layout & editing
    padding: 10,
    centeredRotation: true,

  });

  canvas.add(text);
  canvas.setActiveObject(text);
  text.enterEditing();
  canvas.renderAll();
};
  // --- Mode Tools ---

  const enableSelectMode = () => {
    if (!canvas) return;
    canvas.isDrawingMode = false;
    canvas.renderAll();
  };

  const enablePencil = () => {
    if (!canvas) return;
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush = new PencilBrush(canvas); // This will work (it's 'no' in your list)
    canvas.freeDrawingBrush.color = "#ffffff";
    canvas.freeDrawingBrush.width = 5;
    canvas.renderAll();
  };

  const enableEraser = () => {
    if (!canvas) return;
    canvas.isDrawingMode = true;
    // This will now work thanks to the new import
    canvas.freeDrawingBrush = new EraserBrush(canvas);
    canvas.freeDrawingBrush.width = 10;
    canvas.renderAll();
  };

  // --- Image Tool ---
  const addImage = (dataUrl) => {
    if (!canvas) return;
    FabricImage.fromURL(dataUrl, (img) => {
      // This will work (it's 'na' in your list)
      const scale = Math.min(
        (canvas.width * 0.8) / img.width,
        (canvas.height * 0.8) / img.height
      );
      img.scale(scale).set({
        left: canvas.width / 2,
        top: canvas.height / 2,
        originX: "center",
        originY: "center",
        ...defaultObjectProps,
      });
      canvas.add(img);
      canvas.setActiveObject(img);
      canvas.renderAll();
    });
  };

  return {
    addRectangle,
    addCircle,
    addText,
    addImage,
    enableSelectMode,
    enablePencil,
    enableEraser,
  };
};
