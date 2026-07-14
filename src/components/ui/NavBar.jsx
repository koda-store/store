import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Moon, Heart, ShoppingCart, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="relative w-screen max-w-full overflow-x-hidden flex items-center justify-between px-6 sm:px-8 lg:px-10 py-4 bg-white border-b border-gray-100 shadow-sm box-border">
      {/* الجزء الشمال: اللوجو */}
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shrink-0">
          K
        </div>
        <div className="leading-tight">
          <h1 className="font-extrabold text-gray-900 text-base sm:text-lg tracking-tight">
            KODA STORE
          </h1>
          <span className="text-[9px] tracking-[0.2em] text-gray-400">
            ONLINE STORE
          </span>
        </div>
      </div>

      {/* الجزء النص: روابط التنقل */}
      <div className="hidden lg:flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-full px-1.5 py-1.5">
        <Link to="/" className="px-5 py-2 rounded-full text-gray-700 hover:bg-white hover:shadow-sm transition text-sm font-medium">
          Home
        </Link>
        <Link to="/shop" className="px-5 py-2 rounded-full text-gray-700 hover:bg-white hover:shadow-sm transition text-sm font-medium">
          Shop
        </Link>
        <Link to="/orders" className="px-5 py-2 rounded-full text-gray-700 hover:bg-white hover:shadow-sm transition text-sm font-medium">
          My Orders
        </Link>
        <Link to="/wishlist" className="px-5 py-2 rounded-full text-gray-700 hover:bg-white hover:shadow-sm transition text-sm font-medium">
          Wishlist
        </Link>
      </div>

      {/* الجزء اليمين: الأيقونات وزرار اللوجين */}
      <div className="flex items-center gap-2.5 shrink-0">
        <button className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition">
          <Search size={18} className="text-gray-600" />
        </button>

        <button className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition">
          <Moon size={18} className="text-gray-600" />
        </button>

        <button className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition">
          <Heart size={18} className="text-gray-600" />
        </button>

        <button className="flex w-10 h-10 items-center justify-center rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition">
          <ShoppingCart size={18} className="text-gray-600" />
        </button>

        <button className="px-6 py-2.5 rounded-full bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition">
          Login
        </button>

        {/* زرار القائمة - بيظهر بس في الشاشات الصغيرة والمتوسطة */}
        <button
          className="lg:hidden flex w-10 h-10 items-center justify-center rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* القائمة المنسدلة بتاعة الموبايل */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-md lg:hidden flex flex-col p-4 gap-1 z-50">
          <Link to="/" className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50 text-sm font-medium">
            Home
          </Link>
          <Link to="/shop" className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50 text-sm font-medium">
            Shop
          </Link>
          <Link to="/orders" className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50 text-sm font-medium">
            My Orders
          </Link>
          <Link to="/wishlist" className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50 text-sm font-medium">
            Wishlist
          </Link>
          <div className="flex items-center gap-2 pt-2 border-t border-gray-100 mt-2">
            <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-gray-50 text-sm text-gray-600">
              <Search size={16} /> Search
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-gray-50 text-sm text-gray-600">
              <Heart size={16} /> Wishlist
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}