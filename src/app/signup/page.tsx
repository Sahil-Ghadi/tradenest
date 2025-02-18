"use client";
import { SignUpForm } from "./signup-form";

export default function SignUpPage() {
  return (
    <div className="z-0">
      <div className="h-[616px] flex flex-col justify-center items-center">
        <div className="h-[415px] w-[380px] rounded-xl drop-shadow-2xl  mb-8 bg-white flex flex-col sm:w-[410px]">
          <div>
            <div className="flex flex-col pt-9">
              <h2 className="mb-1 text-center text-4xl font-semibold text-black">
                Create Account
              </h2>
              <span className="text-center text-sm text-gray-600 mb-6">
                Sign up to start shopping!
              </span>
            </div>
            <SignUpForm />
          </div>
        </div>
      </div>
    </div>
  );
}
