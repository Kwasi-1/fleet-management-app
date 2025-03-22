import React from "react";
import StatusText from "./StatusText";

const OrderAmount = () => {
  const data = [
    { orderId: "12345", amount: "₵1,200", status: "successful" },
    { orderId: "67890", amount: "₵1,200", status: "returned" },
    { orderId: "11223", amount: "₵1,200", status: "successful" },
    { orderId: "44556", amount: "₵1,200", status: "returned" },
    { orderId: "77889", amount: "₵1,200", status: "successful" },
  ];

  // Calculate success and issue percentages
  const successCount = data.filter((order) =>
    ["successful", "completed", "paid", "approved"].includes(
      order.status.toLowerCase()
    )
  ).length;
  const issueCount = data.length - successCount;

  const successPercentage = (successCount / data.length) * 100;
  const issuePercentage = 100 - successPercentage;

  return (
    <div className="bg-[#e0e6e930] p-6 rounded-xl border border-[#e0e6e930]">
      {/* Title */}
      <h2 className="text-xl font-bold mb-4">Orders</h2>

      {/* Progress Bar */}
      <div className="relative w-full h-4 rounded-full flex gap-1 mb-4 overflow-hidden">
        <div
          className="h-full rounded-full bg-[#619B7D]"
          style={{ width: `${successPercentage}%` }}
        ></div>
        <div
          className="h-full rounded-full bg-[#E80054]"
          style={{ width: `${issuePercentage}%` }}
        ></div>
      </div>

      {/* Legend */}
      <div className="flex items-center space-x-6 mb-4 text-sm text-gray-600">
        <div className="flex items-center">
          <span className="w-3 h-3 bg-[#619B7D] rounded-full inline-block mr-2"></span>
          Successful
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 bg-[#E80054] rounded-full inline-block mr-2"></span>
          Issues
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-gray-500 text-sm border-b border-gray-300">
              <th className="py-2 text-left">Order ID</th>
              <th className="py-2 text-left">Amount</th>
              <th className="py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className="border-b border-[#e5e7eb] last:border-b-0"
              >
                <td className="py-2">{row.orderId}</td>
                <td className="py-2 text-left">{row.amount}</td>
                <td>
                  <StatusText text={row.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderAmount;
