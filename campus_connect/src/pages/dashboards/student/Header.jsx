import React, { useState } from 'react';
import { Bell, Search } from 'lucide-react';

const Header = ({ activeTab, userName }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, text: "Application Shortlisted", sub: "AI Traffic System • Smart City Lab", time: "2h", unread: true },
    { id: 2, text: "New Opportunity", sub: "Cyber Security Analyst @ TechCorp", time: "5h", unread: true },
    { id: 3, text: "Profile Reminder", sub: "Please update your resume", time: "1d", unread: false }
  ];

  return (
    <header style={styles.header}>
      {/* Title Section */}
      <div>
        <h1 style={styles.pageTitle}>{activeTab}</h1>
        <p style={styles.subTitle}>Welcome back, {userName}! 👋</p>
      </div>

      {/* Right Side Actions */}
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center', position: 'relative' }}>
        
        {/* Notification Bell */}
        <div style={{ position: 'relative' }}>
          <div 
            style={{...styles.iconBtn, background: showNotifications ? '#eff6ff' : 'white'}} 
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={20} color={showNotifications ? '#4f46e5' : '#64748b'} />
            <div style={styles.redDot}></div>
          </div>

          {/* Improved Dropdown UI */}
          {showNotifications && (
            <div style={styles.dropdown}>
              <div style={styles.dropdownHeader}>
                <span style={{fontWeight:'bold'}}>Notifications</span>
                <span style={{fontSize:'0.75rem', color:'#4f46e5', cursor:'pointer'}}>Mark all read</span>
              </div>
              
              <div style={styles.list}>
                {notifications.map(n => (
                  <div key={n.id} style={{...styles.notifItem, background: n.unread ? '#f8fafc' : 'white'}}>
                    <div style={{width:'8px', height:'8px', borderRadius:'50%', background: n.unread ? '#3b82f6' : 'transparent', marginTop:'5px'}}></div>
                    <div style={{flex:1}}>
                        <p style={{margin:0, fontSize:'0.85rem', fontWeight: n.unread ? '600' : '400', color:'#1e293b'}}>{n.text}</p>
                        <p style={{margin:'2px 0 0 0', fontSize:'0.75rem', color:'#64748b'}}>{n.sub}</p>
                    </div>
                    <span style={{fontSize:'0.7rem', color:'#94a3b8'}}>{n.time}</span>
                  </div>
                ))}
              </div>
              
              <div style={styles.dropdownFooter}>View All Activity</div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

const styles = {
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' },
  pageTitle: { fontSize: '1.8rem', fontWeight: 'bold', color: '#0f172a', marginBottom: '5px' },
  subTitle: { color: '#64748b', margin: 0 },
  iconBtn: { 
    width: '44px', height: '44px', borderRadius: '50%', background: 'white', 
    border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', 
    cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
  },
  redDot: { position: 'absolute', top: '10px', right: '12px', width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%', border: '2px solid white' },
  
  // Dropdown Styles
  dropdown: {
    position: 'absolute', top: '55px', right: '0', width: '320px', 
    background: 'white', borderRadius: '16px', 
    boxShadow: '0 10px 40px -10px rgba(0,0,0,0.15)', 
    border: '1px solid #f1f5f9', zIndex: 200, overflow:'hidden'
  },
  dropdownHeader: {
    padding: '15px 20px', borderBottom: '1px solid #f1f5f9', 
    display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:'0.9rem', color:'#0f172a'
  },
  list: { maxHeight: '300px', overflowY: 'auto' },
  notifItem: {
    padding: '12px 20px', display: 'flex', gap: '10px', alignItems: 'flex-start',
    borderBottom: '1px solid #f8fafc', cursor: 'pointer', transition:'background 0.2s'
  },
  dropdownFooter: {
    padding: '12px', textAlign:'center', fontSize:'0.8rem', color:'#4f46e5', fontWeight:'600',
    background:'#f8fafc', cursor:'pointer'
  }
};

export default Header;