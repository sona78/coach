"use client";
import { useState } from "react";

export default function Home() {
  const [score, setScore] = useState(65); // Example score
  const [listening, setListening] = useState(false);

  // Placeholder for voice button logic
  const handleVoiceClick = () => {
    setListening((prev) => !prev);
    // Add voice recognition logic here
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <main className="flex flex-col items-center gap-10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          Welcome to Your Goals Tracker
        </h1>
        <p className="text-gray-600 text-center">
          Track your progress and get instant feedback on how well you’re doing!
        </p>

        {/* Score Bar */}
        <div className="w-full">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-indigo-700">Your Score</span>
            <span className="text-sm font-medium text-indigo-700">{score}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-indigo-500 h-4 rounded-full transition-all"
              style={{ width: `${score}%` }}></div>
          </div>
        </div>

        {/* Voice Button */}
        <button
          onClick={handleVoiceClick}
          className={`flex items-center gap-2 px-6 py-3 rounded-full shadow-md text-white font-semibold transition-colors ${
            listening ? "bg-red-500" : "bg-indigo-600 hover:bg-indigo-700"
          }`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 18v3m0 0h3m-3 0H9m6-3a6 6 0 10-12 0 6 6 0 0012 0zm-6 0V6a2 2 0 114 0v6a2 2 0 11-4 0z"
            />
          </svg>
          {listening ? "Listening..." : "Speak Your Goal"}
        </button>
      </main>
    </div>
  );
}
