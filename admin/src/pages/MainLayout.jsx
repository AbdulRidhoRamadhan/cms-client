import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden">
      <aside
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-40 w-64 transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0`}
      >
        <Sidebar />
      </aside>

      <main className="flex-1 relative w-full lg:w-[calc(100%-16rem)]">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed top-4 left-4 p-2 bg-white rounded-lg shadow-lg lg:hidden z-50"
        >
          <Bars3Icon className="w-6 h-6 text-gray-600" />
        </button>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <div className="h-screen overflow-auto bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
