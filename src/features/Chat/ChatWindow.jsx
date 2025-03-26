import React from "react";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

import { io } from "socket.io-client";
import { useState } from "react";
import { useEffect } from "react";

const socket = io(import.meta.env.VITE_URL_BACKEND);

const ChatWindow = ({ selectedChat, toggleSidebar, setSelectedChat }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages(selectedChat?.messages || []);
    const roomId = selectedChat?.roomId;
    // Kết nối với server và tham gia room
    socket.emit("joinRoom", roomId);

    // Xóa listener cũ trước khi đăng ký listener mới
    socket.off("receiveMessage");

    // Lắng nghe tin nhắn từ server
    socket.on("receiveMessage", (data) => {
      setMessages((prevState) => [...prevState, data]); // Thêm tin nhắn vào danh sách tin nhắn
    });

    socket.on("chatEnded", () => {
      setMessages([]);
      setSelectedChat(null);
    });
    // Cleanup khi component unmount
    return () => {
      socket.off("receiveMessage"); // Xóa listener để tránh lắng nghe không cần thiết
    };
  }, [setSelectedChat, selectedChat]);

  if (!selectedChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-lg">
          Select a conversation to start chatting
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      <ChatHeader chat={selectedChat} toggleSidebar={toggleSidebar} />
      <MessageList messages={messages} />
      <MessageInput chat={selectedChat} />
    </div>
  );
};

export default ChatWindow;
