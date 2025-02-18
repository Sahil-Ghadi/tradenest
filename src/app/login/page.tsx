"use client";
import LoginForm from "./login-form";

export default function LoginPage() {
  return (
    <div className="z-0">
      <div className="h-[616px] flex flex-col justify-center items-center">
        <div className="h-[400px] w-[380px] bg-white rounded-xl border-4 dark:bg-gray-800 outline-4 outline outline-teal-200 dark:outline-gray-700 border-blue-600 dark:border-gray-600 border-solid flex flex-col mb-8 sm:w-[410px]">
          <div>
            <div className="flex flex-col pt-8">
              <h2 className="mt-4 mb-1 text-center text-4xl font-semibold text-black dark:text-white">
                Welcome Back!
              </h2>
              <span className="text-center text-sm text-gray-600 dark:text-gray-400 mb-10">
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
