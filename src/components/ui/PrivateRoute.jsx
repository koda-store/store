import { Navigate } from "react-router-dom";
// import {useAuthe} from "../../context/AuthContext";
// import { useContext } from "react";

const PrivateRoute=({children})=>{
    // const {loading}=useContext(useAuthe)
    const token=localStorage.getItem("dashboard-token")
    //  if(loading)
    //     return(
    //         <div>
    //             loading........
    //         </div>
    // );

    if(!token){
        return(
            <Navigate to="/login" replace/>
        )
        }
        
    return children
}

export default PrivateRoute
