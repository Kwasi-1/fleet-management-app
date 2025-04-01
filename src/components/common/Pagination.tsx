import { Icon } from "@iconify/react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onRefresh: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  onRefresh,
}) => {
  const generatePageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="pt-auto flex justify-between items-center mt-4 px-4">
      {/* Refresh Button */}
      <button className="text-gray-600" onClick={onRefresh}>
        <Icon icon="solar:refresh-outline" className="text-lg" />
      </button>

      {/* Pagination */}
      <div className="flex items-center border border-gray-300 rounded-lg">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 rounded-l ${
            currentPage === 1
              ? "text-gray-300 cursor-not-allowed"
              : "hover:bg-gray-200 text-gray-600"
          }`}
        >
          <Icon icon="mingcute:left-line" />
        </button>

        {/* Page Numbers */}
        {generatePageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === "number" && onPageChange(page)}
            className={`px-3 py-1 border-x border-gray-200/50 ${
              page === currentPage
                ? "bg-[#619B7D] text-white"
                : "text-gray-600 hover:bg-gray-200"
            }`}
            disabled={page === "..."}
          >
            {page}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-r ${
            currentPage === totalPages
              ? "text-gray-300 cursor-not-allowed"
              : "hover:bg-gray-200 text-gray-600"
          }`}
        >
          <Icon icon="mingcute:right-line" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
