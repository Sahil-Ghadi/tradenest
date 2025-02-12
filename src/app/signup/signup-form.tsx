"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";

export function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState({
    name:'',
    email: '',
    password: '',
  })
  const {login,createAccount} = useAuthStore()
  const [error, setError] = useState("");


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = user.name
    const email =  user.email
    const password =  user.password

    if (name || !email || !password) {
        setError(() => "Please fill out all fields");
        return;
    }

    setIsLoading(() => true);
    setError(() => "");

    const response = await createAccount(
        `${name}`,
        email.toString(),
        password.toString()
    );

    if (response.error) {
        setError(() => response.error!.message);
    } else {
        const loginResponse = await login(email.toString(), password.toString());
        if (loginResponse.error) {
            setError(() => loginResponse.error!.message);
        }
    }

    setIsLoading(() => false);
};


  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col items-center justify-center">
        <div className="w-[300px]">
          <input
            id="name"
            name="name"
            type="name"
            autoComplete="name"
            placeholder="name"
            required
            className=" w-[300px] h-[42px] mb-2 pl-4 py-2 border bg-gray-100 rounded-xl placeholder-gray-400  outline-gray-300"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>

        <div>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Email"
            required
            className="pl-4 w-[300px] h-[42px] py-2 mb-2 border bg-gray-100 rounded-xl placeholder-gray-400 outline-gray-300"
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
            className="pl-4 w-[300px] h-[42px] py-2 mb-4 border bg-gray-100 rounded-xl placeholder-gray-400 outline-gray-300"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
      </div>

      
      <div className="flex items-center justify-center mb-4">
        <Button
          type="submit"
          className="w-[300px] h-[42px] flex justify-center items-center py-2 px-4 rounded-full shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={isLoading}
        >
          {isLoading ? "Signing up..." : "Sign up"}
        </Button>
      </div>


      <div className="text-sm text-center">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-blue-600 hover:text-blue-700"
        >
          Log in
        </Link>
      </div>
    </form>
  )
}

