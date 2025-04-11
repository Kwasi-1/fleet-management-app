import { useState } from "react";
import orderItems from "../../../db/orderItems";

function DeliveryNoteSection() {
  const [items] = useState(orderItems);

  return (
    <div className="text-gray-600">
      <h2 className="text-lg font-semibold mb-4">Delivery Note Item</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-[13px]">
              <th className="text-left py-2 px-4 font-medium">No.</th>
              <th className="text-left py-2 px-4 font-medium">Item Code</th>
              <th className="text-left py-2 px-4 font-medium">Quantity</th>
              <th className="text-left py-2 px-4 font-medium">UOM</th>
              <th className="text-left py-2 px-4 font-medium">Rate (GHS)</th>
              <th className="text-left py-2 px-4 font-medium">Amount (GHS)</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-200 hover:bg-gray-50 text-xs"
              >
                <td className="py-3 px-4">{idx + 1}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-8 h-8 object-cover rounded"
                    />
                    <span>{item.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4">{item.quantity}</td>
                <td className="py-3 px-4">{item.unit}</td>
                <td className="py-3 px-4">GHS {item.unitPrice.toFixed(2)}</td>
                <td className="py-3 px-4">GHS {item.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DeliveryNoteSection;
