import { useEffect, useState } from "react";
import { api } from "../../api/axios";
////icon react///
import { MdLocationOn } from "react-icons/md";
// toast notification
import { toast } from "react-toastify";

function Addresses() {
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);

  const [address, setAddress] = useState({
    country: "",
    city: "",
    street: "",
    building: "",
    postalCode: "",
    defaultAddress: false,
  });

  useEffect(() => {
    getAddresses();
  }, []);

  const getAddresses = async () => {
    try {
     const res = await api.get("/auth/me");

setUser(res.data.user);
setAddresses(res.data.user.addresses || []);
} catch (err) {
 toast.error(err.response?.data?.message || "Something went wrong.");
    }
  };

  const handleChange = (e) => {

 setAddress({...address,
   [e.target.name]: e.target.value, });
  };

 const handleAddAddress = async () => {
  if (!user) return;
 const fields = {
  country: "Country",
 city: "City",
  street: "Street",
    };

 for (const key in fields) {
 if (!address[key].trim()) {
 toast.error(`Please enter ${fields[key]}.`);
 return;
      }
    }
    try {
await api.patch(`/users/${user._id}`, {addresses: [...addresses, address],});
     await getAddresses();

      toast.success("Address added successfully!");

setAddress({
  country: "",
 city: "",
 street: "",
 building: "",
 postalCode: "",
   defaultAddress: false,});
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong.");
    }
  };

  const inputStyle =
    "w-full text-sm rounded-lg border border-slate-400 px-4 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-400";
  return (
    
    <div className="w-full my-8  bg-white rounded-xl border border-slate-200 dark:bg-slate-800 dark:border-slate-600 p-6 shadow-xl  dark:text-white">
      <div className="mb-4 flex items-center gap-2">
        <MdLocationOn className="text-lg text-red-500" />
        <h2 className="text-lg font-semibold text-black dark:text-white">Addresses</h2>
      </div>
{addresses.length === 0 && (
   <p className="mb-5 text-left text-sm text-gray-500 dark:text-gray-300">
No addresses yet.
</p>
)}

 <div className="grid grid-cols-1 gap-4 md:grid-cols-2 dark:text-gray-200 text-gray-800">
 <input
   type="text"
  name="country"
   placeholder="Country"
   value={address.country}
     onChange={handleChange}
   className={inputStyle} />

<input
   type="text"
   name="city"
   placeholder="City"
   value={address.city}
   onChange={handleChange}
     className={inputStyle}/>

 <input
   type="text"
   name="street"
   placeholder="Street"
   value={address.street}
   onChange={handleChange}
   className={inputStyle} />

 <input
    type="text"
   name="building"
   placeholder="Building"
   value={address.building}
   onChange={handleChange}
   className={inputStyle} />

 <div className="md:col-span-2">
  <input
  type="text"
  name="postalCode"
  placeholder="Postal Code"
   value={address.postalCode}
   onChange={handleChange}
   className={inputStyle}/>
        </div>
      </div>

 <button onClick={handleAddAddress}
   className="mt-5 rounded-lg bg-blue-500 px-5  py-2 text-sm text-white hover:bg-blue-600">
   + Add Address
  </button>
    </div>
   
  );
}

export default Addresses;