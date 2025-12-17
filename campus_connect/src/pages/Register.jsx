import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();

  // --- STEPS & STATE ---
  const [step, setStep] = useState(1);
  const [tempUserId, setTempUserId] = useState(null);
  const [otp, setOtp] = useState('');
  const [file, setFile] = useState(null);

  // --- FORM DATA ---
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', role: 'student',
    state: '', district: '', collegeName: ''
  });

  // --- DYNAMIC DATA LISTS ---
  const [statesList, setStatesList] = useState([]);      
  const [districtsList, setDistrictsList] = useState([]); 
  const [collegesList, setCollegesList] = useState([]);   
  const [isLoading, setIsLoading] = useState(false);
  const [isManualCollege, setIsManualCollege] = useState(false); // Toggle for manual entry

  // --- 1. SETUP & FETCH STATES ON LOAD ---
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roleParam = params.get('role');
    if (roleParam) setFormData(prev => ({ ...prev, role: roleParam }));

    // Fetch States
    const fetchStates = async () => {
      try {
        const res = await axios.get('https://raw.githubusercontent.com/sab99r/Indian-States-And-Districts/master/states-and-districts.json');
        // Sort States Alphabetically
        const sortedStates = res.data.states.sort((a, b) => a.state.localeCompare(b.state));
        setStatesList(sortedStates);
      } catch (err) {
        console.error("Failed to fetch states", err);
      }
    };
    fetchStates();
  }, [location]);

  // --- 2. HANDLE STATE CHANGE (Load Districts) ---
  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setFormData({ ...formData, state: selectedState, district: '', collegeName: '' });

    const stateObj = statesList.find(s => s.state === selectedState);
    if (stateObj) {
      // Sort Districts Alphabetically
      setDistrictsList(stateObj.districts.sort((a, b) => a.localeCompare(b)));
    } else {
      setDistrictsList([]);
    }
    setCollegesList([]);
  };

  // --- 3. HANDLE DISTRICT CHANGE (Load Colleges) ---
  const handleDistrictChange = async (e) => {
    const selectedDistrict = e.target.value;
    setFormData({ ...formData, district: selectedDistrict, collegeName: '' });
    setIsLoading(true);
    setIsManualCollege(false); // Reset manual toggle

    try {
      // Fetching from Hipolabs (Best free source)
      const res = await axios.get(`http://universities.hipolabs.com/search?country=India`);
      
      // Filter & Sort Alphabetically
      // Note: Since API returns ALL India, we filter for common keywords or just show all sorted
      // In a real production app with 50k colleges, you'd use a paid API or your own DB.
      // Here we sort the entire list A-Z.
      const sortedColleges = res.data
        .map(c => c.name)
        .sort((a, b) => a.localeCompare(b));

      setCollegesList(sortedColleges);
      
    } catch (err) {
      console.error("Failed to fetch colleges");
    } finally {
      setIsLoading(false);
    }
  };

  // --- SUBMIT REGISTRATION ---
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (file) data.append('verificationDoc', file);

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setTempUserId(res.data.userId);
      setStep(2);
      alert('Registration initiated! Check email for OTP.');
    } catch (err) {
      alert(err.response?.data?.msg || 'Registration failed');
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/verify-otp', { userId: tempUserId, otp });
      if (formData.role === 'faculty') alert(`Your Admin ID: ${res.data.collegeCode}`);
      else alert('Verification Successful!');
      navigate('/login');
    } catch (err) {
      alert('Invalid OTP');
    }
  };

  const downloadForm = () => {
    const element = document.createElement("a");
    const file = new Blob(["I, [Name], hereby confirm that I am an authorized faculty member..."], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "Auth_Form.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="container" style={{paddingTop: '60px'}}>
      <div className="form-card">
        
        {step === 1 && (
          <>
            <h2 style={{textAlign: 'center', marginBottom:'10px'}}>Create Account</h2>
            
            <form onSubmit={handleRegisterSubmit}>
              <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} style={{marginBottom:'15px'}}>
                  <option value="student">Student</option>
                  <option value="faculty">Faculty / Admin</option>
              </select>

              <input type="text" placeholder="Full Name" required onChange={e => setFormData({...formData, name: e.target.value})} />
              <input type="email" placeholder="Email" required onChange={e => setFormData({...formData, email: e.target.value})} />
              <input type="password" placeholder="Password" required onChange={e => setFormData({...formData, password: e.target.value})} />

              {/* FACULTY SECTION */}
              {formData.role === 'faculty' && (
                <div style={{background: '#f8fafc', padding:'15px', borderRadius:'12px', border:'1px solid #e2e8f0', margin:'20px 0'}}>
                  <h4 style={{margin:'0 0 10px 0'}}>🏛️ Live Institution Details</h4>
                  
                  {/* 1. STATE */}
                  <label style={{fontSize:'0.8rem', fontWeight:'bold'}}>State</label>
                  <select onChange={handleStateChange} required>
                    <option value="">-- Select State --</option>
                    {statesList.map((obj, index) => (
                      <option key={index} value={obj.state}>{obj.state}</option>
                    ))}
                  </select>

                  {/* 2. DISTRICT */}
                  <label style={{fontSize:'0.8rem', fontWeight:'bold', marginTop:'10px', display:'block'}}>District</label>
                  <select onChange={handleDistrictChange} disabled={!formData.state} required>
                    <option value="">-- Select District --</option>
                    {districtsList.map((dist, index) => (
                      <option key={index} value={dist}>{dist}</option>
                    ))}
                  </select>

                  {/* 3. COLLEGE (With Manual Entry Toggle) */}
                  <label style={{fontSize:'0.8rem', fontWeight:'bold', marginTop:'10px', display:'block'}}>College</label>
                  
                  {!isManualCollege ? (
                    <select 
                      onChange={e => setFormData({...formData, collegeName: e.target.value})} 
                      disabled={!formData.district} 
                      required
                    >
                      <option value="">-- Select College --</option>
                      {isLoading ? <option>Loading...</option> : null}
                      {collegesList.map((college, index) => (
                        <option key={index} value={college}>{college}</option>
                      ))}
                    </select>
                  ) : (
                    <input 
                      type="text" 
                      placeholder="Type your college name here" 
                      required 
                      onChange={e => setFormData({...formData, collegeName: e.target.value})} 
                    />
                  )}

                  {/* Manual Toggle Checkbox */}
                  <div style={{display:'flex', alignItems:'center', marginTop:'5px'}}>
                    <input 
                      type="checkbox" 
                      id="manualCollege" 
                      style={{width:'auto', margin:'0 8px 0 0'}}
                      onChange={(e) => setIsManualCollege(e.target.checked)}
                    />
                    <label htmlFor="manualCollege" style={{fontSize:'0.8rem', color:'#64748b', cursor:'pointer'}}>
                      My college is not listed
                    </label>
                  </div>

                  {/* UPLOAD SECTION */}
                  <div style={{marginTop: '20px', borderTop:'1px dashed #cbd5e1', paddingTop:'15px'}}>
                    <p style={{fontSize: '0.85rem', color:'red'}}>⚠️ Authorization</p>
                    <button type="button" onClick={downloadForm} style={{background:'#e2e8f0', border:'none', padding:'5px 10px', borderRadius:'4px', cursor:'pointer', fontSize:'0.8rem', marginBottom:'10px'}}>
                      ⬇️ Download Form
                    </button>
                    <input type="file" required accept=".pdf,.jpg,.png" onChange={e => setFile(e.target.files[0])} />
                  </div>
                </div>
              )}

              <button type="submit" className="btn-primary" style={{width: '100%', marginTop: '10px'}}>Proceed</button>
            </form>
          </>
        )}

        {/* STEP 2: OTP (Same as before) */}
        {step === 2 && (
          <div style={{textAlign: 'center'}}>
            <h2>Verify OTP</h2>
            <form onSubmit={handleOtpSubmit}>
              <input type="text" placeholder="Enter OTP" required onChange={e => setOtp(e.target.value)} style={{textAlign:'center', fontSize:'1.5rem'}} />
              <button type="submit" className="btn-primary" style={{width: '100%'}}>Verify</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}