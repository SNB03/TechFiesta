import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const FacultyDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ active: 0, pending: 0, hired: 0 });
  const [myPosts, setMyPosts] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get Admin Details
  const adminName = localStorage.getItem('name') || "Faculty";
  const collegeName = localStorage.getItem('userCollege') || "My Institute";
  
  // We need to fetch the College Code separately or store it on login. 
  // Ideally, store it in localStorage during login (we added this to auth.js previously).
  const adminCode = localStorage.getItem('collegeCode') || "LOADING..."; 

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { 'x-auth-token': token } };

      // Parallel Fetching for Speed
      const [postsRes, appsRes] = await Promise.all([
          axios.get('http://127.0.0.1:5000/api/opportunities/my-posts', config),
          axios.get('http://127.0.0.1:5000/api/opportunities/applications/my-jobs', config)
      ]);

      setMyPosts(postsRes.data);
      setApplications(appsRes.data);

      setStats({
          active: postsRes.data.length,
          pending: appsRes.data.filter(a => a.status === 'Pending').length,
          hired: appsRes.data.filter(a => a.status === 'Accepted').length
      });

    } catch (err) {
      console.error(err);
      toast.error("Failed to load data. Is backend running?");
    } finally {
      setLoading(false);
    }
  };

  // --- ACTIONS ---

  const handleDeleteJob = async (jobId) => {
      if(!window.confirm("Are you sure you want to delete this job?")) return;
      
      try {
          const token = localStorage.getItem('token');
          await axios.delete(`http://127.0.0.1:5000/api/opportunities/${jobId}`, {
              headers: { 'x-auth-token': token }
          });
          toast.success("Job Removed");
          fetchDashboardData(); // Refresh
      } catch (err) {
          toast.error("Delete Failed");
      }
  };

  const handleStatusUpdate = async (appId, newStatus) => {
      try {
          const token = localStorage.getItem('token');
          await axios.put(`http://127.0.0.1:5000/api/opportunities/application/${appId}/status`, 
            { status: newStatus },
            { headers: { 'x-auth-token': token } }
          );
          toast.success(`Application ${newStatus}`);
          fetchDashboardData();
      } catch (err) {
          toast.error("Update Failed");
      }
  };

  const copyCode = () => {
      navigator.clipboard.writeText(adminCode);
      toast.success("College Code Copied!");
  };

  // --- UI COMPONENTS ---
  
  const StatCard = ({ label, value, icon, color, bg }) => (
    <div style={{background: 'white', padding:'24px', borderRadius:'16px', border:`1px solid #e2e8f0`, display:'flex', alignItems:'center', gap:'20px', boxShadow:'0 4px 6px -1px rgba(0,0,0,0.05)'}}>
        <div style={{width:'50px', height:'50px', borderRadius:'12px', background: bg, color: color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.5rem'}}>
            {icon}
        </div>
        <div>
            <p style={{color:'#64748b', fontSize:'0.9rem', fontWeight:'500'}}>{label}</p>
            <h2 style={{fontSize:'2rem', fontWeight:'800', color:'#0f172a', lineHeight:'1'}}>{value}</h2>
        </div>
    </div>
  );

  if (loading) return <div style={{padding:'50px', textAlign:'center', color:'#64748b'}}>Loading Dashboard...</div>;

  return (
    <div className="container" style={{paddingTop:'40px', paddingBottom:'60px'}}>
      <Toaster position="top-right" />
      
      {/* HEADER SECTION */}
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'40px'}}>
        <div>
           <h1 style={{fontSize:'2.2rem', fontWeight:'800', color:'#1e293b', marginBottom:'5px'}}>Welcome, {adminName} 👋</h1>
           <p style={{color:'#64748b', fontSize:'1rem'}}>Manage placement drives for <span style={{color:'#4f46e5', fontWeight:'700'}}>{collegeName}</span></p>
        </div>
        
        <div style={{display:'flex', gap:'15px'}}>
             {/* Copy Code Button */}
            <div onClick={copyCode} style={{padding:'10px 20px', background:'#eff6ff', borderRadius:'10px', border:'1px dashed #3b82f6', cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center'}}>
                <span style={{fontSize:'0.7rem', color:'#3b82f6', fontWeight:'bold', textTransform:'uppercase'}}>Student Join Code</span>
                <span style={{fontSize:'1.1rem', fontWeight:'800', color:'#1d4ed8'}}>{adminCode} 📋</span>
            </div>

            <button onClick={() => navigate('/post')} className="btn-primary" style={{height:'fit-content', padding:'12px 24px', fontSize:'1rem', alignSelf:'center', boxShadow:'0 4px 12px rgba(79, 70, 229, 0.3)'}}>
               + Post Opportunity
            </button>
        </div>
      </div>

      {/* STATS GRID */}
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))', gap:'20px', marginBottom:'40px'}}>
         <StatCard label="Active Listings" value={stats.active} icon="📢" color="#4f46e5" bg="#e0e7ff" />
         <StatCard label="Pending Applications" value={stats.pending} icon="⏳" color="#f59e0b" bg="#fef3c7" />
         <StatCard label="Students Placed" value={stats.hired} icon="🎓" color="#10b981" bg="#dcfce7" />
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1.6fr', gap:'30px', alignItems:'start'}}>
          
          {/* LEFT: ACTIVE JOBS LIST */}
          <div style={{background:'white', borderRadius:'16px', border:'1px solid #e2e8f0', overflow:'hidden', boxShadow:'0 10px 15px -3px rgba(0,0,0,0.05)'}}>
              <div style={{padding:'20px', borderBottom:'1px solid #f1f5f9', background:'#f8fafc', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <h3 style={{fontWeight:'700', color:'#334155'}}>Your Postings</h3>
                  <span style={{fontSize:'0.8rem', background:'white', padding:'2px 8px', borderRadius:'10px', border:'1px solid #cbd5e1'}}>{myPosts.length} Active</span>
              </div>
              
              <div style={{maxHeight:'500px', overflowY:'auto', padding:'20px'}}>
                  {myPosts.length === 0 ? (
                      <div style={{textAlign:'center', color:'#94a3b8', padding:'20px'}}>
                          <p>No active jobs found.</p>
                          <button onClick={()=>navigate('/post')} style={{color:'#4f46e5', background:'none', border:'none', cursor:'pointer', marginTop:'5px'}}>Create one?</button>
                      </div>
                  ) : (
                      <div style={{display:'flex', flexDirection:'column', gap:'15px'}}>
                          {myPosts.map(post => (
                              <div key={post._id} style={{padding:'15px', border:'1px solid #e2e8f0', borderRadius:'12px', transition:'all 0.2s', background:'white'}}>
                                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
                                      <div>
                                          <h4 style={{fontWeight:'700', color:'#0f172a', marginBottom:'2px'}}>{post.title}</h4>
                                          <p style={{fontSize:'0.8rem', color:'#64748b'}}>{post.company} • {post.type}</p>
                                      </div>
                                      <button onClick={() => handleDeleteJob(post._id)} style={{background:'#fee2e2', color:'#991b1b', border:'none', borderRadius:'6px', padding:'5px 10px', cursor:'pointer', fontSize:'0.75rem'}}>
                                          🗑️ Remove
                                      </button>
                                  </div>
                                  <div style={{marginTop:'10px', paddingTop:'10px', borderTop:'1px dashed #e2e8f0', display:'flex', gap:'15px', fontSize:'0.75rem', color:'#64748b'}}>
                                      <span>📅 {new Date(post.createdAt).toLocaleDateString()}</span>
                                      <span>📍 {post.location}</span>
                                  </div>
                              </div>
                          ))}
                      </div>
                  )}
              </div>
          </div>

          {/* RIGHT: APPLICANT TABLE */}
          <div style={{background:'white', borderRadius:'16px', border:'1px solid #e2e8f0', overflow:'hidden', boxShadow:'0 10px 15px -3px rgba(0,0,0,0.05)'}}>
              <div style={{padding:'20px', borderBottom:'1px solid #f1f5f9', background:'#f8fafc'}}>
                  <h3 style={{fontWeight:'700', color:'#334155'}}>Recent Applications</h3>
              </div>
              
              <div style={{overflowX:'auto'}}>
                  <table style={{width:'100%', borderCollapse:'collapse', fontSize:'0.9rem', textAlign:'left'}}>
                      <thead style={{background:'#f8fafc', color:'#64748b', fontSize:'0.8rem', textTransform:'uppercase'}}>
                          <tr>
                              <th style={{padding:'15px'}}>Student</th>
                              <th style={{padding:'15px'}}>Applied For</th>
                              <th style={{padding:'15px'}}>Resume</th>
                              <th style={{padding:'15px'}}>Status</th>
                              <th style={{padding:'15px'}}>Action</th>
                          </tr>
                      </thead>
                      <tbody>
                          {applications.length === 0 ? (
                              <tr><td colSpan="5" style={{padding:'30px', textAlign:'center', color:'#94a3b8'}}>No applications received yet.</td></tr>
                          ) : (
                              applications.map(app => (
                                  <tr key={app._id} style={{borderBottom:'1px solid #f1f5f9'}}>
                                      <td style={{padding:'15px'}}>
                                          <div style={{fontWeight:'600', color:'#0f172a'}}>{app.studentId?.name || 'Unknown'}</div>
                                          <div style={{fontSize:'0.75rem', color:'#64748b'}}>
                                              {app.studentId?.branch || 'N/A'} • {app.studentId?.cgpa || '-'} CGPA
                                          </div>
                                      </td>
                                      <td style={{padding:'15px', color:'#334155'}}>{app.jobId?.title}</td>
                                      <td style={{padding:'15px'}}>
                                          {app.resumeLink ? (
                                              <a href={app.resumeLink} target="_blank" rel="noreferrer" style={{color:'#2563eb', textDecoration:'underline', fontSize:'0.85rem'}}>View PDF</a>
                                          ) : (
                                              <span style={{color:'#94a3b8', fontSize:'0.8rem'}}>No Link</span>
                                          )}
                                      </td>
                                      <td style={{padding:'15px'}}>
                                          <span style={{
                                              padding:'4px 12px', borderRadius:'20px', fontSize:'0.75rem', fontWeight:'bold',
                                              background: app.status === 'Accepted' ? '#dcfce7' : app.status === 'Rejected' ? '#fee2e2' : '#fff7ed',
                                              color: app.status === 'Accepted' ? '#166534' : app.status === 'Rejected' ? '#991b1b' : '#c2410c'
                                          }}>
                                              {app.status}
                                          </span>
                                      </td>
                                      <td style={{padding:'15px'}}>
                                          {app.status === 'Pending' && (
                                              <div style={{display:'flex', gap:'8px'}}>
                                                  <button onClick={() => handleStatusUpdate(app._id, 'Accepted')} style={{background:'#22c55e', color:'white', border:'none', width:'30px', height:'30px', borderRadius:'6px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center'}}>✓</button>
                                                  <button onClick={() => handleStatusUpdate(app._id, 'Rejected')} style={{background:'#ef4444', color:'white', border:'none', width:'30px', height:'30px', borderRadius:'6px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center'}}>✕</button>
                                              </div>
                                          )}
                                      </td>
                                  </tr>
                              ))
                          )}
                      </tbody>
                  </table>
              </div>
          </div>

      </div>
    </div>
  );
};

export default FacultyDashboard;