import { useAuthContext } from "../../hooks/useAuthContext"
import { useLogout } from "../../hooks/useLogout"

const Home = () => {

  const { logout } = useLogout()
  const { user } = useAuthContext()


  return (
    <div>
        <h1>Hello, {user.displayName}</h1>
        <img src={user.photoURL} alt="" style={{ height: "100px", width: "100px", borderRadius: "50%" }}/>
        <button onClick={logout} className="btn">Log out</button>
    </div>
  )
}

export default Home