"use client";

import { useState } from "react";
import Image from "next/image";
import { Paperclip, Send } from "lucide-react";
import Aside from "@/app/_components/Aside/Aside";

interface ChatMessage {
  role: "user" | "assistant";
  media?: string;
  isVideo?: boolean;
  text?: string;
  result?: any; // This will store the response from the backend (array or object)
}

export default function DetectPage() {
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaUrl, setMediaUrl] = useState("");
  const [isVideo, setIsVideo] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  // We'll track advanced info toggles for each message-model pair
  // Key is "msgIndex_modelIndex" -> boolean
  const [showAdvanced, setShowAdvanced] = useState<Record<string, boolean>>({});

  // Change this to match your Flask server URL
  const API_BASE_URL = "http://localhost:5000";

  // Utility to push user's message (image or video preview)
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

  // Utility to push assistant message
  const pushAssistantMessage = (data: any, isVideoType: boolean) => {
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        isVideo: isVideoType,
        result: data,
      },
    ]);
  };

  // Handle file uploads
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

  // Handle URL input
  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMediaUrl(event.target.value.trim());
    setMediaFile(null);
  };

  // Analyze the media (file or URL)
  const handleAnalyze = async () => {
    let apiEndpoint = "";
    let requestOptions: RequestInit = {};
    let videoType = isVideo;
    let mediaToSend = "";

    // If the user provided a URL
    if (mediaUrl) {
      const trimmedUrl = mediaUrl.trim();
      const baseUrl = trimmedUrl.split("?")[0];
      videoType = /\.(mp4|mov|avi|mkv)$/i.test(baseUrl);
      setIsVideo(videoType);

      // Show user’s input in the chat
      pushUserMessage(trimmedUrl, videoType);

      // Choose the correct endpoint for videos vs images
      apiEndpoint = videoType
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

    setLoading(true);

    try {
      const response = await fetch(apiEndpoint, requestOptions);
      if (!response.ok) throw new Error("Failed to analyze the file.");

      const data = await response.json();

      // Add assistant response
      pushAssistantMessage(data, videoType);

      setMediaUrl("");
    } catch (error) {
      console.error("Error analyzing media:", error);
      alert("Failed to analyze the file.");
    } finally {
      setLoading(false);
    }
  };

  // Toggle advanced data for a specific message-model pair
  const handleToggleAdvanced = (msgIndex: number, modelIndex: number) => {
    const key = `${msgIndex}_${modelIndex}`;
    setShowAdvanced((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Render each message in the conversation
  const renderMessage = (msg: ChatMessage, msgIndex: number) => {
    // USER MESSAGE
    if (msg.role === "user") {
      return (
        <div key={msgIndex} className="flex justify-end">
          <div className="bg-[#121212] border-2 border-[#1E1E1E] p-2 mx-6 rounded-lg max-w-md mb-2">
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
                    fill
                    style={{ objectFit: "cover" }}
                  />
                )}
              </div>
            ) : (
              <p className="text-white">{msg.text}</p>
            )}
          </div>
        </div>
      );
    }

    // ASSISTANT MESSAGE
    const { result } = msg;
    // Convert result to an array for consistent handling
    const resultArray = Array.isArray(result) ? result : [result];

    // Display each model's data side by side
    return (
      <div key={msgIndex} className="flex justify-start px-6 mb-4">
        <div className="bg-[#121212] border-2 border-[#1E1E1E] p-4 rounded-lg w-full">
          <div className="flex flex-col md:flex-row md:space-x-4">
            {resultArray.map((modelData, modelIndex) => {
              const key = `${msgIndex}_${modelIndex}`;
              const isAdvancedVisible = showAdvanced[key] || false;

              // Identify if this is the special 'Common' model
              const isCommonModel = modelData.Model === "Common";

              return (
                <div
                  key={modelIndex}
                  className="border border-gray-600 rounded-md p-3 mb-4 md:mb-0 flex-1"
                >
                  {/* 
                    If it's a video model and NOT the 'Common' model, 
                    show main fake/real percentages.
                  */}
                  {msg.isVideo && !isCommonModel && (
                    <>
                      <p className="text-white mb-2">
                        <strong>Fake Percentage:</strong>{" "}
                        {modelData.fake_percentage !== undefined
                          ? modelData.fake_percentage + "%"
                          : "N/A"}
                      </p>
                      <p className="text-white mb-4">
                        <strong>Real Percentage:</strong>{" "}
                        {modelData.real_percentage !== undefined
                          ? modelData.real_percentage + "%"
                          : "N/A"}
                      </p>
                    </>
                  )}

                  {/* If it's an image model (not video), show prediction/confidence */}
                  {!msg.isVideo && (
                    <>
                      <p className="text-white mb-2">
                        <strong>Prediction:</strong> {modelData.prediction}
                      </p>
                      <p className="text-white mb-4">
                        <strong>Confidence:</strong>{" "}
                        {parseFloat(
                          modelData.confidence.replace("%", "")
                        ).toFixed(2)}
                        %
                      </p>
                    </>
                  )}

                  {/* 
                    Toggle for advanced data. 
                    The 'Common' model won't show main data above, 
                    but can show advanced data here.
                  */}
                  <button
                    onClick={() => handleToggleAdvanced(msgIndex, modelIndex)}
                    className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-1 rounded-md"
                  >
                    {isAdvancedVisible ? "Hide Advanced" : "Show Advanced"}
                  </button>

                  {/* Advanced data display */}
                  {isAdvancedVisible && (
                    <div className="mt-4 space-y-2 border-t border-gray-500 pt-2">
                      {msg.isVideo ? (
                        // VIDEO advanced data (including 'Common' model)
                        <>
                          {!isCommonModel && (
                            <p className="text-white">
                              <strong>Model Name:</strong> {modelData.Model}
                            </p>
                          )}

                          {modelData.total_frames_analyzed !== undefined && (
                            <p className="text-white">
                              <strong>Total Frames Analyzed:</strong>{" "}
                              {modelData.total_frames_analyzed}
                            </p>
                          )}

                          {/* For non-Common models, we might have fake_frames_zip */}
                          {modelData.fake_frames_zip && !isCommonModel && (
                            <p className="text-white">
                              <strong>Fake Frames Zip:</strong>{" "}
                              <a
                                href={modelData.fake_frames_zip}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 underline"
                              >
                                Download Fake Frames
                              </a>
                            </p>
                          )}

                          {/* For the Common model, show the link to download common fake frames */}
                          {isCommonModel &&
                            modelData.common_fake_frames_zip && (
                              <p className="text-white">
                                <strong>Download Common Fake Frames:</strong>{" "}
                                <a
                                  href={modelData.common_fake_frames_zip}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-400 underline"
                                >
                                  Download
                                </a>
                              </p>
                            )}

                          {/* Possibly show any common fake frames count */}
                          {modelData.common_fake_frames_count !== undefined && (
                            <p className="text-white">
                              <strong>Common Fake Frames Count:</strong>{" "}
                              {modelData.common_fake_frames_count}
                            </p>
                          )}
                        </>
                      ) : (
                        // IMAGE advanced data
                        <>
                          <p className="text-white">
                            <strong>Model Name:</strong> {modelData.Model}
                          </p>
                          <p className="text-white">
                            <strong>Grad-CAM URL:</strong>{" "}
                            <button className="bg-blue-600 hover:bg-blue-700 text-white mx-2 px-2 py-1 rounded-md">
                              Open GradCam
                              <a
                                href={modelData.gradcam_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 underline"
                              >
                                {/* {modelData.gradcam_url} */}
                              </a>
                            </button>
                          </p>
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen flex bg-black text-white">
      <Aside />
      <div className="flex-1 flex flex-col p-4">
        <h1 className="text-5xl text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-bold mb-6">
          Detect Deepfakes
        </h1>

        {/* Chat display area */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((msg, index) => renderMessage(msg, index))}
          {loading && <p className="text-center text-white">Processing...</p>}
        </div>

        {/* Input area */}
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
}
