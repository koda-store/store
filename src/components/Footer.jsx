import React from "react";
import { Link } from "react-router-dom";
import { Zap, Globe, MessageCircle, Heart } from "lucide-react";

function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 py-10 px-6 md:px-16 mt-auto">
      
      <div className="max-w-full mx-auto flex flex-col md:flex-row md:justify-between items-start gap-10 md:gap-4">
        
        <div className="flex flex-col gap-3 max-w-xs">
          <div className="flex items-center gap-1.5 text-blue-600 font-bold text-lg cursor-pointer">
            <Zap className="w-5 h-5 fill-current text-blue-600" />
            <span className="text-blue-600 tracking-wide font-extrabold text-base md:text-lg">Koda Store</span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            Shop the future, delivered today. Premium<br/>products at the best prices with fast delivery<br/>across Egypt.
          </p>
        </div>

        <div className="flex flex-col gap-3 min-w-[120px]">
          <h3 className="font-bold text-sm text-gray-800 dark:text-gray-200">Quick Links</h3>
          <ul className="flex flex-col gap-2.5 text-xs text-gray-500 dark:text-gray-400 font-normal pl-4">
            <li>
              <Link to="/shop" className="hover:text-blue-600 transition-colors duration-200 cursor-pointer block w-fit">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/orders" className="hover:text-blue-600 transition-colors duration-200 cursor-pointer block w-fit">
                My Orders
              </Link>
            </li>
            <li>
              <Link to="/wishlist" className="hover:text-blue-600 transition-colors duration-200 cursor-pointer block w-fit">
                Wishlist
              </Link>
            </li>
            <li>
              <Link to="/profile" className="hover:text-blue-600 transition-colors duration-200 cursor-pointer block w-fit">
                Profile
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 min-w-[120px] md:items-start">
          <h3 className="font-bold text-sm text-gray-800 dark:text-gray-200">Follow Us</h3>
          <div className="flex items-center gap-4 text-gray-400 dark:text-gray-500 mt-1">
            <a href="#" className="hover:text-blue-600 transition-colors duration-200 cursor-pointer">
              <Globe className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors duration-200 cursor-pointer">
              <MessageCircle className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors duration-200 cursor-pointer">
              <Heart className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>

      <div className="w-full text-center text-xs text-gray-400 dark:text-gray-500 mt-12 pt-4 border-t border-gray-50 dark:border-gray-800/40">
        © 2026 Koda Store. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;