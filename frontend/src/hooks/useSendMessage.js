// ========================================
// USE SEND MESSAGE HOOK - Message Sending Logic
// ========================================
// Custom hook for handling message sending functionality
// Manages API calls, loading states, and message state updates

import React, { useState } from 'react';
import useConversation from '../zustand/useConversation';

/**
 * Custom hook for sending messages
 * @returns {Object} Object containing loading state and sendMessage function
 */
const useSendMessage = () => {
  // Loading state for UI feedback during message sending
  const [loading, setLoading] = useState(false);
  
  // Get conversation state from Zustand store
  const { messages, setMessages, selectedConversation } = useConversation();

  /**
   * Send message function that handles message API calls
   * @param {string} message - The message content to send
   */
  const sendMessage = async (message) => {
    setLoading(true);
    try {
      // Make POST request to send message API endpoint
      const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
        // 💡 API endpoint for sending a message to a specific conversation
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // 💡 Setting content type to JSON so server knows we're sending JSON data
        body: JSON.stringify({ message })
        // 💡 Sending message as JSON because server expects JSON data
      });
      
      // Parse response data
      const data = await res.json();
      
      // Check for API errors
      if (data.error) {
        throw new Error(data.error);
      }
      
      // Add new message to existing messages array
      setMessages([...messages, data]);
    } catch (error) {
      console.error(error);
    } finally {
      // Reset loading state regardless of success/failure
      setLoading(false);
    }
  };
  
  return { loading, sendMessage };
};

export default useSendMessage;