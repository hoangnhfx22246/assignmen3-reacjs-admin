import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import {
  AiOutlineUser,
  AiOutlineSetting,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FiMessageSquare } from "react-icons/fi";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const menus = [
    { name: "Dashboard", link: "/", icon: MdDashboard },
    { name: "Products", link: "/products", icon: AiOutlineShoppingCart },
    { name: "Profile", link: "/profile", icon: AiOutlineUser },
    { name: "Messages", link: "/messages", icon: FiMessageSquare },
    { name: "Settings", link: "/settings", icon: AiOutlineSetting },
  ];

  return (
    <div
      className={`bg-[#0e0e0e] min-h-screen ${
        isOpen ? "w-72" : "w-16"
      } duration-500 text-gray-100 px-4`}
    >
      <div className="py-3 flex justify-end">
        <HiMenuAlt3
          size={26}
          className="cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      <div className="mt-4 flex flex-col gap-4 relative">
        {menus?.map((menu, i) => (
          <Link
            to={menu?.link}
            key={i}
            className={`group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
          >
            <div>{React.createElement(menu?.icon, { size: "20" })}</div>
            <h2
              style={{
                transitionDelay: `${i + 3}00ms`,
              }}
              className={`whitespace-pre duration-500 ${
                !isOpen && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              {menu?.name}
            </h2>
            <h2
              className={`${
                isOpen && "hidden"
              } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
            >
              {menu?.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
