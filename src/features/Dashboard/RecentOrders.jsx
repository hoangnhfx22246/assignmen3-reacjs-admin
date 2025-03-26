import React from "react";
import { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { getOrdersHistory } from "../../api/dashboard";
import { Link } from "react-router-dom";

const RecentOrders = () => {
  const [orders, setOrders] = useState([]);
  useState(() => {
    const fetchOrders = async () => {
      const data = await getOrdersHistory();
      setOrders(data);
    };
    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Đã Thanh toán":
        return "bg-green-100 text-green-800";
      case "Chưa thanh toán":
        return "bg-yellow-100 text-yellow-800";
      case "Đã hủy":
        return "bg-blue-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">History</h2>
        <button className="text-gray-500 hover:text-gray-700">
          <FiMoreVertical className="w-5 h-5" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500">
              <th className="pb-3">ID User</th>
              <th className="pb-3">Name</th>
              <th className="pb-3">Phone</th>
              <th className="pb-3">Address</th>
              <th className="pb-3">Total</th>
              <th className="pb-3">Delivery</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Detail</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {orders.map((order) => (
              <tr key={order._id} className="border-t border-gray-100">
                <td className="py-3">{order.user}</td>
                <td className="py-3">{order.name}</td>
                <td className="py-3">{order.phone}</td>
                <td className="py-3">{order.address}</td>
                <td className="py-3">
                  {Number(order.totalAmount).toLocaleString()} VNĐ
                </td>
                <td className="py-3">{order.delivery}</td>
                <td className="py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td>
                  <Link className="py-3">
                    <button className="text-white p-2 rounded-sm bg-green-600">
                      View
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-center">
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          View All Orders
        </button>
      </div>
    </div>
  );
};

export default RecentOrders;
