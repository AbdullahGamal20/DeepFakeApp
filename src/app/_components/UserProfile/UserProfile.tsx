"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
const UserProfile = () => {
  interface User {
    username: string;
    email: string;
  }

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get("token");
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        setUser(response.data);
      } catch (err) {
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4 shadow-md rounded-md w-80 mx-auto text-center">
      <h2 className="text-xl font-bold mb-2">{user?.username}</h2>
      <p className="text-[#fff]">{user?.email}</p>
    </div>
  );
};

export default UserProfile;
