// import {useAuth} from "../../context/AuthContext"
import { Navigate } from "react-router-dom"
// import { useContext } from "react"

const GustOnly=({children})=>{
    // const {loading}=useContext(useAuth)
    const token=localStorage.getItem("dashboard-token")
    // if(loading)return <div>loading......</div>

    if(token){
        return(
            <Navigate to={'/'} replace/>

        )
    }

    return children
}

export default GustOnly