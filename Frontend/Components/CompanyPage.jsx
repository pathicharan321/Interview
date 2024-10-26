import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CompanyPage.css';
import config from '../config';

const CompanyPage = () => {
    const [Data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [Typeofjob,setTypeOfJob] = useState(''); 
    const { companyName } = useParams();
   const navigate=useNavigate();
    const handleChange=(e)=>{
      console.log(e.target.value);
      setTypeOfJob(e.target.value);
    }
    useEffect(()=>{
      if (Typeofjob) { 
        console.log(Typeofjob); 
        navigate(`/company/${companyName}/${Typeofjob}`);
     }
    },[Typeofjob,companyName]);
    useEffect(() => {
       const fetchdata = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${config.API_URL}/${companyName}`,{
            headers:{
              'Content-Type': 'application/json'
            },withCredentials: true
          });
          setData(response.data);
        }
        catch (err) {
          console.log(err);
        }
        setLoading(false);
      }
      fetchdata();
    }, [companyName])

    return (
      <div className="company-page">
        {loading && <div className="loading">Loading</div>}
        {!loading && (
          <div className="company-data">
            <nav className="navbar">
              <div className="container">
                <h1>{companyName}</h1>
                <div className="filter-section">
                  <label>Filter by Type of Job:</label>
                  <select
                    name="Typeofjob"
                    value={Typeofjob}
                    onChange={handleChange}
                  >
                    <option value="">--Please choose an option--</option>
                    <option value="Intern">Intern</option>
                    <option value="Full Time Position">
                      Full time Position
                    </option>
                  </select>
                </div>
              </div>
            </nav>
            {Data.map((doc, index) => (
              <div key={index} className="company-card">
                <h2 className="company-name">{doc.name}</h2>
                <p>
                  <strong>Company Name:</strong> {doc.company_name}
                </p>
                <p>
                  <strong>Position:</strong> {doc.position}
                </p>
                <p>
                  <strong>Compensation:</strong> {doc.compensation}
                </p>
                <p>
                  <strong>Number of Rounds:</strong> {doc.number_of_rounds}
                </p>
                <p>
                  <strong>Type of Job:</strong> {doc.Type_of_job}
                </p>
                <p>
                  <strong>Technical Rounds:</strong> {doc.Technical_rounds}
                </p>
                <p>
                  <strong>HR Round:</strong> {doc.HR_round}
                </p>

                <div className="rounds-section">
                  <strong>Rounds:</strong>
                  <ul className="rounds-list">
                    {doc.rounds.map((round, roundIndex) => (
                      <li key={roundIndex} className="round-item">
                        {round}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
}

export default CompanyPage;