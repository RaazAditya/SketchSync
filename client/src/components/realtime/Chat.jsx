// src/components/realtime/Chat.jsx
import React, { useState, useRef, useEffect } from "react";

// MODIFIED: Removed bg-gray-800, h-[400px], and title
const Chat = ({ messages, onSendMessage }) => {
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSendMessage(text);
    setText("");
  };

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    // This div now fills its parent (RealtimePanel)
    <div className="p-4 flex flex-col h-full">
      {/* Message List */}
      <div className="flex-1 overflow-y-auto mb-3 space-y-3 pr-2">
        {messages.map((msg) => (
          <div key={msg.id} className="text-sm">
            <span className="font-bold text-cyan-300">{msg.sender.name}: </span>
            <span className="text-gray-200">{msg.text}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-cyan-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-cyan-600 rounded text-white font-semibold hover:bg-cyan-500"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;