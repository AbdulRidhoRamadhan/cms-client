import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  UserPlusIcon,
  ShoppingBagIcon,
  HomeIcon,
  PlusCircleIcon,
  TagIcon,
  ChartBarIcon,
  ArrowLeftEndOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  async function Logout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <div className="w-64 bg-white shadow-xl h-screen">
      <div className="p-6">
        <Link to="/" className="flex items-center space-x-3">
          <ShoppingBagIcon className="w-8 h-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-800">TerraFurni</span>
        </Link>
      </div>

      <nav className="mt-6 flex flex-col h-[calc(100%-88px)]">
        <div className="px-4 space-y-2 flex-1">
          <Link
            to="/"
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              isActive("/")
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <HomeIcon className="w-5 h-5" />
            <span>Beranda</span>
          </Link>

          <Link
            to="/add-product"
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              isActive("/add-product")
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <PlusCircleIcon className="w-5 h-5" />
            <span>Tambah Produk</span>
          </Link>

          <Link
            to="/categories"
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              isActive("/categories")
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <TagIcon className="w-5 h-5" />
            <span>Kategori</span>
          </Link>

          <Link
            to="/dashboard"
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              isActive("/dashboard")
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <ChartBarIcon className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
        </div>

        <div className="p-4 border-t">
          <Link
            to="/add-user"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            <UserPlusIcon className="w-5 h-5" />
            <span>Tambah User</span>
          </Link>

          <button
            onClick={Logout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
          >
            <ArrowLeftEndOnRectangleIcon className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
