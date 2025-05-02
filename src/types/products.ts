export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  price: number;
  compareAtPrice: number;
  costPerItem: number;
  salesPrice: number;
  profit: number;
  grossMargin: number;
  totalSales: number;
  salesChange: number;
  chargeTax: boolean;
  stock: number;
  isActive: boolean;
  productNumber: number;
  totalProducts: number;
  category: string;
  type: string;
  vendor: string | null;
  channel: string;
}

export interface SalesDataPoint {
  date: string;
  amount: number;
}

export interface ProductDetailsProps {
  product: Product;
  salesData: SalesDataPoint[];
}