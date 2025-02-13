"use client"
import Link from "next/link"
import { SignUpForm } from "./signup-form"

export default function SignUpPage() {
  return (
    <div className="bg-cool bg-cover bg-no-repeat h-full ">
          <div className="h-screen flex flex-col justify-center items-center">
            <div className="h-[415px] w-[380px] rounded-xl shadow-2xl bg-white flex flex-col sm:w-[410px]">
              <div className=" flex items-center">
                <img className="h-10 w-auto mr-4"></img>
                <img className="h-10 w-auto"></img>
              </div>
              <div>
                <div className="flex flex-col">
                  <h2 className="mb-1 text-center text-4xl font-semibold text-black">
                  Create an Account
                  </h2>
                  <span className="text-center text-sm text-gray-600 mb-6">
                  Sign up to start shopping in our e-store
                  </span>
                </div>
                <SignUpForm />
              </div>
            </div>
          </div>
        </div>        
  )
}

