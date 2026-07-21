
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Search, Moon, Heart, ShoppingCart, User, Menu, X } from "lucide-react";
import { useCart } from "../../context/CartContext";
import usewishLists from "../../redux/useWishList";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [wishlistCount, setWishListCount] = useState(0);
  const { itemsCount } = useCart();
  const wishlist = usewishLists();
  const GOTO = useNavigate();

  const [themes , setThemes] = useState('light');
  useEffect(() => {
    document.body.className = themes
  },[themes])


  useEffect(() => {
    if (!wishlist.loading) {
      setWishListCount(wishlist?.wishlist?.totalProducts)
    }
  }, [wishlist?.wishlist?.totalProducts])
  const linkClass = ({ isActive }) =>
    `px-5 py-2 rounded-full text-sm font-medium transition-all ${isActive
      ? "bg-blue-600 text-white shadow-sm"
      : "text-gray-600 hover:text-blue-600"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-lg text-sm font-medium transition ${isActive
      ? "bg-blue-600 text-white"
      : "text-gray-700 hover:text-blue-600"
    }`;

  return (

    <nav className="fixed top-0 left-0 w-full px-4 sm:px-8 py-3 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100 z-50">
      <div className="w-full flex items-center justify-between">

        <div className="flex items-center gap-2">
          <div className="text-blue-800 flex items-center justify-center mr-1">
            <span className="text-2xl font-black italic">K</span>
          </div>
          <div className="flex flex-col items-start justify-center leading-none">
            <span className="font-extrabold text-gray-900 text-[15px] tracking-wide">KODA</span>
            <span className="font-extrabold text-gray-900 text-[15px] tracking-wide mt-[2px]">STORE</span>
            <span className="text-[7px] font-bold tracking-[0.2em] text-gray-400 mt-1">
              ONLINE STORE
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center bg-gray-50 border border-gray-200 rounded-full p-1">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/shop" className={linkClass}>
            Shop
          </NavLink>
          <NavLink to="/orders" className={linkClass}>
            My Orders
          </NavLink>
          <NavLink to="/wishlist" className={linkClass}>
            Wishlist
          </NavLink>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-4">
            <button className="text-gray-500 cursor-pointer hover:text-blue-600 transition">
              <Search size={19} />
            </button>
            <button onClick={() => setThemes(prev => prev === 'light'? 'dark':'light')} className="text-gray-500 cursor-pointer hover:text-blue-600 transition">
              <Moon size={19} />
            </button>
            <button onClick={() => GOTO('/wishlist')} className="relative cursor-pointer text-gray-500 hover:text-red-500 transition">
              <Heart size={20} />

              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </button>
            <NavLink to="/cart" className="relative text-gray-500 hover:text-blue-600 transition">
              <ShoppingCart size={19} />
              {itemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {itemsCount > 9 ? "9+" : itemsCount}
                </span>
              )}
            </NavLink>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-200 hover:bg-gray-100 transition">
            <User size={16} className="text-gray-600" />
            <span className="text-sm font-medium text-gray-700">CUSTOMER</span>
          </button>
        </div>

        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white mt-0 border-t border-gray-100 shadow-lg px-4 py-3 flex flex-col gap-1 z-50">
          <NavLink to="/" end className={mobileLinkClass} onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/shop" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>
            Shop
          </NavLink>
          <NavLink to="/orders" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>
            My Orders
          </NavLink>
          <NavLink to="/wishlist" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>
            Wishlist
          </NavLink>

          <div className="flex items-center justify-between px-4 py-3 mt-2 border-t border-gray-100">
            <div className="flex items-center gap-4">
              <button className="text-gray-500"><Search size={19} /></button>
              <button className="text-gray-500"><Moon size={19} /></button>
              <button className="text-gray-500"><Heart size={19} /></button>
              <NavLink to="/cart" className="relative text-gray-500" onClick={() => setMenuOpen(false)}>
                <ShoppingCart size={19} />
                {itemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                    {itemsCount > 9 ? "9+" : itemsCount}
                  </span>
                )}
              </NavLink>
            </div>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200">
              <User size={14} className="text-gray-600" />
              <span className="text-xs font-medium text-gray-700">CUSTOMER</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}