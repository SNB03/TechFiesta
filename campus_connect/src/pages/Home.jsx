import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <header className="hero container">
        <div className="badge">
          <span style={{ marginRight: '6px' }}>●</span> V2.0 NOW LIVE: AI SKILL MATCHING
        </div>
        <h1>
          Your Future, <br />
          <span className="gradient-text">Accelerated.</span>
        </h1>
        <p>
          The centralized ecosystem for academic projects, internships, and faculty research. 
          Built for the ED004 Problem Statement.
        </p>
        <div className="btn-group">
          <Link to="/dashboard" className="btn-dark">
            Explore Projects <span>→</span>
          </Link>
          <Link to="/post" className="btn-outline">
            Post Opportunity
          </Link>
        </div>
      </header>

      {/* Features Section (Bento Grid) */}
      <section className="features-section">
        <div className="container">
          <div className="section-title">
            <h2>Why Everyone Loves Us</h2>
            <p style={{ color: 'var(--gray)' }}>Solving the project lifecycle chaos with smart tech.</p>
          </div>

          <div className="bento-grid">
            {/* Card 1: AI Engine */}
            <div className="bento-card card-large-left">
              <div style={{ width: '50px', height: '50px', background: '#f0f9ff', borderRadius: '12px', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'16px' }}>
                🔍
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>AI Recommendation Engine</h3>
              <p style={{ color: 'var(--gray)', lineHeight: '1.6' }}>
                Our algorithm scans your profile skills and matches you with projects where you have the highest probability of acceptance. No more spam applying.
              </p>
              <div className="tag-container">
                <span className="tag">Python</span>
                <span className="tag">React</span>
                <span className="tag match">98% Match</span>
              </div>
            </div>

            {/* Card 2: Gamification */}
            <div className="bento-card card-large-right">
              <div style={{ fontSize: '2rem', marginBottom: '16px' }}>🏆</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Gamified Progress</h3>
              <p>Earn badges and certificates as you complete project milestones.</p>
              
              <div style={{ marginTop: '20px', background: 'rgba(255,255,255,0.2)', borderRadius: '10px', padding: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '5px' }}>
                  <span>Current Project</span>
                  <span>85%</span>
                </div>
                <div style={{ height: '6px', background: 'rgba(0,0,0,0.2)', borderRadius: '3px' }}>
                  <div style={{ width: '85%', height: '100%', background: '#fbbf24', borderRadius: '3px' }}></div>
                </div>
              </div>
            </div>

            {/* Bottom 3 Small Cards */}
            <div className="bento-card">
              <h4 style={{ fontSize: '1.1rem' }}>👥 Faculty Connect</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--gray)' }}>Direct chat and approval workflow.</p>
            </div>
            <div className="bento-card">
              <h4 style={{ fontSize: '1.1rem' }}>💼 Industry Projects</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--gray)' }}>Work on real-world problems.</p>
            </div>
            <div className="bento-card">
              <h4 style={{ fontSize: '1.1rem' }}>🎓 Verified Certs</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--gray)' }}>Blockchain-backed completion proof.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="stories-section">
        <div className="container">
          <div className="section-title">
            <h2>See who's winning with CampusConnect</h2>
          </div>
          <div className="story-grid">
            <div className="story-card">
              <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
                <div style={{width:'40px', height:'40px', borderRadius:'50%', background:'pink', display:'flex', alignItems:'center', justifyContent:'center', color:'black', fontWeight:'bold'}}>P</div>
                <div>
                  <div style={{fontWeight:'bold'}}>Priya M.</div>
                  <div style={{fontSize:'0.8rem', color:'#94a3b8'}}>Final Year Student</div>
                </div>
              </div>
              <p style={{fontStyle:'italic', marginTop:'15px'}}>"The skill tracking helped me upskill for my dream job."</p>
              <span className="stars">★★★★★</span>
            </div>
            
            <div className="story-card">
              <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
                <div style={{width:'40px', height:'40px', borderRadius:'50%', background:'#60a5fa', display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontWeight:'bold'}}>R</div>
                <div>
                  <div style={{fontWeight:'bold'}}>Rahul V.</div>
                  <div style={{fontSize:'0.8rem', color:'#94a3b8'}}>Recruiter</div>
                </div>
              </div>
              <p style={{fontStyle:'italic', marginTop:'15px'}}>"Found verified talent instantly. ED004 solution works."</p>
              <span className="stars">★★★★★</span>
            </div>

            <div className="story-card">
              <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
                <div style={{width:'40px', height:'40px', borderRadius:'50%', background:'#34d399', display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontWeight:'bold'}}>S</div>
                <div>
                  <div style={{fontWeight:'bold'}}>Sarah K.</div>
                  <div style={{fontSize:'0.8rem', color:'#94a3b8'}}>Research Scholar</div>
                </div>
              </div>
              <p style={{fontStyle:'italic', marginTop:'15px'}}>"Collaboration with faculty became seamless."</p>
              <span className="stars">★★★★★</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}