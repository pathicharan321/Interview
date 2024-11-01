import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UploadedExperience.css'; // Importing the CSS file
import config from '../config';
import AdminLoading from './AdminLoading';
const UploadedExperience = () => {
  const [uploadData, SetuploadData] = useState([]);
  const [loading, Setloading] = useState(true);
  
  const navigate = useNavigate();

  useEffect(() => {
    const getallexp = async () => {
      Setloading(true);
      try {
        const response = await axios.get(`${config.API_URL}/admin/previousUpload`, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true});
          toast.success("Your  updata has been uploaded Successfully")
        SetuploadData(response.data);
      } catch (err) {
        toast.error('response.data.message');
        console.log(err);
      }
      Setloading(false);
    };
    getallexp();
  }, []);

  const editfunction = (id) => {
    navigate(`/admin/editexperience/${id}`);
  };

  return (
    <div className="experience-container">
      {loading && <AdminLoading/>}
      {!loading && uploadData.map((doc, index) => (
        <div key={index} className="experience-card">
          <p><strong>Name:</strong> {doc.name}</p>
          <p><strong>Company Name:</strong> {doc.company_name}</p>
          <p><strong>Position:</strong> {doc.position}</p>
          <p><strong>Compensation:</strong> {doc.compensation}</p>
          <p><strong>Number of Rounds:</strong> {doc.number_of_rounds}</p>
          <p><strong>Technical Rounds:</strong> {doc.Technical_rounds}</p>
          <p><strong>HR Round:</strong> {doc.HR_round}</p>
          <p><strong>Position:</strong> {doc.Type_of_job}</p>
          <div className="rounds">
            <strong>Rounds:</strong>
            <ul>
              {doc.rounds.map((round, roundIndex) => (
                <li key={roundIndex}>{round}</li>
              ))}
            </ul>
          </div>
          <button className="edit-button" onClick={() => editfunction(doc._id)}>Edit</button>
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
      ))}
    </div>
  );
};

export default UploadedExperience;
