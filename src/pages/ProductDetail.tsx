import { useState, useEffect } from "react";
import ProductHeader from "@/components/order_management/inventory/product/ProductHeader";
import ProductImages from "@/components/order_management/inventory/product/ProductImages";
import ProductDescription from "@/components/order_management/inventory/product/ProductDescription";
import ProductPricing from "@/components/order_management/inventory/product/ProductPricing";
import ProductStock from "@/components/order_management/inventory/product/ProductStock";
import ProductSales from "@/components/order_management/inventory/product/ProductSales";
import ProductOrganization from "@/components/order_management/inventory/product/ProductOrganization";
import { Product, SalesDataPoint } from "@/types/products";
import ProductShipping from "@/components/order_management/inventory/product/ProductShipping";
import BackButton from "@/components/common/BackButton";

// Mock data based on the image
const mockProduct: Product = {
  id: "1",
  sku: "MAC-09485",
  name: "Macbook Pro 14 Inch 512GB M1 Pro",
  description:
    "Experience unparalleled performance with the MacBook Pro 14-inch, featuring the powerful M1 Pro chip. With 512GB of storage, it's perfect for file intensive tasks, creative projects, and seamless multitasking. Enjoy the stunning Retina display, long battery life, and advanced features designed for professionals.",
  images: [
    "https://i5.walmartimages.com/seo/Apple-MacBook-Pro-14-inch-Apple-M1-Pro-chip-with-8-core-CPU-and-14-core-GPU-16GB-RAM-512GB-SSD-Space-Gray-New-Open-Box_0c58794a-1339-43fe-bb2d-998d6400d9a3.b31e77570774d20505e055d600da2dd6.jpeg",
    "https://m.media-amazon.com/images/I/61vFO3R5UNL._AC_SL1500_.jpg",
    "https://www.imagineonline.store/cdn/shop/files/MacBook_Pro_14-in_Space_Gray_PDP_Image_Position-10__GBEN.jpg?v=1692377366&width=823",
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
  shipping: {
    weight: 5,
    weightUnit: "Kilogram (kg)",
    length: 40,
    lengthUnit: "Centimeter (cm)",
    height: 32,
    heightUnit: "Centimeter (cm)",
    shipsInternationally: true,
    isPhysical: true,
  },
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
  const [salesData] = useState<SalesDataPoint[]>(mockSalesData);

  // In a real application, you would fetch the product data
  useEffect(() => {
    // Fetch product data
    // For now, we're using mock data
  }, []);

  const handleShippingUpdate = (updatedShipping: Product["shipping"]) => {
    setProduct((prev) => ({
      ...prev,
      shipping: updatedShipping,
    }));
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-10">
        <BackButton />
        <ProductHeader product={product} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <ProductImages images={product.images} />
            </div>
            <ProductDescription description={product.description} />
            <div className="mb-6">
              <ProductPricing product={product} />
            </div>
            <ProductStock stock={product.stock} />

            <ProductShipping
              product={product}
              onShippingUpdate={handleShippingUpdate}
            />
          </div>

          <div className="lg:col-span-1">
            <div className=" mb-6">
              <ProductSales
                totalSales={product.totalSales}
                salesChange={product.salesChange}
                salesData={salesData}
              />
            </div>

            <ProductOrganization product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
