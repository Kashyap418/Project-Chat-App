// ========================================
// MAIN APP COMPONENT - Application Entry Point
// ========================================
// This is the root component that handles routing and authentication flow
// Manages navigation between different pages based on user authentication status

import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home.jsx';
import Login from './pages/login/Login.jsx';
import SignUp from './pages/signup/SignUp.jsx';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext.jsx';

/**
 * Main App Component
 * Handles routing and authentication-based navigation
 * @returns {JSX.Element} The main application component
 */
function App() {
  // Get authentication state from context
  const { authUser } = useAuthContext(); 

  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      {/* ========================================
          ROUTING CONFIGURATION
          ======================================== */}
      <Routes>
        {/* Home Route - Protected by authentication */}
        <Route 
          path="/" 
          element={authUser ? <Home /> : <Navigate to={'/login'} />} 
        />
        {/* 💡 If user is authenticated: Show Home page */}
        {/* 💡 If user is not authenticated: Redirect to Login */}
        
        {/* Login Route - Redirects authenticated users */}
        <Route 
          path="/login" 
          element={authUser ? <Navigate to={'/'} /> : <Login />} 
        />
        {/* 💡 If user is authenticated: Redirect to Home */}
        {/* 💡 If user is not authenticated: Show Login page */}
        
        {/* Signup Route - Redirects authenticated users */}
        <Route 
          path="/signup" 
          element={authUser ? <Navigate to={'/'} /> : <SignUp />} 
        />
        {/* 💡 If user is authenticated: Redirect to Home */}
        {/* 💡 If user is not authenticated: Show Signup page */}
      </Routes>
      
      {/* Toast notifications for user feedback */}
      <Toaster />
    </div>
  );
}

export default App;
