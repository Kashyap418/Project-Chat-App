// ========================================
// LOGIN PAGE COMPONENT - User Authentication
// ========================================
// This component provides the login form for user authentication
// Handles form submission and user login functionality

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useLogin from '../../hooks/useLogin';

/**
 * Login Component - User Authentication Form
 * Provides login interface with username and password fields
 * @returns {JSX.Element} The login form component
 */
const Login = () => {
    // Form state management
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Custom hook for login functionality
    const { loading, login } = useLogin();

    /**
     * Handle form submission
     * Prevents default form behavior and calls login function
     * @param {Event} e - Form submission event
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(username, password);
    };

    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            {/* Main login form container */}
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                {/* 💡 Glass morphism effect with backdrop blur */}
                
                {/* Page title */}
                <h1 className='text-3xl font-semibold text-center text-gray-300'>
                    Login
                </h1>
                
                {/* Login form */}
                <form onSubmit={handleSubmit}>
                    {/* Username input field */}
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Username</span>
                        </label>
                        <input
                            type='text'
                            placeholder='Enter username'
                            className='w-full input input-bordered h-10'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    
                    {/* Password input field */}
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Password</span>
                        </label>
                        <input
                            type='password'
                            placeholder='Enter password'
                            className='w-full input input-bordered h-10'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    
                    {/* Signup link for new users */}
                    <Link to={'/signup'} className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
                        {"Don't"} have an account?
                    </Link>

                    {/* Submit button with loading state */}
                    <div>
                        <button 
                            className='btn btn-block btn-sm mt-2'   
                            disabled={loading}
                        >
                            {loading ? <span className='loading loading-spinner'></span> : "Login"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;