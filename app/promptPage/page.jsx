"use client"
import { useState } from "react";

const page = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile && selectedFile.type.startsWith("video/")) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      alert("Please upload a valid video file.");
    }
  };

  // Handle file submission (placeholder function)
  const handleUpload = async () => {
    if (!file) {
      alert("No file selected!");
      return;
    }
    console.log("Uploading:", file.name);
    
    // Here you'd send the file to your backend/AI model
    const fileData = new FormData();

    setUploading(true);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: fileData,
      })

      const data = await response.json();
      setAnalysis(data);
    } catch (error) {
      console.error("Couldn't send video file...", error)
    } finally {
      setUploading(true)
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Upload Your Gaming Clip</h1>
      <p className="text-gray-400 mb-6">AI will analyze your gameplay and provide insights.</p>

      <label className="w-96 h-48 flex items-center justify-center border-2 border-dashed border-gray-500 rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700 transition">
        <input type="file" className="hidden" accept="video/*" onChange={handleFileChange} />
        <span className="text-gray-300">Click or Drag & Drop to Upload Video</span>
      </label>

      {preview && (
        <div className="mt-4">
          <video src={preview} controls className="w-96 rounded-lg shadow-lg"></video>
        </div>
      )}

      <button
        onClick={handleUpload}
        className="mt-6 bg-custom-gradient hover:bg-blue-500 px-6 py-2 rounded-lg text-white font-regular"
      >
        Submit for Analysis
      </button>
    </div>
  );
};

export default page;