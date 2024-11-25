import FeaturedCardContainer from "../components/FeaturedCardContainer"
import HomeCover from "../components/home/HomeCover"
import Loader from "../components/Loader"
import { useGetFeaturedProductQuery } from "../redux/api/productApi"

const Home = () => {
  const {data:featuredProductData, isLoading:featuredProductLoading} = useGetFeaturedProductQuery({featured: true})

  
  return (
    <section>
      <HomeCover />
      {
        featuredProductLoading ? <Loader /> : <FeaturedCardContainer data={featuredProductData?.products}  />
      }
    </section>
  )
}

export default Home