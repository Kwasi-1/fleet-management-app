import orderItems from "../../../db/orderItems";

function OrderItems() {
  const items = orderItems;

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const shipping = 35;
  const tax = (subtotal + shipping) * 0.05;
  const total = subtotal + shipping + tax;

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-600">Order Items</h2>
      <table className="w-full text-sm text-gray-600">
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx} className="align-top">
              <td className="py-3 pr-4 flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-10 h-10 object-cover rounded"
                />
                <div>
                  <p className="font-medium text-xs">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.unit}</p>
                </div>
              </td>
              <td className="py-3 text-gray-500">
                GHS {item.unitPrice}.00 × {item.quantity}
              </td>
              <td className="py-3 text-right font-semibold text-[13px]">
                GHS {item.total}.00
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Totals */}
      <div className="pt-6 mt space-y-3 text-sm pl-3">
        <div className="flex justify-between">
          <p className="text-muted-foreground">Subtotal</p>
          <p className="font-medium text-gray-700">GHS {subtotal.toFixed(2)}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-muted-foreground">Shipping</p>
          <p className="font-medium text-gray-700">GHS {shipping.toFixed(2)}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-muted-foreground">Tax (5%)</p>
          <p className="font-medium text-gray-700">GHS {tax.toFixed(2)}</p>
        </div>
        <div className="flex justify-between text-base font-semibold border-t border-gray-200/30 pt-3">
          <p>Total</p>
          <p>GHS {total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
export default OrderItems;
