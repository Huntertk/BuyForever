import '../styles/productCard.scss';


const ProductCard = () => {
  return (
    <div className="product_card_container">
        <div className="product_img_container">
            <img src="https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img47.png" alt="Product Img" />
        </div>
        <div className="product_card_details_container">
            <p>Utility Jacket</p>
            <p className='price'>$599</p>
        </div>
    </div>
  )
}

export default ProductCard