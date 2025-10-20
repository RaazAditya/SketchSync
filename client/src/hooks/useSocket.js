import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";

// Get the API URL from your environment variables
const SOCKET_URL = import.meta.env.VITE_API_URL;

export const useSocket = () => {
  const { id: boardId } = useParams(); // Get board ID from URL
  const [messages, setMessages] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const socketRef = useRef(null);

  // Get user info from Redux store to identify yourself
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user || !boardId) return;

    // Connect to the socket server
    socketRef.current = io(SOCKET_URL, {
      query: { boardId, username: user.name }, // Send boardId and username
    });
    
    // --- 1. Join the room ---
    socketRef.current.emit("join_room", { boardId, user });

    // --- 2. Listen for chat messages ---
    socketRef.current.on("receive_message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // --- 3. Listen for user list updates ---
    socketRef.current.on("update_user_list", (users) => {
      setActiveUsers(users);
    });

    // --- 4. Cleanup on unmount ---
    return () => {
      socketRef.current.emit("leave_room", { boardId, user });
      socketRef.current.disconnect();
    };
  }, [boardId, user]);

  // Function to send a message
  const sendMessage = (messageText) => {
    if (socketRef.current && messageText.trim()) {
      const message = {
        id: new Date().getTime(), // Simple unique ID
        text: messageText,
        sender: user,
      };
      // Send message to server
      socketRef.current.emit("send_message", { boardId, message });
      // Add your own message to the list immediately
      setMessages((prevMessages) => [...prevMessages, message]);
    }
  };

  return { messages, activeUsers, sendMessage };
};