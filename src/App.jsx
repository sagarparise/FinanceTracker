
import "./App.css";
import SignUp from "./Components/SignUp/SignUp";
import Login from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import Error from "./Components/Error";
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";
function App() {
  const [user] = useAuthState(auth);

  return (
    <>
   
    <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        {user && <Route path="/dashboard" element={<Dashboard/>} />}
          <Route path="/*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
