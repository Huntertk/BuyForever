import { useEffect, useState } from "react"
import FilterComponent from "../components/FilterComponent";
import { useGetProductByParamsQuery} from "../redux/api/productApi";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

const Collection = () => {
  const [category, setCategory] = useState<string>("");
  const [subCategory, setSubCategory] = useState<string>("");
  const categoryFilterList = ["men", "women", "kid"];
  const subCategoryFilterList = ["topwear", "bottomwear", "winterwear"];
  
  
  const {data:filteredProductData, isLoading:filteredProductLoading} = useGetProductByParamsQuery({featured:undefined,category,subCategory});

  
    const handleClickCategory = (categoryVal:string) => {
      setCategory((prev) => prev === categoryVal ? "" : categoryVal)
    }
  
    const handleClickSubCategory = (subCategoryVal:string) => {
      setSubCategory((prev) => prev === subCategoryVal ? "" : subCategoryVal)
    }
    
    const handleClearFilter = () => {
      setCategory("")
      setSubCategory("")
    }

    useEffect(() => {
      if(category || subCategory){
        console.log(filteredProductData);
        
      }
    },[category, subCategory]) 


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
            {/* Collection */}
            {
              filteredProductData && filteredProductData.products.length > 1 ? filteredProductData.products.map((prod) => (
                <ProductCard key={prod._id} productData={prod} />
              )) : <h1>No Product Found</h1>
            }
        </div>
    </div>
  )
}

export default Collection