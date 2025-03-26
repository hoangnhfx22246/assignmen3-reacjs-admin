import React, { useState } from "react";
import { useEffect } from "react";
import { FiSearch, FiMoreVertical } from "react-icons/fi";
import { FaUser } from "react-icons/fa";

// // Mock data for conversations
// const conversations = [
//   {
//     id: 1,
//     name: "John Doe",
//     lastMessage: "Hey, how are you?",
//     time: "10:30 AM",
//     unread: 2,
//     avatar: "https://ui-avatars.com/api/?name=John+Doe",
//     online: true,
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     lastMessage: "The project is ready for review",
//     time: "9:15 AM",
//     unread: 0,
//     avatar: "https://ui-avatars.com/api/?name=Jane+Smith",
//     online: false,
//   },
//   // Add more conversations as needed
// ];
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_URL_BACKEND); // Kết nối tới server

const ChatSidebar = ({ isOpen, setIsOpen, selectedChat, setSelectedChat }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    //get rooms list
    socket.emit("getRooms");

    // Lắng nghe danh sách room từ server
    socket.on("updateRooms", (rooms) => {
      setConversations(rooms);
    });

    return () => {
      socket.off("updateRooms");
      socket.off("chatEnded");
    };
  }, []);

  const filteredConversations = conversations.filter((conv) => {
    const participantsClient = conv.participants.find((participant) => {
      return participant.userId.role === "client";
    }).userId;

    return participantsClient.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  return (
    <div
      className={`${
        isOpen ? "w-80" : "w-0"
      } transition-all duration-300 bg-white border-r border-gray-200 flex flex-col overflow-hidden`}
    >
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredConversations.map((conv) => {
          const participantsClient = conv.participants.find(
            (participant) => participant.userId.role === "client"
          ).userId;
          return (
            <div
              key={conv._id}
              className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors duration-200 ${
                selectedChat?._id === conv._id ? "bg-blue-50" : ""
              }`}
              onClick={() => setSelectedChat(conv)}
            >
              <div className="flex items-center">
                <div className="relative">
                  <img
                    src="https://ui-avatars.com/api/?name=user"
                    alt={participantsClient.name}
                    className="w-12 h-12 rounded-full"
                  />
                  {conv.isActive && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-900">
                      {participantsClient.name}
                    </h3>
                    {/* <span className="text-xs text-gray-500">{conv.time}</span> */}
                  </div>
                  <p className="text-sm text-gray-500 truncate">
                    {conv.lastMessage}
                  </p>
                </div>
                {conv.unreadCount > 0 && (
                  <div className="ml-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {conv.unreadCount}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatSidebar;
