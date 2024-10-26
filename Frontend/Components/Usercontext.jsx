import { createContext, useState, useEffect } from 'react';
import axios from 'axios'; // Ensure axios is imported

const Usercontext = createContext();

const UserProvider = ({ children }) => {
  const [Data, SetData] = useState(null);
  const istoken=()=>{
    const token = localStorage.getItem('usertoken');
    if (token) {
     return true;
    }
    return false;
  }
  return (
    <Usercontext.Provider value={{istoken}}>
      {children}
    </Usercontext.Provider>
  );
 };

const UserContextExports = { Usercontext, UserProvider };

export default UserContextExports;

