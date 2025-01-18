// When you add --save-dev, the package is installed and listed under the "devDependencies"
// section in your package.json file.
// Development dependencies are tools or libraries that are only needed during development and
// not required in the production environment.


// Let’s break it down step by step so that it becomes crystal clear! 🚀

// 1. createContext
// javascript
// Copy
// Edit
// export const AuthContext = createContext();
// What it does: Creates a context object.
// A context is like a global store where you can put data to make it accessible to any component in your app (without passing props down manually).
// Why it’s needed: Instead of passing authUser and setAuthUser as props through every component, createContext allows you to share them directly with components that need them.
// 2. useContext(AuthContext)
// javascript
// Copy
// Edit
// export const useAuthContext = () => {
//     return useContext(AuthContext);
// };
// What it does:
// useContext is a React Hook that lets you access the data stored in a specific context.
// It takes a context object (like AuthContext) as an argument and gives you the current value of the context.
// Why it’s written this way:
// Instead of calling useContext(AuthContext) directly in components every time, you create a reusable hook useAuthContext.
// This makes your code more readable and avoids redundancy.
// 3. AuthContextProvider
// javascript
// Copy
// Edit
// export const AuthContextProvider = ({ children }) => {
//     const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);
//     return (
//         <AuthContext.Provider value={{ authUser, setAuthUser }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };
// What is happening here?
// State Management:

// javascript
// Copy
// Edit
// const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);
// authUser: Holds the current authenticated user’s information.
// setAuthUser: A function to update authUser.
// Initial Value:
// Reads a user object from localStorage (where user data is stored during login).
// If no user exists in localStorage, it defaults to null.
// Context Provider:

// javascript
// Copy
// Edit
// <AuthContext.Provider value={{ authUser, setAuthUser }}>
// What it does: Wraps the children components and shares authUser and setAuthUser with them.
// value prop: Contains the data (authUser, setAuthUser) that will be accessible to all components using this context.
// children:

// javascript
// Copy
// Edit
// {children}
// Represents any components wrapped inside the AuthContextProvider. For example:
// javascript
// Copy
// Edit
// <AuthContextProvider>
//     <App />
// </AuthContextProvider>


// JWT + authUser: How They Work Together
// JWT:
// Ensures secure communication with the server.
// Confirms the user's authenticity for API requests.
// authUser:
// Represents the currently authenticated user's state on the frontend.
// Allows dynamic UI updates and routing without constant server checks.
// What Happens After Sign-Up?
// When a user signs up:

// The server creates and sends a JWT token.
// You save the JWT in cookies (or localStorage).
// You fetch user details (if not already available) and store them in authUser.
// Now, the app:
// Uses authUser to show user-specific data in the UI.
// Uses the JWT token for server authentication.
// Can You Skip authUser and Use Only JWT?
// Technically, you can:

// Store the JWT token in cookies or localStorage.
// Decode the token on every render to extract user info.
// Fetch more user data from the backend when needed.
// But:

// This approach is inefficient and makes your app heavily dependent on server calls or JWT decoding logic.
// Storing authUser in state makes your app faster and cleaner.