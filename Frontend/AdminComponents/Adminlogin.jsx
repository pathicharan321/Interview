import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import {useState,useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AdminLogin.css';
import config from '../config';

const Adminlogin = () => {
    const [inputValue,setInputValue]=useState('');
    const [password,setpassword]=useState('');
    const navigate=useNavigate();
    const Submitfunction= async (e)=>{
      e.preventDefault();
      const data = {
          username:inputValue,
          password:password
      };
      try{
        const response= await axios.post(`${config.API_URL}/admin/login`, data, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        })
        localStorage.setItem('admintoken',response.data.adminusername);
        navigate('/admin/interviewform');
      }
      catch(err){
        if (err.response && err.response.data && err.response.data.message) {
          toast.error(err.response.data.message); // Show the error message from the backend
        } else {
          toast.error('An unexpected error occurred'); // Default error message
        }
      }
      
    }
   const inputChangeHandler=(e) =>{
      setInputValue(e.target.value);
    }
    const passwordChangeHandler=(e)=>{
      setpassword(e.target.value);
    }
    return (
        <div>
          
          <form  className='login-form'onSubmit={Submitfunction}>
           <h1 className='headadminlogin'>Admin Log In</h1>
            <input className='login-input'  type="text" value={inputValue} onChange={inputChangeHandler} name='Username' placeholder='Enter Your UserName' ></input>
            <br/>
            <input  className='login-input'type="password" value={password} onChange={passwordChangeHandler} placeholder='Enter Your Paaword'></input>
            <br />
            <button className='login-button' type="submit">Login</button>
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

      )
}

export default Adminlogin
