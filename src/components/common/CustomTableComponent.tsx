import { Icon } from "@iconify/react";
import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { Key } from "react";
import Pagination from "./Pagination";

interface ICustomTableComponent {
  columns: Array<{ key: string; label: any } | string>;
  customColumns?: boolean;
  rows: Array<any>;
  isLoading?: boolean;
  isPaginated?: boolean;
  isFetching?: boolean;
  isHeaderSticky?: boolean;
  classNames: Partial<{
    base: string;
    table: string;
    thead: string;
    tbody: string;
    tr: string;
    th: string;
    td: string;
    tfoot: string;
    sortIcon: string;
    emptyWrapper: string;
  }>;
  selectionMode?: "none" | "single" | "multiple";
  onclick?: (key: Key) => void;
  onSelectionChange?: (key: any) => void;
  refetch?: () => void;
  params?: any;
  setParams?: any;
  selected?: any;
  hasAccess?: boolean;
}

const CustomTableComponent: React.FC<ICustomTableComponent> = ({
  columns,
  rows,
  isLoading = false,
  isFetching = false,
  classNames,
  isPaginated = false,
  isHeaderSticky = false,
  selectionMode = "none",
  onclick,
  params = {},
  setParams,
  refetch,
  onSelectionChange,
  selected = [],
  hasAccess = undefined,
}) => {
  const bottomContent = (
    <div className="w-full flex justify-between items-center py-2 px-2 mt-auto">
      {refetch && hasAccess && (
        <button
          disabled={isFetching}
          onClick={() => refetch()}
          className="disabled:pointer-events-none gap-x-1 text-[23px]"
        >
          <Icon
            icon={isFetching ? "eos-icons:loading" : "solar:refresh-bold"}
          />
        </button>
      )}

      {isPaginated && (
        <Pagination
          key={params?.count || "pagination"}
          currentPage={params?.page}
          totalPages={Math.ceil(params?.count / params?.limit)}
          onPageChange={(page) => setParams({ ...params, page })}
        />
      )}
    </div>
  );

  return (
    <Table
      aria-label="custom-table"
      className="h-full min-h-[400px] flex-1 relative mt-1 flex flex-col"
      removeWrapper
      isHeaderSticky={isHeaderSticky}
      selectionMode={selectionMode}
      classNames={classNames}
      onRowAction={onclick}
      onSelectionChange={onSelectionChange}
      selectedKeys={selected}
      checkboxesProps={{ color: "secondary" }}
      bottomContent={bottomContent}
    >
      <TableHeader columns={columns}>
        {(column: any) => (
          <TableColumn
            key={column.key}
            className="uppercase font-medium border-b border-gray-200 text-sm"
          >
            <p>{column.label}</p>
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        items={rows}
        emptyContent={
          !isLoading && (
            <div className="flex flex-col items-center text-xs">
              <Icon icon="gg:info" className="text-2xl" />
              <p>
                {hasAccess === false
                  ? "No permission to view resource"
                  : "Nothing to show here."}
              </p>
            </div>
          )
        }
        isLoading={isLoading}
        loadingContent={
          <div className="flex flex-col items-center mt-36 h-fit my-auto">
            <Icon icon="eos-icons:loading" className="text-2xl" />
          </div>
        }
      >
        {(row) => (
          <TableRow
            key={row.id}
            className={`hover:bg-white/5 ${
              onclick ? "hover:cursor-pointer" : ""
            }`}
          >
            {(columnKey) => (
              <TableCell>{getKeyValue(row, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default CustomTableComponent;
