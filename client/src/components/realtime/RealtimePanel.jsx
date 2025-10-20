// src/components/realtime/RealtimePanel.jsx
import React, { useState } from "react";
import { X, MessageSquare, Users } from "lucide-react";
import Chat from "./Chat";
import ActiveUsers from "./ActiveUsers";

const RealtimePanel = ({ messages, activeUsers, onSendMessage, onClose }) => {
  const [activeTab, setActiveTab] = useState("chat"); // 'chat' or 'users'

  // Common classes for tabs
  const baseTabClass =
    "flex-1 flex items-center justify-center gap-2 p-3 font-medium cursor-pointer transition-colors";
  const activeTabClass = "bg-gray-800 text-white";
  const inactiveTabClass = "bg-gray-900 text-gray-400 hover:bg-gray-700";

  return (
    <div className="absolute bottom-20 right-5 w-80 h-[500px] bg-black rounded-lg shadow-2xl flex flex-col z-20 overflow-hidden">
      {/* 1. Header with Tabs and Close Button */}
      <div className="flex items-center bg-gray-900 rounded-t-lg">
        {/* Chat Tab */}
        <button
          onClick={() => setActiveTab("chat")}
          className={`${baseTabClass} rounded-tl-lg ${
            activeTab === "chat" ? activeTabClass : inactiveTabClass
          }`}
        >
          <MessageSquare size={16} />
          <span>Chat</span>
        </button>

        {/* Users Tab */}
        <button
          onClick={() => setActiveTab("users")}
          className={`${baseTabClass} ${
            activeTab === "users" ? activeTabClass : inactiveTabClass
          }`}
        >
          <Users size={16} />
          <span>Users ({activeUsers.length})</span>
        </button>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="p-3 text-gray-400 hover:text-white bg-gray-900 rounded-tr-lg"
        >
          <X size={20} />
        </button>
      </div>

      {/* 2. Content Area */}
      <div className="flex-1 overflow-hidden">
        {activeTab === "chat" && (
          <Chat messages={messages} onSendMessage={onSendMessage} />
        )}
        {activeTab === "users" && (
          // We wrap ActiveUsers in a div to provide padding
          <div className="p-4 h-full overflow-y-auto">
            <ActiveUsers users={activeUsers} />
          </div>
        )}
      </div>
    </div>
  );
};

export default RealtimePanel;