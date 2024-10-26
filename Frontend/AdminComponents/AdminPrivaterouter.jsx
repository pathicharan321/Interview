import React, { useContext } from 'react'
import {Admincontext} from './AdminContext';
import { Navigate } from 'react-router-dom';
const AdminPrivaterouter = ({children}) => {
  const{isadminAuthenticated}=useContext(Admincontext);
  return (isadminAuthenticated()?children:<Navigate to='/admin/login'/>)
}

export default AdminPrivaterouter