import FeaturedCardContainer from "../components/FeaturedCardContainer"
import HomeCover from "../components/home/HomeCover"
import Loader from "../components/Loader"
import { useGetProductByParamsQuery } from "../redux/api/productApi"

const Home = () => {
  const {data:featuredProductData, isLoading:featuredProductLoading} = useGetProductByParamsQuery({featured: true, category:"", subCategory:""});

  const {data:menCategoryProductData, isLoading:menCategoryProductLoading} = useGetProductByParamsQuery({featured: undefined, category:"men", subCategory:""})

  
  return (
    <section>
      <HomeCover />
      {
        featuredProductLoading ? <Loader /> : <FeaturedCardContainer
        data={featuredProductData?.products}  
        title="Featured Product"
        paragraph="Find the latest styles, classic favorites, and also the modern and comfortable fashion."
         />
      }

      {
        menCategoryProductLoading ? <Loader /> : <FeaturedCardContainer
        data={menCategoryProductData?.products.slice(0,3)}  
        title="Mens Collection"
        paragraph="Get ready to look and feel amazing in every click with Glamora. So, happy shopping!"
         />
      }
    </section>
  )
}

export default Home