export interface Column {
  key: string;
  label: string;
  render?: (row: any) => React.ReactNode;
}

export interface TableRow {
  id: string | number;
  [key: string]: string | number | boolean | React.ReactNode | undefined;
}

interface SimpleTableProps<T extends TableRow> {
  columns: Column[];
  data: T[];
  onRowClick?: (row: T) => void;
}

const SimpleTable = <T extends TableRow>({
  columns,
  data,
  onRowClick,
}: SimpleTableProps<T>) => {
  return (
    <div className="relative">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200 uppercase text-[#4b5563] text-[12px]">
            {columns.map((col) => (
              <th key={col.key} className="p-3 text-left font-[600]">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row.id}
              className="border-b border-[#e5e7eb] last:border-b-0 hover:bg-gray-100 cursor-pointer text-[13px] text-gray-600"
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((col) => (
                <td key={col.key} className="p-3">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SimpleTable;
