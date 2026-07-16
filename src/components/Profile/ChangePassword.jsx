import { useEffect, useState } from "react";
import { api } from "../../api/axios";
//icon react
import { FaLock } from "react-icons/fa";
 import { toast } from "react-toastify";

function ChangePassword(){

 const [user, setUser] = useState(null);

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false);

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

useEffect(() => {
  getUser();}, []);

const getUser = async () => {
   try {
 const res = await api.get("/auth/me");
   setUser(res.data.user);
   } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong.");
    }
  };

  const handleSendOtp = async () => {
    try {
 await api.post("/auth/forgot-password/send-otp", {  email: user?.email,});

  toast.success("OTP sent successfully.");
  setOtp("");
setNewPassword("");



  setShowOtpForm(true);
   } catch (err) {
  toast.error(err.response?.data?.message || "Something went wrong.");
    }
  };

  const handleUpdatePassword = async () => {
if (!otp || !newPassword) {
  toast.error("Please fill all fields.");
  return;
}
    
 try {
await api.post("/auth/forgot-password/verify-otp", { email: user?.email, otp, newPassword,
 });

 toast.success("Password updated successfully.");
 setOtp("");
setNewPassword("");

setShowOtpForm(false);
setShowChangePassword(false);

    } catch (err) {
 toast.error(err.response?.data?.message || "Something went wrong.");
    }
  };



return(
 <div className="mt-6 h-full bg-white w-full   rounded-xl border border-slate-200  p-5 shadow-xl dark:border-slate-700 dark:bg-slate-800">
  <div className="flex items-center gap-2 py-2 ">
    <FaLock className="text-lg text-red-500" />
   <h1 className="text-lg font-semibold text-black dark:text-white">Change Password</h1>
 </div>

 {!showChangePassword && (
  <button onClick={() => setShowChangePassword(true)}
   className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600" >
     Change Password
 </button>
 )}

 {showChangePassword && !showOtpForm && (
 <div>
 <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
    We'll send an OTP to your email to verify your identity.
       </p>

   <div className="mt-5 ">
  <input
   type="email"
   value={user?.email || ""}
    readOnly
    className="w-full rounded-lg border border-slate-400 px-4 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-400 text-gray-600   text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-white" />
    </div>

<div className="mt-6 flex gap-3">
  <button onClick={handleSendOtp}
 className="rounded-lg bg-blue-500 px-4 py-1.5 text-white hover:bg-blue-700" >
    Send OTP
   </button>

   <button onClick={() => setShowChangePassword(false)}
   className="rounded-lg border border-slate-300  px-4 py-2 text-gray-700 hover:bg-gray-100 dark:border-slate-600 dark:text-white dark:hover:bg-slate-700" >
        Cancel
   </button>
          </div>
        </div>
      )}

 {showOtpForm && (
  <div className="mt-6 space-y-4 ">
  <input
    type="text"
    placeholder="Enter OTP"
    value={otp}
     onChange={(e) => setOtp(e.target.value)}
    className="w-full rounded-lg border border-slate-400 px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-400  " />

  <input
    type="password"
    placeholder="New Password"
   value={newPassword}
   onChange={(e) => setNewPassword(e.target.value)}
 className="w-full rounded-lg border border-slate-400 px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-400 " />

  <div className="flex gap-3">
  <button
    onClick={handleUpdatePassword}
    className="rounded-lg bg-blue-600 px-4 py-1.5 text-white hover:bg-blue-700">
    Update Password
  </button>

  <button
    onClick={() => {
      setOtp("");
      setNewPassword("");
      setShowOtpForm(false);
      setShowChangePassword(false);
    }}
    className="rounded-lg border border-slate-300 px-5 py-2 text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-slate-700">
    Cancel
  </button>
</div>
        </div>
      )}
    </div>
);

}

export default ChangePassword;