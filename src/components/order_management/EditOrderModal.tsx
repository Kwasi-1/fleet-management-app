import Button from "../common/Button";
import DialogWrapper from "../common/DialogWrapper";
import { useState } from "react";
import InputField from "../common/InputField";

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
    <DialogWrapper
      title="Edit Order"
      open={open}
      onClose={onClose}
      className="max-w-2xl w-full relative"
    >
      {showAddItemModal && (
        <DialogWrapper
          title="Add New Item"
          open={showAddItemModal}
          onClose={() => setShowAddItemModal(false)}
        >
          <div className="space-y-4 mt-2 text-sm">
            <InputField
              label="Item name"
              name="name"
              placeholder="e.g. Fire Extinguisher"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
            <InputField
              label="Unit"
              name="unit"
              placeholder="e.g. piece, kg"
              value={newItem.unit}
              onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
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

            <div className="flex justify-end gap-3 pt-2">
              <Button onClick={() => setShowAddItemModal(false)}>Cancel</Button>
              <Button
                onClick={() => {
                  setItems([...items, newItem]);
                  setShowAddItemModal(false);
                  setNewItem({
                    name: "",
                    quantity: 1,
                    unitPrice: 0,
                    total: 0,
                    image: "",
                    unit: "",
                  });
                }}
              >
                Add Item
              </Button>
            </div>
          </div>
        </DialogWrapper>
      )}

      {/* Action Bar */}
      <div className="flex justify-between items-center pb-4 h-fit">
        <input
          type="text"
          placeholder="Search anything..."
          className="border border-gray-300 rounded px-3 py-2 w-1/2 text-sm"
        />
        <Button
          className="px-4 py-2 text-sm"
          onClick={() => setShowAddItemModal(true)}
        >
          Add items
        </Button>
      </div>

      {/* Item List */}
      <div className="grid gap-4 h-full flex-1 overflow-y-auto scrollbar-hide">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-4 pb-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-10 h-10 object-cover rounded"
              />
              <div>
                <p className="font-semibold text-sm">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.unit}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-400">
              <button
                onClick={() => updateQuantity(index, -1)}
                className="px-2 py-1 hover:text-gray-700 text-lg"
              >
                −
              </button>
              <span className="w-6 text-center text-sm text-gray-800">
                {item.quantity}
              </span>
              <button
                onClick={() => updateQuantity(index, 1)}
                className="px-2 py-1 rounded text-lg hover:text-gray-700"
              >
                +
              </button>

              <span className="text-sm text-gray-600 whitespace-nowrap">
                × GHS {item.unitPrice.toFixed(2)} ={" "}
                <strong>GHS {item.total.toFixed(2)}</strong>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className=" absolute bottom-4 right-4 pt-4 flex justify-end gap-3 h-fit">
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save and close</Button>
      </div>
    </DialogWrapper>
  );
}
