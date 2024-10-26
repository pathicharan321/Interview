import {useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';

import './Home.css'
const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${config.API_URL}/home`, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true
        });
        if(response.status!=200){
          navigate('login');
        }
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleCompanyClick = (company) => {
    navigate(`/company/${company}`);
  };

  return (
    <div className="home-container">
      {loading && <div className="loading">Loading</div>}
      {!loading && (
        <div className="company-list">
          {data.map((company) => (
            <button 
              key={company} 
              onClick={() => handleCompanyClick(company)}
              className="company-button"
            >
              {company}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
