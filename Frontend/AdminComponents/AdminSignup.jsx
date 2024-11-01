import React,{ useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './AdminSignup.css'
import config from '../config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLoading from './AdminLoading';
const AdminSignup = () => {
    const [inputValue,setInputValue]=useState('');
    const [password,setpassword]=useState('');
    const[loading,setLoading]=useState(false);
    const navigate=useNavigate();
    const Submitfunction= async (e)=>{
      e.preventDefault();
      const data = {
          username:inputValue,
          password:password
      };
      try{
        setLoading(true);
        const response=await axios.post(`${config.API_URL}/admin/signup`, data, {
          headers: {
            'Content-Type': 'application/json' // Specify the content type
          },
          withCredentials: true
        })
        if(response.status==200){
          navigate('/admin/login');
        }
      }
      catch(err){
        if (err.response && err.response.data && err.response.data.message) {
          toast.error(err.response.data.message); // Show the error message from the backend
        } else {
          toast.error('An unexpected error occurred'); // Default error message
        }
      }
      finally{
        setLoading(false);
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
        
       {!loading&& <form onSubmit={Submitfunction} className='signup-form'>
           <h1 className='adminhead'>Admin SignUp</h1>
          <input type="text" className='signup-input' value={inputValue} onChange={inputChangeHandler} name='Username' placeholder='Enter Your UserName'></input>
          <input type="password" className='signup-input' value={password} onChange={passwordChangeHandler} placeholder='Enter Your Paaword'></input>
          <button  type="submit" className='signup-button' >Sign Up</button>
          </form>}
          {loading&&<AdminLoading/>}
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

export default AdminSignup
