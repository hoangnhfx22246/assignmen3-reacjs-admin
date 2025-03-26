import React from "react";
import { useRef } from "react";
import { useEffect } from "react";

const MessageList = ({ messages }) => {
  const messagesContainerRef = useRef(null);
  // Cuộn xuống cuối danh sách tin nhắn
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  // Cuộn xuống cuối khi danh sách tin nhắn thay đổi
  useEffect(() => {
    scrollToBottom(); // Cuộn xuống cuối khi danh sách tin nhắn thay đổi
  }, [messages]);
  return (
    <div
      className="flex-1 overflow-y-auto p-4 space-y-4"
      ref={messagesContainerRef}
    >
      {messages.map((message) => (
        <div
          key={message._id}
          className={`flex ${
            message.sender.role !== "client" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-[70%] rounded-lg px-4 py-2 ${
              message.sender.role !== "client"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-900"
            }`}
          >
            <p>{message.content}</p>
            <p
              className={`text-xs mt-1 ${
                message.sender.role !== "client"
                  ? "text-blue-100"
                  : "text-gray-500"
              }`}
            >
              {new Date(message.timestamp).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
