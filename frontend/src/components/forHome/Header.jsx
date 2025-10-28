import { IoPerson } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";

const Header = ({ isEnter, currentName, avatar }) => {

  const navigate = useNavigate()

  return(
    <div>
      <IoPerson />
      {isEnter ? 
        <button onClick={() => navigate('/profile')}>{currentName}</button> 
        : 
        <button onClick={() => navigate('/login')}>Войти</button>
      }
      <Avatar avatar={avatar}/>
    </div>
  )
}

export default Header