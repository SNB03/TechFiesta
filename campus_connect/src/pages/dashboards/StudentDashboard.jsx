import { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const StudentDashboard = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get user details
  const userCollege = localStorage.getItem('userCollege');
  const userName = localStorage.getItem('name') || 'Student';

  useEffect(() => {
    const fetchOpps = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://127.0.0.1:5000/api/opportunities', {
          headers: { 'x-auth-token': token }
        });

        // FILTER LOGIC: 
        // Show jobs that are either "General" (All) OR match the student's college
        const filtered = res.data.filter(opp => 
           !opp.collegeName || opp.collegeName === 'General' || opp.collegeName === userCollege
        );

        setOpportunities(filtered);
      } catch (err) {
        toast.error("Failed to load opportunities");
      } finally {
        setLoading(false);
      }
    };
    fetchOpps();
  }, [userCollege]);

  const handleApply = async (jobId) => {
      const token = localStorage.getItem('token');
      try {
          await axios.post(`http://127.0.0.1:5000/api/opportunities/${jobId}/apply`, {}, {
              headers: { 'x-auth-token': token }
          });
          toast.success("Applied Successfully!");
      } catch (err) {
          toast.error(err.response?.data?.msg || "Application Failed");
      }
  };

  // --- STYLES ---
  const styles = {
      card: { background: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', height: '100%', transition: 'transform 0.2s' },
      badge: { background: '#e0e7ff', color: '#4338ca', padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', width: 'fit-content' },
      grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px' }
  };

  return (
    <div className="container" style={{paddingTop: '40px'}}>
      <Toaster position="top-center"/>
      
      <div style={{marginBottom: '30px'}}>
        <h1 style={{fontSize: '2rem', fontWeight: '800', color: '#0f172a'}}>Hello, {userName} 👋</h1>
        <p style={{color: '#64748b'}}>
            Opportunities for <span style={{fontWeight:'bold', color:'#4f46e5'}}>{userCollege || 'General Pool'}</span>
        </p>
      </div>

      {loading ? <p>Loading...</p> : (
        <div style={styles.grid}>
          {opportunities.length === 0 ? (
             <div style={{gridColumn: '1/-1', textAlign:'center', padding:'40px', background:'#f8fafc', borderRadius:'12px'}}>
                 <h3>No opportunities found currently.</h3>
                 <p>Check back later!</p>
             </div>
          ) : (
             opportunities.map((opp) => (
                <div key={opp._id} style={styles.card}>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'start'}}>
                      <span style={styles.badge}>{opp.type}</span>
                      <span style={{fontSize:'0.8rem', color:'#94a3b8'}}>{new Date(opp.createdAt).toLocaleDateString()}</span>
                  </div>
                  
                  <h3 style={{fontSize:'1.25rem', marginTop:'15px', marginBottom:'5px', color:'#1e293b'}}>{opp.title}</h3>
                  <p style={{fontSize:'0.9rem', color:'#64748b', fontWeight:'600'}}>{opp.company}</p>
                  
                  <p style={{fontSize:'0.9rem', color:'#475569', margin:'15px 0', flex:1, lineHeight:'1.5', display:'-webkit-box', WebkitLineClamp:'3', WebkitBoxOrient:'vertical', overflow:'hidden'}}>
                      {opp.description}
                  </p>
                  
                  <div style={{marginBottom:'15px'}}>
                      <p style={{fontSize:'0.8rem', fontWeight:'bold', marginBottom:'5px'}}>Skills:</p>
                      <div style={{display:'flex', gap:'5px', flexWrap:'wrap'}}>
                          {opp.skills.map((skill, i) => (
                              <span key={i} style={{fontSize:'0.75rem', padding:'2px 8px', border:'1px solid #cbd5e1', borderRadius:'4px', color:'#475569'}}>{skill}</span>
                          ))}
                      </div>
                  </div>

                  <button 
                    onClick={() => handleApply(opp._id)}
                    style={{width:'100%', padding:'10px', background:'#0f172a', color:'white', border:'none', borderRadius:'6px', fontWeight:'600', cursor:'pointer'}}>
                      Apply Now
                  </button>
                </div>
             ))
          )}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;