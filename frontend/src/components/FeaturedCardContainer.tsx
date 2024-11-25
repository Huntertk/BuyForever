import ProductCard from "./ProductCard"
import '../styles/featuredCardContainer.scss';
import { TypeProduct } from "../redux/typs";

const FeaturedCardContainer = ({data}:{data:TypeProduct[]|undefined}) => {
  return (
    <div className="featured_container">
        <h1>Featured Product</h1>
        <div className="featured_card_wrapper">
            {
              data?.map((item, index) => (
                <ProductCard key={index} productData={item} />
              ))
            }
        </div>
    </div>
  )
}

export default FeaturedCardContainer