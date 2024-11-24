import { VscLoading } from "react-icons/vsc";
import '../styles/loader.scss';

const Loader = () => {
  return (
    <div className="loader_container">
        <VscLoading className="loader"/>
    </div>
  )
}

export default Loader