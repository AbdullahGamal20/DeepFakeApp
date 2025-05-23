"use client";
import { useState } from "react";
import { LogOut, UserCircle } from "lucide-react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import UserProfile from "../UserProfile/UserProfile";

const Aside = () => {
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleConfirmLogout = () => {
    Cookies.remove("userID");
    router.push("/home");
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  return (
    <aside className="w-72 bg-[#121212] border-r-2 border-[#1E1E1E] py-6 flex flex-col items-center relative">
      <div
        className="text-center px-6 cursor-pointer"
        onClick={() => router.push("/profile")}
      >
        <UserCircle className="w-16 h-16 text-gray-400 mx-auto" />
        <UserProfile />
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
          className="bg-[#333] hover:bg-[#555] duration-300 transition-all text-white text-center px-4 py-2 rounded-lg"
          href="/knowledge-center"
        >
          Knowledge Center
        </Link>
        <Link
          className="bg-[#333] hover:bg-[#555] duration-300 transition-all text-white text-center px-4 py-2 rounded-lg"
          href="/FAQ"
        >
          FAQ
        </Link>
        <Link
          className="bg-[#333] hover:bg-[#555] duration-300 transition-all text-white text-center px-4 py-2 rounded-lg"
          href="/posts"
        >
          Posts
        </Link>
        <Link
          className="bg-[#333] hover:bg-[#555] duration-300 transition-all text-white text-center px-4 py-2 rounded-lg"
          href="/create-post"
        >
          Create Post
        </Link>
        <Link
          className="bg-[#333] hover:bg-[#555] duration-300 transition-all text-white text-center px-4 py-2 rounded-lg"
          href="/profile"
        >
          Your Profile
        </Link>
      </div>

      <div className="mt-auto px-6">
        <button
          onClick={handleLogoutClick}
          className="mt-4 flex items-center space-x-2 bg-[#1B3ECC] border-[#1B3ECC] border-2 hover:bg-transparent text-white px-4 py-2 rounded-lg w-[200px] justify-center transition-all duration-300 ease-in-out"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#1E1E1E] p-6 rounded-lg shadow-lg text-center w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-white">
              Confirm Logout
            </h2>
            <p className="text-gray-300 mb-6">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 rounded border border-gray-500 text-white hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLogout}
                className="px-4 py-2 rounded bg-[#1B3ECC] hover:bg-transparent border border-[#1B3ECC] text-white transition"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Aside;
