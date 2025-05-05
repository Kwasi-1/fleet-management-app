import React, { useState } from "react";
import ModalLayout from "@/layouts/ModalLayout";
import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
import Button from "@/components/common/Button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import Textarea from "@/components/common/Textarea";

// Mock data
const suppliers = ["PrimeGoods", "Urban Deals"];
const categories = ["Electronic", "Office", "Software"];
const tags = ["Apple", "Electronic", "Wood"];

const mockSupplierDetails = {
  name: "PrimeGoods",
  email: "hello@PrimeGoods.com",
  phone: "+1 098-775-890",
  location: "New York, USA",
  shipping: "3-5 business days",
  expedited: "1-2 business days",
  return: "30-day return policy for unused products",
  refund: "Refund/Exchange",
  warranty: "All our laptops come with a 1-year warranty.",
};

export default function ImportProductModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState<{
    productName: string;
    category: string;
    costPrice: string;
    sellingCost: string;
    stockLevel: string;
    shippingCost: string;
    supplier: string;
    tags: string[];
    description: string;
  }>({
    productName: "",
    category: "",
    costPrice: "",
    sellingCost: "",
    stockLevel: "",
    shippingCost: "",
    supplier: "PrimeGoods",
    tags: [],
    description: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.productName) newErrors.productName = "Product name is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.costPrice || isNaN(Number(formData.costPrice))) newErrors.costPrice = "Valid cost price required";
    if (!formData.sellingCost || isNaN(Number(formData.sellingCost))) newErrors.sellingCost = "Valid selling cost required";
    if (!formData.stockLevel || isNaN(Number(formData.stockLevel))) newErrors.stockLevel = "Valid stock level required";
    if (!formData.shippingCost || isNaN(Number(formData.shippingCost))) newErrors.shippingCost = "Valid shipping cost required";
    if (!formData.supplier) newErrors.supplier = "Supplier is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagChange = (tag: string) => {
    setFormData((prev) => {
      const tags = prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag];
      return { ...prev, tags };
    });
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    if (validateForm()) {
      // Submit logic here
      onClose();
    }
  };

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      title="Import Product"
      description="Effortlessly import products and update your inventory."
    >
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Section: Form */}
        <div className="md:w-2/3 w-full px-2 py-3 space-y-6">
          {/* Supplier Accordion */}
          <Accordion type="single" collapsible defaultValue="supplier-details" className="bg-[#F5F6F7] rounded-lg px-4 border border-[#E5E7EB]">
            <AccordionItem value="supplier-details">
              <AccordionTrigger className="text-gray-600 font-[300]">Supplier Details</AccordionTrigger>
              <AccordionContent className="text-xs text-[#929292]">
                <div className="space-y-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SelectField
                      label="Select Supplier"
                      name="supplier"
                      options={suppliers}
                      value={formData.supplier}
                      onChange={(e) => handleSelectChange("supplier", e.target.value)}
                      error={isSubmitted ? errors.supplier : undefined}
                    />
                    <div className="flex-1">
                      <div>Email: {mockSupplierDetails.email}</div>
                      <div>Phone: {mockSupplierDetails.phone}</div>
                      <div>Location: {mockSupplierDetails.location}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>Shipping: {mockSupplierDetails.shipping}</div>
                    <div>Expedited: {mockSupplierDetails.expedited}</div>
                    <div>Return: {mockSupplierDetails.return}</div>
                    <div>Refund: {mockSupplierDetails.refund}</div>
                  </div>
                  <div className=" mt-2">Warranty: {mockSupplierDetails.warranty}</div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Data Mapping Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Product Name"
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              error={isSubmitted ? errors.productName : undefined}
            />
            <SelectField
              label="Category"
              name="category"
              options={categories}
              value={formData.category}
              onChange={(e) => handleSelectChange("category", e.target.value)}
              error={isSubmitted ? errors.category : undefined}
            />
            <InputField
              label="Cost Price"
              name="costPrice"
              value={formData.costPrice}
              onChange={handleInputChange}
              error={isSubmitted ? errors.costPrice : undefined}
            />
            <InputField
              label="Selling Cost"
              name="sellingCost"
              value={formData.sellingCost}
              onChange={handleInputChange}
              error={isSubmitted ? errors.sellingCost : undefined}
            />
            <InputField
              label="Stock Level"
              name="stockLevel"
              value={formData.stockLevel}
              onChange={handleInputChange}
              error={isSubmitted ? errors.stockLevel : undefined}
            />
            <InputField
              label="Shipping Cost"
              name="shippingCost"
              value={formData.shippingCost}
              onChange={handleInputChange}
              error={isSubmitted ? errors.shippingCost : undefined}
            />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                className={`px-2 py-1 rounded-full border text-xs ${formData.tags.includes(tag) ? "bg-[#619B7D] text-white border-[#619B7D]" : "bg-white text-gray-700 border-gray-300"}`}
                onClick={() => handleTagChange(tag)}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Product Description */}
          <div className="mt-2">
            <Textarea
              name="description"
              label="Product Description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-3 text-sm text-gray-700 mt-1 focus:outline-none focus:ring-2 focus:ring-[#619B7D]"
              rows={4}
              placeholder="Describe the product..."
            />
          </div>
        </div>

        {/* Right Section: Product Detail Preview */}
        <div className="md:w-1/3 w-full bg-gray-50 border-l border-gray-200 p-6 space-y-6 flex flex-col">
          <div>
            <h2 className="font-[500] text-sm">Macbook Pro 14 Inch 512GB M1 Pro</h2>
            <p className="text-xs text-gray-500">SKU: MAC-09485</p>
            <div className="flex gap-2 mt-2">
              <span className="bg-gray-200 text-xs px-2 py-1 rounded">Apple</span>
              <span className="bg-gray-200 text-xs px-2 py-1 rounded">Electronic</span>
            </div>
            <div className="mt-2 text-xs text-gray-700">
              Experience unparalleled performance with the MacBook Pro 14-inch, featuring the powerful M1 Pro chip.
            </div>
            <div className="mt-2 text-xs text-gray-500">Price: $180-$250</div>
            <div className="mt-1 text-xs text-gray-500">Minimum Order: 8 unit</div>
          </div>
        </div>
      </div>
      {/* Footer Buttons */}
      <div className="flex justify-end border-t pt-4 mt-6 gap-4">
        <Button onClick={onClose} outline={true} className="min-w-[10rem]">
          Cancel
        </Button>
        <Button onClick={handleSubmit} className="min-w-[10rem] ml-4">
          Submit
        </Button>
      </div>
    </ModalLayout>
  );
} 