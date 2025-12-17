import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="container">
      {/* 1. Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #7c3aed, #c026d3)', borderRadius: '8px' }}></div>
        <Link to="/" style={{ fontSize: '1.25rem', fontWeight: '800', textDecoration: 'none', color: '#0f172a' }}>
          CampusConnect
        </Link>
      </div>

      {/* 2. Center Navigation Pills */}
      <div className="nav-links">
        <Link to="/">Projects</Link>
        <Link to="#">Mentors</Link>
        <Link to="#">Stories</Link>
      </div>

      {/* 3. Auth Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', position: 'relative' }}>
        {token ? (
          <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600', color: '#64748b' }}>
            Sign Out
          </button>
        ) : (
          <Link to="/login" style={{ textDecoration: 'none', fontWeight: '600', color: '#64748b' }}>Sign In</Link>
        )}

        {/* Dropdown Container */}
        <div style={{ position: 'relative' }}>
          <button 
            className="btn-primary" 
            onClick={() => setShowDropdown(!showDropdown)}
          >
            Get Started
          </button>

          {showDropdown && (
            <div className="dropdown-menu">
              <Link 
                to="/register?role=student" 
                className="dropdown-item" 
                onClick={() => setShowDropdown(false)}
              >
                🎓 Student Registration
              </Link>
              <Link 
                to="/register?role=faculty" 
                className="dropdown-item" 
                onClick={() => setShowDropdown(false)}
              >
                🏛️ Faculty/Admin Registration
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}