import { useState } from "react";
import ChatSidebar from "../features/Chat/ChatSidebar";
import ChatWindow from "../features/Chat/ChatWindow";

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div
      className="flex absolute top-0 left-0 right-0 bg-gray-100"
      style={{ height: "calc(100vh - 4rem)" }}
    >
      <ChatSidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
      />
      <ChatWindow
        selectedChat={selectedChat}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        setSelectedChat={setSelectedChat}
      />
    </div>
  );
};

export default ChatPage;
