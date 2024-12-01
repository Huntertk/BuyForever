import '../styles/cart.scss';
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { FaTrash } from "react-icons/fa";
import { countTotal, removeItemFromCart } from '../redux/features/cartSlice';
import { useEffect, useState } from 'react';
const Cart = () => {
  const {cartItems, totalAmount} = useAppSelector((state) => state.cart);
  const [subTotal, setSubtotal] = useState<number>(0);
  const [shippingAmount, setShippingAmount] = useState<number>(0);
  const dispatch = useAppDispatch();

  const handleCountTotal = () => {
    setSubtotal(Number(cartItems.reduce((acc, curr) => acc + curr.quantity * curr.price, 0).toFixed(2)));
    setShippingAmount(subTotal === 0 ? 0 : subTotal > 50 ? 0: 10)
  }
  
  useEffect(() => {
    handleCountTotal();
    dispatch(countTotal({subTotal}));
  },[shippingAmount, cartItems, subTotal])
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
                <p>$ {item.price * item.quantity}</p>
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
              <p>Subtotal <span>${subTotal}</span></p>
              <p>Shipping <span>${shippingAmount}</span></p>
              <p>Total <span>${totalAmount}</span></p>
            </div>
            <button>Proceed to Checkout</button>
          </div>
        </div>
    </div>
  )
}

export default Cart