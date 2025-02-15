"use client"
import LoginForm from "./login-form";

export default function LoginPage() {
  return (
    <div className=" z-0">
      <div className="h-[616px] flex flex-col justify-center items-center">
        <div className="h-[400px] w-[380px] rounded-xl border-4 border-black border-dotted bg-white flex flex-col mb-8 sm:w-[410px]">
          <div className=" flex items-center">
            <img className="h-10 w-auto mr-4"></img>
            <img className="h-10 w-auto"></img>
          </div>
          <div>
            <div className="flex flex-col">
              <h2 className="mt-4 mb-1 text-center text-4xl font-semibold text-black">
                Welcome Back!
              </h2>
              <span className="text-center text-sm text-gray-600 mb-10">
                Explore the pre-owned items
              </span>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
