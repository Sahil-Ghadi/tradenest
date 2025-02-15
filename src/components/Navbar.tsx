"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

const Navbar = () => {
  const { logout, user } = useAuthStore();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Login", slug: "/login", active: !user },
    { name: "Signup", slug: "/signup", active: !user },
    { name: "Add Items", slug: "/addItem", active: user },
    { name: "My Orders", slug: "/myOrders", active: user },
    { name: "My Request", slug: "/admin", active: user },
    { name: "My Profile", slug: "/dashboard", active: user },
  ];

  return (
    <nav className="flex items-center justify-between bg-transparent px-6 sm:px-10 pt-6 relative">
      {/* Logo */}
      <div className="bg-white px-6 py-2 border-double rounded-full border-2 border-blue-600">
        <div className="font-bold text-2xl sm:text-3xl">
          Trade<span className="text-blue-700">NEST</span>
        </div>
      </div>

      {/* Desktop Navigation (Before Login) */}
      {!user && (
        <ul className="hidden md:flex space-x-3">
          {navItems.map(
            (item) =>
              item.active && (
                <li key={item.slug}>
                  <button
                    onClick={() => router.push(item.slug)}
                    className="w-auto h-[42px] inline-flex justify-center items-center py-2 px-4 rounded-2xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 hover:outline-blue-700 hover:outline-dotted hover:outline-2 focus:outline-none focus:ring-blue-500 active:bg-blue-800 active:scale-90"
                  >
                    {item.name}
                  </button>
                </li>
              )
          )}
        </ul>
      )}

      {/* Desktop Navigation (After Login) */}
      {user && (
        <ul className="hidden md:flex space-x-3">
          {navItems.map(
            (item) =>
              item.active && (
                <li key={item.slug}>
                  <button
                    onClick={() => router.push(item.slug)}
                    className="w-auto h-[42px] inline-flex justify-center items-center py-2 px-4 rounded-2xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 hover:outline-blue-700 hover:outline-dotted hover:outline-2 focus:outline-none focus:ring-blue-500 active:bg-blue-800 active:scale-90"
                  >
                    {item.name}
                  </button>
                </li>
              )
          )}
          {/* Logout Button */}
          <li>
            <button
              onClick={logout}
              className="inline-block w-auto h-[42px] py-2 px-4 bg-red-600 text-white rounded-2xl hover:bg-red-700 hover:drop-shadow-lg active:scale-90 hover:outline-red-600 hover:outline-dotted hover:outline-2"
            >
              Logout
            </button>
          </li>
        </ul>
      )}

      {/* Mobile Menu Button (Only After Login) */}
      {user && (
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="px-3 py-2 border-2 border-blue-600 rounded-lg text-blue-600 hover:bg-blue-100 focus:outline-none"
          >
            ☰
          </button>
        </div>
      )}

      {/* Mobile Dropdown Menu */}
      {menuOpen && user && (
        <div className="z-10 absolute top-16 right-6 w-48 bg-white shadow-2xl rounded-lg p-2 md:hidden">
          {navItems.map(
            (item) =>
              item.active && (
                <button
                  key={item.slug}
                  onClick={() => {
                    router.push(item.slug);
                    setMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-blue-600 hover:bg-blue-100 rounded-md"
                >
                  {item.name}
                </button>
              )
          )}
          <button
            onClick={logout}
            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 rounded-md"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
