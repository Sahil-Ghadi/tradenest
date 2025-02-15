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
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={() => router.push("/admin")}
          >
            View Item Requests
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center sm:items-center w-full sm:w-3/4 h-1/2 bg-slate-700 p-6 rounded-2xl border border-gray-400 shadow-md">
          <h2 className="text-3xl font-bold text-white mb-4">Customer Panel</h2>
          <button className="w-full sm:w-[198px] bg-green-500 text-white px-6 py-3 rounded-lg transition hover:bg-green-600 active:scale-95">
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
