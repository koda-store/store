import UserInfo from "../components/Profile/UserInfo"
import AddressSection from "../components/Profile/AddressSection"
import ChangePassword from "../components/Profile/ChangePassword"
import LogoutButton from "../components/Profile/LogoutButton"


function Profile() {
  
  return (

    
    <div className=" w-3/4 mx-auto  text-center p-5 mt-6  dark:bg-slate-900">
      <h1 className="text-2xl tracking-[0.35em] uppercase font-bold text-blue-400 mb-6">My Profile</h1>
<UserInfo />
<AddressSection/>
<ChangePassword />
<LogoutButton/>
    </div>
  );
}

export default Profile;