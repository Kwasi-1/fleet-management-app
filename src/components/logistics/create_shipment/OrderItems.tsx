import orderItems from "../../../db/orderItems";

function OrderItems() {
  const items = orderItems;

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const shipping = 35;
  const tax = (subtotal + shipping) * 0.05;
  const total = subtotal + shipping + tax;

  return (
    <div className="text-gray-600">
      <h2 className="text-lg font-semibold ">Order Items</h2>
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
      {/* Totals */}
      <div className="pt-6 px-8 mt space-y-3 text-[13px] pl-5">
        <div className="flex justify-between">
          <p className="text-muted-foreground">Subtotal</p>
          <p className="font-medium text-gray-600">GHS {subtotal.toFixed(2)}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-muted-foreground">Shipping</p>
          <p className="font-medium text-gray-600">GHS {shipping.toFixed(2)}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-muted-foreground">Tax (5%)</p>
          <p className="font-medium text-gray-600">GHS {tax.toFixed(2)}</p>
        </div>
        <div className="flex justify-between text-base font-semibold border-t border-gray-200 text-gray-600 pt-3">
          <p>Total</p>
          <p>GHS {total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
export default OrderItems;
