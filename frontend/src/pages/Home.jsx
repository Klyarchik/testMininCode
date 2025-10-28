import Header from "../components/forHome/Header"

const Home = ({ isEnter, currentName, avatar }) => {
  return(
    <div>
      <Header isEnter={isEnter} currentName={currentName} avatar={avatar} />
    </div>
  )
}

export default Home