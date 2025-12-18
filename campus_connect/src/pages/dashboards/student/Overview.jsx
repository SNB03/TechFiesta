import React from 'react';
import StatsGrid from './StatsGrid';
import RecentApplications from './RecentApplications';
import RecommendedJobs from './RecommendedJobs';

const Overview = () => {
  return (
    <div style={styles.container}>
      {/* 1. Stats Row */}
      <StatsGrid />

      {/* 2. Main Content Split */}
      <div style={styles.contentSplit}>
        
        {/* Left: Table (Takes 70% width) */}
        <RecentApplications />

        {/* Right: Recommendations (Takes 30% width) */}
        <RecommendedJobs />
        
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    maxWidth: '1600px', // Prevents it from getting too stretched on 4k screens
    margin: '0 auto',   // Centers it on ultra-wide screens
  },
  contentSplit: { 
    display: 'flex', 
    gap: '20px',        // Tighter gap for better space usage
    flexWrap: 'wrap',   // Wraps on mobile
    alignItems: 'stretch' 
  }
};

export default Overview;