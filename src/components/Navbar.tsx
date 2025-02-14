"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore"; 

const Navbar = () => {
  const {logout,user} = useAuthStore()
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const navItems = [
    {
      name:"Login",
      slug: "/Login",
      active: !user,
    },
    {
      name:"Signup",
      slug: "/Signup",
      active: !user,
    },
    {
      name:"Add items",
      slug: "/item",
      active: user,
    },
    {
      name:"My Orders",
      slug: "/add-post",
      active: user,
    },
    {
      name:"View Request",
      slug: "/admin",
      active: user,
    }
  ]
  return (
    <nav className='flex justify-between p-2 '>
        <div className=''>
          <img alt="MY LOGO"></img>
        </div>
        {/* navitems */}
        <ul className='flex ml-auto'>
          {navItems.map((item)=>
          item.active?(
            <li key={item.name}>
            <button
            onClick={() => router.push(item.slug)}
            className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
            >{item.name}</button>
            </li>
          ):null
        )}
        </ul>
      </nav>
  );
};

export default Navbar;
