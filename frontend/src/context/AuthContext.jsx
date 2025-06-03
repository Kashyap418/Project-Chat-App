import { useContext,useState } from "react";
import { createContext } from "react";

//Authentication context is a way to share the logged-in user’s data (like username, token, etc.) across all 
//parts of a React application without passing props manually.

export const AuthContext = createContext();

export const useAuthContext=()=>{ 
    return useContext(AuthContext);
}// This custom hook allows us to access the authentication context easily in any component.
// It simplifies the process of consuming the context by providing a direct way to access the authUser and setAuthUser values.

export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) ||null);
    return <AuthContext.Provider value={{authUser, setAuthUser}}>
        {children}
    </AuthContext.Provider>;
} // This component provides the authentication context to the entire application.
// It allows us to access the authenticated user and set the authenticated user from anywhere in the application.