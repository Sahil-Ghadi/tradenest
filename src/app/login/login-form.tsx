"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";

export default function LoginForm() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  
  const router = useRouter();
  const { login } = useAuthStore();  // Zustand store

  // ✅ Fix hydration error by ensuring Zustand only runs on the client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Avoid rendering until the component is mounted
  if (!isMounted) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!user.email || !user.password) {
      setError("Please fill out all fields");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const loginResponse = await login(user.email, user.password);
      if (loginResponse.error) {
        setError(loginResponse.error.message);
      } else {
        router.push("/");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center">
        <div className="w-[300px]">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Email"
            required
            className="pl-4 w-[300px] h-[42px] py-2 mb-2 border bg-gray-100 dark:bg-gray-800 rounded-xl placeholder-gray-400 dark:placeholder-gray-500 outline-gray-300 dark:outline-gray-600 text-black dark:text-white"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
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
            className="pl-4 w-[300px] h-[42px] py-2 mb-4 border bg-gray-100 dark:bg-gray-800 rounded-xl placeholder-gray-400 dark:placeholder-gray-500 outline-gray-300 dark:outline-gray-600 text-black dark:text-white"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
      </div>

      <div className="flex items-center justify-center mb-4">
        <button
          type="submit"
          disabled={isLoading}
          className="w-[300px] h-[42px] flex justify-center items-center py-2 px-4 rounded-full shadow-sm text-sm font-medium text-white bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {isLoading ? "Logging in..." : "Log in"}
        </button>
      </div>

      {error && <div className="text-red-600 dark:text-red-400 text-sm mt-2">{error}</div>}

      <div className="text-sm text-center text-black dark:text-white">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500"
        >
          Sign Up
        </Link>
      </div>
    </form>
  );
}
