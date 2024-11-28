import { Link,useNavigate } from 'react-router-dom';
import '../styles/loginAndSignup.scss';
import React, { useEffect, useState } from 'react';
import { VscLoading } from "react-icons/vsc";
import { useGetMeDataQuery, useLoginMutation } from '../redux/api/authApi';
import { toast } from 'react-hot-toast';
import Loader from '../components/Loader';

const Login = () => {
    const {isLoading:getMeLoading, data:getMeData} = useGetMeDataQuery({});
    const navigate = useNavigate();
    const [login, {error, isLoading, data}] = useLoginMutation();
    const [formData, setFormData] = useState<{email:string; password:string;}>({
        email:"",
        password:""
    })

    const handleFormDataChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [event.target.name]:event.target.value
        }))
    }

    const handleFormSubmit = (event:React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(!formData.email || !formData.password){
            return toast.error("Please provide all values")
        }

        login({email:formData.email, password:formData.password})
    }

    useEffect(() => {
        if(data || getMeData){
            toast.success('User Login Successfully')
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
            <h1>Welcome Back!</h1>
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
                <button disabled={isLoading}>{isLoading ? <VscLoading className='loading' /> : "Log In"}</button>
                <span>Don't have an account ? <Link to="/register">Register here</Link></span>
            </form>
        </div>
        <div className="login_signup_img_container">
            <img src="/assets/images/login.jpg" alt="login-img" />
        </div>
    </div>
  )
}

export default Login