import { Link } from "react-router-dom";
import { ShoppingBagIcon, HomeIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16 px-6">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <ShoppingBagIcon className="w-8 h-8 text-blue-600 relative transform transition-transform group-hover:scale-110" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              TerraFurni
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-300 group"
            >
              <HomeIcon className="w-5 h-5 transform group-hover:scale-110 transition-transform" />
              <span className="font-medium">Home</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
