import { Navigate } from "react-router-dom"
const GustOnly=({ children })=>{

        const token= localStorage.getItem("dashboard-token")

        if(token){
           return <Navigate to={'/'} replace/>
        }
        return children
}

export default GustOnly