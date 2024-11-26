import '../styles/filterComponent.scss';

type TypeFilterComponentProps = {
  category:string;
  categoryFilterList:string[];
  handleClickCategory:(categoryVal:string) => void;

  subCategory:string;
  subCategoryFilterList:string[];
  handleClickSubCategory:(subCategoryVal:string) => void;
  handleClearFilter: () => void;
  filteredProductLoading:boolean;
}

const FilterComponent = ({
  category,
  categoryFilterList,
  handleClickCategory,
  handleClickSubCategory,
  subCategory,
  subCategoryFilterList,
  handleClearFilter,
  filteredProductLoading
}:TypeFilterComponentProps) => {

  
  return (  
    <div className='category_filter_main_container'>
      <div className="filter_top_container">
          <h1>Filters</h1>
          <div className='filter_top_button_container'>
            {
              (category || subCategory) && <button onClick={handleClearFilter} disabled={filteredProductLoading}>{ filteredProductLoading ? "Applying...." : "Clear Filters"}</button>

            }
          </div>
      </div>
        <div className="category_filter_container">
            <p>Categories</p>
            {
              categoryFilterList.map((item, index) => (
                <label key={index}>
                  <input
                  type="checkbox"
                  checked={category === item}
                  onChange={() => handleClickCategory(item)}
                  />
                  <span>{item}</span>
                </label>
              ))
            }
        </div>

        <div className="category_filter_container">
            <p>Type</p>
            {
              subCategoryFilterList.map((item, index) => (
                <label key={index}>
                  <input
                  type="checkbox"
                  checked={subCategory === item}
                  onChange={() => handleClickSubCategory(item)}
                  />
                  <span>{item}</span>
                </label>
              ))
            }
        </div>
    </div>
  )
}

export default FilterComponent