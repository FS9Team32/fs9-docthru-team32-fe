'use client';

import Image from 'next/image';
import iconArrowLeft from '@/assets/icon_arrow_left.svg';
import iconArrowRight from '@/assets/icon_arrow_right.svg';

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, start + maxVisible - 1);

      if (end - start < maxVisible - 1) {
        start = Math.max(1, end - maxVisible + 1);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();
  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handlePrevious}
        disabled={isPreviousDisabled}
        className={`flex items-center justify-center ${
          isPreviousDisabled
            ? 'cursor-not-allowed opacity-50'
            : 'cursor-pointer hover:opacity-70'
        }`}
      >
        <Image
          src={iconArrowLeft}
          alt="이전 페이지"
          width={24}
          height={24}
          className={isPreviousDisabled ? 'opacity-50' : ''}
        />
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={`flex h-8 w-8 items-center justify-center rounded text-sm font-medium transition-colors ${
            page === currentPage
              ? 'bg-gray-800 text-yellow-400'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={handleNext}
        disabled={isNextDisabled}
        className={`flex items-center justify-center ${
          isNextDisabled
            ? 'cursor-not-allowed opacity-50'
            : 'cursor-pointer hover:opacity-70'
        }`}
      >
        <Image
          src={iconArrowRight}
          alt="다음 페이지"
          width={24}
          height={24}
          className={isNextDisabled ? 'opacity-50' : ''}
        />
      </button>
    </div>
  );
}
