import '../styles/cart.scss';
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { FaTrash } from "react-icons/fa";
import { removeItemFromCart } from '../redux/features/cartSlice';
const Cart = () => {
  const {cartItems} = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  
  return (
    <div className="cart_main_container">
        <h1>Your Cart</h1>
        <div className="cart_product_list_container">
          {
            cartItems.length < 1 ? <h3>Your Cart is Empty</h3>: cartItems.map((item, index) => (
              <div className="cart_product" key={index}>
                <div className="cart_product_details">
                  <img src={item.image} alt={item.title} />
                  <div className="cart_pricing">
                    <p>{item.title}</p>
                    <p>${item.price}</p>
                  </div>
                </div>
                <p>X {item.quantity}</p>
                <div className="cart_cta_container">
                  <FaTrash className='trash_icon' onClick={() => dispatch(removeItemFromCart({productId:item.productId}))}/>
                </div>
              </div>
            ))
          }
        </div>
        <div className="cart_total_amout_container">
          <div className="cart_total_wrapper">
            <h3>Cart Total</h3>
            <div className="cart_total">
              <p>Subtotal <span>$100</span></p>
              <p>Shipping <span>$10</span></p>
              <p>Total <span>$110</span></p>
            </div>
            <button>Proceed to Checkout</button>
          </div>
        </div>
    </div>
  )
}

export default Cart