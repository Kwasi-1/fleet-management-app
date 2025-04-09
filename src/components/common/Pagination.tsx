import { Pagination as NextUIPagination } from "@nextui-org/react";
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  container?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  container = "absolute bottom-0 right-0",
}) => {
  return (
    <div className={`py-2 px-2 ${container}`}>
      <NextUIPagination
        isCompact
        showControls
        showShadow={false}
        variant="light"
        classNames={{
          wrapper: "border-0 shadow-none",
          cursor: "bg-primary-green font-bold shadow-none",
          item: "dark:bg-secondary-gray text-gray-400 shadow-none",
          next: "dark:bg-secondary-gray shadow-none",
          prev: "dark:bg-secondary-gray shadow-none",
        }}
        page={currentPage}
        total={totalPages}
        onChange={onPageChange}
      />
    </div>
  );
};

export default Pagination;
