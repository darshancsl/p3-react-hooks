import { useEffect, useState } from "react";

const usePagination = (initialOffset, totalItems, size, visiblePages) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / size);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevState => prevState - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevState => prevState + 1);
    }
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPageRange = () => {
    const halfVisiblePages = Math.floor(visiblePages / 2);
    const startPage = Math.max(1, currentPage - halfVisiblePages);
    const endPage = Math.min(totalPages, startPage + visiblePages - 1);
    return { startPage, endPage };
  };

  const getPaginationArray = () => {
    const { startPage, endPage } = getPageRange();
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const currentOffset = (currentPage - 1) * size;

  useEffect(() => {
    setCurrentPage(1);
  }, [initialOffset, totalItems, size]);

  return {
    currentPage,
    totalPages,
    size,
    currentOffset,
    handleNextPage,
    handlePrevPage,
    goToPage,
    getPaginationArray,
  };
};

export default usePagination;