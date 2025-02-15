"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  return (
    <div className="flex flex-col items-center w-full p-6">
      <div className="flex flex-col sm:flex-row w-full gap-6">
       
        <div className="flex flex-col justify-center items-center sm:items-center h-1/2 w-full sm:w-3/4 bg-slate-700 p-6 rounded-2xl border border-gray-400 shadow-md">
          <h2 className="text-3xl font-bold text-white mb-4">Admin Panel</h2>
          <button
            className="w-full sm:w-auto bg-blue-500 text-white px-6 py-3 rounded-lg transition hover:bg-blue-600 active:scale-95"
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
  );
};

export default Dashboard;
