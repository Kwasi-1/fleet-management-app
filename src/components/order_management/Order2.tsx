import React, { useState, useEffect, ChangeEvent } from "react";
import ModalLayout from "../../layouts/ModalLayout";
import InputField from "../common/InputField";
import SelectField from "../common/SelectField";

interface OrderItem {
  id: string;
  name: string;
  unit: string;
  unitPrice: number;
  quantity: number;
  total: number;
  image: string;
}

interface CustomerInfo {
  email: string;
  phone: string;
  location: string;
  shipping: {
    address1: string;
    address2: string;
  };
  billing: string;
}

interface OrderEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (orderData: {
    orderNumber: string;
    customerInfo: CustomerInfo;
    items: OrderItem[];
    status: string;
    scheduleDate: string;
    paymentDetails: {
      id: string;
      date: string;
      amount: number;
      currency: string;
    };
  }) => void;
  existingOrder?: any;
}

const OrderEntryModal: React.FC<OrderEntryModalProps> = ({
  isOpen,
  onClose,
  onSave,
  existingOrder,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [newItem, setNewItem] = useState<Omit<OrderItem, "id" | "total">>({
    name: "",
    unit: "",
    unitPrice: 0,
    quantity: 1,
    image: "",
  });

  const [formData, setFormData] = useState({
    orderNumber: "",
    status: "Processing",
    scheduleDate: new Date().toLocaleString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    customerInfo: {
      email: "",
      phone: "",
      location: "",
      shipping: {
        address1: "",
        address2: "",
      },
      billing: "",
    },
    paymentDetails: {
      id: "",
      date: new Date().toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      amount: 0,
      currency: "GHS",
    },
  });

  useEffect(() => {
    if (existingOrder) {
      setFormData({
        orderNumber: existingOrder.orderNumber || "",
        status: existingOrder.status || "Processing",
        scheduleDate:
          existingOrder.scheduleDate ||
          new Date().toLocaleString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
        customerInfo: existingOrder.customerInfo || {
          email: "",
          phone: "",
          location: "",
          shipping: {
            address1: "",
            address2: "",
          },
          billing: "",
        },
        paymentDetails: existingOrder.paymentDetails || {
          id: "",
          date: new Date().toLocaleString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
          amount: 0,
          currency: "GHS",
        },
      });
      setItems(existingOrder.items || []);
    } else {
      // Reset form for new order
      setFormData({
        orderNumber: "",
        status: "Processing",
        scheduleDate: new Date().toLocaleString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        customerInfo: {
          email: "",
          phone: "",
          location: "",
          shipping: {
            address1: "",
            address2: "",
          },
          billing: "",
        },
        paymentDetails: {
          id: "",
          date: new Date().toLocaleString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
          amount: 0,
          currency: "GHS",
        },
      });
      setItems([]);
    }
  }, [existingOrder]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCustomerInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      customerInfo: {
        ...prev.customerInfo,
        [name]: value,
      },
    }));
  };

  const handleShippingAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      customerInfo: {
        ...prev.customerInfo,
        shipping: {
          ...prev.customerInfo.shipping,
          [name]: value,
        },
      },
    }));
  };

  const handlePaymentDetailsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      paymentDetails: {
        ...prev.paymentDetails,
        [name]: name === "amount" ? parseFloat(value) || 0 : value,
      },
    }));
  };

  const handleItemChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({
      ...prev,
      [name]:
        name === "unitPrice" || name === "quantity"
          ? parseFloat(value) || 0
          : value,
    }));
  };

  const addItem = () => {
    if (!newItem.name || !newItem.unit || newItem.unitPrice <= 0) return;

    const item: OrderItem = {
      ...newItem,
      id: `item-${Date.now()}`,
      total: newItem.unitPrice * newItem.quantity,
      image: newItem.image || "https://via.placeholder.com/40",
    };

    setItems((prev) => [...prev, item]);
    setNewItem({
      name: "",
      unit: "",
      unitPrice: 0,
      quantity: 1,
      image: "",
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const shipping = 35;
    const tax = (subtotal + shipping) * 0.05;
    return subtotal + shipping + tax;
  };

  const handleSubmit = () => {
    const orderData = {
      ...formData,
      items,
      paymentDetails: {
        ...formData.paymentDetails,
        amount: calculateTotal(),
      },
    };
    onSave(orderData);
    onClose();
  };

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      title={existingOrder ? "Edit Order" : "Create New Order"}
      description={
        existingOrder ? "Update order details" : "Enter new order information"
      }
      tabs={["Order Details", "Items", "Payment"]}
    >
      {/* -------- Order Details Tab -------- */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Order Number"
            name="orderNumber"
            placeholder="e.g. #27"
            value={formData.orderNumber}
            onChange={handleInputChange}
          />

          <SelectField
            label="Status"
            name="status"
            value={formData.status}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, status: e.target.value }))
            }
            options={["Processing", "Completed", "Cancelled"]}
          />
        </div>

        <h3 className="font-semibold text-lg mt-6">Customer Information</h3>

        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="customer@example.com"
            value={formData.customerInfo.email}
            onChange={handleCustomerInfoChange}
          />

          <InputField
            label="Phone"
            name="phone"
            type="tel"
            placeholder="0244884532"
            value={formData.customerInfo.phone}
            onChange={handleCustomerInfoChange}
          />

          <InputField
            label="Location"
            name="location"
            placeholder="Accra, Ghana"
            value={formData.customerInfo.location}
            onChange={handleCustomerInfoChange}
          />
        </div>

        <h3 className="font-semibold text-lg mt-6">Shipping Address</h3>

        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Address Line 1"
            name="address1"
            placeholder="P.O.Box"
            value={formData.customerInfo.shipping.address1}
            onChange={handleShippingAddressChange}
          />

          <InputField
            label="Address Line 2"
            name="address2"
            placeholder="2333 Accra, Accra GH"
            value={formData.customerInfo.shipping.address2}
            onChange={handleShippingAddressChange}
          />
        </div>

        <InputField
          label="Billing Information"
          name="billing"
          placeholder="N/A"
          value={formData.customerInfo.billing}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              customerInfo: {
                ...prev.customerInfo,
                billing: e.target.value,
              },
            }))
          }
        />
      </div>

      {/* -------- Items Tab -------- */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Order Items</h3>

        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-2">
            <InputField
              label="Item Name"
              name="name"
              placeholder="Product name"
              value={newItem.name}
              onChange={handleItemChange}
            />
          </div>
          <InputField
            label="Unit"
            name="unit"
            placeholder="kg, box, etc."
            value={newItem.unit}
            onChange={handleItemChange}
          />
          <InputField
            label="Unit Price"
            name="unitPrice"
            type="number"
            placeholder="0.00"
            value={newItem.unitPrice}
            onChange={handleItemChange}
          />
          <InputField
            label="Qty"
            name="quantity"
            type="number"
            placeholder="1"
            value={newItem.quantity}
            onChange={handleItemChange}
          />
        </div>

        <button
          onClick={addItem}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Add Item
        </button>

        {items.length > 0 && (
          <div className="mt-6">
            <h4 className="font-medium mb-2">Added Items</h4>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left p-2">Item</th>
                    <th className="text-left p-2">Unit</th>
                    <th className="text-left p-2">Price</th>
                    <th className="text-left p-2">Qty</th>
                    <th className="text-left p-2">Total</th>
                    <th className="text-left p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="border-t">
                      <td className="p-2">{item.name}</td>
                      <td className="p-2">{item.unit}</td>
                      <td className="p-2">GHS {item.unitPrice.toFixed(2)}</td>
                      <td className="p-2">{item.quantity}</td>
                      <td className="p-2">GHS {item.total.toFixed(2)}</td>
                      <td className="p-2">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* -------- Payment Tab -------- */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Payment Information</h3>

        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Payment ID"
            name="id"
            placeholder="pay_01J84ZCRTJZVFNMJZ4M469CAW"
            value={formData.paymentDetails.id}
            onChange={handlePaymentDetailsChange}
          />

          <InputField
            label="Payment Date"
            name="date"
            type="datetime-local"
            value={formData.paymentDetails.date}
            onChange={handlePaymentDetailsChange}
          />
        </div>

        <div className="mt-6">
          <h4 className="font-medium mb-2">Order Summary</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>
                GHS{" "}
                {items.reduce((sum, item) => sum + item.total, 0).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>GHS 35.00</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (5%):</span>
              <span>
                GHS{" "}
                {(items.reduce((sum, item) => sum + item.total, 0) + 35) * 0.05}
              </span>
            </div>
            <div className="flex justify-between font-semibold border-t pt-2">
              <span>Total:</span>
              <span>GHS {calculateTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <SelectField
            label="Payment Status"
            name="paymentStatus"
            value={formData.paymentDetails.id ? "Paid" : "Unpaid"}
            onChange={() => {}}
            options={["Paid", "Unpaid"]}
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end space-x-4">
        {activeTab > 0 && (
          <button
            onClick={() => setActiveTab(activeTab - 1)}
            className="px-4 py-2 border rounded-md hover:bg-gray-100"
          >
            Previous
          </button>
        )}
        {activeTab < 2 ? (
          <button
            onClick={() => setActiveTab(activeTab + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            disabled={items.length === 0}
          >
            {existingOrder ? "Update Order" : "Create Order"}
          </button>
        )}
      </div>
    </ModalLayout>
  );
};

export default OrderEntryModal;
