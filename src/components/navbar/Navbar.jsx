import { Link, NavLink } from "react-router-dom"
import { useLogout } from "../../hooks/useLogout"
import { useAuthContext } from "../../hooks/useAuthContext"

import "./Navbar.scss"
import ArrowRight from "../../assets/arrow-right.svg"

const Navbar = ({toggleSidebar, isSideBarActive}) => {

  const { logout, isPending } = useLogout()
  const { authIsReady, user } = useAuthContext()

  return (
    <div className="navbar">
      {authIsReady &&
        <nav className="navbar__content">
            {!isSideBarActive && user && <img src={ArrowRight} alt="" onClick={toggleSidebar} className="navbar__open"/>}
            <Link to="/" className="navbar__logo">
                MorningApp
            </Link>
            {!user && <div>
              <NavLink to="/login">Sign in</NavLink>
              <NavLink to="/signup">Register</NavLink>
            </div>}
            {!isPending && user && <button className="btn" onClick={logout}>Sign out</button>}
            {isPending && user && <button className="btn" disabled>Logging out...</button>}
        </nav>
      }
    </div>
  )
}

export default Navbar