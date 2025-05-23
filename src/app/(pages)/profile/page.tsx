"use client";
import Aside from "@/app/_components/Aside/Aside";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserCircle, Loader2, X, Trash2 } from "lucide-react";
import Cookies from "js-cookie";

// Interfaces
interface Post {
  _id: string;
  desc: string;
}

interface Comment {
  _id: string;
  text: string;
}

const Page = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [deleteType, setDeleteType] = useState<"post" | "comment" | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5555/api/posts/user", {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        withCredentials: true,
      });
      setPosts(res.data);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const loadComments = async (postId: string) => {
    setCommentLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5555/api/comments/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      setComments(res.data);
    } catch {
      setComments([]);
    } finally {
      setCommentLoading(false);
    }
  };

  const openCommentModal = async (post: Post) => {
    setSelectedPost(post);
    setShowModal(true);
    await loadComments(post._id);
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim() || !selectedPost) return;
    try {
      await axios.post(
        "http://localhost:5555/api/comments/",
        {
          text: newComment,
          postID: selectedPost._id,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      setNewComment("");
      await loadComments(selectedPost._id);
    } catch {
      alert("Failed to post comment");
    }
  };

  const confirmDelete = async () => {
    if (!deleteTargetId || !deleteType) return;

    try {
      if (deleteType === "post") {
        await axios.delete(
          `http://localhost:5555/api/posts/${deleteTargetId}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        setPosts((prev) => prev.filter((p) => p._id !== deleteTargetId));
      } else if (deleteType === "comment" && selectedPost) {
        await axios.delete(
          `http://localhost:5555/api/comments/${deleteTargetId}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        await loadComments(selectedPost._id);
      }
    } catch {
      alert(`Failed to delete ${deleteType}`);
    } finally {
      setShowDeleteModal(false);
      setDeleteTargetId(null);
      setDeleteType(null);
    }
  };

  return (
    <div className="flex h-screen bg-black text-white">
      <Aside />
      <section className="flex-1 overflow-y-auto py-10 px-6 md:px-16">
        <h1 className="text-5xl text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold mb-12">
          Your Profile
        </h1>

        {loading && (
          <div className="flex items-center justify-center gap-2 mt-10 text-gray-400">
            <Loader2 className="animate-spin w-5 h-5" />
            <span>Loading posts...</span>
          </div>
        )}
        {error && <p className="text-red-500">Error: {error}</p>}

        {!loading && (
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post._id}
                className="relative bg-[#1E1E1E]/60 backdrop-blur-md border border-[#333] rounded-2xl p-6 shadow-lg hover:shadow-[#fff]/10 transition-shadow duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <UserCircle className="w-10 h-10 text-[#1B3ECC]" />
                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      AnonymousUser
                    </h2>
                    <p className="text-sm text-gray-400">Posted just now</p>
                  </div>
                </div>

                <p className="text-gray-200 text-base leading-relaxed break-words">
                  {post.desc}
                </p>

                <div className="mt-6 flex justify-end items-center gap-2">
                  <button
                    className="bg-red-600 hover:bg-red-800 hover:bg-transparent w-[120px] h-[40px] text-white px-5 py-2 rounded-full text-sm font-medium transition duration-300 flex items-center gap-3"
                    onClick={() => {
                      setDeleteTargetId(post._id);
                      setDeleteType("post");
                      setShowDeleteModal(true);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                  <button
                    className="bg-[#1B3ECC] border-2 border-[#1B3ECC] hover:bg-transparent text-white px-5 py-2 rounded-full text-sm font-medium transition duration-300"
                    onClick={() => openCommentModal(post)}
                  >
                    Comment
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Comment Modal */}
      {showModal && selectedPost && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#121212] w-full max-w-xl rounded-lg p-6 relative text-white">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              onClick={() => setShowModal(false)}
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-semibold mb-2">Post</h2>
            <p className="mb-4 text-gray-300 leading-relaxed break-words w-[95%]">
              {selectedPost.desc}
            </p>

            <h3 className="text-lg font-semibold mb-2">Comments</h3>
            {commentLoading ? (
              <p className="text-gray-400">Loading comments...</p>
            ) : comments.length > 0 ? (
              <ul className="space-y-2 max-h-40 overflow-y-auto pr-2">
                {comments.map((comment) => (
                  <li
                    key={comment._id}
                    className="bg-[#1E1E1E] p-3 rounded text-sm text-gray-200 flex justify-between items-center"
                  >
                    <span className="leading-relaxed break-words w-[90%]">
                      {comment.text}
                    </span>
                    <button
                      onClick={() => {
                        setDeleteTargetId(comment._id);
                        setDeleteType("comment");
                        setShowDeleteModal(true);
                      }}
                      className="text-red-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No comments yet.</p>
            )}

            <div className="mt-4">
              <textarea
                className="w-full h-24 p-2 rounded bg-[#1E1E1E] border border-gray-700 text-white"
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button
                onClick={handleCommentSubmit}
                className="mt-2 bg-[#1B3ECC] hover:bg-transparent border border-[#1B3ECC] text-white px-4 py-2 rounded transition-all"
              >
                Comment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#1A1A1A] p-6 rounded-lg max-w-sm w-full shadow-lg border border-gray-700 text-white">
            <h2 className="text-lg font-bold mb-4">Are you sure?</h2>
            <p className="text-gray-400 mb-6">
              Do you really want to delete this {deleteType}? This action cannot
              be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteTargetId(null);
                  setDeleteType(null);
                }}
                className="px-4 py-2 rounded border border-gray-500 hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
