import { Navigate, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import React, { useEffect, useState } from "react"
import '../styles/shipping.scss';
import { addShippingInfo } from "../redux/features/cartSlice"

const Shipping = () => {
    const {shippingInfo} = useAppSelector((state) => state.cart)
    const [shippingFormData, setShippingFormData] = useState<{
        state:string;
        city:string;
        country:string;
        zipCode:string;
    }>({
        city:"",
        country:"",
        state:"",
        zipCode:""
    });
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [phone, setPhone] = useState<string|undefined>("")
    const {cartItems} = useAppSelector((state) => state.cart)

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setShippingFormData((prev) => ({
            ...prev,
            [event.target.name]:event.target.value
        }))
    }

    const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(phone){
            dispatch(addShippingInfo({shippingInfo:{
                city:shippingFormData.city,
                country:shippingFormData.country,
                phone,
                state:shippingFormData.state,
                zipCode:shippingFormData.zipCode
            }}))
        }
        navigate('/checkout')
    }

    useEffect(() => {
        if(shippingInfo){
            setShippingFormData({...shippingInfo})
            setPhone(shippingInfo.phone)
        }

    },[])

    if(cartItems.length === 0){
        return <Navigate to="/"/>
    }
  return (
    <div className="shipping_main_container">
        <form onSubmit={handleSubmit}>
            <h1>Shipping Info</h1>
            <PhoneInput
            id="phone"
            defaultCountry="IN"
            placeholder="Enter phone number"
            value={phone}
            onChange={setPhone}
            required
            />
            <input
            type="text"
            name="city"
            placeholder="Enter your city name"
            value={shippingFormData.city}
            onChange={handleChange}
            required
            />
            <input
            type="text"
            name="state"
            placeholder="Enter your state name"
            value={shippingFormData.state}
            onChange={handleChange}
            required
            />
            <input
            type="text"
            name="country"
            placeholder="Enter your country"
            value={shippingFormData.country}
            onChange={handleChange}
            required
            />
            <input
            type="text"
            name="zipCode"
            placeholder="Enter your zip code"
            value={shippingFormData.zipCode}
            onChange={handleChange}
            required
            />
            <button type="submit">Proceed to Checkout</button>
        </form>
    </div>
  )
}

export default Shipping