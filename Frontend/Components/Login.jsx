import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import config from '../config';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css'
const Login = () => {
    const navigate = useNavigate(); 
    const [inputValue,setInputValue]=useState('');
    const [password,setpassword]=useState('');
    const Submitfunction= async (e)=>{
      e.preventDefault();
      const data = {
          username:inputValue,
          password:password
      };
      try{
        const response= await axios.post(`${config.API_URL}/login`, data, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        })
        console.log(response.data);
        if(response.status==200){
          let userToken=response.data.token;
          localStorage.setItem('usertoken', userToken);
          navigate('/home');
        }
      }
      catch(err){
        if (err.response && err.response.data && err.response.data.message) {
          toast.error(err.response.data.message); // Show the error message from the backend
        } else {
          toast.error('An unexpected error occurred'); // Default error message
        }
      }
    }
   const gotoSignup=(e)=>{
    navigate('/');
   }
   const gotoAdminlogin=(e)=>{
    navigate('/admin/login');
   }
   const inputChangeHandler=(e) =>{
      setInputValue(e.target.value);
    }
    const passwordChangeHandler=(e)=>{
      setpassword(e.target.value);
    }
    return (
      <div>
        <form className="login-form" onSubmit={Submitfunction}>
          <h1 className="headlogin">Please Log in</h1>
          <input
            className="login-input"
            type="text"
            value={inputValue}
            onChange={inputChangeHandler}
            name="Username"
            placeholder="Enter Your Username"
          />
          <br />
          <input
            className="login-input"
            type="password"
            value={password}
            onChange={passwordChangeHandler}
            placeholder="Enter Your Password"
          />
          <br />
          <button className="login-button" type="submit">
            Log in
          </button>
          <button
            className="login-button"
            onClick={gotoSignup}
          >
            Sign Up
          </button>
          <button
            className="login-button"
            onClick={gotoAdminlogin}
          >
            Login As admin
          </button>
        </form>
        <div>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            draggable
            theme="colored"
          />
        </div>
      </div>
    );
}

export default Login
