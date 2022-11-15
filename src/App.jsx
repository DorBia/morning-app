import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import './App.scss';
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import { useAuthContext } from "./hooks/useAuthContext";
import Home from "./pages/home/Home";

import Login from "./pages/login/Login"
import Signup from "./pages/signup/Signup"

function App() {

  const { user, authIsReady } = useAuthContext()
  const [isSideBarActive, setSideBarActive] = useState(false);

  const toggleSidebar = () => {
    setSideBarActive(!isSideBarActive);
  }


  return (
    <div className="App">
      {authIsReady &&
        <BrowserRouter>
            {user && isSideBarActive && <Sidebar toggleSidebar={toggleSidebar}/>}
          <div className="container">
            <Navbar toggleSidebar={toggleSidebar} isSideBarActive={isSideBarActive}/>
            <Routes>
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />}/>
              <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />}/>
              <Route path="/" element={user ? <Home /> : <Navigate to="/login" />}/>
            </Routes>
          </div>
        </BrowserRouter>
      }
    </div>
  );
}

export default App;
