import { Link,useNavigate } from 'react-router-dom';
import '../styles/loginAndSignup.scss';
import React, { useEffect, useState } from 'react';
import { VscLoading } from "react-icons/vsc";
import { useGetMeDataQuery, useRegisterMutation } from '../redux/api/authApi';
import { toast } from 'react-hot-toast';
import Loader from '../components/Loader';

const Register = () => {
    const {isLoading:getMeLoading, data:getMeData} = useGetMeDataQuery({});
    const navigate = useNavigate();
    const [register, {error, isLoading, data}] = useRegisterMutation();
    const [formData, setFormData] = useState<{email:string; password:string; confirmPassword:string; name:string}>({
        email:"",
        password:"",
        name:"",
        confirmPassword:""
    })

    const handleFormDataChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [event.target.name]:event.target.value
        }))
    }

    const handleFormSubmit = (event:React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(!formData.email || !formData.password || !formData.name){
            return toast.error("Please provide all values")
        }
        if(formData.password !== formData.confirmPassword){
            return toast.error("Pasword and confirm password must be same")
        }

        register({name:formData.name, email:formData.email, password:formData.password})
    }

    useEffect(() => {
        if(data || getMeData){
            toast.success('User Register Successfully')
            navigate("/")
        }

        if(error){
            if(error){
                if ('data' in error) {
                  toast.error(`${error.data}`);
                }
              }
        }

    }, [error, data, getMeData]);

    if(getMeLoading){
        return <Loader />
    }

  return (
    <div className="login_signup_page_main_container">
        <div className="login_signup_form_container">
            <form onSubmit={handleFormSubmit}>
            <h1>Welcome Create Account!</h1>
                <label htmlFor="name">Name <span>*</span></label>
                <input
                type="text"
                name="name"
                id="name"
                placeholder='Enter your full name'
                value={formData.name}
                onChange={handleFormDataChange}
                required
                />
                <label htmlFor="email">Email <span>*</span></label>
                <input
                type="email"
                name="email"
                id="email"
                placeholder='Enter your email'
                value={formData.email}
                onChange={handleFormDataChange}
                required
                />
                <label htmlFor="password">Password <span>*</span></label>
                <input
                type="password"
                name="password"
                id="password"
                placeholder='Enter password' 
                value={formData.password}
                onChange={handleFormDataChange}
                required
                />
                <label htmlFor="confirmPassword">Confirm Password <span>*</span></label>
                <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder='Enter confirm password' 
                value={formData.confirmPassword}
                onChange={handleFormDataChange}
                required
                />
                <button disabled={isLoading}>{isLoading ? <VscLoading className='loading' /> : "Register"}</button>
                <span>Already have an account ? <Link to="/login">Login here</Link></span>
            </form>
        </div>
        <div className="login_signup_img_container">
            <img src="/assets/images/login.jpg" alt="login-img" />
        </div>
    </div>
  )
}

export default Register