import React from "react";
import { useState } from "react";
import {
  FiUsers,
  FiShoppingBag,
  FiDollarSign,
  FiTrendingUp,
} from "react-icons/fi";
import { useEffect } from "react";
import { getStats } from "../../api/dashboard";

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

const InfoBoard = () => {
  const [stats, setStats] = useState([]);
  useEffect(() => {
    const fetchStats = async () => {
      const data = await getStats();
      setStats([
        {
          title: "Total Clients",
          value: data?.totalClient,
          icon: FiUsers,
          color: "bg-blue-500",
        },
        {
          title: "Earnings of Month",
          value: `${Number(data?.avgMonthlyRevenue).toLocaleString()} VNĐ`,
          icon: FiDollarSign,
          color: "bg-green-500",
        },
        {
          title: "New Orders",
          value: data?.totalTransactions,
          icon: FiShoppingBag,
          color: "bg-purple-500",
        },
        {
          title: "Total Earnings",
          value: `${Number(data?.totalRevenue).toLocaleString()} VNĐ`,
          icon: FiTrendingUp,
          color: "bg-orange-500",
        },
      ]);
    };
    fetchStats();
  }, []);

  // const stats = [
  //   {
  //     title: "Total Clients",
  //     value: "2,543",
  //     icon: FiUsers,
  //     color: "bg-blue-500",
  //   },
  //   {
  //     title: "Earnings of Month",
  //     value: "$35,723",
  //     icon: FiDollarSign,
  //     color: "bg-green-500",
  //   },
  //   {
  //     title: "New Orders",
  //     value: "156",
  //     icon: FiShoppingBag,
  //     color: "bg-purple-500",
  //   },
  // ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default InfoBoard;
