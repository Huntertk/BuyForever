import { Link } from 'react-router-dom';
import '../styles/loginAndSignup.scss';
import React, { useState } from 'react';
import { VscLoading } from "react-icons/vsc";

const Login = () => {
    const [formData, setFormData] = useState<{email:string; password:string}>({
        email:"",
        password:""
    })

    const handleFormDataChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [event.target.name]:event.target.value
        }))
    }

  return (
    <div className="login_signup_page_main_container">
        <div className="login_signup_form_container">
            <h1>Welcome Back!</h1>
            <form>
                <label htmlFor="email">Email <span>*</span></label>
                <input
                type="email"
                name="email"
                id="email"
                placeholder='Enter your email'
                value={formData.email}
                onChange={handleFormDataChange}
                />
                <label htmlFor="email">Password <span>*</span></label>
                <input
                type="password"
                name="password"
                id="password"
                placeholder='Enter password' 
                value={formData.password}
                onChange={handleFormDataChange}
                />
                <button><VscLoading className='loading' /></button>
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