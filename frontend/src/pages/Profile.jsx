import ExitProfile from "../components/forProfile/exitProfile"
import { useNavigate } from "react-router-dom"

const Profile = ({ setIsEnter }) => {

  const navigate = useNavigate()

  return(
    <div>
      <button onClick={() => navigate('/EditProfile')}>Редактировать профиль</button>
      <ExitProfile setIsEnter={setIsEnter} />
    </div>
  )
}

export default Profile