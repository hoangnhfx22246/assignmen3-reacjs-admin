import React from "react";
import InfoBoard from "../features/Dashboard/InfoBoard";
import RecentOrders from "../features/Dashboard/RecentOrders";

const DashboardPage = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
      </div>

      <InfoBoard />
      <RecentOrders />
    </div>
  );
};

export default DashboardPage;
