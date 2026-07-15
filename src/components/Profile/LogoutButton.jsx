import { useNavigate } from "react-router-dom";
import { api } from "../../api/axios";
import { toast } from "react-toastify";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
await api.post("/auth/logout");

  localStorage.removeItem("dashboard-token");
  toast.success("Logged out successfully.");
 navigate("/login");
   } catch (err) {
   toast.error(err.response?.data?.message || "Logout failed.");
    }
  };
  return (
 <button onClick={handleLogout}
     className="mt-4 w-full rounded-lg bg-red-500 px-5 py-2 text-white hover:bg-red-600">
      Logout
</button>
  );
}

export default LogoutButton;
