import React from 'react';
import { FileText, BarChart2, Award, Bell } from 'lucide-react';

const StatsGrid = () => {
  const stats = [
    { label: 'Applied', value: '12', icon: <FileText size={22} color="#2563eb"/>, bg: '#dbeafe', trend: '+2 this week' },
    { label: 'Shortlisted', value: '4', icon: <BarChart2 size={22} color="#7c3aed"/>, bg: '#ede9fe', trend: 'In progress' },
    { label: 'Accepted', value: '2', icon: <Award size={22} color="#059669"/>, bg: '#d1fae5', trend: 'Congrats! 🎉' },
    { label: 'Announcements', value: '3 New', icon: <Bell size={22} color="#d97706"/>, bg: '#fef3c7', trend: 'Check now' },
  ];

  return (
    <div style={styles.grid}>
      {stats.map((stat, i) => (
        <div key={i} style={styles.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
            <div style={{ ...styles.iconBox, background: stat.bg }}>{stat.icon}</div>
          </div>
          <div>
             <h3 style={styles.value}>{stat.value}</h3>
             <p style={styles.label}>{stat.label}</p>
          </div>
          <p style={styles.trend}>{stat.trend}</p>
        </div>
      ))}
    </div>
  );
};

const styles = {
  grid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', // Wider minimums
    gap: '20px', 
    marginBottom: '20px',
    width: '100%'
  },
  card: { 
    background: 'white', 
    padding: '20px 24px', 
    borderRadius: '12px', 
    border: '1px solid #e2e8f0', 
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)', // Settle shadow
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'space-between',
    minHeight: '140px'
  },
  iconBox: { width: '42px', height: '42px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  value: { fontSize: '2.2rem', fontWeight: '700', color: '#0f172a', margin: '15px 0 5px 0', lineHeight: '1' },
  label: { fontSize: '0.9rem', color: '#64748b', fontWeight: '500' },
  trend: { fontSize: '0.75rem', color: '#94a3b8', marginTop: 'auto', paddingTop: '10px', fontWeight: '500' },
};

export default StatsGrid;