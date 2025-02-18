import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserContextExports from '../Components/Usercontext';
import AdminProvider from '../AdminComponents/AdminContext';
import PrivateRoute from "../Components/PrivateRoute";
import AdminPrivaterouter from "../AdminComponents/AdminPrivaterouter";
import Signup from '../Components/Signup';
import Login from '../Components/Login';
import Home from '../Components/Home';  
import CompanyPage from '../Components/CompanyPage'; 
import Adminlogin from "../AdminComponents/Adminlogin";
import AdminSignup from "../AdminComponents/AdminSignup";
import InterviewForm from "../AdminComponents/InterviewForm";
import UploadedExperience from "../AdminComponents/UploadedExperience";
import AdminEdit from "../AdminComponents/AdminEdit";
import Jobspecific from "../Components/Jobspecific";

function App() {
  const { UserProvider } = UserContextExports;
   
  return (
    <Router>
      <UserProvider>
        <AdminProvider>
          <Routes>
            {/* User routes */}
            <Route path="/" element={<Signup/>} />
            <Route path="/login" element={<Login/>} />
            
            <Route path="/home" element={
              <PrivateRoute>
                <Home/>
              </PrivateRoute>
            } />
            <Route path="/company/:companyName" element={
              <PrivateRoute>
                <CompanyPage />
              </PrivateRoute>
            } />

           <Route path="/company/:companyName/:Typeofjob" element={
              <PrivateRoute>
                <Jobspecific/>
              </PrivateRoute>
            } />
             
            {/* Admin routes */}
            <Route path="/admin/signup" element={<AdminSignup/>} />
            <Route path="/admin/login" element={<Adminlogin/>} />
            <Route path="/admin/interviewform" element={
              <AdminPrivaterouter>
                <InterviewForm/>
              </AdminPrivaterouter>
            }/>
            <Route path="/admin/previousupload" element={
              <AdminPrivaterouter>
                <UploadedExperience/>
              </AdminPrivaterouter>
            }/>
            <Route path="/admin/editexperience/:id" element={
              <AdminPrivaterouter>
                <AdminEdit/>
              </AdminPrivaterouter>
            }/>

          </Routes>
        </AdminProvider>
      </UserProvider>
    </Router>
  )
}

export default App
