import '../styles/pagination.scss';

type TypePaginationProps = {
    handleChangePage:(pageVal:number) => void;
    totalPage:number;
    currentPage:number;
}

const Pagination = ({handleChangePage,totalPage, currentPage}:TypePaginationProps) => {
    
    
  return (
    <div className="pagination_button_container">
        {
            [...Array(totalPage)].map((_, i) => (
                <button key={i+1} onClick={() => handleChangePage(i+1)} className={`${i+1 === currentPage ? "active" : ""}`}>{i+1}</button>
            ))
        }
    </div>
  )
}

export default Pagination