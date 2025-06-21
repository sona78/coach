"use client";

import { newUser } from "./actions";
import { useRef, useState } from "react";

export default function Home() {
  const formRef = useRef<HTMLFormElement>(null);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");

  const handleSubmit = async (formData: FormData) => {
    try {
      const result = await newUser(formData);

      if (result.success) {
        // Reset form
        formRef.current?.reset();
        setName("");
        setGoal("");
        alert(result.message);
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting your information. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Welcome to your personal sounding board.
        </h1>

        <form ref={formRef} className="space-y-6" action={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Please tell us your name:"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="goal" className="block text-sm font-medium text-gray-700 mb-2">
              Goal
            </label>
            <input
              type="text"
              id="goal"
              name="goal"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="What goal do you want to work on?"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
