import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import {BrowserRouter} from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext.jsx';
import { SocketContextProvider } from './context/SocketContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/*to be able to use react-router-dom components we need to wrap our application with this component */}
    <AuthContextProvider> {/*Now our App component and all its children can access the authentication context i.e. App is able to use these values-{authUser,setAuthUser} */}
   <SocketContextProvider>
   <App />
   </SocketContextProvider>
    </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
)
