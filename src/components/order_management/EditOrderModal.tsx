import Button from "../common/Button";
import { useState } from "react";
import InputField from "../common/InputField";
import ModalLayout from "../../layouts/ModalLayout";

interface OrderItem {
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
  image: string;
  unit: string;
}

interface EditOrderModalProps {
  open: boolean;
  onClose: () => void;
  orderItems: OrderItem[];
  onSave: (items: OrderItem[]) => void;
}

export default function EditOrderModal({
  open,
  onClose,
  orderItems,
  onSave,
}: EditOrderModalProps) {
  const [items, setItems] = useState(orderItems);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [newItem, setNewItem] = useState<OrderItem>({
    name: "",
    quantity: 1,
    unitPrice: 0,
    total: 0,
    image: "",
    unit: "",
  });

  const updateQuantity = (index: number, delta: number) => {
    setItems((prev) => {
      const updated = [...prev];
      const newQty = Math.max(0, updated[index].quantity + delta);
      updated[index].quantity = newQty;
      updated[index].total = updated[index].unitPrice * newQty;
      return updated;
    });
  };

  const handleSave = () => {
    onSave(items);
    onClose();
  };

  return (
    <ModalLayout
      title="Edit Order"
      isOpen={open}
      onClose={onClose}
      // className="max-w-2xl w-full relative"
    >
      {showAddItemModal && (
        <ModalLayout
          title="Add New Item"
          isOpen={showAddItemModal}
          onClose={() => setShowAddItemModal(false)}
          className="w-full relative"
        >
          <div className="space-y-4 mt-2 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Item name"
                name="name"
                placeholder="e.g. Fire Extinguisher"
                value={newItem.name}
                onChange={(e) =>
                  setNewItem({ ...newItem, name: e.target.value })
                }
              />
              <InputField
                label="Unit"
                name="unit"
                placeholder="e.g. piece, kg"
                value={newItem.unit}
                onChange={(e) =>
                  setNewItem({ ...newItem, unit: e.target.value })
                }
              />
              <InputField
                label="Unit price (GHS)"
                name="unitPrice"
                type="number"
                placeholder="e.g. 45.00"
                value={newItem.unitPrice}
                onChange={(e) => {
                  const price = parseFloat(e.target.value) || 0;
                  setNewItem((prev) => ({
                    ...prev,
                    unitPrice: price,
                    total: price * prev.quantity,
                  }));
                }}
              />
              <InputField
                label="Quantity"
                name="quantity"
                type="number"
                placeholder="e.g. 3"
                value={newItem.quantity}
                onChange={(e) => {
                  const qty = parseInt(e.target.value) || 1;
                  setNewItem((prev) => ({
                    ...prev,
                    quantity: qty,
                    total: qty * prev.unitPrice,
                  }));
                }}
              />
              <InputField
                label="Image URL"
                name="image"
                placeholder="https://example.com/image.jpg"
                value={newItem.image}
                onChange={(e) =>
                  setNewItem({ ...newItem, image: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button outline={true} onClick={() => setShowAddItemModal(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setItems([...items, newItem]);
                  setShowAddItemModal(false);
                  setNewItem({
                    name: "",
                    quantity: 1,
                    unitPrice: 0,
                    total: 0,
                    image:
                      "https://furntech.org.za/wp-content/uploads/2017/05/placeholder-image.png",
                    unit: "",
                  });
                }}
              >
                Add Item
              </Button>
            </div>
          </div>
        </ModalLayout>
      )}

      {/* Action Bar */}
      <div className="flex justify-between items-center pb-10 h-fit">
        <input
          type="text"
          placeholder="Search anything..."
          className="p-2 border border-[#e5e7eb] appearance-none outline-none rounded-lg focus:outline-none focus:ring-2 focus:ring-[#619B7D] text-sm text-gray-600 w-1/2 bg-inherit"
        />
        <Button
          className="px-4 py-2 text-sm"
          onClick={() => setShowAddItemModal(true)}
        >
          Add items
        </Button>
      </div>

      {/* Item List */}
      <div className="flex flex-col gap-4 h-[60vh] overflow-y-auto scrollbar-hide">
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

            <div className="flex items-center gap-3 text-gray-400">
              <div className="flex items-center">
                <button
                  onClick={() => updateQuantity(index, -1)}
                  className="px-2 hover:text-gray-700 text-lg cursor-pointer"
                >
                  −
                </button>
                <span className="w-6 text-center text-sm text-gray-800">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(index, 1)}
                  className="px-2 rounded text-lg hover:text-gray-700 cursor-pointer"
                >
                  +
                </button>
              </div>
              <span className="text-sm text-gray-600 whitespace-nowrap">
                × GHS {item.unitPrice.toFixed(2)} ={" "}
                <span className="font-semibold">
                  GHS {item.total.toFixed(2)}
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      {showAddItemModal ? null : (
        <div className=" absolute bottom-4 right-4 pt-4 flex justify-end gap-3 z-50 h-fit">
          <Button onClick={handleSave} className="px-10">
            Save
          </Button>
        </div>
      )}
    </ModalLayout>
  );
}
