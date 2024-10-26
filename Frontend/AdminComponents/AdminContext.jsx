import { createContext,useState } from "react";
import React from 'react'
const Admincontext=createContext();
const AdminProvider = ({children}) => {
  const isadminAuthenticated=(e)=>{
    const admintoken = localStorage.getItem('admintoken');
    if(admintoken){
      return true;
    }
    return false;
  }
  return (
    <Admincontext.Provider value={{isadminAuthenticated}}>
        {children}
    </Admincontext.Provider>
  )
}


export default AdminProvider;
export { Admincontext };