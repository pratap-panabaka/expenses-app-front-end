import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuthContext = () => {
    const context = useContext(AuthContext);
    
    if(!context) {
        throw Error('AuthContext must be used only inside provider');
    }

    return context;
}

export default useAuthContext;