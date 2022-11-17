import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import './App.scss';
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import { useAuthContext } from "./hooks/useAuthContext";
import Bookmarks from "./pages/bookmarks/Bookmarks";
import Home from "./pages/home/Home";

import Login from "./pages/login/Login"
import ShoppingHome from "./pages/shopping/ShoppingHome";
import Signup from "./pages/signup/Signup"
import TodoHome from "./pages/todo/TodoHome";

function App() {

  const { user, authIsReady } = useAuthContext()
  const [isSideBarActive, setSideBarActive] = useState(false);
  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
  });
    
  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
    })
  }
    
  useEffect(() => {
    window.addEventListener('resize', setDimension);
  
    return() => window.removeEventListener('resize', setDimension);

  }, [screenSize])

  const toggleSidebar = () => {
    setSideBarActive(!isSideBarActive);
  }


  return (
    <div className="App">
      {authIsReady &&
        <BrowserRouter>
            {user && isSideBarActive && <Sidebar toggleSidebar={toggleSidebar} screenSize={screenSize}/>}
          <div className="container">
            <Navbar toggleSidebar={toggleSidebar} isSideBarActive={isSideBarActive}/>
            <Routes>
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />}/>
              <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />}/>
              <Route path="/" element={user ? <Home /> : <Navigate to="/login" />}/>
              <Route path="/todo" element={user ? <TodoHome /> : <Navigate to="/login" />}/>
              <Route path="/shopping" element={user ? <ShoppingHome screenSize={screenSize} /> : <Navigate to="/login" />}/>
              <Route path="/bookmarks" element={user ? <Bookmarks /> : <Navigate to="/login" />}/>
            </Routes>
          </div>
        </BrowserRouter>
      }
    </div>
  );
}

export default App;
