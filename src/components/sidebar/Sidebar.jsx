import { NavLink } from "react-router-dom"
import { useAuthContext } from "../../hooks/useAuthContext"

import "./Sidebar.scss"
import ArrowLeft from "../../assets/arrow-left.svg"

const Sidebar = ({toggleSidebar}) => {

    const { user } = useAuthContext()

  return (
    <div className="sidebar">
        <div className="sidebar__content">
        <img src={ArrowLeft} alt="close sidebar" onClick={toggleSidebar} className="sidebar__close"/>
            <div className="sidebar__user">
                <img src={user.photoURL} alt="user avatar" />
                <p>Hey, {user.displayName}</p>
            </div>
            <nav className="sidebar__links">
                <NavLink to="/">
                    <span>Weather</span>
                </NavLink>
                <NavLink to="/todo">
                    <span>To-Do List</span>
                </NavLink>
            </nav>
        </div>
    </div>
  )
}

export default Sidebar