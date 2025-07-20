// ========================================
// APPLICATION ENTRY POINT - Main.jsx
// ========================================
// This is the entry point of the React application
// Sets up the root component with necessary providers and context

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext.jsx';
import { SocketContextProvider } from './context/SocketContext.jsx';

// Create and render the root component
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* BrowserRouter enables client-side routing */}
    <BrowserRouter>
      {/* 💡 Provides routing functionality for react-router-dom components */}
      
      {/* AuthContextProvider provides authentication state throughout the app */}
      <AuthContextProvider>
        {/* 💡 Makes authUser and setAuthUser available to all child components */}
        
        {/* SocketContextProvider provides real-time communication */}
        <SocketContextProvider>
          {/* 💡 Manages Socket.IO connection and real-time messaging */}
          
          {/* Main App component */}
          <App />
        </SocketContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);
