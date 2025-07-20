// // ========================================
// // CONVERSATION STORE - Zustand State Management
// // ========================================
// // This file defines the global conversation state using Zustand
// // Manages selected conversation and messages across the application

// import { create } from 'zustand';

// /**
//  * Zustand store for conversation state management
//  * Provides global state for selected conversation and messages
//  */
// const useConversation = create((set) => ({
//     // Currently selected conversation object
//     selectedConversation: null,
    
//     // Function to set the currently selected conversation
//     setSelectedConversation: (conversation) => set({ selectedConversation: conversation }),
//     // 💡 This function allows us to set the currently selected conversation
    
//     // Array that holds messages for the selected conversation
//     messages: [],
//     // 💡 This is an array that will hold the messages for the selected conversation
    
//     // Function to set messages for the selected conversation
//     setMessages: (messages) => set({ messages }),
//     // 💡 This function allows us to set the messages for the selected conversation
// }));

// // 💡 Zustand Benefits:
// // - Small, fast, and scalable state management solution
// // - Allows creating global state accessible from any component
// // - No need for context providers or complex setup
// // - Automatic re-renders when state changes

// export default useConversation;