
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../config';

import './CompanyPage.css';

const Jobspecific = () => {
    const [Data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { companyName, Typeofjob } = useParams();
    console.log(companyName);
    console.log(Typeofjob);
    useEffect(() => {
       const fetchdata = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${config.API_URL}/company/${companyName}/${Typeofjob}`,{
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
              {Data.map((doc, index) => (
                <div key={index} className="company-card">
                  <h2 className="company-name">{doc.name}</h2>
                  <p><strong>Company Name:</strong> {doc.company_name}</p>
                  <p><strong>Position:</strong> {doc.position}</p>
                  <p><strong>Compensation:</strong> {doc.compensation}</p>
                  <p><strong>Number of Rounds:</strong> {doc.number_of_rounds}</p>
                  <p><strong>Type of Job:</strong> {doc.Type_of_job}</p>
                  <p><strong>Technical Rounds:</strong> {doc.Technical_rounds}</p>
                  <p><strong>HR Round:</strong> {doc.HR_round}</p>
                  
                  <div className="rounds-section">
                    <strong>Rounds:</strong>
                    <ul className="rounds-list">
                      {doc.rounds.map((round, roundIndex) => (
                        <li key={roundIndex} className="round-item">{round}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )
}

export default Jobspecific