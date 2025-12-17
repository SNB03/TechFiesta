import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      navigate('/');
    } catch (err) {
      alert('Login Failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <input type="email" placeholder="Email" required 
               onChange={e => setFormData({...formData, email: e.target.value})} />
        <br /><br />
        <input type="password" placeholder="Password" required 
               onChange={e => setFormData({...formData, password: e.target.value})} />
        <br /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;