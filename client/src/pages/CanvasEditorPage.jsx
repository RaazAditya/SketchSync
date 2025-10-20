// src/pages/CanvasEditorPage.jsx
import React, { useRef, useState } from "react";
import { Share2 } from "lucide-react"; // Import Share icon here
import CanvasToolbar from "../components/board/CanvasToolbar";
import CanvasContainer from "../components/board/CanvasContainer";

// Import the new modular hooks
import { useCanvasActions } from "../hooks/useCanvasActions";
import { useCanvasPersistence } from "../hooks/useCanvasPersistence";
import { useCanvasUtils } from "../hooks/useCanvasUtils";

const CanvasEditorPage = () => {
  const [canvas, setCanvas] = useState(null);
  const canvasRef = useRef(null);
  const imageInputRef = useRef(null); // Ref for the hidden file input

  // Use the custom hooks
  const {
    addRectangle,
    addCircle,
    addText,
    addImage, // Get the new addImage function
    enableSelectMode,
    enablePencil,
    enableEraser,
  } = useCanvasActions(canvas);
  
  const { saveCanvas, loadCanvas } = useCanvasPersistence(canvas);
  const { shareCanvas } = useCanvasUtils(canvas);

  // This function is passed to the toolbar button
  const triggerImageUpload = () => {
    imageInputRef.current.click();
  };

  // This function handles the file selection
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      addImage(dataUrl); // Call the hook function with the image data
    };
    reader.readAsDataURL(file);

    // Reset the input value to allow uploading the same file again
    e.target.value = null;
  };
  
  // Define the button class here for the Share button
  const buttonClass =
    "flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg border border-gray-700 hover:border-cyan-400 hover:text-cyan-300 transition-all duration-200 shadow-md hover:shadow-cyan-500/30";

  return (
    <div className="relative h-[200vh] w-full text-white flex flex-col">
      {/* This div groups the Share button and the Toolbar.
        It's centered, and items are aligned to the top.
      */}
      <div className="absolute  top-4 left-1/2 -translate-x-1/2 z-10 flex items-center justify-around gap-4">

        {/* Main Toolbar */}
        <CanvasToolbar
          // Pass all the new props
          enableSelectMode={enableSelectMode}
          enablePencil={enablePencil}
          enableEraser={enableEraser}
          addRectangle={addRectangle}
          addCircle={addCircle}
          addText={addText}
          triggerImageUpload={triggerImageUpload}
          saveCanvas={saveCanvas}
          loadCanvas={loadCanvas}
          // No shareCanvas prop
        />
        {/* Share Button (now separate) */}
      </div>
      <div className="absolute top-6 right-3 z-10">
        <button onClick={shareCanvas} className={buttonClass}>
          <Share2 size={15} />
          <span>Share</span>
        </button>
      </div>

      {/* Canvas container fills the entire space */}
      <CanvasContainer ref={canvasRef} setCanvas={setCanvas} />
      
      {/* Hidden file input for image uploads */}
      <input
        type="file"
        ref={imageInputRef}
        onChange={handleImageUpload}
        className="hidden"
        accept="image/*"
      />
    </div>
  );
};

export default CanvasEditorPage;