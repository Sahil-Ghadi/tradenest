"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";

const Navbar = () => {
  const { logout, user } = useAuthStore();
  const router = useRouter();

  const navItems = [
    { name: "Login", slug: "/login", active: !user },
    { name: "Signup", slug: "/signup", active: !user },
    { name: "Add items", slug: "/item", active: user },
    { name: "My Orders", slug: "/", active: user },
    { name: "View Request", slug: "/admin", active: user },
  ];

  return (
    <nav className="flex justify-between p-2">
      <div>
        <img alt="MY LOGO" />
      </div>
      {/* Navigation Items */}
      <ul className="flex ml-auto">
        {navItems.map(
          (item) =>
            item.active && (
              <li key={item.slug}>
                <button
                  onClick={() => router.push(item.slug)}
                  className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                >
                  {item.name}
                </button>
              </li>
            )
        )}
        {/* Logout Button (if user is logged in) */}
        {user && (
          <li>
            <button
              onClick={logout}
              className="inline-block px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-700"
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
