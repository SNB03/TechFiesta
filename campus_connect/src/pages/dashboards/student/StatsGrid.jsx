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
            {i === 2 && <span style={styles.badge}>New</span>}
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
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' },
  card: { background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', transition: 'transform 0.2s', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
  iconBox: { width: '45px', height: '45px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  value: { fontSize: '2rem', fontWeight: '800', color: '#0f172a', margin: '10px 0 0 0', lineHeight: '1.1' },
  label: { fontSize: '0.9rem', color: '#64748b', fontWeight: '500' },
  trend: { fontSize: '0.75rem', color: '#94a3b8', marginTop: '10px', fontWeight: '500' },
  badge: { fontSize: '0.65rem', background: '#dcfce7', color: '#166534', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold' }
};

export default StatsGrid;