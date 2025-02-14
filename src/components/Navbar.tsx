"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";

const Navbar = () => {
  const { logout, user } = useAuthStore(); // Get user state
  const router = useRouter();

  const navItems = [
    { name: "Login", slug: "/login", active: !user },
    { name: "Signup", slug: "/signup", active: !user },
    { name: "Add items", slug: "/addItem", active: user },
    { name: "My Orders", slug: "/", active: user },
    { name: "View Request", slug: "/admin", active: user },
    { name: "Profile ", slug: "/dashboard", active: user }
  ];

  return (
    <nav className="flex justify-between p-2">
      <div><Link href={"/item"}>
        <img alt="MY LOGO" />
        </Link>
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
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
