"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center w-full p-6 min-h-screen bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-screen">
        {/* Admin Panel */}
        <div className="flex flex-col justify-around items-center bg-slate-700 p-6 rounded-2xl border border-gray-400 shadow-md w-full">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">Admin Panel</h2>
          <button
            className="w-full md:w-auto bg-blue-500 text-white px-6 py-3 rounded-lg transition hover:bg-blue-600 active:scale-95"
            onClick={() => router.push("/admin")}
          >
            View Item Requests
          </button>
        </div>

        {/* Customer Panel */}
        <div className="flex flex-col justify-around items-center bg-slate-700 p-6 rounded-2xl border border-gray-400 shadow-md w-full">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">Customer Panel</h2>
          <button
            className="w-full md:w-auto bg-green-500 text-white px-6 py-3 rounded-lg transition hover:bg-green-600 active:scale-95"
            onClick={() => router.push("/myOrders")}
          >
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;