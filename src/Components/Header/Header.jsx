import React, {  useEffect } from "react";
import "./header.scss";
import { useNavigate } from "react-router-dom";
import {signOut} from 'firebase/auth'
import { auth } from "../../Firebase";
import {UserOutlined} from '@ant-design/icons'
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from "react-toastify";

function Header({ login }) { 

  const navigate = useNavigate();
  const [user] = useAuthState(auth);

useEffect(()=>{
  if (user){ 

    navigate('/dashboard')
  }
},[user])

// console.log(user)
const logoutUser = async()=>{
  try{
   await signOut(auth);
    navigate("/login");
    toast.success('User logged out', {
      position: "top-right",
    })
  }catch(e){
    toast.error(`${e.message}`, {
      position: "top-right",
    })
  }

}

  return (
    <div className="header">
      <h3>Financely .</h3>
      {login && (
        <div
        className="logout"
        onClick={() => {
          logoutUser();
         
         }}
        >
         
        {user && user.photoURL ? <img src={`${user.photoURL}`}/> :  <UserOutlined />}
         <p>Logout</p>
        </div>
      )}
    </div>
  );
}

export default Header;
