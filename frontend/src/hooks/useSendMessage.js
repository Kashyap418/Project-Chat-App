import React, { useState } from 'react';
import useConversation from '../zustand/useConversation';

const useSendMessage = () => {
  const [loading,setLoading]=useState(false);
  const {messages,setMessages,selectedConversation}  = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/messages/send/${selectedConversation._id}`,{ // API endpoint for sending a message to a specific conversation
        method: 'POST',
        headers: {'Content-Type': 'application/json'}, // Setting the content type to JSON so that the server knows we are sending JSON data
        body: JSON.stringify({message}) // Sending the message to the server as JSON because the server expects JSON data
      });
      const data = await res.json();
      if(data.error){
        throw new Error(data.error);
      }
      setMessages([...messages,data]);  
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  return {loading,sendMessage};
}

export default useSendMessage