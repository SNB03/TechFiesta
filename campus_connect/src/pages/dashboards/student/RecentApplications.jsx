import React from 'react';

const RecentApplications = () => {
  const apps = [
    { project: 'AI Traffic System', company: 'Smart City Lab', status: 'Shortlisted', date: 'Oct 24', color: '#7c3aed', bg: '#f3e8ff' },
    { project: 'React Dashboard', company: 'TechCorp', status: 'Approved', date: 'Oct 22', color: '#2563eb', bg: '#dbeafe' },
    { project: 'Blockchain Voting', company: 'Prof. Mehta', status: 'Pending', date: 'Oct 18', color: '#64748b', bg: '#f1f5f9' },
    { project: 'Data Scraper', company: 'StartUp Inc', status: 'Selected', date: 'Oct 15', color: '#166534', bg: '#dcfce7' },
    { project: 'Marketing Bot', company: 'GrowthX', status: 'Rejected', date: 'Oct 10', color: '#991b1b', bg: '#fee2e2' },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>Recent Applications</h3>
        <button style={styles.viewAllBtn}>View All</button>
      </div>
      
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>PROJECT NAME</th>
              <th style={styles.th}>ORGANIZATION</th>
              <th style={styles.th}>STATUS</th>
              <th style={{...styles.th, textAlign: 'right'}}>DATE</th>
            </tr>
          </thead>
          <tbody>
            {apps.map((app, i) => (
              <tr key={i} style={styles.row}>
                <td style={{ padding: '16px 0' }}>
                    <div style={styles.projectName}>{app.project}</div>
                </td>
                <td style={{ color: '#64748b', fontSize: '0.9rem' }}>{app.company}</td>
                <td>
                  <span style={{ ...styles.statusBadge, color: app.color, background: app.bg }}>
                    {app.status}
                  </span>
                </td>
                <td style={{ textAlign: 'right', color: '#94a3b8', fontSize: '0.85rem' }}>{app.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: { background: 'white', borderRadius: '16px', border: '1px solid #f1f5f9', padding: '24px', flex: 2, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  title: { fontSize: '1.1rem', fontWeight: 'bold', color: '#0f172a', margin: 0 },
  viewAllBtn: { background: 'none', border: 'none', color: '#4f46e5', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer' },
  tableWrapper: { overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse', minWidth: '500px' },
  th: { color: '#94a3b8', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', textAlign: 'left', paddingBottom: '12px', borderBottom: '1px solid #f1f5f9' },
  row: { borderBottom: '1px solid #f8fafc', transition: 'background 0.2s' },
  projectName: { fontWeight: '600', color: '#334155', fontSize: '0.95rem' },
  statusBadge: { padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '700', display: 'inline-block' }
};

export default RecentApplications;