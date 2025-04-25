import store from '@/store/store';
import { upperCase } from 'lodash';
import { ToWords } from 'to-words';
import saveAs from 'file-saver';
import { Workbook } from 'exceljs';
import * as XLSX from 'xlsx';

export function exportToExcel(data: any, filename: string) {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(blob, `${filename}.xlsx`);
}

export function initials(value = '') {
  const valueArray = value?.split(' ');

  return valueArray.map(([first]) => first?.toUpperCase()).join('');
}
export function getRandomColor(): string {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  const toHex = (value: number) => value.toString(16).padStart(2, '0');
  const hexColor = `#${toHex(r)}${toHex(g)}${toHex(b)}`;

  return hexColor;
}

export const parseToMoney = (value: any) => {
  if (!value) return Number(0).toFixed(2);
  if (isNaN(value)) return null;

  return Number(value).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export function formatNumber(number: number) {
  const suffixes = ['', 'K', 'M', 'B', 'T'];
  let suffixIndex = 0;

  if (number < 9999) {
    return parseToMoney(Number(number)) || 0;
  }

  while (number >= 1000 && suffixIndex < suffixes.length - 1) {
    number /= 1000;
    suffixIndex++;
  }

  return Number(number.toFixed(2)).toLocaleString() + suffixes[suffixIndex];
}

export const NumberToWords = new ToWords({
  localeCode: 'en-US',
  converterOptions: {
    currency: false,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
    doNotAddOnly: false,
    currencyOptions: {
      name: 'Cedi',
      plural: 'Cedis',
      symbol: '₵',
      fractionalUnit: {
        name: 'Pesewa',
        plural: 'Pesewas',
        symbol: 'P',
      },
    },
  },
});

export const blockInvalidChar = (e: React.KeyboardEvent<HTMLInputElement>) =>
  ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();

export function timeDifference(creationDate: Date) {
  const currentDate = new Date();

  // Calculate the difference in milliseconds between the current date and the creation date
  const timeDifferenceMs = currentDate.getTime() - creationDate.getTime();

  // Convert milliseconds to days
  const daysDifference = Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24));

  const result = daysDifference > 0 ? daysDifference : 1;

  return `${result} day (s)`;
}

export function timeDifferenceAgo(creationDate: Date) {
  const currentDate = new Date();

  // Calculate the difference in milliseconds between the current date and the creation date
  const timeDifferenceMs = currentDate.getTime() - creationDate.getTime();

  // Convert milliseconds to days
  const daysDifference = Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24));

  return daysDifference >= 1 ? `${daysDifference} day (s) ago` : 'today';
}

export const formatDate = (isoDate: any) => {
  if (!isoDate || isNaN(Date.parse(isoDate))) {
    return '';
  }

  const date = new Date(isoDate);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatDateForSubscription = (date: Date): string => {
  return date.toISOString().split('T')[0]; // Converts date to YYYY-MM-DD format
};

export const addMonths = (date: Date, months: number): Date => {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + months);
  // Handle case where adding months results in invalid date (e.g., 31st January)
  if (newDate.getDate() !== date.getDate()) {
    newDate.setDate(0); // Set to last day of previous month
  }
  return newDate;
};

export const parseCurrency = (code: any) => {
  switch (code) {
    case 'USD':
      return '$';
    case 'GHS':
      return '₵';
    default:
      return '';
  }
};

export const setMissingValuesToNull = (data: any) => {
  const parsedData: any = {};

  for (const key in data) {
    if (data[key] === undefined || data[key] === '') {
      parsedData[key] = null;
    } else {
      parsedData[key] = data[key];
    }
  }

  return parsedData;
};

export function formatDateWithSlash(inputDate: any) {
  // Parse the input date
  const date = new Date(inputDate);

  // Get the day, month, and year
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = String(date.getFullYear()).slice(-2); // Get the last two digits of the year

  // Format the date as DD/MM/YY
  return `${day}/${month}/${year}`;
}

export const dateApproahingExpiry = (item: any) => {
  const endDate = new Date(item.end_date);
  const today = new Date();
  const approachingEndDate = new Date(
    today.getTime() + 15 * 24 * 60 * 60 * 1000
  );
  return endDate.getTime() <= approachingEndDate.getTime();
};

export function isAccountingManager() {
  const roles = store.getState().auth.userInfo.roles;

  return Array.from(roles || []).some((role) =>
    role.includes('accounting:manager')
  );
}

export async function exportSalesToExcel(
  rows: any[],
  columns: any[],
  name: string
) {
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet(name);

  const headers = columns.map((col) => ({
    key: col.key,
    header: upperCase(col?.label?.replace('_', ' ') || col.key),
    width: 30,
  }));

  worksheet.columns = headers;

  rows.forEach((row) => {
    worksheet.addRow(row);
  });

  // Calculate totals
  const totalSales = rows.reduce(
    (sum, row) =>
      sum + parseFloat(row.total_amount.replace(/[^\d.-]/g, '')) || 0,
    0
  );
  const totalQty = rows.reduce(
    (sum, row) => sum + parseFloat(row.total_qty.replace(/,/g, '')) || 0,
    0
  );

  const totalOpeningBalance = rows?.reduce(
    (sum, row) => sum + parseFloat(row.stock.replace(/,/g, '')) || 0,
    0
  );

  // Add a blank row for separation
  worksheet.addRow({});

  // Add totals row
  const totalsRow = {
    item_code: 'TOTALS',
    item_name: '',
    stock: totalOpeningBalance?.toLocaleString(),
    total_qty: totalQty?.toLocaleString(),
    total_amount: `$ ${parseToMoney(totalSales)}`,
  };
  worksheet.addRow(totalsRow);

  // Style the totals row
  const lastRowNumber = worksheet?.lastRow?.number;
  const totalsRowCells = worksheet.getRow(lastRowNumber as number);
  totalsRowCells.eachCell((cell, colNumber) => {
    cell.font = { bold: true, size: 12 };
    if (colNumber > 1) {
      cell.alignment = { horizontal: 'right' };
    }
  });

  // Style the header row
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true, size: 14 };
  });

  // Generate Excel file buffer and trigger download
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  saveAs(blob, `sales-summary-${Date.now()}.xlsx`);
}

type Frequency = 'Monthly' | 'Fortnightly' | 'Bimonthly' | 'Weekly' | 'Daily';

export function getLastDate(startDate: string, frequency: Frequency): string {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(startDate)) {
    throw new Error('Invalid date format. Please use YYYY-MM-DD');
  }

  const date = new Date(startDate);
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }
  const resultDate = new Date(date);

  switch (frequency) {
    case 'Daily':
      resultDate.setDate(resultDate.getDate() + 1);
      break;
    case 'Weekly':
      resultDate.setDate(resultDate.getDate() + 7);
      break;
    case 'Fortnightly':
      resultDate.setDate(resultDate.getDate() + 14);
      break;
    case 'Bimonthly':
      resultDate.setMonth(resultDate.getMonth() + 2);
      resultDate.setDate(0);
      break;
    case 'Monthly':
      resultDate.setMonth(resultDate.getMonth() + 1);
      resultDate.setDate(0);
      break;
    default:
      throw new Error('Invalid frequency');
  }

  const year = resultDate.getFullYear();
  const month = String(resultDate.getMonth() + 1).padStart(2, '0');
  const day = String(resultDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function removeWords(
  inputString: string,
  wordsToRemove: string[]
): string {
  const pattern = wordsToRemove
    .map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|');

  const regex = new RegExp(`\\b(${pattern})\\b`, 'gi');

  return inputString.replace(regex, '').replace(/\s+/g, ' ').trim();
}
