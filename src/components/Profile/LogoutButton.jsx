import { useNavigate } from "react-router-dom";
import { api } from "../../api/axios";
import { toast } from "react-toastify";
import { FiLogOut } from "react-icons/fi";
function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
await api.post("/auth/logout");
 toast.success("Logged out successfully."); }
  catch (err) {
    toast.error(err.response?.data?.message || "Logout failed.");}
    
 finally {
    localStorage.removeItem("dashboard-token");
    navigate("/login", { replace: true });
  }
  };
  return (
 <button onClick={handleLogout}
className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-red-500 py-3 font-medium text-white transition-colors duration-200 hover:bg-red-600"> 
     <FiLogOut />
      Logout
</button>
  );
}

export default LogoutButton;
