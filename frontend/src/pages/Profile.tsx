import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import '../styles/profile.scss';

const Profile = () => {
    const {name, email} = useAppSelector((state) => state.user);

  return (
    <div className="profile_page_main_container">
        <h1>Profile Details</h1>
        <div className="profile_details_container">
            <p>user name: <span>{name}</span></p>
            <p>user email: <span>{email}</span></p>
        </div>
        <div className="profile_cta_container">
            <Link to="/profile/update-profile">Update Profile</Link>
            <Link to="/profile/update-password">Change Password</Link>
        </div>
    </div>
  )
}

export default Profile