"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";

const Navbar = () => {
  const { logout, user } = useAuthStore();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const logoutfn = async () => {
    await logout();
    router.push("/")
  }

  const navItems = [
    { name: "Login", slug: "/login", active: !user },
    { name: "Signup", slug: "/signup", active: !user },
    { name: "Add Items", slug: "/addItem", active: user },
    { name: "My Orders", slug: "/myOrders", active: user },
    { name: "My Requests", slug: "/admin", active: user },
    { name: "My Profile", slug: "/dashboard", active: user },
    { name: "All Items", slug: "/", active: user },

  ];

  return (
    <nav className="flex items-center justify-between px-6 sm:px-10 pt-6 relative">
      {/* Logo */}
      <Link href={"/"}>
        <div className="bg-white sm:px-6 px-4 py-1 sm:py-2 rounded-full border-2 border-blue-600">
          <div className="font-bold text-2xl sm:text-3xl">
            Trade<span className="text-blue-700">NEST</span>
          </div>
        </div>
      </Link>

      {/* Desktop Navigation - Only shown on larger screens */}
      <ul className="hidden lg:flex space-x-3">
        {navItems.map(
          (item) =>
            item.active && (
              <li key={item.slug}>
                <button
                  onClick={() => router.push(item.slug)}
                  className="w-auto h-[42px] inline-flex justify-center items-center py-2 px-4 rounded-2xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 hover:outline-blue-700 hover:outline-dotted hover:outline-3 focus:outline-none focus:ring-blue-500 active:bg-blue-800 active:scale-90"
                >
                  {item.name}
                </button>
              </li>
            )
        )}
        {user && (
          <li>
            <button
              onClick={logout}
             className="inline-block w-auto h-[42px] py-2 px-4 bg-red-600 text-white rounded-2xl hover:bg-red-700 hover:drop-shadow-lg active:scale-90 hover:outline-red-600 hover:outline-dotted hover:outline-3"
            >
              Logout
            </button>
          </li>
        )}
      </ul>

      {/* Mobile Menu Button (Appears when screen width is below 'lg') */}
      <div className="lg:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="px-3 py-2 outline outline-2 outline-blue-600 rounded-2xl text-blue-600 hover:bg-blue-100 focus:outline-none"
        >
          {menuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown Menu - Only shown when menuOpen is true */}
      {menuOpen && (
        <div className="z-10 absolute top-16 right-6 w-48 bg-white shadow-2xl rounded-lg p-2 lg:hidden">
          {navItems.map(
            (item) =>
              item.active && (
                <button
                  key={item.slug}
                  onClick={() => {
                    router.push(item.slug);
                    setMenuOpen(false); // Close menu after click
                  }}
                  className="block w-full text-left px-4 py-2 text-blue-600 hover:bg-blue-100 rounded-md"
                >
                  {item.name}
                </button>
              )
          )}
          {user && (
            <button
              onClick={() => {
                logout();
                setMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 rounded-md"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
