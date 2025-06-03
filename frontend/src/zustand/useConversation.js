import {create} from 'zustand';

const useConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (conversation) => set({selectedConversation: conversation}), // This function allows us to set the currently selected conversation.
    messages: [], // This is an array that will hold the messages for the selected conversation.
    setMessages: (messages) => set({messages}), // This function allows us to set the messages for the selected conversation.
}));
// Zustand is a small, fast, and scalable state management solution for React applications.
// It allows us to create a global state that can be accessed and modified from any component in the application.

export default useConversation;