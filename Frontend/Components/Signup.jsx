import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../config';

import { useNavigate } from 'react-router-dom';
import './Signup.css';
const Signup = () => {
  const [inputValue, setInputValue] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const Submitfunction = async (e) => {
    e.preventDefault();
    const data = {
      username: inputValue,
      password: password,
    };

    try {
      console.log("Sending request to signup...");
      const response = await axios.post(`${config.API_URL}/signup`, data, {
        headers: {
          'Content-Type': 'application/json',
          withCredentials: true
        }
      });

      console.log('Response:', response);

      if (response.status === 200) {
        toast.success('User created successfully! Please log in.');
        navigate('/login');
      } else {
        toast.error(response.data.message || 'Signup failed. Please try again.');
      }
    } catch (err) {
      console.error('Error during signup:', err); // Log the error object for more detail

      if (err.response) {
        // Server responded with an error
        console.error('Response data:', err.response.data);
        toast.error(err.response.data.message || 'Something went wrong. Please try again.');
      } else if (err.request) {
        // Request was made but no response was received
        console.error('Request data:', err.request);
        toast.error('No response from server. Please check your network connection.');
      } else {
        // Other errors
        console.error('Error message:', err.message);
        toast.error('An unexpected error occurred. Please try again.');
      }
    }
  };

  const inputChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };
  
  const gotoAdmin=(e)=>{
    navigate('/admin/signup');
  }
  const gotologin=(e)=>{
    navigate('/login');
  }
  return (
    <div>
      <form className='signup-form'onSubmit={Submitfunction}>
        <h1 className='signuphead'>Please Sign up</h1>
        <input className='signup-input'
          type="text"
          value={inputValue}
          onChange={inputChangeHandler}
          name="Username"
          placeholder="Enter Your Username"
          style={{ width: '220px' }}
        />
        <br />
        <input 
         className='signup-input'
          type="password"
          value={password}
          onChange={passwordChangeHandler}
          placeholder="Enter Your Password"
          style={{ width: '200px' }} // Consistent width with the username input
        />
        <br />
        <button className='signup-button' type="submit">Sign Up</button>
        <button  className='signup-button' id='signuploginbutton' onClick={gotologin}>Login As user</button>
      <button className='signup-button' id='gotoAdminButton'onClick={gotoAdmin}>Sign up as Admin</button>
      </form>
      <div >
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
};

export default Signup;
