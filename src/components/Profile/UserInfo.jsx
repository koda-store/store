import { useEffect, useState } from "react";
import { api } from "../../api/axios";
////icon react///
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
// toast notification
 import { toast } from "react-toastify";

function UserInfo() {
  const [user, setUser] = useState({});

  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    avatar: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  // get user 
  const getUser = async () => {
    try {
      const res = await api.get("/auth/me");

setUser(res.data.user);

setFormData({
  username: res.data.user.username,
  phone: res.data.user.phone,
  avatar: res.data.user.avatar,
      });
  } catch (err) {
toast.error("Failed to load user");
    }
  };

  ///
  const handleSave = async () => {
    try {
      const res = await api.patch(`/users/${user._id}`, formData);

      setUser(res.data.user);

      setFormData({
        username: res.data.user.username,
        phone: res.data.user.phone,
        avatar: res.data.user.avatar,
      });

      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (err) {
     toast.error(err.response?.data?.message || "Something went wrong.");
    }
  };

  ///
  const handleCancel = () => {
  
  setFormData({
   username: user.username,
 phone: user.phone,
    avatar: user.avatar
   });

  setIsEditing(false);
  };

  ////////
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  ////////
const inputStyle ="w-full text-sm rounded-lg border border-slate-400 px-4 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-400";
  return (
    
    <div className="bg-white w-full  rounded-2xl shadow-lg p-8 dark:bg-slate-800 border border-white dark:border-slate-600">
                  {/* User Info */}
   <div className="flex flex-col sm:flex-row items-left sm:items-left text-left sm:text-left gap-5">
        <img
src={user?.avatar } alt={user?.username}
    className="w-22 h-22 rounded-full object-cover shadow-xl border-2 border-blue-200 "/>

        <div >
 <h2 className="text-lg pb-1 font-semibold dark:text-white">{user?.username}</h2>
<p className="text-sm  text-gray-500 dark:text-gray-300">{user?.email}</p>
   <p className="text-sm  text-blue-500 capitalize">{user?.role}</p>

          
        </div>
      </div>

               {/* Details */}
 {!isEditing && (
<div className="mt-6 space-y-3">
 <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
    <MdEmail className="text-gray-600 text-lg dark:text-white" />
   <p className="text-sm">{user?.email}</p>
 </div>

 <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
    <FaPhoneAlt className="text-slate-600 text-base dark:text-white" />
 <p className="text-sm">{user?.phone}</p>
        </div>
      </div>
 )}
      {/*  Button */}
 {!isEditing && (
        <button
    onClick={() => setIsEditing(true)}
   className="mt-6  flex rounded-lg bg-blue-500 border px-4 text-sm py-2 text-white hover:bg-blue-500 dark:bg-slate-800 dark:border-blue-200">
       Edit Profile
        </button>
      )}

                       {/* Form */}
{isEditing && (
 <div className="space-y-5 mt-8">
  <div>
 <label className="block text-sm font-medium text-gray-600 text-left  mb-2 dark:text-white">Username</label>

 <input
    type="text"
       name="username"
          value={formData.username}
      onChange={handleChange}
   className={inputStyle}/>
 </div>

          <div>
 <label className="block text-sm font-medium text-gray-600 text-left mb-2 dark:text-white">Phone</label>

  <input
    type="text"
       name="phone"
     value={formData.phone}
     onChange={handleChange}
    className={inputStyle}/>
          </div>

          <div>
<label className="block text-sm font-medium text-gray-600 text-left  mb-2 dark:text-white">Avatar URL</label>

 <input
type="text"
       name="avatar"
     value={formData.avatar}
    onChange={handleChange}
     className={inputStyle}/>
  </div>

  <div className="flex justify-start gap-3 pt-2">
  <button onClick={handleSave}
    className="rounded-lg text-sm bg-blue-500 px-6 text-white hover:bg-blue-600 py-1.5">
         Save
       </button>

<button onClick={handleCancel}
 className="rounded-lg text-sm border border-gray-300 px-6 py-1.5 hover:bg-gray-100 dark:text-white dark:hover:bg-slate-900">
      Cancel
     </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserInfo;