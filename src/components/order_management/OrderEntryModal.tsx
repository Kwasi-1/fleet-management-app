import React, { useState, ChangeEvent } from "react";
import ModalLayout from "../../layouts/ModalLayout";
import InputField from "../common/InputField";
import SelectField from "../common/SelectField";

// Types
interface OrderItem {
  id: string;
  name: string;
  unit: string;
  unitPrice: number;
  quantity: number;
  total: number;
  image?: string;
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

interface PaymentDetails {
  id: string;
  date: string;
  amount: number;
  currency: string;
}

interface OrderEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (orderData: {
    orderNumber: string;
    scheduleDate: string;
    status: string;
    customerInfo: CustomerInfo;
    paymentDetails: PaymentDetails;
    items: OrderItem[];
  }) => void;
  initialOrderData?: {
    orderNumber?: string;
    scheduleDate?: string;
    status?: string;
    customerInfo?: CustomerInfo;
    paymentDetails?: PaymentDetails;
    items?: OrderItem[];
  };
}

interface OrderForm {
  orderNumber: string;
  scheduleDate: string;
  status: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress1: string;
  shippingAddress2: string;
  billingAddress: string;
  paymentId: string;
  paymentDate: string;
  paymentAmount: string;
  paymentCurrency: string;
  items: {
    name: string;
    unit: string;
    unitPrice: string;
    quantity: string;
  }[];
}

const OrderEntryModal: React.FC<OrderEntryModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialOrderData,
}) => {
  const [step, setStep] = useState(0);
  const [orderForm, setOrderForm] = useState<OrderForm>({
    orderNumber: initialOrderData?.orderNumber || "",
    scheduleDate: initialOrderData?.scheduleDate || "",
    status: initialOrderData?.status || "Processing",
    customerEmail: initialOrderData?.customerInfo?.email || "",
    customerPhone: initialOrderData?.customerInfo?.phone || "",
    shippingAddress1: initialOrderData?.customerInfo?.shipping.address1 || "",
    shippingAddress2: initialOrderData?.customerInfo?.shipping.address2 || "",
    billingAddress: initialOrderData?.customerInfo?.billing || "N/A",
    paymentId: initialOrderData?.paymentDetails?.id || "",
    paymentDate: initialOrderData?.paymentDetails?.date || "",
    paymentAmount: initialOrderData?.paymentDetails?.amount?.toString() || "",
    paymentCurrency: initialOrderData?.paymentDetails?.currency || "GHS",
    items: initialOrderData?.items?.map((item) => ({
      name: item.name,
      unit: item.unit,
      unitPrice: item.unitPrice.toString(),
      quantity: item.quantity.toString(),
    })) || [{ name: "", unit: "", unitPrice: "", quantity: "" }],
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setOrderForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddItem = () => {
    setOrderForm((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        { name: "", unit: "", unitPrice: "", quantity: "" },
      ],
    }));
  };

  const handleItemChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const updatedItems = orderForm.items.map((item, i) =>
      i === index ? { ...item, [name]: value } : item
    );
    setOrderForm((prev) => ({ ...prev, items: updatedItems }));
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = orderForm.items.filter((_, i) => i !== index);
    setOrderForm((prev) => ({ ...prev, items: updatedItems }));
  };

  const goToNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const goToPreviousStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    const customerInfo: CustomerInfo = {
      email: orderForm.customerEmail,
      phone: orderForm.customerPhone,
      location: orderForm.shippingAddress1, // Basic location, can be expanded
      shipping: {
        address1: orderForm.shippingAddress1,
        address2: orderForm.shippingAddress2,
      },
      billing: orderForm.billingAddress,
    };

    const paymentDetails: PaymentDetails = {
      id: orderForm.paymentId,
      date: orderForm.paymentDate,
      amount: parseFloat(orderForm.paymentAmount),
      currency: orderForm.paymentCurrency,
    };

    const items: OrderItem[] = orderForm.items.map((item, index) => ({
      id: `item-${index}-${Date.now()}`, // Basic ID generation
      name: item.name,
      unit: item.unit,
      unitPrice: parseFloat(item.unitPrice),
      quantity: parseInt(item.quantity, 10),
      total: parseFloat(item.unitPrice) * parseInt(item.quantity, 10), // Basic total calculation
    }));

    onSubmit({
      orderNumber: orderForm.orderNumber,
      scheduleDate: orderForm.scheduleDate,
      status: orderForm.status,
      customerInfo,
      paymentDetails,
      items,
    });
    onClose();
  };

  const steps = [
    {
      title: "Order Details",
      content: (
        <div className="space-y-4">
          <InputField
            label="Order Number"
            name="orderNumber"
            placeholder="e.g., #ORD-123"
            value={orderForm.orderNumber}
            onChange={handleInputChange}
          />
          <InputField
            label="Schedule Date"
            name="scheduleDate"
            type="datetime-local"
            value={orderForm.scheduleDate}
            onChange={handleInputChange}
          />
          <SelectField
            label="Status"
            name="status"
            value={orderForm.status}
            onChange={handleInputChange}
            options={[
              "Processing",
              "Pending",
              "Shipped",
              "Delivered",
              "Cancelled",
            ]}
          />
        </div>
      ),
    },
    {
      title: "Customer Information",
      content: (
        <div className="space-y-4">
          <InputField
            label="Customer Email"
            name="customerEmail"
            type="email"
            placeholder="customer@example.com"
            value={orderForm.customerEmail}
            onChange={handleInputChange}
          />
          <InputField
            label="Customer Phone"
            name="customerPhone"
            type="tel"
            placeholder="e.g., 020XXXXXXX"
            value={orderForm.customerPhone}
            onChange={handleInputChange}
          />
          <InputField
            label="Shipping Address 1"
            name="shippingAddress1"
            placeholder="Street address, P.O. box, company name"
            value={orderForm.shippingAddress1}
            onChange={handleInputChange}
          />
          <InputField
            label="Shipping Address 2"
            name="shippingAddress2"
            placeholder="Apartment, suite, unit, building, floor, etc."
            value={orderForm.shippingAddress2}
            onChange={handleInputChange}
          />
          <InputField
            label="Billing Address"
            name="billingAddress"
            placeholder="Same as shipping or enter billing address"
            value={orderForm.billingAddress}
            onChange={handleInputChange}
          />
        </div>
      ),
    },
    {
      title: "Payment Details",
      content: (
        <div className="space-y-4">
          <InputField
            label="Payment ID"
            name="paymentId"
            placeholder="Transaction ID"
            value={orderForm.paymentId}
            onChange={handleInputChange}
          />
          <InputField
            label="Payment Date"
            name="paymentDate"
            type="datetime-local"
            value={orderForm.paymentDate}
            onChange={handleInputChange}
          />
          <InputField
            label="Payment Amount"
            name="paymentAmount"
            type="number"
            placeholder="0.00"
            value={orderForm.paymentAmount}
            onChange={handleInputChange}
          />
          <SelectField
            label="Payment Currency"
            name="paymentCurrency"
            value={orderForm.paymentCurrency}
            onChange={handleInputChange}
            options={["GHS", "USD", "EUR", "GBP"]}
          />
        </div>
      ),
    },
    {
      title: "Order Items",
      content: (
        <div className="space-y-4">
          <h3 className="font-semibold text-lg mb-2">Order Items</h3>
          {orderForm.items.map((item, index) => (
            <div key={index} className="grid grid-cols-4 gap-4 mb-2">
              <InputField
                label={`Item ${index + 1} Name`}
                name="name"
                value={item.name}
                onChange={(e) => handleItemChange(index, e)}
              />
              <InputField
                label={`Item ${index + 1} Unit`}
                name="unit"
                value={item.unit}
                onChange={(e) => handleItemChange(index, e)}
              />
              <InputField
                label={`Item ${index + 1} Price`}
                name="unitPrice"
                type="number"
                value={item.unitPrice}
                onChange={(e) => handleItemChange(index, e)}
              />
              <InputField
                label={`Item ${index + 1} Quantity`}
                name="quantity"
                type="number"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, e)}
              />
              {orderForm.items.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddItem}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Add Item
          </button>
        </div>
      ),
    },
  ];

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      title={initialOrderData ? "Edit Order" : "Enter New Order"}
      description={
        initialOrderData
          ? "Modify the order details"
          : "Provide the details for the new order"
      }
      tabs={[
        "Order Details",
        "Customer Information",
        "Payment Details",
        "Order Items",
      ]}
    >
      <div className="space-y-4">
        <InputField
          label="Order Number"
          name="orderNumber"
          placeholder="e.g., #ORD-123"
          value={orderForm.orderNumber}
          onChange={handleInputChange}
        />
        <InputField
          label="Schedule Date"
          name="scheduleDate"
          type="datetime-local"
          value={orderForm.scheduleDate}
          onChange={handleInputChange}
        />
        <SelectField
          label="Status"
          name="status"
          value={orderForm.status}
          onChange={handleInputChange}
          options={[
            "Processing",
            "Pending",
            "Shipped",
            "Delivered",
            "Cancelled",
          ]}
        />
      </div>
      <div className="space-y-4">
        <InputField
          label="Customer Email"
          name="customerEmail"
          type="email"
          placeholder="customer@example.com"
          value={orderForm.customerEmail}
          onChange={handleInputChange}
        />
        <InputField
          label="Customer Phone"
          name="customerPhone"
          type="tel"
          placeholder="e.g., 020XXXXXXX"
          value={orderForm.customerPhone}
          onChange={handleInputChange}
        />
        <InputField
          label="Shipping Address 1"
          name="shippingAddress1"
          placeholder="Street address, P.O. box, company name"
          value={orderForm.shippingAddress1}
          onChange={handleInputChange}
        />
        <InputField
          label="Shipping Address 2"
          name="shippingAddress2"
          placeholder="Apartment, suite, unit, building, floor, etc."
          value={orderForm.shippingAddress2}
          onChange={handleInputChange}
        />
        <InputField
          label="Billing Address"
          name="billingAddress"
          placeholder="Same as shipping or enter billing address"
          value={orderForm.billingAddress}
          onChange={handleInputChange}
        />
      </div>

      <div className="space-y-4">
        <InputField
          label="Payment ID"
          name="paymentId"
          placeholder="Transaction ID"
          value={orderForm.paymentId}
          onChange={handleInputChange}
        />
        <InputField
          label="Payment Date"
          name="paymentDate"
          type="datetime-local"
          value={orderForm.paymentDate}
          onChange={handleInputChange}
        />
        <InputField
          label="Payment Amount"
          name="paymentAmount"
          type="number"
          placeholder="0.00"
          value={orderForm.paymentAmount}
          onChange={handleInputChange}
        />
        <SelectField
          label="Payment Currency"
          name="paymentCurrency"
          value={orderForm.paymentCurrency}
          onChange={handleInputChange}
          options={["GHS", "USD", "EUR", "GBP"]}
        />
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-lg mb-2">Order Items</h3>
        {orderForm.items.map((item, index) => (
          <div key={index} className="grid grid-cols-4 gap-4 mb-2">
            <InputField
              label={`Item ${index + 1} Name`}
              name="name"
              value={item.name}
              onChange={(e) => handleItemChange(index, e)}
            />
            <InputField
              label={`Item ${index + 1} Unit`}
              name="unit"
              value={item.unit}
              onChange={(e) => handleItemChange(index, e)}
            />
            <InputField
              label={`Item ${index + 1} Price`}
              name="unitPrice"
              type="number"
              value={item.unitPrice}
              onChange={(e) => handleItemChange(index, e)}
            />
            <InputField
              label={`Item ${index + 1} Quantity`}
              name="quantity"
              type="number"
              value={item.quantity}
              onChange={(e) => handleItemChange(index, e)}
            />
            {orderForm.items.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveItem(index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddItem}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Add Item
        </button>
      </div>
      <div className="flex justify-end space-x-2">
        {step > 0 && (
          <button
            onClick={goToPreviousStep}
            className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100"
          >
            Previous
          </button>
        )}
        {step < steps.length - 1 ? (
          <button
            onClick={goToNextStep}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            {initialOrderData ? "Save Changes" : "Submit Order"}
          </button>
        )}
      </div>
    </ModalLayout>
  );
};

export default OrderEntryModal;
