import React, { useState } from 'react'
import ProductCard from './ProductCard';


const PAGE_SIZE = 12;

const Products = ({products, addToCart}) => {
    const [currentPage, setCurrentPage] = useState(0);

    const handlePage = (num) => {
        setCurrentPage(num);
    };
    
    const goToPrevPage = () => {
        setCurrentPage((prev) => prev - 1);
    };
    
    const goToNextPage = () => {
        setCurrentPage((prev) => prev + 1);
    };
    
    const total_pages = Math.ceil(products.length / PAGE_SIZE);
    const start = currentPage * PAGE_SIZE;
    const end = start + PAGE_SIZE;


  return !products.length ? (
    <h1>No products available</h1>
  ) : (
    <div className="font-sans text-center mt-10">
      <h1>Products Pagination</h1>
      <div className="p-[10px]">
        <button
          disabled={currentPage === 0}
          onClick={() => goToPrevPage()}
        >
          {"⬅️"}
        </button>
        {[...Array(total_pages).keys()].map((num) => (
          <button
            className={`page-number + ${num === currentPage ? "bg-amber-300" : ""}`}
            key={num}
            onClick={() => handlePage(num)}
          >
            {num + 1}
          </button>
        ))}
        <button
          disabled={currentPage === total_pages - 1}
          onClick={() => goToNextPage()}
        >
          {"➡️"}
        </button>
      </div>
      <div className="flex flex-wrap">
        {products.slice(start, end).map((p) => (
          <ProductCard key={p.id} product={p} addToCart={addToCart} />
        ))}
      </div>
    </div>
  )
}

export default Products