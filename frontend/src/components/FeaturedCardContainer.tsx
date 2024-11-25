import ProductCard from "./ProductCard"
import '../styles/featuredCardContainer.scss';

const FeaturedCardContainer = () => {
  return (
    <div className="featured_container">
        <h1>Featured Product</h1>
        <div className="featured_card_wrapper">
            <ProductCard />
            <ProductCard />
        </div>
    </div>
  )
}

export default FeaturedCardContainer