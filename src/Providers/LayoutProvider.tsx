"use client";

import AppFooter from "@/app/_components/Footer/Footer";
import Navbar from "@/app/_components/Navbar/Navbar";
import { usePathname } from "next/navigation";
import { createContext, useContext } from "react";

// Create a context to store layout visibility
const LayoutContext = createContext<{ hideLayout: boolean }>({
  hideLayout: false,
});

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Check if the current page is login or register
  const hideLayout =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/upload") ||
    pathname.startsWith("/FAQ") ||
    pathname.startsWith("/knowledge-center");

  return (
    <LayoutContext.Provider value={{ hideLayout }}>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && (
        <div className="bg-[#121212] mt-24">
          <AppFooter />
        </div>
      )}
    </LayoutContext.Provider>
  );
}

// Custom hook to access layout visibility in other components
export function useLayout() {
  return useContext(LayoutContext);
}
