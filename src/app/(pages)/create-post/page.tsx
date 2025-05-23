"use client";
import Aside from "@/app/_components/Aside/Aside";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const CreatePostPage = () => {
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:5555/api/posts/",
        { desc },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          withCredentials: true,
        }
      );

      if (res.status === 201 || res.status === 200) {
        setMessage("✅ Post created successfully!");
        setDesc("");
      } else {
        setMessage("❌ Failed to create post.");
      }
    } catch (error: any) {
      setMessage("❌ Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-black text-white">
      <Aside />
      <section className="flex-1 overflow-y-auto flex justify-center items-center px-4 md:px-16 py-10">
        <div className="w-full max-w-2xl bg-[#1E1E1E]/60 backdrop-blur-md border border-[#333] rounded-2xl shadow-xl p-8 space-y-6">
          <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
            Create New Post
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              className="w-full h-40 p-4 rounded-xl bg-[#121212] border border-gray-600 text-white resize-none focus:outline-none "
              placeholder="What's on your mind?"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full text-center bg-[#1B3ECC] border-2 border-[#1B3ECC] hover:bg-transparent hover:text-[#1B3ECC] text-white font-medium py-3 px-6 rounded-xl transition-all duration-300"
            >
              {loading ? "Submitting..." : "Submit Post"}
            </button>

            {message && (
              <p
                className={`text-sm text-center ${
                  message.startsWith("✅") ? "text-green-400" : "text-red-500"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
};

export default CreatePostPage;
