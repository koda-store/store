import { Search, Moon, Heart, ShoppingCart } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
      {/* الجزء الشمال: اللوجو */}
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
          K
        </div>
        <div className="leading-tight">
          <h1 className="font-extrabold text-gray-900 text-lg">KODA STORE</h1>
          <span className="text-[10px] tracking-widest text-gray-400">
            ONLINE STORE
          </span>
        </div>
      </div>

      {/* الجزء النص: روابط التنقل */}
      <div className="hidden md:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-2 py-1.5">
        <a
          href="/"
          className="px-4 py-1.5 rounded-full text-gray-700 hover:bg-white hover:shadow-sm transition text-sm font-medium"
        >
          Home
        </a>
        <a
          href="/shop"
          className="px-4 py-1.5 rounded-full text-gray-700 hover:bg-white hover:shadow-sm transition text-sm font-medium"
        >
          Shop
        </a>
        <a
          href="/orders"
          className="px-4 py-1.5 rounded-full text-gray-700 hover:bg-white hover:shadow-sm transition text-sm font-medium"
        >
          My Orders
        </a>
        <a
          href="/wishlist"
          className="px-4 py-1.5 rounded-full text-gray-700 hover:bg-white hover:shadow-sm transition text-sm font-medium"
        >
          Wishlist
        </a>
      </div>

      {/* الجزء اليمين: الأيقونات وزرار اللوجين */}
      <div className="flex items-center gap-3">
        <button className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 border border-gray-200 hover:bg-gray-100 transition">
          <Search size={18} className="text-gray-600" />
        </button>

        <button className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 border border-gray-200 hover:bg-gray-100 transition">
          <Moon size={18} className="text-gray-600" />
        </button>

        <button className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 border border-gray-200 hover:bg-gray-100 transition">
          <Heart size={18} className="text-gray-600" />
        </button>

        <button className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 border border-gray-200 hover:bg-gray-100 transition">
          <ShoppingCart size={18} className="text-gray-600" />
        </button>

        <button className="px-6 py-2 rounded-full bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition">
          Login
        </button>
      </div>
    </nav>
  );
}