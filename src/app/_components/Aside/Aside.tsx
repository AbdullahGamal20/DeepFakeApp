"use client";
import { LogOut, UserCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import UserProfile from "../UserProfile/UserProfile";
const Aside = () => {
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove("userID");
    router.push("/home");
  };
  return (
    <aside className="w-72 bg-[#121212] border-r-2 border-[#1E1E1E] py-6 flex flex-col items-center">
      <div className="text-center px-6">
        <UserCircle className="w-16 h-16 text-gray-400 mx-auto" />
        <UserProfile />
        {/* <h2 className="text-lg font-semibold mt-2">John Doe</h2>
        <p className="text-gray-400 text-sm">Deepfake Investigator</p> */}
      </div>
      <div className="bg-gray-400 text-gray-100 mt-6 h-[2px] w-full" />
      <div className="text-gray-400 my-8 flex flex-col gap-4 px-6">
        <Link
          className="bg-[#333] hover:bg-[#555] duration-300 transition-all text-white text-center px-4 py-2 rounded-lg"
          href="/upload"
        >
          Detect Deepfakes
        </Link>
        <Link
          className="bg-[#333] hover:bg-[#555] duration-300 transition-all text-white text-center  px-4 py-2 rounded-lg"
          href="/knowledge-center"
        >
          Knowledge Center
        </Link>
        <Link
          className="bg-[#333] hover:bg-[#555] duration-300 transition-all text-white text-center  px-4 py-2 rounded-lg"
          href="/FAQ"
        >
          FAQ
        </Link>
      </div>

      <div className="mt-auto px-6">
        <button
          onClick={handleLogout}
          className=" mt-4 flex items-center space-x-2 bg-[#1B3ECC] border-[#1B3ECC] border-2   hover:bg-transparent text-white px-4 py-2 rounded-lg  w-[200px] justify-center transition-all duration-300 ease-in-out"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Aside;
