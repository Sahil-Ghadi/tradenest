"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  return (
    <div className="h-screen">
      <div className="flex h-full">
        {/* Admin Side */}
        <div className="w-1/2 bg-gray-100 p-6 border-r border-gray-300">
          <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
          <div className="space-y-4">
          <p className="text-lg">Welcome, Store Admin!</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              onClick={() => router.push("/admin")}
            >
              View Item Requests
            </button>
          </div>
        </div>

        {/* Customer Side */}
        <div className="w-1/2 bg-white p-6">
          <h2 className="text-2xl font-bold mb-4">Customer Panel</h2>
          <div className="space-y-4">
            <p className="text-lg">Welcome, Customer!</p>
            <button onClick={() => router.push("/item")}
            className="bg-green-500 text-white px-4 py-2 rounded-lg">
              View Available Items
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
