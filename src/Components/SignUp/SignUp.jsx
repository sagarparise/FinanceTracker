import React, { useRef, useState } from "react";
import { Form, Input, Button } from "antd";
import "./sign.scss";
import { useNavigate } from "react-router-dom";
import glogo from "../../assets/search.png";
import Header from "../Header/Header";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, provider, db } from "../../Firebase";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

function SignUp() {
  const navigate = useNavigate();
  const [load, setLoad] = useState({ emailAuth: false, googleAuth: false });
  const formRef = useRef(null);

  //Authication using email and password
  const handleForm = async (value) => {
    setLoad((prev) => ({ ...prev, emailAuth: true }));
    // console.log(value);
    const name = value.fullName;
    const email = value.email;
    const password = value.password;
    const confirmPassword = value.confirmPassword;

    if (name && email && password && confirmPassword) {
      if (confirmPassword === password) {


         try {
          const result = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          // console.log(result);
          const user = result.user;
          console.log(user);

          //we have to update credentials profile

          await updateProfile(user, {
            displayName: value.fullName,
          });
            // create a doc with user id
          const userRef = doc(db, "users", user.uid);
          const data = {
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
          };
          setDoc(userRef, data);
          setLoad((prev) => ({ ...prev, emailAuth: false }));

          toast.success("Account created !", {
            position: "top-right",
          });
          navigate("/dashboard");
        
        
        } catch (error) {
          console.log(error.message);
          setLoad((prev) => ({ ...prev, emailAuth: false }));
          toast.error(`${error.message}`, {
            position: "top-right",
            theme: `${localStorage.getItem('theme')}`
          });

          
        }
      } else {
        toast.error("Password does not match!", {
          position: "top-right",
          theme: `${localStorage.getItem('theme')}`
        });
        setTimeout(() => {
          setLoad((prev) => ({ ...prev, emailAuth: false }));
        }, 500);
      }
    } else {
      toast.error("Please fill all the fields!", {
        position: "top-right",
        theme: `${localStorage.getItem('theme')}`
      });
      setTimeout(() => {
        setLoad((prev) => ({ ...prev, emailAuth: false }));
      }, 500);
    }
  };

  // authenticate using google auth

  const handleLogByGoogle = async () => {
    setLoad((prev) => ({ ...prev, googleAuth: true }));

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userRef = doc(db, "users", user.uid);
      const data = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
      };
      setDoc(userRef, data);
      setLoad((prev) => ({ ...prev, googleAuth: false }));
      toast.success("User created !", {
        position: "top-right",
        theme: `${localStorage.getItem('theme')}`
      });

      navigate("/dashboard");
    } catch (error) {
      console.log(error.message);
      setLoad((prev) => ({ ...prev, googleAuth: false }));
      toast.error(`${error.message}`, {
        position: "top-right",
        theme: `${localStorage.getItem('theme')}`
      });
    }
  };

  const handleReset = () => {
  
    formRef.current.resetFields(); // Reset the form fields
  };

  return (
    <>
      <Header />
      <div className="main-container">
        <div className="form-container">
          <Form layout="vertical" onFinish={handleForm} ref={formRef}>
            <p className="head">
              Sign Up on <span>Financely.</span>
            </p>
            <Form.Item label="Full Name" name="fullName">
              <Input type="text" placeholder="John Doe" variant="borderless" />
            </Form.Item>

            <Form.Item label="Email" name="email">
              <Input
                type="email"
                placeholder="JohnDoe@gmail.com"
                variant="borderless"
              />
            </Form.Item>

            <Form.Item label="Password" name="password">
              <Input.Password
                type="password"
                placeholder="Example@123"
                variant="borderless"
              />
            </Form.Item>

            <Form.Item label="Confirm Password" name="confirmPassword">
              <Input.Password
                type="password"
                placeholder="Example@123"
                variant="borderless"
              />
            </Form.Item>
            <Button
              type="primary"
              loading={load.emailAuth}
              htmlType="submit"
              block
              disabled={load.emailAuth}
            >
              Sign Up with Email and Password
            </Button>
          </Form>

          <div className="btn-container">
            <p>or</p>
            <Button
              type="primary"
              onClick={handleLogByGoogle}
              loading={load.googleAuth}
              className="btn"
              block
              disabled={load.googleAuth}
            >
              {" "}
              <img
                src={glogo}
                style={{ width: "20px", marginRight: "10px" }}
                alt=""
              />{" "}
              Sign Up with Google
            </Button>
            <p>
              or Have An Account Already?{" "}
              <span className="click" onClick={() => navigate("/login")}>
                Click Here
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
