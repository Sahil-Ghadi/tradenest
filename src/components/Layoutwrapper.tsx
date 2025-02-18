"use client";

import { usePathname } from "next/navigation";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  return (
    <div className={`${isAuthPage ? "bg-cool bg-cover" : ""} h-screen bg-no-repeat`}>
      {children}
    </div>
  );
}
