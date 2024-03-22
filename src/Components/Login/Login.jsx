import React, { useRef, useState } from 'react'
import './login.scss'
import glogo from '../../assets/search.png'
import { Form, Input, Button } from "antd";
import { useNavigate } from 'react-router-dom';
import {signInWithPopup, signInWithEmailAndPassword} from 'firebase/auth'
import { auth, provider } from '../../Firebase';
import Header from '../Header/Header';
import { toast} from 'react-toastify'

function Login() {
 

 const navigate = useNavigate()
 const formRef = useRef(null)
 const [load, setLoad] = useState({ emailAuth: false, googleAuth: false });


 const handleForm = async(value)=>{
  setLoad((prev) => ({ ...prev, emailAuth: true }));

  try{

    const email = value.email;
    const password = value.password;
    const result = await signInWithEmailAndPassword(auth, email, password)
    console.log(result)
    setLoad((prev) => ({ ...prev, emailAuth: false }));
    toast.success("Logged in successfully!", {
      position: "top-right",
      theme: `${localStorage.getItem('theme')}`
    });
  

    navigate('/dashboard')
    handleReset()

  }catch(error){
    console.log(error.message)
    setLoad((prev) => ({ ...prev, emailAuth: false }));

    toast.error(`${error.message}`, {
      position: "top-right",
      theme: `${localStorage.getItem('theme')}`
    });
    

  }

 }

 const handleReset = () => {
  formRef.current.resetFields(); // Reset the form fields
};

const handleLogByGoogle = () => {
  console.log('google login')
  setLoad((prev) => ({ ...prev, googleAuth: true }));

  signInWithPopup(auth, provider)
  .then((cred) => {
    // console.log('signed in', cred.user)
    setLoad((prev) => ({ ...prev, googleAuth: false }));

    toast.success("Logged in successfully !", {
      position: "top-right",
      theme: `${localStorage.getItem('theme')}`
    });

    navigate('/dashboard')
 
  })
  .catch(error =>{
    console.log(error.message)
    setLoad((prev) => ({ ...prev, googleAuth: false }));

    toast.error(`Something went wrong \n ${error.message}`, {
      position: "top-right",
      theme: `${localStorage.getItem('theme')}`
    });
  });

}

  return (
    <>
        <Header />
    <div className='login-container'>
    
      
       <div className="login-form-container">
      <Form layout="vertical" className='forms' onFinish={handleForm} ref={formRef}>
        <p className="head">Log In on <span>Financely.</span></p >
       

        <Form.Item
          label="Email"
          name="email"
          
        >
          <Input type="email" placeholder="JohnDoe@gmail.com"  variant="borderless"/>
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
      
        >
          <Input.Password type="password" placeholder="Example@123" variant="borderless"/>
        </Form.Item>
        
        <Button htmlType='submit' type="primary" loading={load.emailAuth} disabled={load.emailAuth}  block>Log In  with Email and Password</Button>
 
      </Form>
      <div className="btn-container">
        <p>or</p>
        <Button type="primary" loading={load.googleAuth} disabled={load.googleAuth} onClick={handleLogByGoogle} className="btn" block> <img src={glogo} style={{width: '20px', marginRight:'10px'}} alt="" /> Log In with Google</Button>
          <p>or Don't Have An Account ? <span className="click" onClick={()=> navigate('/')}>Click Here</span></p>
       </div>
    </div>
    </div>
    </>
  )
}

export default Login