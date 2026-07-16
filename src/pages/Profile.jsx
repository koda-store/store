import UserInfo from "../components/Profile/UserInfo"
import AddressSection from "../components/Profile/AddressSection"
import ChangePassword from "../components/Profile/ChangePassword"
import LogoutButton from "../components/Profile/LogoutButton"


function Profile() {
  
  return (
    <div className="lg:w-3/4 mx-auto md:p-6 p-6  text-center  my-2  dark:bg-slate-900">
      <h1 className="text-2xl tracking-[0.25em] uppercase font-bold text-blue-400 m-10 pt-5   ">My Profile</h1>
<UserInfo />
<AddressSection/>
<ChangePassword />
<LogoutButton/>
    </div>
  );
}

export default Profile;