import React, { useEffect, useRef, useState } from "react"
import FilterComponent from "../components/FilterComponent";
import { useGetProductByParamsQuery} from "../redux/api/productApi";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import '../styles/collection.scss';
import { FiSearch } from "react-icons/fi";
import Pagination from "../components/Pagination";

const Collection = () => {
  const [category, setCategory] = useState<string>("");
  const [subCategory, setSubCategory] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [sortby, setSortby] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const searchRef = useRef<HTMLInputElement>(null);
  const categoryFilterList = ["men", "women", "kids"];
  const subCategoryFilterList = ["topwear", "bottomwear", "winterwear"];
  
  
  const {data:filteredProductData, isLoading:filteredProductLoading} = useGetProductByParamsQuery({featured:undefined,category,subCategory, search, sortby, page});

  
    const handleClickCategory = (categoryVal:string) => {
      setCategory((prev) => prev === categoryVal ? "" : categoryVal)
    }
  
    const handleClickSubCategory = (subCategoryVal:string) => {
      setSubCategory((prev) => prev === subCategoryVal ? "" : subCategoryVal)
    }

    const handleChangePage = (pageVal:number) => {
      setPage(pageVal)
    }

    
    const handleClearFilter = () => {
      setCategory("")
      setSubCategory("")
    }

    const handleSearch = (e:React.ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (searchRef.current) { 
        setSearch(searchRef.current.value)
      }
    }

    useEffect(() => {
      
    },[category, subCategory, search, sortby])


    if(filteredProductLoading){
      return <Loader/>
    }

  return (
    <div className="collection_page_main_container">
        <div className="collection_page_filters_container">
            {/* Filters */}
            
            <FilterComponent
            category={category}
            categoryFilterList={categoryFilterList}
            handleClickCategory={handleClickCategory}
            subCategory={subCategory}
            subCategoryFilterList={subCategoryFilterList}
            handleClickSubCategory={handleClickSubCategory}
            handleClearFilter={handleClearFilter}
            filteredProductLoading={filteredProductLoading}
            />
        </div>
        <div className="collection_page_collection_container">
          <div className="collection_page_search_sort_container">
            <form className="search_container" onSubmit={handleSearch}>
              <input 
              type="text"
              placeholder="Search...."
              ref={searchRef}
              />
              <button type="submit"><FiSearch /></button>
            </form>
            <div className="sort_container">
              <select
              name="sortby"
              value={sortby}
              onChange={(e:React.ChangeEvent<HTMLSelectElement>) => setSortby(e.target.value)}
              >
                <option value="">Relevant</option>
                <option value="price">Price Low to High</option>
                <option value="-price">Price High to Low</option>
              </select>
            </div>

          </div>
            {/* Collection */}
            <div className="collection_page_product_container">
              {
                filteredProductData && filteredProductData.products.length > 1 ? filteredProductData.products.map((prod) => (
                  <ProductCard key={prod._id} productData={prod} />
                )) : <h1>No Product Found</h1>
              }
            </div>
            {
              filteredProductData &&(
                <div className="collection_pagination_container">
                  <Pagination
                  handleChangePage={handleChangePage}
                  totalPage={filteredProductData.totalPage}
                  currentPage={page}
                  />
                </div>
              )
            }
        </div>
    </div>
  )
}

export default Collection