import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AdminEdit.css'; // Make sure this path is correct
import config from '../config';
import AdminLoading from './AdminLoading';
const AdminEdit = () => {
  const { id } = useParams();
  const [setData, updatesetData] = useState(null);
  const [loading, updateloading] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    company_name: '',
    position: '',
    compensation: '',
    number_of_rounds: 0,
    Technical_rounds: 0,
    HR_Round: 0,
    Type_of_job:'',
    rounds: []
  });

  useEffect(() => {
    const bringData = async () => {
      updateloading(true);
      try {
        const response = await axios.get(`${config.API_URL}/admin/Update/${id}`, { withCredentials: true });
        updatesetData(response.data);
      } catch (err) {
        toast.error(err.response.data.message||'Internak Server Error');
        navigate('/admin/update');
      } finally {
        updateloading(false);
      }
    };
    bringData();
  }, [id]);

  useEffect(() => {
    if (setData) {
      setFormData({
        name: setData[0].name,
        company_name: setData[0].company_name,
        position: setData[0].position,
        compensation: setData[0].compensation,
        number_of_rounds: setData[0].number_of_rounds,
        Technical_rounds: setData[0].Technical_rounds,
        HR_Round: setData[0].HR_Round,
        Type_of_job:setData[0].Type_of_job,
        rounds: setData[0].rounds
      });
    }
  }, [setData]);
  
  useEffect(() => {
  }, [formData]);

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
            name={`round${i + 1}`}
            value={formData.rounds[i] || ''}
            onChange={(e) => handleRoundChange(i, e)}
            placeholder="Type of Round"
          />
        </div>
      );
    }
    return roundsInputs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: formData.name,
      company_name: formData.company_name,
      position: formData.position,
      compensation: formData.compensation,
      number_of_rounds: formData.number_of_rounds,
      Type_of_job:formData.Type_of_job,
      rounds: formData.rounds,
      technicalround: formData.Technical_rounds,
      hrround: formData.HR_Round,
    };

    try {
      updateloading(true);
      const response = await axios.put(`${config.API_URL}/admin/Update/${setData[0]._id}`, data,{
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if (response.status === 200) {
        toast.success('Item Updated Successfully');
        navigate('/admin/previousupload');
      }
    } catch (err) {
      toast.error(err.response.data.message||'Internal Server Error');
      navigate('/admin/previousupload');
    }
    finally{
      updateloading(false);
    }
  };

  return (
    <div className="admin-edit-container">
      {loading &&<AdminLoading/>}
      {!loading && (
        <div>
        <form onSubmit={handleSubmit} className="edit-form">
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
            <label>Type of Job</label>
            <select name="Type_of_job"  value={formData.Type_of_job} onChange={handleChange}>
                <option value="">--Please choose an option--</option>
                <option value="Intern">Intern</option>
                <option value="Full Time Position">Full time Position</option>
          </select>
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
          {renderRoundInputs()}
          <button type="submit" className="submit-button">Submit</button>
        </form>
        
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
      )}
    </div>
  );
};

export default AdminEdit;


   


