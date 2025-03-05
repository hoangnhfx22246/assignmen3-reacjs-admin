import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";

export default function Root() {
  return (
    <>
      <Navbar />
      <div className="flex mt-16">
        <Sidebar />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </>
  );
}
