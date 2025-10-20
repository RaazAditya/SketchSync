// src/components/board/CanvasToolbar.jsx
import React from "react";
import {
  Square,
  Circle,
  Save,
  Upload,
  Pencil,
  Eraser,
  Type,
  Image,
  MousePointer2, // Icon for "Select" mode
} from "lucide-react";

const CanvasToolbar = ({
  addRectangle,
  addCircle,
  addText,
  triggerImageUpload, // This function will click the hidden file input
  enableSelectMode,
  enablePencil,
  enableEraser,
  saveCanvas,
  loadCanvas,
  // shareCanvas prop removed
}) => {
  const buttonClass =
    "flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg border border-gray-700 hover:border-cyan-400 hover:text-cyan-300 transition-all duration-200 shadow-md hover:shadow-cyan-500/30";

  return (
    <div className="flex flex-wrap w-[100%] gap-4 p-4 bg-neutral-900/95 backdrop-blur-sm border-b border-gray-800 rounded-b-2xl shadow-xl justify-center">
      {/* Mode Tools */}
      <button onClick={enableSelectMode} className={buttonClass} title="Select">
        <MousePointer2 size={15} />
      </button>
      <button onClick={enablePencil} className={buttonClass} title="Pencil">
        <Pencil size={15} />
      </button>
      <button onClick={enableEraser} className={buttonClass} title="Eraser">
        <Eraser size={15} />
      </button>

      {/* Shape/Object Tools */}
      <button onClick={addRectangle} className={buttonClass} title="Rectangle">
        <Square size={15} />
        
      </button>
      <button onClick={addCircle} className={buttonClass} title="Circle">
        <Circle size={15} />
        
      </button>
      <button onClick={addText} className={buttonClass} title="Text">
        <Type size={15} />
        
      </button>
      <button onClick={triggerImageUpload} className={buttonClass} title="Image">
        <Image size={15} />
       
      </button>

      {/* Persistence Tools */}
      <button onClick={saveCanvas} className={buttonClass} title="Save">
        <Save size={15} />
      </button>
      <button onClick={loadCanvas} className={buttonClass} title="Load">
        <Upload size={15} />
  
      </button>

      {/* Share button is removed from here */}
    </div>
  );
};

export default CanvasToolbar;