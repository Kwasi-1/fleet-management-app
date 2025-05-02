import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductHeader from "@/components/order_management/inventory/product/ProductHeader";
import ProductImages from "@/components/order_management/inventory/product/ProductImages";
import ProductDescription from "@/components/order_management/inventory/product/ProductDescription";
import ProductPricing from "@/components/order_management/inventory/product/ProductPricing";
import ProductStock from "@/components/order_management/inventory/product/ProductStock";
import ProductSales from "@/components/order_management/inventory/product/ProductSales";
import ProductOrganization from "@/components/order_management/inventory/product/ProductOrganization";
import { Product, SalesDataPoint } from "@/types/products";

// Mock data based on the image
const mockProduct: Product = {
  id: "1",
  sku: "MAC-09485",
  name: "Macbook Pro 14 Inch 512GB M1 Pro",
  description:
    "Experience unparalleled performance with the MacBook Pro 14-inch, featuring the powerful M1 Pro chip. With 512GB of storage, it's perfect for file intensive tasks, creative projects, and seamless multitasking. Enjoy the stunning Retina display, long battery life, and advanced features designed for professionals.",
  images: [
    "/images/macbook-front.jpg",
    "/images/macbook-top.jpg",
    "/images/macbook-side.jpg",
  ],
  createdAt: "2024-01-30T00:00:00Z",
  updatedAt: "2025-05-01T00:00:00Z", // "Yesterday" from the image
  price: 1000.0,
  compareAtPrice: 1000.0,
  costPerItem: 950.0,
  salesPrice: 1200.0,
  profit: 200.0,
  grossMargin: 10,
  totalSales: 840.0,
  salesChange: 1.34,
  chargeTax: false,
  stock: 50, // Assuming a value
  isActive: true,
  productNumber: 12567,
  totalProducts: 32068,
  category: "Laptop",
  type: "Electronic",
  vendor: null,
  channel: "Fikri Store",
};

// Mock sales data for the chart
const mockSalesData: SalesDataPoint[] = [
  { date: "2025-02-01", amount: 400 },
  { date: "2025-02-03", amount: 450 },
  { date: "2025-02-05", amount: 500 },
  { date: "2025-02-07", amount: 550 },
  { date: "2025-02-09", amount: 600 },
  { date: "2025-02-11", amount: 650 },
  { date: "2025-02-13", amount: 750 },
  { date: "2025-02-15", amount: 800 },
  { date: "2025-02-17", amount: 700 },
  { date: "2025-02-19", amount: 650 },
  { date: "2025-02-21", amount: 700 },
  { date: "2025-02-23", amount: 750 },
  { date: "2025-02-25", amount: 800 },
  { date: "2025-02-27", amount: 850 },
  { date: "2025-02-28", amount: 900 },
];

export default function ProductDetail() {
  const [product, setProduct] = useState<Product>(mockProduct);
  const [salesData, setSalesData] = useState<SalesDataPoint[]>(mockSalesData);

  // In a real application, you would fetch the product data
  useEffect(() => {
    // Fetch product data
    // For now, we're using mock data
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-4">
          <button className="p-2 rounded-full hover:bg-gray-200">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex space-x-4">
            <button className="text-gray-600 px-4 py-2 rounded-md hover:bg-gray-200">
              Duplicate
            </button>
            <button className="text-gray-600 px-4 py-2 rounded-md hover:bg-gray-200">
              Share Products
            </button>
          </div>
          <button className="p-2 rounded-full hover:bg-gray-200">
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Product Header */}
        <ProductHeader product={product} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow mb-6">
              {/* Product Images */}
              <ProductImages images={product.images} />
            </div>

            <div className="bg-white rounded-lg shadow mb-6">
              {/* Product Description */}
              <ProductDescription description={product.description} />
            </div>

            <div className="bg-white rounded-lg shadow mb-6">
              {/* Product Pricing */}
              <ProductPricing product={product} />
            </div>

            <div className="bg-white rounded-lg shadow">
              {/* Product Stock */}
              <ProductStock stock={product.stock} />
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow mb-6">
              {/* Product Sales */}
              <ProductSales
                totalSales={product.totalSales}
                salesChange={product.salesChange}
                salesData={salesData}
              />
            </div>

            <div className="bg-white rounded-lg shadow">
              {/* Product Organization */}
              <ProductOrganization product={product} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
