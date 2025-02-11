"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col items-center justify-center">
        <div className="w-[300px]">
          <input
            id="username"
            name="username"
            type="username"
            autoComplete="username"
            placeholder="Username"
            required
            className=" w-[300px] mb-2 pl-4 py-2 border bg-gray-100 rounded-xl placeholder-gray-400  outline-gray-300"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </div>

        <div>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Password"
            required
            className="pl-4 w-[300px] py-2 mb-4 border bg-gray-100 rounded-xl placeholder-gray-400 outline-gray-300"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
      </div>

      
      <div className="flex items-center justify-center mb-4">
        <button
          type="submit"
          className="w-[300px] flex justify-center py-2 px-4 rounded-full shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Sign in
        </button>
      </div>

      {error && <div className="text-red-600 text-sm mt-2">{error}</div>}

      <div className="text-sm text-center">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-medium text-blue-600 hover:text-blue-700"
        >
          Sign up
        </Link>
      </div>
    </form>
  );
}
