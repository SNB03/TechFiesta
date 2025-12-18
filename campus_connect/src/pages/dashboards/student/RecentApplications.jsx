import React from 'react';

const RecentApplications = () => {
  const apps = [
    { project: 'AI Traffic System', company: 'Smart City Lab', status: 'Shortlisted', date: 'Oct 24', color: '#9333ea', bg: '#f3e8ff' },
    { project: 'React Dashboard', company: 'TechCorp', status: 'Approved', date: 'Oct 22', color: '#2563eb', bg: '#dbeafe' },
    { project: 'Blockchain Voting', company: 'Prof. Mehta', status: 'Pending', date: 'Oct 18', color: '#475569', bg: '#f1f5f9' },
    { project: 'Data Scraper', company: 'StartUp Inc', status: 'Selected', date: 'Oct 15', color: '#166534', bg: '#dcfce7' },
  ];

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Recent Applications</h3>
      
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
              <th style={styles.th}>PROJECT NAME</th>
              <th style={styles.th}>COMPANY/FACULTY</th>
              <th style={styles.th}>STATUS</th>
              <th style={{...styles.th, textAlign: 'right'}}>DATE</th>
            </tr>
          </thead>
          <tbody>
            {apps.map((app, i) => (
              <tr key={i} style={styles.row}>
                <td style={{ padding: '16px 0', fontWeight: '600', color: '#334155' }}>{app.project}</td>
                <td style={{ color: '#64748b' }}>{app.company}</td>
                <td>
                  <span style={{ ...styles.statusBadge, color: app.color, background: app.bg }}>
                    {app.status}
                  </span>
                </td>
                <td style={{ textAlign: 'right', color: '#94a3b8' }}>{app.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: { 
    background: 'white', 
    borderRadius: '12px', 
    border: '1px solid #e2e8f0', 
    padding: '24px', 
    flex: '3', // ✅ Takes 3 parts of space (approx 70%)
    minWidth: '600px', // Ensures it doesn't shrink too much
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
  },
  title: { fontSize: '1.1rem', fontWeight: '700', color: '#0f172a', marginBottom: '20px' },
  tableWrapper: { overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' },
  th: { color: '#94a3b8', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', textAlign: 'left', paddingBottom: '12px' },
  row: { borderBottom: '1px solid #f8fafc' },
  statusBadge: { padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700', display: 'inline-block' }
};

export default RecentApplications;