import { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [opportunities, setOpportunities] = useState([]);

  useEffect(() => {
    const fetchOpps = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/opportunities', {
        headers: { 'x-auth-token': token }
      });
      setOpportunities(res.data);
    };
    fetchOpps();
  }, []);

  return (
    <div>
      <h1>Opportunities Feed</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {opportunities.map((opp) => (
          <div key={opp._id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
            <h3>{opp.title}</h3>
            <p><strong>{opp.companyOrFaculty}</strong> | <span style={{color: 'blue'}}>{opp.type}</span></p>
            <p>{opp.description}</p>
            <p><strong>Skills:</strong> {opp.skillsRequired.join(', ')}</p>
            <button style={{ background: 'green', color: 'white', padding: '8px', border: 'none', cursor: 'pointer' }}>
                Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;