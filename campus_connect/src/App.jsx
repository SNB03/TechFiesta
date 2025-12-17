import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import PostJob from './pages/PostJob';
import Login from './pages/Login';
import Register from './pages/Register'; // <-- Import this
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* <-- Add this line */}
        
        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <div className="container" style={{paddingTop: '40px'}}>
                 <Dashboard />
              </div>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/post" 
          element={
            <ProtectedRoute>
              <div className="container" style={{paddingTop: '40px'}}>
                 <PostJob />
              </div>
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;