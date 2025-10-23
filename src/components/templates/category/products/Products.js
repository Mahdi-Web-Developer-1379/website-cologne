"use client"
import styles from './products.module.css'
import styles2 from '@/styles/category.module.css'

import { MdOutlineGridView } from 'react-icons/md'
import { BiSolidGrid } from 'react-icons/bi'
import { TfiLayoutGrid4Alt } from 'react-icons/tfi'

import Pagination from '@/components/modules/pagination/Pagination'
import Product from "@/components/modules/product/Product"
import { useState, useEffect } from 'react'
import Filtering from '../filtering/Filtering'

const Products = ({ products }) => {
    const [sortOption, setSortOption] = useState("default")
    const [viewMode, setViewMode] = useState('grid3');
    const [sortedProducts, setSortedProducts] = useState(products);

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 4;

    
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);



    const [filters, setFilters] = useState({
        priceRange: {
            min: Math.min(...products.map(p => p.price)),
            max: Math.max(...products.map(p => p.price))
        },
        suitableFor: "",
        smells: []
    });



    useEffect(() => {

        const filteredProducts = products.filter(p => {
            const priceMatch = p.price >= filters.priceRange.min && p.price <= filters.priceRange.max;
            const suitableMatch = !filters.suitableFor || filters.suitableFor === p.suitableFor;

            const smellMatch =
                filters.smells.length === 0 ||
                filters.smells.some(smell =>
                    p.smell && p.smell.includes(smell)
                )

            return priceMatch && suitableMatch && smellMatch;
        });

        let updatedProducts = [...filteredProducts]

        if (sortOption === "rating") {
            updatedProducts.sort((a, b) => b.score - a.score)
        } else if (sortOption === "Inexpensive") {
            updatedProducts.sort((a, b) => a.price - b.price)
        } else if (sortOption === "expensive") {
            updatedProducts.sort((a, b) => b.price - a.price)
        }

        setSortedProducts(updatedProducts)
        setCurrentPage(1)
    }, [sortOption, filters])




    return (

        <div className={styles2.category}>
            <Filtering className={styles2.filterSidebar} filters={filters} setFilters={setFilters} />

            <div className={styles.products}>


                <div className={styles.filtering}>
                    <div className={styles.view}>
                        <TfiLayoutGrid4Alt className={viewMode === 'grid4' ? styles.active : ''} onClick={() => setViewMode('grid4')} />
                        <BiSolidGrid className={viewMode === 'grid3' ? styles.active : ''} onClick={() => setViewMode('grid3')} />
                        <MdOutlineGridView className={viewMode === 'grid2' ? styles.active : ''} onClick={() => setViewMode('grid2')} />
                    </div>

                    <select value={sortOption} onChange={e => setSortOption(e.target.value)}>
                        <option value="default">مرتب‌سازی پیش‌فرض</option>
                        <option value="rating">بر اساس امتیاز</option>
                        <option value="Inexpensive">ارزان‌ترین</option>
                        <option value="expensive">گران‌ترین</option>
                    </select>
                </div>

                
                <main className={styles.main} data-view={viewMode} >
                   
                    {currentProducts.length > 0 ? (
                        currentProducts.map(product => (
                            <Product key={product._id} {...product} />
                        ))
                    ) : (
                        <p style={{ textAlign: "center", marginTop: "2rem" }}>
                            محصولی یافت نشد
                        </p>
                    )}
                </main>

                

                <Pagination
                    productsPerPage={productsPerPage}
                    totalProducts={sortedProducts.length}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />


            </div>

        </div>


    )
}

export default Products
