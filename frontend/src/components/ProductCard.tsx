import { useNavigate } from 'react-router-dom';
import { TypeProduct } from '../redux/typs';
import '../styles/productCard.scss';


const ProductCard = ({productData}:{productData:TypeProduct}) => {
  const navigate = useNavigate()
  return (
    <div className="product_card_container" onClick={() => navigate(`/collection/${productData._id}`)}>
        <div className="product_img_container">
            <img src={productData.images[0]} alt={productData.title} />
        </div>
        <div className="product_card_details_container">
            <p>{productData.title}</p>
            <p className='price'>${productData.price}</p>
        </div>
    </div>
  )
}

export default ProductCard