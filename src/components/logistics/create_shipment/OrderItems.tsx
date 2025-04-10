import orderItems from "../../../db/orderItems";

function OrderItems() {
  const items = orderItems;

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
    </div>
  );
}
export default OrderItems;
