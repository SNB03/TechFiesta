import React from 'react';
import StatsGrid from './StatsGrid';
import RecentApplications from './RecentApplications';
import RecommendedJobs from './RecommendedJobs';

const Overview = () => {
  return (
    <>
      {/* 1. Stats Row */}
      <StatsGrid />

      {/* 2. Main Content Split */}
      <div style={styles.contentGrid}>
        
        {/* Left: Table */}
        <RecentApplications />

        {/* Right: Recommendations */}
        <RecommendedJobs />
        
      </div>
    </>
  );
};

const styles = {
  contentGrid: { 
    display: 'flex', 
    gap: '30px', 
    flexWrap: 'wrap', // Responsive wrapping
    alignItems: 'flex-start' // Aligns recommended box to top
  }
};

export default Overview;