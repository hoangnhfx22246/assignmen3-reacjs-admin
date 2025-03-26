import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { FiSend } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

const socket = io(import.meta.env.VITE_URL_BACKEND); // Kết nối tới server

const MessageInput = ({ chat }) => {
  const { user } = useAuth();
  const roomId = chat?.roomId;

  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      if (message.trim() === "/end") {
        // Kết thúc phiên chat
        socket.emit("endChat", roomId);
        setMessage("");
        return;
      }
      // Gửi tin nhắn lên server
      const data = { roomId, content: message, sender: user._id };
      socket.emit("sendMessage", data);

      setMessage("");
    }
  };

  return (
    <div className="bg-white border-t border-gray-200 p-4">
      <form onSubmit={handleSubmit} className="flex items-end space-x-4">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows="1"
          type="text"
        />
        <button
          type="submit"
          disabled={!message.trim()}
          className={`p-2 rounded-full ${
            message.trim()
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          <FiSend className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
