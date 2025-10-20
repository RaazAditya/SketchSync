// src/hooks/useCanvasPersistence.js
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// Use the same env variable as in your App.jsx
const API_URL = import.meta.env.VITE_API_URL;

export const useCanvasPersistence = (canvas) => {
  const { id: boardId } = useParams(); // Get the board ID from the router

  const saveCanvas = async () => {
    if (!canvas || !boardId) return;
    const json = JSON.stringify(canvas.toJSON());
    try {
      // Use the boardId to save to the correct endpoint
      await axios.post(`${API_URL}/api/canvas/${boardId}`, { canvasData: json });
      alert("Canvas saved!");
    } catch (err) {
      console.error("Failed to save canvas", err);
      alert("Failed to save canvas");
    }
  };

  const loadCanvas = async () => {
    if (!canvas || !boardId) return;
    try {
      // Use the boardId to load the correct canvas
      const res = await axios.get(`${API_URL}/api/canvas/${boardId}`);
      if (res.data?.canvasData) {
        canvas.loadFromJSON(JSON.parse(res.data.canvasData), () =>
          canvas.renderAll()
        );
      }
    } catch (err) {
      // Don't show an alert if it's a new board (e.g., 404)
      console.error("Failed to load canvas", err.message);
    }
  };

  // Automatically load the canvas when the canvas is initialized
  useEffect(() => {
    if (canvas && boardId) {
      loadCanvas();
    }
    // We only want this to run when canvas is initialized.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvas, boardId]);

  return { saveCanvas, loadCanvas };
};