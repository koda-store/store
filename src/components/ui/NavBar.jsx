
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Search, Moon, Sun, Heart, ShoppingCart, User, Menu, X } from "lucide-react";
import { useCart } from "../../context/CartContext";
import usewishLists from "../../redux/useWishList";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [wishlistCount, setWishListCount] = useState(0);
  const { itemsCount } = useCart();
  const wishlist = usewishLists();
  const GOTO = useNavigate();

  const [themes, setThemes] = useState(localStorage.getItem('themes') || 'light');
  useEffect(() => {
    localStorage.setItem('themes', themes)
    document.body.className = themes
  }, [themes])


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
    `block px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive
      ? "bg-blue-600 text-white"
      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400"
    }`;

  return (

    <nav className="fixed top-0 left-0 w-full px-4 sm:px-8 py-3 bg-white/95 dark:bg-gray-950 backdrop-blur-sm shadow-sm dark:shadow-black/30 border-b border-gray-100 dark:border-slate-700 z-50 transition-colors duration-300">
      <div className="w-full flex items-center justify-between">

        <div className="flex items-center gap-2 cursor-pointer select-none">
          <div className="flex items-center justify-center mr-1 text-blue-700 dark:text-blue-400 transition-colors duration-300">
            <span className="text-3xl font-black italic">K</span>
          </div>

          <div className="flex flex-col leading-none">
            <span className="text-[15px] font-extrabold tracking-wide text-gray-900 dark:text-white transition-colors duration-300">
              KODA
            </span>

            <span className="mt-[2px] text-[15px] font-extrabold tracking-wide text-gray-900 dark:text-white transition-colors duration-300">
              STORE
            </span>

            <span className="mt-1 text-[8px] font-semibold tracking-[0.25em] uppercase text-gray-400 dark:text-gray-500 transition-colors duration-300">
              Online Store
            </span>
          </div>
        </div>

        <div
          className="
    hidden md:flex items-center
    bg-gray-50 dark:bg-gray-800/70
    border border-gray-200 dark:border-gray-700
    rounded-full p-1
    shadow-sm
    transition
  "
        >
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
            <button onClick={() => setThemes(prev => prev === 'light' ? 'dark' : 'light')} className="text-gray-500 cursor-pointer hover:text-blue-600 transition">
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
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all duration-300">
            <User size={16} className="text-gray-600 dark:text-gray-300" />
            <span className="text-sm font-medium text-gray-700 dark:text-white">
              CUSTOMER
            </span>
          </button>
        </div>

        <button
          className="md:hidden text-gray-700 dark:text-gray-500 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-700 shadow-lg px-4 py-4 flex flex-col gap-2 z-50 transition-all duration-300">
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

          <div className="flex items-center justify-between px-2 py-3 mt-2 border-t border-gray-100 dark:border-slate-700">
            <div className="flex items-center gap-2">

              <button className="p-2 rounded-full text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all">
                <Search size={19} />
              </button>

              <button
                onClick={() => setThemes(prev => (prev === "light" ? "dark" : "light"))}
                className="p-2 rounded-full text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
              >
                {themes === "light" ? <Moon size={19} /> : <Sun size={19} />}
              </button>

              <button
                onClick={() => {
                  GOTO("/wishlist");
                  setMenuOpen(false);
                }}
                className="relative p-2 rounded-full text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-red-500 transition-all"
              >
                <Heart size={19} />

                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                    {wishlistCount > 99 ? "99+" : wishlistCount}
                  </span>
                )}
              </button>

              <NavLink
                to="/cart"
                onClick={() => setMenuOpen(false)}
                className="relative p-2 rounded-full text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
              >
                <ShoppingCart size={19} />

                {itemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white">
                    {itemsCount > 99 ? "99+" : itemsCount}
                  </span>
                )}
              </NavLink>

            </div>

            <button className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all">
              <User size={14} className="text-gray-600 dark:text-gray-300" />
              <span className="text-xs font-medium text-gray-700 dark:text-white">
                CUSTOMER
              </span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}