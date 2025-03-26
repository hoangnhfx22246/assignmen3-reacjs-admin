import React from "react";
import { FiMenu, FiMoreVertical, FiPhone, FiVideo } from "react-icons/fi";

const ChatHeader = ({ chat, toggleSidebar }) => {
  const participantsClient = chat.participants.find((participant) => {
    return participant.userId.role === "client";
  }).userId;
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center px-4 justify-between">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="mr-4 p-2 hover:bg-gray-100 rounded-full"
        >
          <FiMenu className="w-5 h-5 text-gray-500" />
        </button>
        <div className="flex items-center">
          <div className="relative">
            <img
              src="https://ui-avatars.com/api/?name=user"
              alt={participantsClient.name}
              className="w-10 h-10 rounded-full"
            />
            {chat.isActive && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            )}
          </div>
          <div className="ml-3">
            <h3 className="font-semibold text-gray-900">
              {participantsClient.name}
            </h3>
            <p className="text-sm text-gray-500">
              {chat.isActive ? "Online" : "Offline"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
