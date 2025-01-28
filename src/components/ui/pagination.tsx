import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps<T> {
  items: T[];
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

function Pagination<T>({
  items,
  itemsPerPage,
  currentPage,
  onPageChange,
}: PaginationProps<T>) {
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className="w-full px-6 py-4 flex items-center justify-between ">
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {getPageNumbers().map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`px-3 py-1 rounded-lg ${
              currentPage === pageNum
                ? "bg-orange-600 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {pageNum}
          </button>
        ))}

        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="text-sm">
        Showing {startIndex + 1}-{Math.min(endIndex, items.length)} of{" "}
        {items.length}
      </div>
    </div>
  );
}

export default Pagination;
