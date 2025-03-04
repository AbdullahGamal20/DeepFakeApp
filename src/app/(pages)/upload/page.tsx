"use client";

import { useState } from "react";
import Image from "next/image";
import { LogOut, Paperclip, Send, UserCircle } from "lucide-react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Aside from "@/app/_components/Aside/Aside";

interface ChatMessage {
  role: "user" | "assistant";
  media?: string;
  isVideo?: boolean;
  text?: string;
  result?: any;
}

const DetectPage = () => {
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaUrl, setMediaUrl] = useState("");
  const [isVideo, setIsVideo] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false); // Loading state

  const router = useRouter();
  const API_BASE_URL = "http://localhost:5000"; // Flask server

  const pushUserMessage = (mediaPath: string, isVideoType: boolean) => {
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        media: mediaPath,
        isVideo: isVideoType,
      },
    ]);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setMediaFile(file);
      setMediaUrl("");

      const isVideoType = file.type.startsWith("video");
      setIsVideo(isVideoType);

      const fileURL = URL.createObjectURL(file);
      pushUserMessage(fileURL, isVideoType);
    }
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMediaUrl(event.target.value.trim());
    setMediaFile(null);
  };

  const handleAnalyze = async () => {
    let apiEndpoint = "";
    let requestOptions: RequestInit = {};
    let isVideoType = isVideo;
    let mediaToSend = "";

    if (mediaUrl) {
      const trimmedUrl = mediaUrl.trim();
      const baseUrl = trimmedUrl.split("?")[0];
      isVideoType = /\.(mp4|mov|avi|mkv)$/i.test(baseUrl);
      setIsVideo(isVideoType);
      pushUserMessage(trimmedUrl, isVideoType);

      apiEndpoint = isVideoType
        ? `${API_BASE_URL}/predict_video_url`
        : `${API_BASE_URL}/predict_url`;

      requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image_url: trimmedUrl }),
      };

      mediaToSend = trimmedUrl;
    } else if (mediaFile) {
      const formData = new FormData();
      formData.append("file", mediaFile);

      apiEndpoint = isVideo
        ? `${API_BASE_URL}/predict_video`
        : `${API_BASE_URL}/predict`;

      requestOptions = {
        method: "POST",
        body: formData,
      };

      mediaToSend = URL.createObjectURL(mediaFile);
    }

    if (!mediaToSend) {
      alert("Please upload a file or enter an image/video URL.");
      return;
    }

    setLoading(true); // Show loader

    try {
      const response = await fetch(apiEndpoint, requestOptions);
      if (!response.ok) throw new Error("Failed to analyze the file.");

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          isVideo: isVideoType,
          result: data,
        },
      ]);
      setMediaUrl("");
    } catch (error) {
      console.error("Error analyzing media:", error);
      alert("Failed to analyze the file.");
    } finally {
      setLoading(false); // Hide loader
    }
  };

  const renderMessage = (msg: ChatMessage, index: number) => {
    if (msg.role === "user") {
      return (
        <div key={index} className="flex justify-end">
          <div className="bg-[#121212] border-2 border-[#1E1E1E] p-2 mx-6  rounded-lg max-w-md mb-2">
            {msg.media ? (
              <div className="relative w-32 h-32 rounded-lg overflow-hidden">
                {msg.isVideo ? (
                  <video
                    src={msg.media}
                    controls
                    className="w-full h-full object-cover"
                  />
                ) : msg.media.startsWith("http") ? (
                  <img
                    src={msg.media}
                    alt="User upload"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src={msg.media}
                    alt="User upload"
                    layout="fill"
                    objectFit="cover"
                  />
                )}
              </div>
            ) : (
              <p className="text-white">{msg.text}</p>
            )}
          </div>
        </div>
      );
    } else {
      const { result, isVideo } = msg;
      return (
        <div key={index} className="flex justify-start">
          <div className="bg-[#121212] border-2 border-[#1E1E1E] p-4 rounded-lg w-[75%] mx-6 mb-2">
            {isVideo ? (
              <>
                <p className="text-white mb-1">
                  Fake Percentage: {result.fake_percentage} %
                </p>
                <p className="text-white mb-1">
                  Real Percentage: {result.real_percentage} %
                </p>
                <p className="text-white mb-1">
                  Total Frames Analyzed: {result.total_frames_analyzed}
                </p>
              </>
            ) : (
              <>
                <p className="text-white mb-1">
                  Prediction: {result.prediction}
                </p>
                <p className="text-white mb-1">
                  Confidence: {result?.confidence}
                </p>
              </>
            )}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="h-screen flex bg-black text-white">
      <Aside />
      <div className="flex-1 flex flex-col p-4">
        <h1 className="text-5xl text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-bold mb-6">
          Detect Deepfakes
        </h1>

        <div className="flex-1 overflow-y-auto mb-4 space-y-4 px-2">
          {messages.map((msg, index) => renderMessage(msg, index))}
          {loading && <p className="text-center text-white">Processing...</p>}
        </div>

        <div className="w-full max-w-2xl mx-auto mb-4">
          <div className="flex items-center bg-[#121212] border-2 border-[#1E1E1E] rounded-full p-4">
            <label className="cursor-pointer px-3 text-gray-400">
              <Paperclip className="h-5 w-5" />
              <input
                type="file"
                accept="image/*,video/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            <input
              type="url"
              value={mediaUrl}
              onChange={handleUrlChange}
              placeholder="Paste an image or video URL..."
              className="flex-1 bg-transparent outline-none text-white text-sm px-3"
            />
            <button
              onClick={handleAnalyze}
              className="text-gray-400 hover:text-white transition px-3"
              disabled={loading}
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetectPage;
