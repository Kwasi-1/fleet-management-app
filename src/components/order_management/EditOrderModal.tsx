import Button from "../common/Button";
import DialogWrapper from "../common/DialogWrapper";
import InputField from "../common/InputField";
import { useState } from "react";

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

  const handleQuantityChange = (index: number, value: number) => {
    const updated = [...items];
    const qty = isNaN(value) ? 0 : value;
    updated[index].quantity = qty;
    updated[index].total = updated[index].unitPrice * qty;
    setItems(updated);
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
      className="max-w-3xl w-full"
    >
      <div className="grid gap-4">
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
            <div className="flex items-center gap-2">
              <InputField
                type="number"
                name="quantity"
                value={item.quantity}
                onChange={(e) =>
                  handleQuantityChange(index, parseInt(e.target.value))
                }
              />
              <span className="text-gray-600 text-sm">
                × GHS {item.unitPrice} = GHS {item.total}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="pt-4 flex justify-end gap-3">
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </DialogWrapper>
  );
}
