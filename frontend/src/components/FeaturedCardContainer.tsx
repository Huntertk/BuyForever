import ProductCard from "./ProductCard"
import '../styles/featuredCardContainer.scss';
import { TypeProduct } from "../redux/typs";

const FeaturedCardContainer = ({data, title, paragraph}:{data:TypeProduct[]|undefined, title:string, paragraph:string}) => {
  return (
    <div className="featured_container">
        <h1>{title}</h1>
        <p>{paragraph}</p>
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