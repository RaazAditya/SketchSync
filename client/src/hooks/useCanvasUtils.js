// src/hooks/useCanvasUtils.js
export const useCanvasUtils = (canvas) => {
  const shareCanvas = () => {
    if (!canvas) return;
    const dataURL = canvas.toDataURL({
      format: "png",
      multiplier: 2,
    });
    
    // Open the image in a new tab
    const newWindow = window.open();
    newWindow.document.write(`<img src="${dataURL}" alt="Shared Canvas"/>`);
  };

  return { shareCanvas };
};