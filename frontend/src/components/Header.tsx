import { FaUserCircle } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import '../styles/header.scss';
import { useEffect, useState } from "react";
import { Link,NavLink, useNavigate } from "react-router-dom";
import { MdOutlineSegment} from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useGetMeDataQuery, useLazyLogoutQuery } from "../redux/api/authApi";
import Loader from "./Loader";
import { useAppSelector } from "../redux/hooks";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const [logout, {data:logoutData, isLoading:logoutLoading}] = useLazyLogoutQuery()
  const {data, isLoading} = useGetMeDataQuery({})
  const {isAuthenticated, name} = useAppSelector((state) => state.user)
  
  
  useEffect(() => {
    if(logoutData){
      navigate(0)
    }

  }, [logoutData, data])

  if(isLoading){
    return <Loader />
  }

  return (
    <header>
        <div className="header_main_container">
          <div className="logo_container">
            <h3 onClick={() => {
              navigate("/")
              setIsDropdownOpen(false)
            }}>GLAMORA</h3>
          </div>
          <div className="action_btn_main_container">
            {
              isAuthenticated && (
                <div className="cart_container">
                  <div className="cart_icon">
                    <IoCartOutline />
                  </div>
                  <span>1</span>
                </div>
              ) 
            }
            {
              !isAuthenticated && (
                <div className="login_btn_container">
                  <button onClick={() => navigate('/login')}>Login</button>
                </div>
              )
            }
            <div className="action_btn_container">
              <div className="dropdown_container">
                {
                  isAuthenticated && (
                    <Link to="/profile" className="profile_icon">
                      <FaUserCircle />  
                      <span>{name}</span>
                    </Link>
                  ) 
                }

                

                {
                  isDropdownOpen ? <RxCross2 className="sidebar_icon" onClick={() => setIsDropdownOpen(false)} /> : <MdOutlineSegment className="sidebar_icon" onClick={() => setIsDropdownOpen(true)} />

                }
                  {
                    isDropdownOpen && (
                      <div className="dropdown_popout_container">
                        <NavLink to="/collection" onClick={() => setIsDropdownOpen(false)}>Collections</NavLink>
                        <NavLink to="/about" onClick={() => setIsDropdownOpen(false)}>About</NavLink>
                        {
                          isAuthenticated && (
                            <>
                              <NavLink to="/profile" onClick={() => setIsDropdownOpen(false)}>Profile</NavLink>
                              <NavLink to="/orders" onClick={() => setIsDropdownOpen(false)}>Orders</NavLink>
                              <button disabled={logoutLoading} onClick={() => logout({})}>Logout</button>
                            </>
                          )
                        }
                      </div>
                    )
                  }
              </div>
            </div>
          </div>
        </div>
    </header>
  )
}

export default Header