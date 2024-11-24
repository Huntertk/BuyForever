import { FaChevronDown, FaUserCircle } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import '../styles/header.scss';
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  return (
    <header>
        <div className="header_main_container">
          <div className="logo_container">
            <h3>ForeverBuy</h3>
          </div>
          <div className="action_btn_main_container">
            <div className="cart_container">
              <div className="cart_icon">
                <IoCartOutline />
              </div>
              <span>1</span>
            </div>
            <div className="action_btn_container">
              <div className="dropdown_container">
                <Link to="/profile" className="profile_icon">
                  <FaUserCircle />  
                  <span>Taufik  </span>
                </Link>
                  <FaChevronDown onClick={() => setIsDropdownOpen((prev) => !prev)} />
                  {
                    isDropdownOpen && (
                      <div className="dropdown_popout_container">
                        <Link to="/profile">Profile</Link>
                        <Link to="/orders">Orders</Link>
                        <p>Logout</p>
                      </div>
                    )
                  }
              </div>
              <div className="login_btn_container">

              </div>
            </div>
          </div>
        </div>
    </header>
  )
}

export default Header