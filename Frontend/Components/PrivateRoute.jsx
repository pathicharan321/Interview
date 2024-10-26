import React, { useContext,useEffect } from 'react'
import UserContextExports from './Usercontext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
  const{Usercontext}=UserContextExports;
  const {istoken}=useContext(Usercontext);
  return(
    <div>
    {istoken()? children :<Navigate to="/login" />}
    </div>
  )
}

export default PrivateRoute