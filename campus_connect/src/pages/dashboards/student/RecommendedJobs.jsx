import React from 'react';
import { Briefcase } from 'lucide-react';

const RecommendedJobs = () => {
  const jobs = [
    { role: 'Frontend Intern', company: 'Google DSC', match: 98, color: '#10b981' },
    { role: 'ML Research Asst.', company: 'IIT Delhi', match: 92, color: '#4f46e5' },
    { role: 'Django Developer', company: 'TechFiesta', match: 85, color: '#f59e0b' },
  ];

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Recommended for You</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {jobs.map((job, i) => (
          <div key={i} style={styles.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
               <div style={styles.iconBox}><Briefcase size={16} color="#64748b" /></div>
               <span style={styles.matchScore}>{job.match}% Match</span>
            </div>
            
            <h4 style={styles.role}>{job.role}</h4>
            <p style={styles.company}>{job.company}</p>
            
            <div style={styles.progressContainer}>
              <div style={{ ...styles.progressBar, width: `${job.match}%`, background: job.color }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { 
    flex: '1', // ✅ Takes 1 part of space (approx 30%)
    minWidth: '280px' 
  },
  title: { fontSize: '1.1rem', fontWeight: '700', color: '#0f172a', marginBottom: '20px' },
  card: { background: 'white', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' },
  iconBox: { padding: '6px', background: '#f1f5f9', borderRadius: '6px', display: 'inline-flex' },
  matchScore: { fontSize: '0.75rem', fontWeight: 'bold', color: '#16a34a', background: '#dcfce7', padding: '2px 8px', borderRadius: '4px' },
  role: { fontSize: '0.95rem', fontWeight: '700', color: '#0f172a', margin: '5px 0 2px 0' },
  company: { fontSize: '0.8rem', color: '#64748b', margin: 0 },
  progressContainer: { width: '100%', height: '4px', background: '#f1f5f9', borderRadius: '2px', marginTop: '12px' },
  progressBar: { height: '100%', borderRadius: '2px' }
};

export default RecommendedJobs;