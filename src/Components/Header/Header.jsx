import React, {  useEffect, useState } from "react";
import "./header.scss";
import { useNavigate } from "react-router-dom";
import {signOut} from 'firebase/auth'
import { auth } from "../../Firebase";
import {UserOutlined} from '@ant-design/icons'
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from "react-toastify";
import {Switch} from 'antd'

function Header({ login }) { 
  const [theme, setTheme] = useState('light');
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

useEffect(()=>{
  if (user){ 

    navigate('/dashboard')
  }
},[user])
useEffect(()=>{
  const saveTheme = localStorage.getItem('theme');
  setTheme(localStorage.getItem('theme'))
  themeSet(saveTheme);
},[])

// console.log(user)
const logoutUser = async()=>{
  try{
   await signOut(auth);
    navigate("/login");
    toast.success('User logged out', {
      position: "top-right",
      theme: `${localStorage.getItem('theme')}`
    })
  }catch(e){
    toast.error(`${e.message}`, {
      position: "top-right",
      theme: `${localStorage.getItem('theme')}`
    })
  }

}

const changeTheme = (value) => {
  const newTheme = value? 'dark' : 'light' ;

  localStorage.setItem('theme', newTheme);
  setTheme(newTheme);
   themeSet(newTheme);
 
};

const themeSet = (appliedTheme)=>{
  console.log(appliedTheme);

 if(appliedTheme === 'dark'){
  document.body.classList.add('dark');
    document.body.classList.remove('light')
 }
 else{
  document.body.classList.add('light');
  document.body.classList.remove('dark'); }

}

  return (
    <div className="header">
      <h3>Financely .</h3>
      <div className="right-of-header">
      <Switch
        checked={theme === 'dark'}
      onChange={changeTheme}   
      />

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
    </div>
  );
}

export default Header;
