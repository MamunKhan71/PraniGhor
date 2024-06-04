import { AuthContext } from "@/provider/AuthProvider";
import { useContext } from "react";

const UseAuth = () => {
    return useContext(AuthContext)
};

export default UseAuth;