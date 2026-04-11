'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  return (
    <nav aria-label="페이지 내비게이션" className="flex items-center gap-1.5">
      {/* 이전 */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="이전 페이지"
        className="flex size-10 items-center justify-center rounded-full border-4 border-white bg-white/80 text-gray-600 sticker-shadow transition-all hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-30 dark:bg-surface/80 dark:text-white/70"
      >
        <ChevronLeft size={16} />
      </button>

      {/* 페이지 번호 */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          aria-label={`${page}페이지`}
          aria-current={page === currentPage ? 'page' : undefined}
          className={`
            flex size-10 items-center justify-center rounded-full border-4 border-white
            text-sm font-black transition-all hover:scale-105 active:scale-95 sticker-shadow
            ${
              page === currentPage
                ? 'bg-primary text-white'
                : 'bg-white/80 text-gray-700 hover:bg-primary/20 dark:bg-surface/80 dark:text-white/70'
            }
          `}
        >
          {page}
        </button>
      ))}

      {/* 다음 */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="다음 페이지"
        className="flex size-10 items-center justify-center rounded-full border-4 border-white bg-white/80 text-gray-600 sticker-shadow transition-all hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-30 dark:bg-surface/80 dark:text-white/70"
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  );
};

export default Pagination;
