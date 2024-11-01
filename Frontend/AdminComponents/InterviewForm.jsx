
import React from 'react'
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './InterviewForm.css';
import config from '../config';
import AdminLoading from './AdminLoading';

const InterviewForm = () => {
  const navigate = useNavigate();
  const[loading,Setloading]=useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company_name: '',
    position: '',
    compensation: '',
    number_of_rounds: 0,
    Technical_rounds: 0,
    Type_of_job:'',
    HR_Round: 0,
    rounds: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRoundChange = (index, e) => {
    const { value } = e.target;
    const updatedRounds = [...formData.rounds];
    updatedRounds[index] = value;
    setFormData((prevState) => ({
      ...prevState,
      rounds: updatedRounds
    }));
  };

  const renderRoundInputs = () => {
    const roundsInputs = [];
    for (let i = 0; i < formData.number_of_rounds; i++) {
      roundsInputs.push(
        <div key={i} className="form-group round-input">
          <label>Round {i + 1} Details:</label>
          <textarea
            name="roundtype"
            value={formData.rounds[i] || ''}
            onChange={(e) => handleRoundChange(i, e)}
            placeholder="Type of Round"
            rows="4"  // This sets the initial number of visible text lines
          />
        </div>
      );
    }
    return roundsInputs;
  };

  const gotoprevupload = (e) => {
    navigate('/admin/previousupload');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: formData.name,
      company_name: formData.company_name,
      position: formData.position,
      compensation: formData.compensation,
      number_of_rounds: formData.number_of_rounds,
      rounds: formData.rounds,
      technicalround: formData.Technical_rounds,
      Type_of_job:formData.Type_of_job,
      hrround: formData.HR_Round
    };

    try {
      Setloading(true);
      const response = await axios.post(`${config.API_URL}/admin/Submitform`, data, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      toast.success(response.data.message);
      navigate('/admin/previousupload');
    } 
    catch (err) {
      if (err.response && err.response.data) {
        toast.error(err.response.data.message);
      } else {
        toast.error('Something went wrong!');
      }
    }
    finally{
      Setloading(false);
    }
  };

  return (
    <div>
    {!loading&&<div>
      <div className='upsidediv'>
      <button onClick={gotoprevupload} className="previous-uploads-button">Show previous Uploads</button>
      </div>
     <div className="interview-form-container">
      <form onSubmit={handleSubmit} className="interview-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </div>
        
        <div className="form-group">
          <label>Company Name:</label>
          <input
            type="text"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            placeholder="Enter company name"
          />
        </div>
        
        <div className="form-group">
          <label>Position:</label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            placeholder="Enter position"
          />
        </div>
        
        <div className="form-group">
          <label>Compensation:</label>
          <input
            type="text"
            name="compensation"
            value={formData.compensation}
            onChange={handleChange}
            placeholder="Enter compensation"
          />
        </div>

        <div className="form-group">
          <label>Type of Job</label>
          <select name="Type_of_job"  value={formData.Type_of_job} onChange={handleChange}>
                <option value="">--Please choose an option--</option>
                <option value="Intern">Intern</option>
                <option value="Full Time Position">Full time Position</option>
          </select>
        </div>

        <div className="form-group">
          <label>Number of Rounds:</label>
          <input
            type="number"
            name="number_of_rounds"
            value={formData.number_of_rounds}
            onChange={handleChange}
            placeholder="Enter number of rounds"
            min="0"
          />
        </div>

        <div className="form-group">
          <label>No of Technical Rounds:</label>
          <input
            type="number"
            name="Technical_rounds"
            value={formData.Technical_rounds}
            onChange={handleChange}
            placeholder="Enter number of Technical rounds"
            min="0"
          />
        </div>

        <div className="form-group">
          <label>No of HR Rounds:</label>
          <input
            type="number"
            name="HR_Round"
            value={formData.HR_Round}
            onChange={handleChange}
            placeholder="Enter number of HR rounds"
            min="0"
          />
        </div>

        <div className="round-inputs">
          {renderRoundInputs()}
        </div>
         
        <button type="submit" className="submit-button">Submit</button>
      </form>
      
    </div>
    </div>}
    {loading&&<AdminLoading/>}
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
  );
};

export default InterviewForm;

