import orderItems from "../../../db/orderItems";

function OrderItems() {
  const items = orderItems;

  return (
    <div className="flex flex-col gap-4 h-[60vh] overflow-y-auto scrollbar-hide mt-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-2 items-center justify-between gap-4 pb-4 text-gray-600"
        >
          <div className="flex items-center gap-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-10 h-10 object-cover rounded"
            />
            <div>
              <p className="font-semibold text-xs">{item.name}</p>
              <p className="text-xs text-muted-foreground">{item.unit}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-gray-400 text-right justify-end">
            <div className="flex items-center">
              {/* <button
                onClick={() => updateQuantity(index, -1)}
                className="px-2 hover:text-gray-700 text-lg cursor-pointer"
              >
                −
              </button> */}
              <span className="w-6 text-center text-sm text-gray-800">
                {item.quantity}
              </span>
              {/* <button
                onClick={() => updateQuantity(index, 1)}
                className="px-2 rounded text-lg hover:text-gray-700 cursor-pointer"
              >
                +
              </button> */}
            </div>
            <span className="text-sm text-gray-600 whitespace-nowrap">
              × GHS {item.unitPrice.toFixed(2)} ={" "}
              <span className="font-semibold">GHS {item.total.toFixed(2)}</span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
export default OrderItems;
