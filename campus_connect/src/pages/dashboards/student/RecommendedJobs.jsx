import React from 'react';
import { Briefcase, ArrowRight } from 'lucide-react';

const RecommendedJobs = () => {
  const jobs = [
    { role: 'Frontend Intern', company: 'Google DSC', match: 98, color: '#10b981' },
    { role: 'ML Research Asst.', company: 'IIT Delhi', match: 92, color: '#4f46e5' },
    { role: 'Django Developer', company: 'TechFiesta', match: 85, color: '#f59e0b' },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>Recommended</h3>
        <ArrowRight size={18} color="#94a3b8" style={{ cursor: 'pointer' }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {jobs.map((job, i) => (
          <div key={i} style={styles.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
               <div style={styles.iconBox}>
                 <Briefcase size={16} color="#64748b" />
               </div>
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
  container: { flex: 1, minWidth: '300px' }, // Fix width
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  title: { fontSize: '1.1rem', fontWeight: 'bold', color: '#0f172a', margin: 0 },
  card: { background: 'white', padding: '20px', borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', transition: 'transform 0.2s', cursor: 'pointer' },
  iconBox: { padding: '8px', background: '#f8fafc', borderRadius: '8px', display: 'inline-flex' },
  matchScore: { fontSize: '0.75rem', fontWeight: 'bold', color: '#10b981', background: '#ecfdf5', padding: '2px 8px', borderRadius: '6px' },
  role: { fontSize: '0.95rem', fontWeight: '700', color: '#0f172a', margin: '5px 0' },
  company: { fontSize: '0.8rem', color: '#64748b', margin: 0 },
  progressContainer: { width: '100%', height: '6px', background: '#f1f5f9', borderRadius: '3px', marginTop: '15px', overflow: 'hidden' },
  progressBar: { height: '100%', borderRadius: '3px' }
};

export default RecommendedJobs;