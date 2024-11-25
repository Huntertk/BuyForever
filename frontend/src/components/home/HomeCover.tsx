import { useNavigate } from 'react-router-dom';
import '../../styles/homeCover.scss';

const HomeCover = () => {
  const navigate = useNavigate()
  return (
    <div className="home_cover_main_container">
        <h1>Shaping a New</h1>
        <h1>Era of Style and</h1>
        <h1>Sophistication</h1>
        <p>Elevate your wardrobe and embrace your </p>
        <p>Unique elegance with every click</p>
        <button onClick={() => navigate("/collection")}>Explore now</button>
    </div>
  )
}

export default HomeCover