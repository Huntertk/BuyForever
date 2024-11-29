import { Navigate, useNavigate, useParams } from "react-router-dom"
import { useGetProductByIdQuery } from "../redux/api/productApi";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import '../styles/productDetails.scss';
import { SiTicktick } from "react-icons/si";
import { TbTruckDelivery, TbTruckReturn } from "react-icons/tb";
import { useAppSelector } from "../redux/hooks";

const ProductDetails = () => {
    const {isAuthenticated} = useAppSelector((state) => state.user)
    const {id} = useParams();
    const navigate = useNavigate();
    const {isLoading:productDetailsLoading, data:productDetailsData, error:productDetailsError} = useGetProductByIdQuery({id});
    const [selectedImage, setSelectedImage] = useState<string>("");

    useEffect(() => {
        if(productDetailsData){   
            setSelectedImage(productDetailsData.images[0])
        }
        if(productDetailsError){
           navigate('/collection')
        }

    },[productDetailsData, productDetailsError])

    
    if(productDetailsLoading){
        return <Loader />
    }
    if(!productDetailsData){
        return <Navigate to="/collection" />
    }
    
  return (
    <div className="product_details_main_container">
        <div className="product_details_img_container">
            <div className="product_details_main_image">
                <img src={selectedImage} alt={productDetailsData.title} />
            </div>
            <div className="product_details_images_container">
                {
                    productDetailsData.images.map((image, i) => (
                        <button key={i} onClick={() => setSelectedImage(image)} className={`${image === selectedImage ? "active_img":""}`}>
                            <img src={image} alt={productDetailsData.title} />
                        </button>
                    ))
                }
            </div>
        </div>
        <div className="product_details_content_details_container">
            <h1>{productDetailsData.title}</h1>
            <p className="price_tag">${productDetailsData.price}</p>
            <p>{productDetailsData.description}</p>
            <hr />
            <p className="trust_point"><SiTicktick /> 100% Original product.</p>
            <p className="trust_point"><TbTruckDelivery /> Cash on delivery is available on this product.</p>
            <p className="trust_point"><TbTruckReturn /> Easy return and exchange policy within 7 days.</p>
            {
               isAuthenticated ? <button>Add to Cart</button> : <p className="login_warning">Please login to buy this item</p> 

            }
        </div>
    </div>
  )
}

export default ProductDetails