"use client";
import styles from "./pagination.module.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

export default function Pagination({ totalProducts, productsPerPage, currentPage, setCurrentPage }) {
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  if (totalPages <= 1) return null; 

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5; 

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  const handleClick = (page) => {
    if (page === "...") return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.pagination}>
      <button onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}>
        <MdChevronRight />
      </button>

      <ul>
        {getPageNumbers().map((page, idx) => (
          <li
            key={idx}
            className={page === currentPage ? styles.active : ""}
            onClick={() => handleClick(page)}
          >
            {page}
          </li>
        ))}
      </ul>

      <button onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}>
        <MdChevronLeft />
      </button>
    </div>
  );
} 


