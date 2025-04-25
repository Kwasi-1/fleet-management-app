/* eslint-disable @typescript-eslint/no-explicit-any */

export const getElementPosition = (element: any) => {
  const rect = element.current?.getBoundingClientRect();
  const parent = element.current?.parentElement?.parentElement?.parentElement;

  const parentRect = parent?.getBoundingClientRect();

  if (!parentRect) return;

  const position = {
    x: rect.left - parentRect.left,
    y: rect.top - parentRect.top,
  };

  return { ...position };
};

export interface StockAnalyticsData {
  name: string;
  item_name: string;
  item_group: number;
  uom: string;
  brand: string;
  [key: string]: number | string;
}

export interface ItemData {
  entity: string;
  entity_name: string;
  total: number;
  stock_uom: string;
  [key: string]: number | string;
}

export interface ReportData {
  result: ItemData[];
  columns: {
    label: string;
    fieldname: string;
    fieldtype: string;
    options?: string;
    width: number;
  }[];
}

export const _industries = [
  "Accounting",
  "Advertising",
  "Aerospace",
  "Agriculture",
  "Airline",
  "Apparel & Accessories",
  "Automotive",
  "Banking",
  "Biotechnology",
  "Broadcasting",
  "Brokerage",
  "Chemical",
  "Computer",
  "Consulting",
  "Consumer Products",
  "Cosmetics",
  "Defense",
  "Department Stores",
  "Education",
  "Electronics",
  "Energy",
  "Engineering",
  "Entertainment & Leisure",
  "Executive Search",
  "Financial Services",
  "Food, Beverage & Tobacco",
  "Grocery",
  "Health Care",
  "Internet Publishing",
  "Investment Banking",
  "Legal",
  "Manufacturing",
  "Motion Picture & Video",
  "Music",
  "Newspaper Publishers",
  "online Auctions",
  "Pension Funds",
  "Pharmaceuticals",
  "Private Equity",
  "Publishing",
  "Real Estate",
  "Retail & Wholesale",
  "Securities & Community Exchanges",
  "Service",
  "Soap & Detergent",
  "Software",
  "Sports",
  "Technology",
  "Telecommunication",
  "Television",
  "Transportation",
  "Venture Capital",
].sort();
