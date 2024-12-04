import '../styles/cart.scss';
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { FaTrash } from "react-icons/fa";
import {  countTotal, removeItemFromCart } from '../redux/features/cartSlice';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useCreateOrderByCODMutation } from '../redux/api/orderApi';
import { VscLoading } from 'react-icons/vsc';
import toast from 'react-hot-toast';

const Checkout = () => {
  const {cartItems, totalAmount, shippingAmount, shippingInfo} = useAppSelector((state) => state.cart);
  const [createOrderByCOD,{isLoading:createOrderByCODLoading, data:createOrderByCODData, error:createOrderByCODError}] = useCreateOrderByCODMutation();
  const [paymentMethod, setPaymentMethod] = useState<"COD"|"Card">("COD");
  const {name, email} = useAppSelector((state) => state.user);
  const [subTotal, setSubtotal] = useState<number>(0);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleCountTotal = () => {
    setSubtotal(Number(cartItems.reduce((acc, curr) => acc + curr.quantity * curr.price, 0).toFixed(2)));
  }

  const handleCreateOrder = () => {
    if(paymentMethod === 'COD'){
      createOrderByCOD({
        orderItems:cartItems,
        paymentMethod,
        shippingInfo
      })
      
    }
  }
  
  useEffect(() => {
    if(createOrderByCODData){
      toast.success(`Order Created Successfully`);
      navigate("/orders?success=true")
    }
    if(createOrderByCODError){
      if ('data' in createOrderByCODError) {
        toast.error(`${createOrderByCODError.data}`);
      }
    }
    if(shippingAmount || cartItems || subTotal){
      handleCountTotal();
      dispatch(countTotal({subTotal}));
    }
  },[shippingAmount, cartItems, subTotal, createOrderByCODData, createOrderByCODError])

  if(!shippingInfo || cartItems.length < 1){
    return <Navigate to="/" />
  }
  return (
    <div className="cart_main_container">
        <h1>Checkout</h1>
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
       
        {
          cartItems.length >= 1 && (
            <div className="cart_total_amout_container">
               <div className="shipping_info_container">
                  <h3>Shipping Details</h3>
                  <p>Name: <span>{name}</span></p>
                  <p>Email: <span>{email}</span></p>
                  <p>City: <span>{shippingInfo.city}</span></p>
                  <p>State: <span>{shippingInfo.state}</span></p>
                  <p>Country: <span>{shippingInfo.country}</span></p>
                  <p>Phone No: <span>{shippingInfo.phone}</span></p>
                  <p>Zip Code: <span>{shippingInfo.zipCode}</span></p>
                </div>
              <div className="cart_total_wrapper">
                <h3>Cart Total</h3>
                <div className="cart_total">
                  <p>Subtotal <span>${subTotal}</span></p>
                  <p>Shipping <span>${shippingAmount}</span></p>
                  <p>Total <span>${totalAmount}</span></p>
                  <h3>Select Payment Method</h3>
                  <div className="select_payment">
                    <button
                    className={paymentMethod === 'COD' ? "selected":""}
                    onClick={() => setPaymentMethod("COD")}
                    >Cash on Delivery</button>
                    <button
                    className={paymentMethod === 'Card' ? "selected":""}
                    onClick={() => setPaymentMethod("Card")}
                    >Pay Online</button>
                  </div>
                </div>
                <button onClick={handleCreateOrder} disabled={createOrderByCODLoading}>{createOrderByCODLoading ? <VscLoading className='loading' /> :"Place Order"}</button>
              </div>
            </div>
          ) 
        }
        
    </div>
  )
}

export default Checkout