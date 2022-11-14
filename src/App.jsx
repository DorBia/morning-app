import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import './App.scss';
import { useAuthContext } from "./hooks/useAuthContext";
import Home from "./pages/home/Home";

import Login from "./pages/login/Login"
import Signup from "./pages/signup/Signup"

function App() {

  const { user, authIsReady } = useAuthContext()


  return (
    <div className="App">
      {authIsReady &&
        <BrowserRouter>
          <div className="container">
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
