import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import our new components
import Sidebar from './student/Sidebar';
import Header from './student/Header';
import Overview from './student/Overview';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const userName = localStorage.getItem('name') || 'Student';

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      
      {/* 1. Sidebar Component */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        userName={userName} 
        handleLogout={handleLogout} 
      />

      {/* 2. Main Content Area */}
      <main style={styles.mainContent}>
        
        {/* 3. Header Component (Notifications) */}
        <Header activeTab={activeTab} userName={userName} />

        {/* 4. Tab Content Logic */}
        {activeTab === 'Overview' && <Overview />}
        
        {/* Placeholders for Future Tabs */}
        {activeTab === 'My Profile' && <Placeholder tab={activeTab} />}
        {activeTab === 'Opportunities' && <Placeholder tab={activeTab} />}
        {activeTab === 'Applications' && <Placeholder tab={activeTab} />}
        
        {/* ... add others as needed */}

      </main>
    </div>
  );
};

// Simple placeholder until we build the other pages
const Placeholder = ({ tab }) => (
  <div style={{ textAlign: 'center', padding: '50px', color: '#94a3b8', border: '2px dashed #e2e8f0', borderRadius: '12px' }}>
    <h3>🚧 {tab} Section</h3>
    <p>This module is under development.</p>
  </div>
);

const styles = {
  container: { display: 'flex', minHeight: '100vh', background: '#f8fafc', fontFamily: '"Inter", sans-serif' },
  mainContent: { flex: 1, 
    marginLeft: '260px', 
    padding: '24px', // Reduced padding from 30px to 24px to use more edge space
    background: '#f8fafc',
    minHeight: '100vh'},
};

export default StudentDashboard;