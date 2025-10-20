// src/pages/CanvasEditorPage.jsx
import React, { useRef, useState } from "react";
// Import icon for the new button
import { Share2, MessageSquare } from "lucide-react"; 
import CanvasToolbar from "../components/board/CanvasToolbar";
import CanvasContainer from "../components/board/CanvasContainer";

// Import the new Panel component
import RealtimePanel from "../components/realtime/RealtimePanel";

// Import hooks (no change here)
import { useCanvasActions } from "../hooks/useCanvasActions";
import { useCanvasPersistence } from "../hooks/useCanvasPersistence";
import { useCanvasUtils } from "../hooks/useCanvasUtils";
import { useSocket } from "../hooks/useSocket";

const CanvasEditorPage = () => {
  const [canvas, setCanvas] = useState(null);
  const canvasRef = useRef(null);
  const imageInputRef = useRef(null);

  // 💫 NEW STATE to manage the pop-up
  const [isRealtimePanelOpen, setIsRealtimePanelOpen] = useState(false);

  // --- Hooks (all the same) ---
  const {
    addRectangle, addCircle, addText, addImage,
    enableSelectMode, enablePencil, enableEraser,
  } = useCanvasActions(canvas);
  const { saveCanvas, loadCanvas } = useCanvasPersistence(canvas);
  const { shareCanvas } = useCanvasUtils(canvas);
  const { messages, activeUsers, sendMessage } = useSocket();

  // --- Helper Functions (all the same) ---
  const triggerImageUpload = () => imageInputRef.current.click();
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => addImage(event.target.result);
    reader.readAsDataURL(file);
    e.target.value = null;
  };

  const buttonClass =
    "flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg border border-gray-700 hover:border-cyan-400 hover:text-cyan-300 transition-all duration-200 shadow-md hover:shadow-cyan-500/30";

  return (
    // MODIFIED: Removed flex-row, back to a simple relative container
    <div className="relative h-full w-full text-white flex flex-col">
      
      {/* Toolbar (Stays centered at top) */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
        <CanvasToolbar
          enableSelectMode={enableSelectMode}
          enablePencil={enablePencil}
          enableEraser={enableEraser}
          addRectangle={addRectangle}
          addCircle={addCircle}
          addText={addText}
          triggerImageUpload={triggerImageUpload}
          saveCanvas={saveCanvas}
          loadCanvas={loadCanvas}
        />
      </div>

      {/* Share Button (Top right) */}
      <div className="absolute top-6 right-3 z-10">
        <button onClick={shareCanvas} className={buttonClass}>
          <Share2 size={15} />
          <span>Share</span>
        </button>
      </div>

      {/* 1. Main Canvas Area (now takes full width) */}
      <div className="flex-1 h-full">
        <CanvasContainer ref={canvasRef} setCanvas={setCanvas} />
      </div>

      {/* 2. 💫 Real-time Panel (Renders conditionally) 💫 */}
      {isRealtimePanelOpen && (
        <RealtimePanel
          messages={messages}
          activeUsers={activeUsers}
          onSendMessage={sendMessage}
          onClose={() => setIsRealtimePanelOpen(false)}
        />
      )}

      {/* 3. 💫 Real-time Toggle Button 💫 */}
      {!isRealtimePanelOpen && (
        <button
          onClick={() => setIsRealtimePanelOpen(true)}
          className={`${buttonClass} absolute bottom-5 right-5 z-20 !rounded-full !p-3`}
          title="Chat and Users"
        >
          <MessageSquare size={24} />
        </button>
      )}

      {/* Hidden file input (no change) */}
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